// Cloud mode uses a separate cache per spreadsheet and category. Demo data never syncs.
const offlineKey=mode=>'coldstock.outbox.v1.'+(window.COLDSTOCK_DB||'unconfigured')+'.'+mode;
const deviceLock=(mode,fn)=>navigator.locks?navigator.locks.request(offlineKey(mode),fn):Promise.resolve().then(fn);
function storedOffline(mode=S.mode){return Offline.read(localStorage,offlineKey(mode));}
function storeOffline(state,previous,mode=S.mode){return Offline.write(localStorage,offlineKey(mode),state,previous?.revision??null);}
function offlineCount(){if(!gas)return 0;try{return storedOffline()?.queue.length||0;}catch{return 0;}}
function connectionMarkup(){const offline=navigator.onLine===false||S.connection==='offline';return `<span class="pill ${offline?'amber':'green'} connection-pill" role="status"><i class="dot"></i>STATUS: ${offline?'OFFLINE (TERSIMPAN DI HP)':'ONLINE'}</span>`;}
function syncControls(){if(!gas)return '';const count=offlineCount();return `<span class="sync-pending">${count?count+' transaksi di HP':'Antrean kosong'}</span>${btn(S.syncing?'Menyinkron…':'SYNC','sync','small','refresh')}${count?btn('Cadangan','backup','small','download'):''}`;}
function refreshConnection(){if($('#topbar'))shell();}
function storageError(e){const target=$('#editor-error')||$('#action-error');if(target)target.innerHTML=`<div class="error">${esc(errorText(e))}</div>`;else toast(errorText(e));}
function call(name,...args){return new Promise((resolve,reject)=>{
  let settled=false;const timer=setTimeout(()=>{if(settled)return;settled=true;S.connection='offline';refreshConnection();reject(new Error('Koneksi belum merespons. Data tetap di HP; coba SYNC lagi saat sinyal kembali.'));},20000);
  const done=(fn,result)=>{if(settled)return;settled=true;clearTimeout(timer);S.connection='online';refreshConnection();fn(result);};
  try{google.script.run.withSuccessHandler(r=>done(resolve,r)).withFailureHandler(e=>{if(/network|connection|offline|fetch/i.test(errorText(e))){clearTimeout(timer);settled=true;S.connection='offline';refreshConnection();reject(e);}else done(reject,e);})[name](...args);}catch(e){clearTimeout(timer);settled=true;S.connection='offline';refreshConnection();reject(e);}
});}
async function cloudStart(input){
  let cached=storedOffline(input.mode),result=null;
  if(navigator.onLine!==false){try{result=await call('startSession',input);}catch(e){if(!cached)throw e;if(S.connection!=='offline')throw e;}}
  if(!result){WMS.assert(cached,'Buka mode ini saat online terlebih dahulu agar data rak tersimpan di HP.');return {session:{...WMS.session(input),id:uid(),offline:true},data:cached.data};}
  return deviceLock(input.mode,()=>{cached=storedOffline(input.mode);if(cached?.queue.length)return {...result,data:cached.data};const next={...Offline.initial(result.data),revision:(cached?.revision??-1)+1};storeOffline(next,cached,input.mode);return result;});
}
async function cloudData(){const cached=storedOffline();if(cached?.queue.length||navigator.onLine===false){WMS.assert(cached,'Belum ada data tersimpan untuk mode ini.');return cached.data;}try{const result=await cloudStart(WMS.session(S.session));S.session=result.session;return result.data;}catch(e){if(cached&&S.connection==='offline')return cached.data;throw e;}}
async function mutate(request){
  if(S.busy)return false;S.busy=true;$$('dialog button').forEach(b=>b.disabled=true);
  try{
    request.version=S.data.version;
    if(gas){await deviceLock(S.mode,()=>{const stored=storedOffline();WMS.assert(stored,'Data offline belum dimuat. Mulai sesi ketika online.');const next=Offline.enqueue(stored,request,S.session,uid,new Date().toISOString());storeOffline(next,stored);S.data=next.data;});}
    else {const before=localData(),at=new Date().toISOString(),next=Delivery.mutate(before,request,S.session,uid,at);next.transactions=(before.transactions||[]).concat(StockExport.capture(before,next,request,S.session,uid(),at));next.exportSessions=[...(before.exportSessions||[]).filter(s=>s.id!==S.session.id),S.session];localStorage.setItem(storageKey(),JSON.stringify(next));S.data=next;}
    Navigation.saved();refreshConnection();return true;
  }catch(e){storageError(e);return false;}finally{S.busy=false;$$('dialog button').forEach(b=>b.disabled=false);}
}
async function syncOfflineData(){
  if(!gas){toast('Pratinjau lokal: belum terhubung ke Google Sheets.');return true;}
  if(!S.session)return false;if(S.syncing||S.busy)return false;
  if(navigator.onLine===false){S.connection='offline';refreshConnection();toast('Tidak ada koneksi. Semua transaksi yang sudah disimpan tetap di HP.');return false;}
  if(S.excel)S.excel.result=null;S.syncing=true;S.busy=true;refreshConnection();let success=false;
  try{
    await deviceLock(S.mode,async()=>{
      let cached=storedOffline();WMS.assert(cached,'Cache belum tersedia. Mulai sesi saat online.');
      // Renew authentication without replacing the pending local snapshot.
      const fresh=await call('startSession',WMS.session(S.session));S.session=fresh.session;S.sessions[S.mode]=fresh.session;
      if(!cached.queue.length){const next={...Offline.initial(fresh.data),revision:cached.revision+1};storeOffline(next,cached);S.data=next.data;success=true;return;}
      while(cached.queue.length){
        const frozen=Offline.freeze(cached,uid);if(frozen!==cached){storeOffline(frozen,cached);cached=frozen;}
        const response=await call('syncOfflineBatch',S.session.id,cached.inflight);
        if(response.conflict){S.syncError=response.message;throw new Error(response.message);}
        // Never clear until the exact batch and every submitted transaction are acknowledged.
        const current=storedOffline(),next=Offline.acknowledge(current,response);
        storeOffline(next,current);cached=next;S.data=next.data;
      }
      S.syncError='';success=true;
    });
    toast('SYNC berhasil. Antrean terkirim ke Google Sheets.');
  }catch(e){S.syncError=errorText(e);toast(S.syncError+' Antrean tidak dihapus.');}
  finally{S.syncing=false;S.busy=false;rememberSession();render();}
  return success;
}
function backupOfflineData(){try{const state=storedOffline();WMS.assert(state,'Tidak ada data offline.');const content={exportedAt:new Date().toISOString(),spreadsheetId:window.COLDSTOCK_DB,mode:S.mode,...state};const link=document.createElement('a'),url=URL.createObjectURL(new Blob([JSON.stringify(content,null,2)],{type:'application/json'}));link.href=url;link.download=`coldstock-cadangan-${S.mode}-${today()}.json`;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('Cadangan antrean disiapkan untuk diunduh.');}catch(e){toast(errorText(e));}}
async function refresh(){if(!S.session||S.busy)return;S.busy=true;try{S.data=gas?await cloudData():localData();S.selected.clear();render();toast(gas&&offlineCount()?'Menampilkan stok HP; antrean tetap aman. Tekan SYNC untuk mengirim.':'Data berhasil dimuat.');}catch(e){toast(errorText(e));}finally{S.busy=false;}}
async function checkConnection(){if(!gas||navigator.onLine===false)return;try{await call('connectionStatus');}catch{/* Connection badge is updated by call. Never erase local state. */}}
window.addEventListener('offline',()=>{S.connection='offline';refreshConnection();toast('Offline. Simpan stok tetap bisa dilakukan di HP.');});
window.addEventListener('online',()=>{S.connection='online';refreshConnection();toast('Sinyal kembali. Tekan SYNC atau SHARE TO WHATSAPP untuk mengirim antrean.');checkConnection();});
window.addEventListener('storage',e=>{if(gas&&e.key===offlineKey(S.mode)){refreshConnection();toast('Data HP berubah di tab lain. Muat ulang sebelum mengedit.');}});
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')checkConnection();});
