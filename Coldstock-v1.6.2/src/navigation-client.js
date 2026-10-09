const shiftKey=()=> 'coldstock.shift.v1.'+(gas?(window.COLDSTOCK_DB||'unconfigured'):storageKey());
function restoreShift(){S.shiftMemory=SessionMemory.read(localStorage,shiftKey());if(S.shiftMemory){S.sessions=S.shiftMemory.sessions||{};S.lastRooms=S.shiftMemory.rooms||{};}else {S.sessions={};S.lastRooms={};}}
function rememberSession(fresh=false){if(!S.session)return;if(!fresh&&S.shiftMemory&&S.shiftMemory.until<=Date.now())return;try{let record=fresh?null:SessionMemory.read(localStorage,shiftKey());if(!record||JSON.stringify(record.identity)!==JSON.stringify({name:S.session.name,date:S.session.date,shift:S.session.shift}))record=SessionMemory.create(S.session);record.mode=S.mode;record.sessions[S.mode]=S.session;record.rooms={...(record.rooms||{}),...(S.lastRooms||{})};S.shiftMemory=SessionMemory.write(localStorage,shiftKey(),record);}catch{if(!S.sessionStorageWarned){S.sessionStorageWarned=true;toast('Sesi belum bisa diingat di HP. Periksa izin penyimpanan browser.');}}}
async function chooseMode(mode,route){
  if(S.busy)return false;if(!Navigation.allowLeave())return false;
  if(S.session)rememberSession();const record=SessionMemory.read(localStorage,shiftKey());S.mode=mode;S.search='';S.filter='all';S.productFilters={};S.selecting=false;S.rackSelection=false;S.selected.clear();
  if(!record){S.session=null;S.sessions={};nav('setup');return false;}
  S.busy=true;try{S.sessions=record.sessions||{};S.lastRooms=record.rooms||{};S.session=S.sessions[mode]||null;let data;
    if(S.session)data=gas?await cloudData():localData();
    else {const input={...record.identity,mode};const result=gas?await cloudStart(input):{session:{...WMS.session(input),id:uid()},data:localData()};S.session=result.session;data=result.data;}
    S.data=data;S.room=S.lastRooms[mode]||rooms()[0];S.sessions[mode]=S.session;rememberSession();S.busy=false;
    if(route)Navigation.apply(route);else nav('dashboard');return true;
  }catch(e){S.session=null;toast(errorText(e));S.busy=false;nav('entry');return false;}finally{S.busy=false;}
}
function bayHome(){if(!S.session)return nav('entry');S.room=S.lastRooms?.[S.mode]||S.room||rooms()[0];if(!rooms().includes(S.room))S.room=rooms()[0];nav('storage');}
function workNavigation(){return `<div class="work-navigation">${btn('Kembali','app-back','','back')}${btn('Stok / Bay','bay-home','','warehouse')}${btn('Home','home','','home')}</div>`;}

const Navigation=(()=>{
  let initialized=false,modal=false,applying=false;
  const route=()=>({coldstock:1,page:S.page,mode:S.mode,room:S.room,documentId:S.dnViewing||null,kind:S.documentKind||'picking',scroll:window.scrollY||0});
  function write(method,state){if(!initialized||applying)return;try{if(gas&&google.script.history)google.script.history[method](state,null,'coldstock-'+state.page);else history[method==='push'?'pushState':'replaceState'](state,'','#coldstock-'+state.page);}catch{/* Visible back controls continue to work if browser history is unavailable. */}}
  function allowLeave(){if(!S.formDirty)return true;if(typeof window.confirm==='function'&&!window.confirm('Ada isian belum disimpan. Tinggalkan form ini?'))return false;S.formDirty=false;return true;}
  function saved(){S.formDirty=false;}
  function go(page){if(S.busy)return false;if(page!==S.page&&!allowLeave())return false;
    if(S.page==='storage'){if(!S.lastRooms)S.lastRooms={};S.lastRooms[S.mode]=S.room;rememberSession();}
    const previous=S.page;S.page=page;S.selected.clear();S.selecting=false;S.bulkSelecting=false;S.rackSelection=false;S.rackSelected=new Set();modal=false;
    if(page==='storage'){if(!S.lastRooms)S.lastRooms={};S.lastRooms[S.mode]=S.room;rememberSession();}
    render();window.scrollTo({top:0,behavior:'instant'});write(previous==='setup'&&page==='dashboard'?'replace':'push',route());return true;
  }
  // Dialogs are UI state, not extra page entries. Back closes one and restores
  // the current page so the next Back still reaches its original parent.
  function modalOpened(){modal=true;}
  function modalClosed(){modal=false;}
  function apply(r){
    if(!r||r.coldstock!==1)return go('entry');
    const pages=['entry','setup','dashboard','exports','storage','picklists','delivery','picking','deliveryDetail','bulkInput','movement'];let page=pages.includes(r.page)?r.page:'entry';
    if(!S.session&&!['entry','setup'].includes(page))page='entry';
    if(page==='picking'&&!S.dnDraft)page='picklists';if(page==='bulkInput'&&!S.bulkDraft)page='storage';
    if(page==='movement'&&!S.moveDraft)page='storage';
    if(page==='setup'&&S.session)page='dashboard';
    applying=true;S.page=page;if(r.room&&S.session&&rooms().includes(r.room))S.room=r.room;S.dnViewing=r.documentId;S.documentKind=r.kind||'picking';S.rackSelection=false;S.selected.clear();S.selecting=false;S.bulkSelecting=false;modal=false;render();window.scrollTo({top:r.scroll||0,behavior:'instant'});applying=false;
  }
  async function changed(r){
    if(S.busy){write('push',{...route(),modal});return;}
    if($('#modal')?.open){if(S.editor&&!allowLeave()){write('push',route());return;}$('#modal').close();S.editor=null;modal=false;write('push',route());return;}
    if(S.page==='movement'&&S.moveDraft?.picking!==null){S.moveDraft.picking=null;showMovePage();write('push',route());return;}
    if(S.rackSelection){cancelRackSelection();write('push',route());return;}
    if(!allowLeave()){write('push',route());return;}
    if(r?.mode&&S.mode!==r.mode&&S.session){await chooseMode(r.mode,r);return;}
    apply(r||{coldstock:1,page:'entry'});
  }
  function back(){if(S.page==='movement'){if(S.moveDraft?.picking!==null){S.moveDraft.picking=null;showMovePage();return;}return leaveMove();}if($('#modal')?.open)return closeModal();if(S.rackSelection)return cancelRackSelection();const parent={exports:'dashboard',storage:'dashboard',picking:'picklists',deliveryDetail:S.documentKind==='delivery'?'delivery':'picklists',delivery:'picklists',picklists:'dashboard',bulkInput:'storage',dashboard:'entry',setup:'entry',entry:'entry'};go(parent[S.page]||'entry');}
  function init(){initialized=true;if(gas&&google.script.history)google.script.history.setChangeHandler(e=>changed(e.state));else window.addEventListener('popstate',e=>changed(e.state));write('replace',route());}
  return {init,go,back,allowLeave,saved,modalOpened,modalClosed,apply,changed};
})();
document.addEventListener('input',e=>{if(S.editor||S.page==='bulkInput'&&e.target.closest('.workflow-panel')||S.page==='picking'&&(['dn-date','dn-truck','dn-shift','dn-destination','dn-note'].includes(e.target.id)||e.target.dataset.dnQty))S.formDirty=true;});
document.addEventListener('change',e=>{if(S.editor||S.page==='bulkInput'&&e.target.closest('.workflow-panel')||e.target.dataset.dnItem)S.formDirty=true;});
document.addEventListener('click',e=>{const b=e.target.closest('[data-action]');if(!b||S.busy)return;if(['mode','entry','home','storage','room','bay-home','pl-home','dn-home','dn-view','pl-view','new-shift'].includes(b.dataset.action)&&!Navigation.allowLeave()){e.preventDefault();e.stopImmediatePropagation();}},true);
document.addEventListener('click',e=>{const b=e.target.closest('[data-action]');if(!b||S.busy)return;if(b.dataset.action==='app-back')Navigation.back();if(b.dataset.action==='bay-home')bayHome();if(b.dataset.action==='new-shift'){if(!Navigation.allowLeave())return;try{localStorage.removeItem(shiftKey());}catch{toast('Tidak dapat mengganti sesi. Periksa penyimpanan HP.');return;}S.sessions={};S.session=null;S.shiftMemory=null;S.dnDraft=null;S.bulkDraft=null;S.mode=S.mode||'CSFG';nav('setup');}});
window.addEventListener('beforeunload',e=>{if(S.formDirty){e.preventDefault();e.returnValue='';}});
