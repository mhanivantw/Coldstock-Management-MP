/* Append-only receipt ledger committed atomically with stock and sync receipts. */
function transactionSheet_(){
 const db=db_();let s=db.getSheetByName('Transaction_Log');
 if(s&&s.getMaxColumns&&s.getMaxColumns()<StockExport.fields.length)s.insertColumnsAfter(s.getMaxColumns(),StockExport.fields.length-s.getMaxColumns());
 if(!s){s=db.insertSheet('Transaction_Log');if(s.getMaxColumns&&s.getMaxColumns()<StockExport.fields.length)s.insertColumnsAfter(s.getMaxColumns(),StockExport.fields.length-s.getMaxColumns());s.getRange(1,1,1,StockExport.fields.length).setValues([StockExport.fields]);s.setFrozenRows(1);SpreadsheetApp.flush();}
 else {
  const h=StockExport.fields,row=s.getRange(1,1,1,h.length).getValues()[0];
  WMS.assert(JSON.stringify(row.slice(0,21))===JSON.stringify(h.slice(0,21)),'Header Transaction_Log tidak sesuai. Jangan menimpa riwayat.');
  for(let n=21;n<h.length;n++)WMS.assert(!row[n]||row[n]===h[n],'Kolom tambahan Transaction_Log sudah digunakan.');
  for(let n=21;n<h.length;n++)if(!row[n])s.getRange(1,n+1,1,1).setValues([[h[n]]]);
 }
 return s;
}
function transactionRequests_(rows){if(!rows.length)return [];const s=transactionSheet_();return updateCells_(s,rows.map(r=>StockExport.fields.map(k=>r[k]??'')),StockExport.fields.length,s.getLastRow());}
function readTransactions_(){const s=transactionSheet_();if(s.getLastRow()<2)return [];return s.getRange(2,1,s.getLastRow()-1,StockExport.fields.length).getValues().filter(r=>r[0]).map(row=>Object.fromEntries(StockExport.fields.map((k,n)=>[k,k==='qty'?Number(row[n]):row[n] instanceof Date?Utilities.formatDate(row[n],'Asia/Jakarta',k==='date'||k==='kp'?'yyyy-MM-dd':"yyyy-MM-dd'T'HH:mm:ssXXX"):String(row[n]??'')])));}
function getStockExport(sessionId){return locked_(()=>{const ss=auth_(sessionId);return {schema:StockExport.schema,mode:ss.mode,rows:StockExport.allRows(readTransactions_(),readDeliveries_(),read_('User_Session'),ss.mode),asOf:new Date().toISOString()};});}
