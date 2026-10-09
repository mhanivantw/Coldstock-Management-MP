/* Durable outbox: snapshot + transaction queue are persisted in ONE localStorage write. */
const Offline = (() => {
  const clone=x=>JSON.parse(JSON.stringify(x));
  const validId=x=>typeof x==='string'&&/^[A-Za-z0-9-]{20,100}$/.test(x);
  function fingerprint(data,id){
    if(id.startsWith('@delivery:'))return Delivery.fingerprint(data,id.slice(10));
    const loc=data.locations.find(l=>l.id===id);
    const items=data.stock.filter(i=>i.locationId===id).map(i=>['id','locationId','sku','kp','exp','qty','unit','palletNo','spv','status','note','updatedAt','sessionId'].map(k=>i[k]??'').concat(i.palletId?[i.palletId,i.palletLabel]:[]));
    items.sort((a,b)=>String(a[0]).localeCompare(String(b[0])));
    return JSON.stringify([loc?['id','room','group','block','bay','slot','display','order','kind','functionType'].map(k=>loc[k]):null,items]);
  }
  function touched(data,request){
    if(request.action==='mergePallet'){
      const ids=new Set(request.ids||[]),out=new Set(data.stock.filter(i=>ids.has(i.id)).map(i=>i.locationId));out.add(request.destination);
      for(const d of data.deliveryNotes||[])if(d.state==='DRAFT'&&d.lines.some(l=>ids.has(l.itemId)))out.add('@delivery:'+d.id);
      return [...out].sort();
    }
    if(request.action==='moveBatch'){
      const ids=new Set((request.rows||[]).map(r=>r.itemId)),out=new Set();
      for(const r of request.rows||[]){out.add(r.from);out.add(r.destination);}
      for(const i of data.stock)if(ids.has(i.id))out.add(i.locationId);
      for(const d of data.deliveryNotes||[])if(d.state==='DRAFT'&&d.lines.some(l=>ids.has(l.itemId)))out.add('@delivery:'+d.id);
      return [...out].sort();
    }
    if(request.action==='bulkReceive')return [...new Set((request.rows||[]).map(r=>r.locationId))].sort();
    if(['saveDelivery','issueDelivery','cancelDelivery'].includes(request.action))return ['@delivery:'+request.documentId,...Delivery.locations(data,request)];
    if(request.action==='correctItem')return data.stock.filter(i=>i.id===request.itemId).map(i=>i.locationId);
    if(request.action==='saveSlot')return [request.locationId];
    const ids=new Set(request.ids||[]),out=new Set(data.stock.filter(i=>ids.has(i.id)).map(i=>i.locationId));
    if(request.action==='move')out.add(request.destination);return [...out].sort();
  }
  function apply(data,op,session){
    const request=clone(op.request);request.version=data.version;
    const minted=[];
    if(request.action==='saveSlot'){
      const oldIds=new Set(data.stock.map(i=>i.id));
      request.items.forEach(i=>{WMS.assert(validId(i.id),'ID item offline tidak valid.');if(!oldIds.has(i.id)){minted.push(i.id);delete i.id;}});
    }
    return Delivery.mutate(data,request,session,()=>{const id=minted.shift();WMS.assert(id,'ID baru tidak tersedia.');return id;},op.createdAt);
  }
  function initial(data){return {schema:1,revision:0,data:clone(data),queue:[],inflight:null,cachedAt:new Date().toISOString()};}
  function enqueue(state,request,session,uuid,now){
    WMS.assert(state.queue.length<500,'Antrean mencapai 500 transaksi. SYNC terlebih dahulu.');
    WMS.assert(request.version===state.data.version,'CONFLICT: Data di tab lain berubah. Muat ulang data.');
    const req=clone(request);if(req.action==='mergePallet'&&!req.palletId)req.palletId=uuid();if(req.action==='saveSlot')req.items.forEach(i=>{if(!i.id)i.id=uuid();});
    if(req.action==='bulkReceive')req.rows.forEach(r=>{if(!r.id)r.id=uuid();});
    const op={id:uuid(),createdAt:now,actor:clone(session),request:req,expected:{}};
    touched(state.data,req).forEach(id=>{op.expected[id]=fingerprint(state.data,id);});
    const data=apply(state.data,op,session);
    return {...clone(state),revision:state.revision+1,data,queue:state.queue.concat([op])};
  }
  function freeze(state,uuid){if(state.inflight)return state;WMS.assert(state.queue.length,'Antrean kosong.');return {...clone(state),revision:state.revision+1,inflight:{id:uuid(),operations:clone(state.queue)}};}
  function acknowledge(state,response){
    WMS.assert(state.inflight&&response.batchId===state.inflight.id,'Konfirmasi sinkronisasi tidak cocok. Antrean dipertahankan.');
    const sent=state.inflight.operations.map(op=>op.id);
    WMS.assert(JSON.stringify(sent)===JSON.stringify(response.ackIds),'Konfirmasi transaksi tidak lengkap. Antrean dipertahankan.');
    const ack=new Set(sent),queue=state.queue.filter(op=>!ack.has(op.id));let data=clone(response.data);
    // A timeout can be followed by more edits. Reapply the unsent suffix, never discard it.
    for(const op of queue){for(const id of touched(data,op.request))WMS.assert(op.expected[id]===fingerprint(data,id),'CONFLICT: Transaksi baru perlu ditinjau. Antrean dipertahankan.');data=apply(data,op,op.actor);}
    return {...state,revision:state.revision+1,data,queue,inflight:null,cachedAt:new Date().toISOString()};
  }
  function read(storage,key){let raw;try{raw=storage.getItem(key);}catch{throw new Error('Penyimpanan HP tidak tersedia. Izinkan penyimpanan situs pada browser.');}if(!raw)return null;let state;try{state=JSON.parse(raw);}catch{throw new Error('Data offline tidak terbaca. Jangan hapus penyimpanan browser; pulihkan cadangan.');}WMS.assert(state.schema===1&&Array.isArray(state.queue)&&state.data&&Array.isArray(state.data.stock),'Format data offline tidak dikenal.');return state;}
  function write(storage,key,state,expectedRevision){
    const current=read(storage,key);WMS.assert((current?.revision??null)===expectedRevision,'CONFLICT: Penyimpanan berubah di tab lain. Muat ulang data.');
    try{storage.setItem(key,JSON.stringify(state));}catch{throw new Error('Penyimpanan HP penuh atau diblokir. Perubahan ini BELUM tersimpan. Form tetap terbuka; kosongkan ruang perangkat atau izinkan penyimpanan browser.');}
    return state;
  }
  return {clone,validId,fingerprint,touched,apply,initial,enqueue,freeze,acknowledge,read,write};
})();
