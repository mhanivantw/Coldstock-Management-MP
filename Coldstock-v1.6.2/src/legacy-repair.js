/* Editor-only, narrowly scoped repair approved for the three explicitly confirmed pairs.
   No global ID rewrite, no inferred outbound, no deletion of receipt evidence. */
function pallet104Plan_(caseNo=0){
 const cases=[{id:'e8113d62-4f51-46f3-bb65-c70b1a9a5afe',rows:[['KM-038',16,'104','Hold'],['KM-037',14,'104','Hold']]},{id:'bb6eeeed-2761-40c1-adbe-01f478f0f15d',rows:[['KM-038',10,'79','Release'],['KM-054',20,'76','Release']]},{id:'0a9fd36c-28a9-44d8-9908-2c22e76ca3a9',rows:[['KM-038',15,'3','Release'],['KM-054',15,'97','Release']]}],spec=cases[caseNo];
 WMS.assert(spec,'Kasus rekonsiliasi tidak dikenal.');
 const sourceId=spec.id,data=snapshot_(),records=readTransactions_(),old=data.stock.find(i=>i.id===sourceId);
 const ids=spec.rows.map(r=>sourceId+'-'+r[0]);
 if(!old){WMS.assert(ids.every(id=>data.stock.some(i=>i.id===id)),'Item lama tidak ditemukan. Periksa stok aktif sebelum rekonsiliasi.');return {already:true};}
 WMS.assert(!ids.some(id=>data.stock.some(i=>i.id===id)),'ID hasil sudah ada sebagian. Periksa rekonsiliasi dahulu.');
 WMS.assert(!old.palletId,'Item sudah tergabung; rekonsiliasi manual diperlukan.');
 WMS.assert(!(data.deliveryNotes||[]).some(d=>d.state!=='CANCELLED'&&d.lines.some(l=>l.itemId===sourceId)),'Ada picking/SJ terkait. Rekonsiliasi pengiriman dahulu, jangan ubah snapshot SJ.');
 const receipts=records.filter(r=>r.type==='IN'&&r.itemId===sourceId);
 WMS.assert(receipts.length===2&&receipts.every(r=>r.kp==='2026-09-28'),'Riwayat tidak sama dengan data trial yang disetujui.');
 const matched=spec.rows.map(x=>receipts.find(r=>StockExport.product(r.sku)?.[0]===x[0]&&r.qty===x[1]&&WMS.pallet(r.palletNo)===x[2]&&r.status===x[3]));
 WMS.assert(matched.every(Boolean)&&old.qty===30,'Jumlah/identitas tidak lagi sama dengan pasangan trial total30. Periksa kondisi terkini.');
 WMS.assert(!records.some(r=>r.itemId===sourceId&&r.type!=='IN'),'Sudah ada OUT/koreksi; perlu rekonsiliasi khusus.');
 const now=new Date().toISOString(),items=matched.map(r=>({...old,id:StockExport.reportId(sourceId,r),sku:r.sku,kp:r.kp,exp:WMS.expiry(r.kp,0),qty:r.qty,palletNo:r.palletNo,status:r.status,note:r.note,updatedAt:now}));
 return {data,old,items,now,sourceId};
}
function previewRepairPallet104_(){const p=pallet104Plan_();console.log(JSON.stringify(p.already?{already:true}:{before:p.old,after:p.items}));}
function repairLegacyPair_(caseNo){return locked_(()=>{
 const p=pallet104Plan_(caseNo);if(p.already){console.log('Pasangan sudah dipisah.');return;}
 WMS.assert(typeof Sheets!=='undefined','Aktifkan Google Sheets API.');
 const stock=p.data.stock.filter(i=>i.id!==p.sourceId).concat(p.items),record={id:'REPAIR-'+p.sourceId,type:'REPAIR',mode:'CSFG',date:p.now.slice(0,10),at:p.now,itemId:p.sourceId,qty:0,unit:'CTN',beforeJson:JSON.stringify(p.old),afterJson:JSON.stringify(p.items),reason:'Dua produk berbeda, total30 CTN. Konfirmasi pemilik project.',name:'Apps Script editor'};
 const requests=[...updateCells_(sheet_('Stock_Detail'),stock.map(i=>KEYS_.Stock_Detail.map(k=>i[k]??'')),KEYS_.Stock_Detail.length,1),...transactionRequests_([record])];
 PropertiesService.getScriptProperties().setProperty('WMS_REV',String(p.data.version+1));SpreadsheetApp.flush();Sheets.Spreadsheets.batchUpdate({requests},db_().getId());console.log('Selesai: pasangan barang terpisah. Total tetap30. Muat ulang app pada semua HP.');
});}
function repairPallet104_(){return repairLegacyPair_(0);}
function previewRepairPallet79And76_(){const p=pallet104Plan_(1);console.log(JSON.stringify(p.already?{already:true}:{before:p.old,after:p.items}));}
function repairPallet79And76_(){return repairLegacyPair_(1);}
function previewRepairPallet3And97_(){const p=pallet104Plan_(2);console.log(JSON.stringify(p.already?{already:true}:{before:p.old,after:p.items}));}
function repairPallet3And97_(){return repairLegacyPair_(2);}
