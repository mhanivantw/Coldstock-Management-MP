/* Corrections use the same durable outbox and atomic backend commit as stock. */
function openCorrection(itemId){
 const candidates=stockAt(S.editor.loc.id),old=candidates.find(i=>i.id===itemId)||candidates[0];
 if(!old)return toast('Tidak ada barang untuk dikoreksi.');
 S.correction={old:JSON.parse(JSON.stringify(old)),request:null};
 const field=(key,label,type='text')=>`<label>${label}<input class="field" data-correction="${key}" type="${type}" ${key==='qty'?'min="1" max="1000000" step="1" inputmode="numeric"':key==='palletNo'?'inputmode="numeric" maxlength="20"':''} value="${esc(old[key]||'')}"></label>`;
 openModal('Koreksi data barang','Perbaiki salah input. Barang baru ditambahkan sebagai item baru.',`<div id="action-error"></div><label>Pilih item<select class="field" id="correction-item">${candidates.map(i=>`<option value="${esc(i.id)}" ${i.id===old.id?'selected':''}>${esc(i.sku)} · KP ${esc(WMS.short(i.kp))} · PP ${esc(Pallets.label(i))} · ${i.qty} CTN</option>`).join('')}</select></label><div class="two-col"><label>SKU<select class="field" data-correction="sku">${opts(S.data.skus.filter(s=>s.group===S.mode).map(s=>s.code),old.sku)}</select></label>${field('kp','Kode produksi','date')}${field('qty','QTY yang benar','number')}${field('palletNo','No. pallet')}${S.mode==='CSFG'?`<label>SPV<select class="field" data-correction="spv">${opts(['JT','HW','AK','-'],old.spv)}</select></label>`:''}</div>${field('note','Catatan barang')}<label>Alasan koreksi (wajib)<input class="field" id="correction-reason" maxlength="500" placeholder="Contoh: salah input 30, fisik masuk 25"></label><p class="notice">QTY adalah stok fisik yang tersisa sekarang. Status QC tetap melalui editor biasa. Identitas yang sudah dipakai SJ memerlukan rekonsiliasi admin.</p><div id="correction-review"></div>`,btn('Tinjau perubahan','correction-review','primary')+btn('Kembali','correction-back'));
}
// Existing quantities are edited intentionally through corrections; new items remain ordinary IN.
const originalRenderEditor162=renderEditor;
renderEditor=function(){originalRenderEditor162();$$('.item-editor').forEach((el,n)=>{if(!S.editor.items[n]?.id)return;for(const key of ['sku','kp','qty','palletNo','spv']){const field=el.querySelector(`[data-field="${key}"]`);if(field)field.disabled=true;}});const notice=document.createElement('p');notice.className='notice';notice.textContent='Salah input SKU, KP, QTY, pallet, atau SPV? Gunakan Koreksi data. Untuk produk baru, pilih Tambah item.';$('#editor-items').before(notice);};
function reviewCorrection(){
 try{const c=S.correction,item={...c.old};$$('[data-correction]').forEach(el=>item[el.dataset.correction]=el.value);item.qty=Number(item.qty);
  const request={action:'correctItem',itemId:c.old.id,before:c.old,item,reason:$('#correction-reason').value.trim(),version:S.data.version};
  Delivery.mutate(S.data,request,S.session,uid,new Date().toISOString());c.request=request;
  const names={sku:'SKU',kp:'KP',qty:'QTY',palletNo:'No. pallet',spv:'SPV',note:'Catatan'};
  $('#correction-review').innerHTML='<h3>Perubahan yang akan disimpan</h3>'+Object.keys(names).filter(k=>String(c.old[k]??'')!==String(item[k]??'')).map(k=>`<p>${names[k]}: <b>${esc(c.old[k]||'—')}</b> → <b>${esc(item[k]||'—')}</b></p>`).join('')+`<p>Alasan: ${esc(request.reason)}</p>`+btn('Konfirmasi koreksi','correction-save','primary');
 }catch(e){storageError(e);}
}
document.addEventListener('change',e=>{if(e.target.id==='correction-item')openCorrection(e.target.value);});
document.addEventListener('input',e=>{if(e.target.matches('[data-correction],#correction-reason')&&S.correction){S.correction.request=null;$('#correction-review').innerHTML='';}});
document.addEventListener('click',async e=>{const b=e.target.closest('[data-action]');if(!b||S.busy)return;
 if(b.dataset.action==='correction-open')openCorrection();
 if(b.dataset.action==='correction-back')openEditor(S.editor.loc.id);
 if(b.dataset.action==='correction-review')reviewCorrection();
 if(b.dataset.action==='correction-save'&&S.correction?.request){if(await mutate(S.correction.request)){S.correction=null;closeModal();render();toast('Koreksi tersimpan. Ekspor KOREKSI untuk memperbarui kartu stok.');}}
});
