/* Atomic batch commit + durable receipt. Requires the Sheets v4 advanced service. */
function connectionStatus(){return {online:true};}
function syncLog_(){
  const db=db_();let s=db.getSheetByName('Sync_Log');
  if(!s){s=db.insertSheet('Sync_Log');s.getRange(1,1,1,6).setValues([['Batch_ID','Payload_SHA256','Mode','Operation_IDs','Synced_At','Revision']]);s.setFrozenRows(1);SpreadsheetApp.flush();}
  return s;
}
function receipt_(s,id){if(s.getLastRow()<2)return null;return s.getRange(2,1,s.getLastRow()-1,6).getValues().find(r=>r[0]===id)||null;}
function digest_(payload){return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,JSON.stringify(payload)).map(b=>(b&255).toString(16).padStart(2,'0')).join('');}
function updateCells_(sheet,rows,width,startRow){
  const end=Math.max(startRow+rows.length,sheet.getLastRow()),requests=[];
  if(end>sheet.getMaxRows())requests.push({appendDimension:{sheetId:sheet.getSheetId(),dimension:'ROWS',length:end-sheet.getMaxRows()}});
  if(end>startRow)requests.push({updateCells:{range:{sheetId:sheet.getSheetId(),startRowIndex:startRow,endRowIndex:end,startColumnIndex:0,endColumnIndex:width},rows:rows.map(row=>({values:row.map(v=>({userEnteredValue:typeof v==='number'?{numberValue:v}:{stringValue:String(v??'')}}))})),fields:'userEnteredValue'}});
  return requests;
}
function syncOfflineBatch(sessionId,batch){return locked_(()=>{
  const current=auth_(sessionId);
  WMS.assert(batch&&Offline.validId(batch.id)&&Array.isArray(batch.operations)&&batch.operations.length>0&&batch.operations.length<=500,'Batch offline tidak valid (1–500 transaksi).');
  WMS.assert(JSON.stringify(batch).length<=3000000,'Batch terlalu besar. Unduh cadangan antrean dan hubungi pengelola.');
  const hash=digest_(batch),log=syncLog_(),receipt=receipt_(log,batch.id);
  if(receipt){WMS.assert(receipt[1]===hash&&receipt[2]===current.mode,'ID batch telah digunakan untuk isi yang berbeda.');return {batchId:batch.id,ackIds:JSON.parse(receipt[3]),data:filtered_(snapshot_(),current),replayed:true};}
  WMS.assert(typeof Sheets!=='undefined','Aktifkan Google Sheets API pada Services di editor Apps Script, lalu deploy versi baru. Antrean tetap tersimpan di HP.');
  const before=snapshot_();let data=before;const ids=new Set(),sessions=read_('User_Session'),newSessions=[],transactions=[];
  for(const op of batch.operations){
    WMS.assert(op&&Offline.validId(op.id)&&!ids.has(op.id),'ID transaksi duplikat/tidak valid.');ids.add(op.id);
    const actor={...WMS.session(op.actor),id:op.actor.id};WMS.assert(actor.mode===current.mode&&Offline.validId(actor.id),'Sesi transaksi tidak sesuai mode.');
    WMS.assert(typeof op.createdAt==='string'&&/^\d{4}-\d{2}-\d{2}T/.test(op.createdAt)&&Number.isFinite(Date.parse(op.createdAt)),'Waktu transaksi tidak valid.');
    const known=sessions.concat(newSessions).find(s=>s.id===actor.id);
    if(known)WMS.assert(['name','date','shift','mode'].every(k=>known[k]===actor[k]),'Identitas sesi transaksi berubah.');
    else newSessions.push({...actor,createdAt:op.createdAt,expiresAt:'1970-01-01T00:00:00.000Z'}); // Historical identity, never grants an active token.
    const touched=Offline.touched(data,op.request);WMS.assert(touched.length>0,'Transaksi tidak memiliki lokasi.');
    for(const id of touched){
      if(id.startsWith('@delivery:')){const doc=Delivery.find(data,id.slice(10));WMS.assert(!doc||doc.mode===current.mode,'Delivery note di luar mode sesi.');}
      else WMS.assert(data.locations.some(l=>l.id===id&&l.group===current.mode),'Lokasi di luar mode sesi.');
      if(op.expected?.[id]!==Offline.fingerprint(data,id))return {conflict:true,locationId:id,message:(id.startsWith('@delivery:')?'Delivery note ':'Lokasi ')+id+' berubah di Google Sheets. Antrean HP tetap disimpan; tinjau sebelum melanjutkan.'};
    }
    const prior=data;data=Offline.apply(data,op,actor);
    transactions.push(...StockExport.capture(prior,data,op.request,actor,op.id,op.createdAt));
  }
  // One API request applies stock, location function, historical sessions AND receipt together.
  // A lost response is safe: retrying the same immutable batch finds the receipt.
  const revision=before.version+1;data.version=revision;
  const stockRows=data.stock.map(i=>KEYS_.Stock_Detail.map(k=>i[k]??''));
  const locRows=data.locations.map(i=>KEYS_.Master_Lokasi.map(k=>i[k]??''));
  const requests=[...updateCells_(sheet_('Stock_Detail'),stockRows,KEYS_.Stock_Detail.length,1),...updateCells_(sheet_('Master_Lokasi'),locRows,KEYS_.Master_Lokasi.length,1)];
  requests.push(...deliveryRequests_(data),...transactionRequests_(transactions));
  if(newSessions.length){const s=sheet_('User_Session');requests.push(...updateCells_(s,newSessions.map(i=>KEYS_.User_Session.map(k=>i[k]??'')),KEYS_.User_Session.length,s.getLastRow()));}
  requests.push(...updateCells_(log,[[batch.id,hash,current.mode,JSON.stringify([...ids]),new Date().toISOString(),revision]],6,log.getLastRow()));
  PropertiesService.getScriptProperties().setProperty('WMS_REV',String(revision));
  SpreadsheetApp.flush();
  Sheets.Spreadsheets.batchUpdate({requests},db_().getId());
  return {batchId:batch.id,ackIds:[...ids],data:filtered_(data,current),replayed:false};
});}
