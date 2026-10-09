/** Coldstock — Google Apps Script V8. Jalankan setupDatabase_ sekali di editor. */
const HEADERS_ = {
  Master_Lokasi:['Lokasi_ID','Ruangan','Kelompok','Blok','Bay','Slot','Slot_Display','Urutan','Jenis','Tipe_Fungsi'],
  Master_SKU:['SKU','Kelompok','Default_Qty','Shelf_Life_Hari'],
  Stock_Detail:['Item_ID','Lokasi_ID','SKU','KP','Exp_Date','Qty','Satuan','Kode_SPV','Status','Keterangan','Updated_At','Session_ID','No_Pallet','Physical_Pallet_ID','Pallet_Label'],
  User_Session:['Session_ID','Nama_SK','Tanggal','Shift','Mode','Created_At','Expires_At']
};
const KEYS_ = {
  Master_Lokasi:['id','room','group','block','bay','slot','display','order','kind','functionType'],
  Master_SKU:['code','group','defaultQty','shelfDays'],
  Stock_Detail:['id','locationId','sku','kp','exp','qty','unit','spv','status','note','updatedAt','sessionId','palletNo','palletId','palletLabel'],
  User_Session:['id','name','date','shift','mode','createdAt','expiresAt']
};
function doGet(){
 const source=HtmlService.createHtmlOutputFromFile('Index').getContent().replace('/* SERVER_CONFIG */','window.COLDSTOCK_DB = '+JSON.stringify(db_().getId())+';');
 const output=HtmlService.createHtmlOutput(source).setTitle('Coldstock · Manajemen Cold Storage').addMetaTag('viewport','width=device-width, initial-scale=1, viewport-fit=cover');
 const favicon=String(PropertiesService.getScriptProperties().getProperty('COLDSTOCK_FAVICON_URL')||'').trim();
 // An optional branding setting must never prevent opening the stock application.
 if(favicon){try{if(!/^https:\/\//i.test(favicon))throw new Error('Gunakan URL gambar HTTPS.');output.setFaviconUrl(favicon);}catch(error){console.warn('Favicon belum diterapkan: '+error.message);}}
 return output;
}
function db_(){const id=PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');const db=id?SpreadsheetApp.openById(id):SpreadsheetApp.getActiveSpreadsheet();if(!db)throw new Error('Isi SPREADSHEET_ID di Script Properties atau gunakan script terikat Google Sheets.');return db;}
function locked_(fn){const lock=LockService.getScriptLock();lock.waitLock(25000);try{return fn();}finally{lock.releaseLock();}}
function migratePalletColumn_(s){
  if(!s||s.getLastRow()===0)return;
  const headers=s.getRange(1,1,1,13).getValues()[0];
  WMS.assert(JSON.stringify(headers.slice(0,12))===JSON.stringify(HEADERS_.Stock_Detail.slice(0,12)),'Header Stock_Detail tidak sesuai. Periksa skema sebelum melanjutkan.');
  WMS.assert(!headers[12]||headers[12]==='No_Pallet','Kolom ke-13 Stock_Detail sudah digunakan. Pindahkan kolom tambahan sebelum upgrade.');
  if(!headers[12])s.getRange(1,13,1,1).setValues([['No_Pallet']]).setBackground('#173e74').setFontColor('#ffffff').setFontWeight('bold');
}
function sheet_(name){const s=db_().getSheetByName(name);if(!s)throw new Error('Database belum disiapkan. Jalankan setupDatabase_ di editor.');if(name==='Stock_Detail'){migratePalletColumn_(s);migratePhysicalPalletColumns_(s);}return s;}
function read_(name){const s=sheet_(name);if(s.getLastRow()<2)return [];return s.getRange(2,1,s.getLastRow()-1,KEYS_[name].length).getValues().filter(r=>r[0]!=='').map(row=>Object.fromEntries(KEYS_[name].map((k,n)=>[k,row[n] instanceof Date?Utilities.formatDate(row[n],'Asia/Jakarta',k==='date'||k==='kp'||k==='exp'?'yyyy-MM-dd':"yyyy-MM-dd'T'HH:mm:ssXXX"):row[n]])));}
function safeCell_(v){return typeof v==='string'&&/^[=+@-]/.test(v)?"'"+v:v;}
function write_(name,objects){const s=sheet_(name),width=KEYS_[name].length,old=s.getLastRow();if(objects.length){if(s.getMaxRows()<objects.length+1)s.insertRowsAfter(s.getMaxRows(),objects.length+1-s.getMaxRows());const range=s.getRange(2,1,objects.length,width);range.setNumberFormat('@');range.setValues(objects.map(o=>KEYS_[name].map(k=>safeCell_(o[k]===undefined?'':o[k]))));}if(old>objects.length+1)s.getRange(objects.length+2,1,old-objects.length-1,width).clearContent();}
function setupDatabase_(){return locked_(()=>{const db=db_();PropertiesService.getScriptProperties().setProperty('SPREADSHEET_ID',db.getId());Object.keys(HEADERS_).forEach(name=>{let s=db.getSheetByName(name);if(!s)s=db.insertSheet(name);if(s.getLastRow()===0){s.getRange(1,1,1,HEADERS_[name].length).setValues([HEADERS_[name]]).setBackground('#173e74').setFontColor('#ffffff').setFontWeight('bold');s.setFrozenRows(1);if(name==='Master_Lokasi')write_(name,defaultLocations_());if(name==='Master_SKU')write_(name,WMS.SKU);}else {if(name==='Stock_Detail'){migratePalletColumn_(s);migratePhysicalPalletColumns_(s);}const headers=s.getRange(1,1,1,HEADERS_[name].length).getValues()[0];WMS.assert(JSON.stringify(headers)===JSON.stringify(HEADERS_[name]),'Header '+name+' tidak sesuai. Gunakan spreadsheet baru atau migrasikan manual.');}});if(!PropertiesService.getScriptProperties().getProperty('WMS_REV'))PropertiesService.getScriptProperties().setProperty('WMS_REV','0');return 'Database siap. Stok dimulai kosong.';});}
function auth_(id){WMS.assert(typeof id==='string'&&id.length>=20,'Sesi tidak valid.');const s=read_('User_Session').find(s=>s.id===id);WMS.assert(s&&new Date(s.expiresAt).getTime()>Date.now(),'Sesi kedaluwarsa. Refresh dan mulai shift kembali.');return s;}
// Called only inside locked_ via snapshot_. Append only missing C2 IDs; retry is idempotent.
function ensureLayout154_(){
 const result=Layout154.merge(read_('Master_Lokasi'));if(!result.added.length)return result.locations;
 WMS.assert(typeof Sheets!=='undefined','Aktifkan Google Sheets API pada Services untuk memperbarui layout Chiller 2. Data lama tetap tersimpan.');
 const s=sheet_('Master_Lokasi'),rows=result.added.map(l=>KEYS_.Master_Lokasi.map(k=>l[k]));
 const props=PropertiesService.getScriptProperties();props.setProperty('WMS_REV',String(Number(props.getProperty('WMS_REV')||0)+1));
 SpreadsheetApp.flush();Sheets.Spreadsheets.batchUpdate({requests:updateCells_(s,rows,KEYS_.Master_Lokasi.length,s.getLastRow())},db_().getId());
 return result.locations;
}
function snapshot_(){const locations=ensureLayout154_();return {deliveryNotes:readDeliveries_(),locations:locations.map(l=>({...l,bay:Number(l.bay),slot:Number(l.slot),order:Number(l.order)})),skus:read_('Master_SKU').map(s=>({...s,defaultQty:Number(s.defaultQty),shelfDays:Number(s.shelfDays)})),stock:read_('Stock_Detail').map(i=>({...i,qty:Number(i.qty)})),version:Number(PropertiesService.getScriptProperties().getProperty('WMS_REV')||0)};}
function filtered_(data,ss){const locations=data.locations.filter(l=>l.group===ss.mode),ids=new Set(locations.map(l=>l.id));return {...data,deliveryNotes:(data.deliveryNotes||[]).filter(d=>d.mode===ss.mode),locations,skus:data.skus.filter(s=>s.group===ss.mode),stock:data.stock.filter(i=>ids.has(i.locationId))};}
function startSession(input){return locked_(()=>{const ss={...WMS.session(input),id:Utilities.getUuid(),createdAt:new Date().toISOString(),expiresAt:new Date(Date.now()+12*3600000).toISOString()};const s=sheet_('User_Session');s.appendRow(KEYS_.User_Session.map(k=>safeCell_(ss[k])));SpreadsheetApp.flush();return {session:ss,data:filtered_(snapshot_(),ss)};});}
function getBootstrap(sessionId){return locked_(()=>{const ss=auth_(sessionId);return filtered_(snapshot_(),ss);});}
function mutateStock(sessionId,request){WMS.assert(['saveSlot','move'].includes(request.action),'Gunakan SYNC / delivery note untuk pengeluaran stok.');return locked_(()=>{
 const ss=auth_(sessionId),before=snapshot_(),now=new Date().toISOString(),after=Delivery.mutate(before,request,ss,()=>Utilities.getUuid(),now);
 WMS.assert(typeof Sheets!=='undefined','Aktifkan Google Sheets API. Stok dan riwayat harus disimpan bersama.');
 const transactions=StockExport.capture(before,after,request,ss,Utilities.getUuid(),now);
 const requests=[...updateCells_(sheet_('Stock_Detail'),after.stock.map(i=>KEYS_.Stock_Detail.map(k=>i[k]??'')),KEYS_.Stock_Detail.length,1),...updateCells_(sheet_('Master_Lokasi'),after.locations.map(l=>KEYS_.Master_Lokasi.map(k=>l[k]??'')),KEYS_.Master_Lokasi.length,1),...transactionRequests_(transactions)];
 PropertiesService.getScriptProperties().setProperty('WMS_REV',String(after.version));SpreadsheetApp.flush();
 try{Sheets.Spreadsheets.batchUpdate({requests},db_().getId());}catch(error){throw new Error('Simpan gagal. Muat ulang dan periksa data: '+error.message);}
 return filtered_(after,ss);
});}
function generateWaText(sessionId,room){return locked_(()=>{const ss=auth_(sessionId);WMS.assert(!room||['CSFG C1','CSFG C2','CHILLER C1','CHILLER C2','CHILLER C3','PROD WIP'].includes(room),'Ruangan tidak valid.');return WMS.report(snapshot_(),ss,room);});}

function migratePhysicalPalletColumns_(s){
 const headers=HEADERS_.Stock_Detail;
 if(s.getMaxColumns&&s.getMaxColumns()<headers.length)s.insertColumnsAfter(s.getMaxColumns(),headers.length-s.getMaxColumns());
 const row=s.getRange(1,1,1,headers.length).getValues()[0];
 for(let n=13;n<headers.length;n++)WMS.assert(!row[n]||row[n]===headers[n],'Kolom '+(n+1)+' Stock_Detail sudah dipakai. Pindahkan kolom custom sebelum update.');
 for(let n=13;n<headers.length;n++)if(!row[n])s.getRange(1,n+1,1,1).setValues([[headers[n]]]);
}
