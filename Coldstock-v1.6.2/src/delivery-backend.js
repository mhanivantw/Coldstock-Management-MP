/* Two normalized sheets keep history after stock reaches zero; created without resetting existing data. */
function deliverySheets_(){
  const specs=[['Delivery_Notes',Delivery.fields],['Delivery_Lines',['documentId','lineNo',...Delivery.lineFields]]];
  return specs.map(([name,headers])=>{let s=db_().getSheetByName(name);if(!s){s=db_().insertSheet(name);s.getRange(1,1,1,headers.length).setValues([headers]);s.setFrozenRows(1);SpreadsheetApp.flush();}else {const actual=s.getRange(1,1,1,headers.length).getValues()[0];if(name==='Delivery_Notes'){const legacy=16;WMS.assert(JSON.stringify(actual.slice(0,legacy))===JSON.stringify(headers.slice(0,legacy)),'Header '+name+' tidak sesuai. Jangan hapus kolom lama.');for(let n=legacy;n<headers.length;n++){WMS.assert(!actual[n]||actual[n]===headers[n],'Kolom tambahan '+name+' sudah digunakan. Pindahkan kolom custom sebelum upgrade.');}for(let n=legacy;n<headers.length;n++)if(!actual[n])s.getRange(1,n+1,1,1).setValues([[headers[n]]]); }else {
 WMS.assert(JSON.stringify(actual.slice(0,15))===JSON.stringify(headers.slice(0,15)),'Header '+name+' tidak sesuai. Jangan hapus atau ubah kolomnya.');
 for(let n=15;n<headers.length;n++)WMS.assert(!actual[n]||actual[n]===headers[n],'Kolom tambahan Delivery_Lines sudah dipakai.');
 for(let n=15;n<headers.length;n++)if(!actual[n])s.getRange(1,n+1,1,1).setValues([[headers[n]]]);
 }}return s;});
}
function readDeliveries_(){
  const [notes,lines]=deliverySheets_(),rows=(s,width)=>s.getLastRow()<2?[]:s.getRange(2,1,s.getLastRow()-1,width).getValues().filter(r=>r[0]!=='');
  const docs=rows(notes,Delivery.fields.length).map(row=>({...Object.fromEntries(Delivery.fields.map((k,n)=>[k,k==='revision'?Number(row[n]):String(row[n]??'')])),lines:[]}));
  const index=new Map(docs.map(d=>[d.id,d]));
  for(const row of rows(lines,Delivery.lineFields.length+2).sort((a,b)=>Number(a[1])-Number(b[1]))){const d=index.get(String(row[0]));WMS.assert(d,'Baris delivery note tidak memiliki dokumen induk.');d.lines.push(Object.fromEntries(Delivery.lineFields.map((k,n)=>[k,k==='qty'?Number(row[n+2]):String(row[n+2]??'')])));}
  return docs;
}
function deliveryRequests_(data){const [notes,lines]=deliverySheets_();return [...updateCells_(notes,(data.deliveryNotes||[]).map(d=>Delivery.fields.map(k=>d[k]??'')),Delivery.fields.length,1),...updateCells_(lines,(data.deliveryNotes||[]).flatMap(d=>d.lines.map((l,n)=>[d.id,n,...Delivery.lineFields.map(k=>l[k]??'')])),Delivery.lineFields.length+2,1)];}
