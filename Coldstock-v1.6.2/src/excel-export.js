/* Shared export rules. Receipt snapshots survive moves, edits and exhausted stock. */
const StockExport=(()=>{
 const master=[
 ['KM-037','PCN','FROZEN'],['KM-038','CCN','FROZEN'],['KM-053','SOSIS HOT','CHILLER'],['KM-054','CCN STICK','FROZEN'],
 ['KM-056','BENFARM ORI','FROZEN'],['KM-057','BAKSO ORI','CHILLER'],['KM-058','BAKSO KEJU','CHILLER'],['KM-059','BENFARM STICK','FROZEN'],
 ['KM-060','BAKSO HOT','CHILLER'],['KM-061','SOSIS GOCHUJANG','CHILLER'],['KM-062','CCN MINI','FROZEN'],['KM-063','S. ORI GT','CHILLER'],
 ['KM-064','S. HOT GT','CHILLER'],['KM-065','SOSIS KEJU 2X','CHILLER'],['KM-066','CCN SPICY','FROZEN'],['KM-067','CCN 250 GR','FROZEN'],
 ['KM-068','BAKSO GOCHUJANG','CHILLER'],['KM-069','STICK 250 GR','FROZEN'],['KM-070','CHICKEN WINGS','FROZEN'],['KM-071','SOSIS TOMYUM','CHILLER']];
 const aliases={PCN:'KM-037',CCN:'KM-038',SH:'KM-053',CCS:'KM-054',BO:'KM-057',BK:'KM-058',BH:'KM-060',SG:'KM-061',SK:'KM-065',SPC:'KM-066','CCN 250':'KM-067',BG:'KM-068','CCS 250':'KM-069',CW:'KM-070',STY:'KM-071'};
 const fields=['id','type','mode','date','shift','at','itemId','sku','kp','palletNo','qty','unit','status','locationId','room','documentId','documentNo','truck','destination','note','name','palletId','palletLabel','sjNumber','beforeJson','afterJson','reason'];
 const schema='coldstock-excel-162';
 const headers={IN:['Date','Shift','SKU','Products','Kode Produksi','QTY','No. Palet asal','Category','Status','ID Item asal','ID Trans','Gudang','Ruangan','Remarks'],OUT:['Date','Shift','SKU','Products','Kode Produksi','QTY','No. Palet asal','Label Palet','Category','No. SJ','Plat Truk','Tujuan','ID Item asal','ID Trans','ID Palet fisik','No. Dokumen internal','Gudang','Ruangan']};
 headers.KOREKSI=['Date','Shift','SKU','Products','Kode Produksi','Koreksi CTN','No. Palet asal','Category','Status','ID Item asal','ID Trans','Gudang','Ruangan','Remarks','QTY sebelum','QTY sesudah','SKU sebelum','KP sebelum','Palet sebelum','SPV sebelum','SPV sesudah','Alasan koreksi','Nama SK','Waktu koreksi','Urutan'];
 function product(sku){const value=String(sku||'').trim().toUpperCase(),code=aliases[value]||value;return master.find(m=>m[0]===code||m[1]===value)||null;}
 function capture(before,after,request,ss,operationId,at){
  const rows=[],old=new Map(before.stock.map(i=>[i.id,i]));
  if(['saveSlot','bulkReceive'].includes(request.action))for(const i of after.stock){
   const previous=old.get(i.id),qty=Number(i.qty)-(previous?Number(previous.qty):0);if(qty<=0)continue;
   const loc=after.locations.find(l=>l.id===i.locationId);WMS.assert(loc&&loc.group===ss.mode,'Penerimaan di luar gudang sesi.');
   rows.push({id:'IN-'+operationId+'-'+i.id,type:'IN',mode:ss.mode,date:ss.date,shift:ss.shift,at,itemId:i.id,sku:i.sku,kp:i.kp,palletNo:i.palletNo||'',qty,unit:i.unit,status:i.status,locationId:i.locationId,room:loc.room,documentId:'',documentNo:'',truck:'',destination:'',note:i.note||'',name:ss.name});
  }
  if(request.action==='correctItem'){
   const previous=old.get(request.itemId),i=after.stock.find(i=>i.id===request.itemId),loc=after.locations.find(l=>l.id===i.locationId);
   rows.push({id:'COR-'+operationId+'-'+i.id,type:'KOREKSI',mode:ss.mode,date:ss.date,shift:ss.shift,at,itemId:i.id,sku:i.sku,kp:i.kp,palletNo:i.palletNo||'',qty:i.qty-previous.qty,unit:i.unit,status:i.status,locationId:i.locationId,room:loc.room,note:i.note||'',name:ss.name,beforeJson:JSON.stringify(previous),afterJson:JSON.stringify(i),reason:request.reason});
  }
  if(request.action==='issueDelivery'){
   const d=(after.deliveryNotes||[]).find(d=>d.id===request.documentId);
   WMS.assert(d&&d.state==='ISSUED','Dokumen keluar belum dikonfirmasi.');
   rows.push(...outRows(d,ss.date,ss.shift,ss.name));
  }
  return rows;
 }
 function outRows(d,date,shift,name){return d.lines.map((l,n)=>({id:'OUT-'+d.id+'-'+n,type:'OUT',mode:d.mode,date,shift:shift||'',at:d.confirmedAt,itemId:l.itemId,sku:l.sku,kp:l.kp,palletNo:l.palletNo||'',qty:Number(l.qty),unit:l.unit,status:l.status,locationId:l.locationId,room:l.room,documentId:d.id,documentNo:d.number,sjNumber:d.sjNumber||'',truck:d.truck||'',destination:d.destination||'',note:l.note||'',name:name||d.confirmedName||'',palletId:l.palletId||'',palletLabel:l.palletLabel||''}));}
 function identityKey(r){return product(r.sku)?.[0]||r.sku;}
 function reportId(id,r){return id+'-'+identityKey(r);}
 function jakartaDate(at){const t=Date.parse(at);return Number.isFinite(t)?new Date(t+7*3600000).toISOString().slice(0,10):'';}
 function allRows(ledger,documents,sessions,mode){
  const result=new Map();
  for(const r of ledger||[])if(r.mode===mode){WMS.assert(!result.has(r.id),'ID transaksi ekspor duplikat. Periksa Transaction_Log.');result.set(r.id,{...r});}
  // Pre-patch DN snapshots are valid OUT evidence. Current stock is never fabricated as IN.
  for(const d of documents||[])if(d.mode===mode&&d.state==='ISSUED'){
   const actor=(sessions||[]).find(s=>s.id===d.confirmedBy),date=actor?.date||jakartaDate(d.confirmedAt);
   for(const row of outRows(d,date,actor?.shift||'',actor?.name))if(!result.has(row.id))result.set(row.id,{...row,legacy:true});
  }
  const rows=[...result.values()],groups=new Map();
  rows.forEach((r,n)=>{if(r.type==='KOREKSI')r.sequence=n+1;});
  for(const r of rows)if(r.type==='IN'){if(!groups.has(r.itemId))groups.set(r.itemId,new Set());groups.get(r.itemId).add(identityKey(r));}
  for(const r of rows)if((groups.get(r.itemId)?.size||0)>1){
   if(!['e8113d62-4f51-46f3-bb65-c70b1a9a5afe','bb6eeeed-2761-40c1-adbe-01f478f0f15d','0a9fd36c-28a9-44d8-9908-2c22e76ca3a9'].includes(r.itemId)){r.identityConflict=true;continue;}
   const basis=r.type==='KOREKSI'?JSON.parse(r.beforeJson):r;
   r.itemId=reportId(r.itemId,basis);r.identityRepaired=true;
  }
  return rows.sort((a,b)=>String(a.date).localeCompare(String(b.date))||String(a.at).localeCompare(String(b.at))||a.id.localeCompare(b.id));
 }
 function select(rows,mode,f){
  WMS.assert(['IN','OUT','KOREKSI'].includes(f.type),'Pilih tab IN atau OUT.');
  if(f.from)WMS.date(f.from);if(f.to)WMS.date(f.to);
  WMS.assert(!f.from||!f.to||f.from<=f.to,'Tanggal awal tidak boleh melewati tanggal akhir.');
  return rows.filter(r=>r.mode===mode&&r.type===f.type&&(!f.from||r.date>=f.from)&&(!f.to||r.date<=f.to)&&(!f.shift||r.shift===f.shift)&&(!f.room||r.room===f.room));
 }
 function issues(rows){const messages=new Set();for(const r of rows){if(r.identityConflict)messages.add('Satu ID dipakai beberapa SKU. Rekonsiliasi riwayat dahulu: '+r.itemId);if(!product(r.sku))messages.add('SKU belum dipetakan: '+r.sku);if(r.unit!=='CTN')messages.add('Satuan '+r.unit+' belum dapat diekspor sebagai CTN.');if(!/^\d{4}-\d{2}-\d{2}$/.test(r.date))messages.add('Ada tanggal transaksi yang tidak tersedia.');if(!Number.isInteger(Number(r.qty))||(r.type!=='KOREKSI'&&Number(r.qty)<=0))messages.add('Jumlah transaksi tidak valid.');}return [...messages];}
 function values(r){const p=product(r.sku)||[r.sku,'BELUM DIPETAKAN',''],common=[r.date,String(r.shift||'').replace(/^S/,''),p[0],p[1],r.kp];if(r.type==='KOREKSI'){const b=JSON.parse(r.beforeJson),a=JSON.parse(r.afterJson);return [...common,Number(r.qty),r.palletNo,p[2],r.status,r.itemId,r.id,r.mode,r.room,r.note||'',b.qty,a.qty,product(b.sku)?.[0]||b.sku,b.kp,b.palletNo,b.spv||'',a.spv||'',r.reason,r.name,r.at,r.sequence||0];}return r.type==='IN'?[...common,Number(r.qty),r.palletNo,p[2],r.status,r.itemId||'',r.id,r.mode,r.room,r.note||'']:[...common,Number(r.qty),r.palletNo,r.palletLabel||r.palletNo,p[2],r.sjNumber||'',r.truck,r.destination,r.itemId||'',r.id,r.palletId||r.itemId||'',r.documentNo,r.mode,r.room];}
 function cell(v){if(typeof v==='number')return String(v);let s=String(v??'').replace(/[\t\r\n\u0000-\u001f\ufeff]+/g,' ').trim();if(/^[=+@"\-]/.test(s)||/^\d{16,}$/.test(s)||/^0\d+$/.test(s))s="'"+s;return s;}
 function tsv(rows,type,withHeader){const errors=issues(rows);WMS.assert(!errors.length,errors.join(' '));WMS.assert(rows.every(r=>r.type===type),'Jenis transaksi tercampur.');const lines=rows.map(values);if(withHeader)lines.unshift(headers[type]);return lines.map(row=>row.map(cell).join('\t')).join('\r\n');}
 return {schema,master,aliases,fields,headers,product,capture,outRows,allRows,select,issues,values,cell,tsv,jakartaDate,identityKey,reportId};
})();
