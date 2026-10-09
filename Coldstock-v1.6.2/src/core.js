/* Shared business rules, used unchanged in the browser and Apps Script V8. */
const WMS = (() => {
  const STATUS = ['Release','Hold','GR','Sample','Restan','Rusak'];
  const FUNCTIONS = ['Reguler','Bingkisan / Non-Komersial'];
  const SKU = [...['BG','BH','BK','BO','BOLO','BKLO','SG','SH','SK','STY'].map(code=>({code,group:'CHILLER',defaultQty:48,shelfDays:180})),...['CCN','CCN 250','PCN','SPC','CCS','CCS 250','CW'].map(code=>({code,group:'CSFG',defaultQty:30,shelfDays:0}))];
  function assert(ok,msg){if(!ok)throw new Error(msg);}
  function date(v){assert(typeof v==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(v),'Tanggal harus diisi.');const d=new Date(v+'T00:00:00Z');assert(!isNaN(d)&&d.toISOString().slice(0,10)===v,'Tanggal tidak valid.');return d;}
  function expiry(kp,days){const d=date(kp);d.setUTCDate(d.getUTCDate()+Number(days));return d.toISOString().slice(0,10);}
  function short(v){date(v);return v.slice(8,10)+'.'+v.slice(5,7);}
  function session(input){assert(['CSFG','CHILLER'].includes(input.mode),'Mode tidak valid.');assert(['S1','S2','S3'].includes(input.shift),'Pilih shift.');date(input.date);const name=String(input.name||'').trim();assert(name.length>=2&&name.length<=80,'Nama SK harus 2–80 karakter.');return {name,date:input.date,shift:input.shift,mode:input.mode};}
  function item(raw,loc,skus,id,now,sessionId){
    const sku=skus.find(s=>s.code===raw.sku&&s.group===loc.group);
    assert(sku,'SKU tidak sesuai mode penyimpanan.');date(raw.kp);
    const qty=Number(raw.qty);assert(Number.isFinite(qty)&&qty>0&&Number.isInteger(qty)&&qty<=1000000,'Qty harus bilangan bulat 1–1.000.000.');
    const unit=raw.unit||'CTN';
    assert(['CTN','PACK'].includes(unit),'Satuan tidak valid.');assert(STATUS.includes(raw.status),'Status tidak valid.');
    const rawPallet=String(raw.palletNo??'').trim();assert(!rawPallet||/^[0-9]{1,20}$/.test(rawPallet),'No. Pallet hanya boleh berisi angka (maksimal 20 digit).');const palletNo=pallet(rawPallet);
    assert(loc.group!=='CSFG'||['JT','HW','AK','-'].includes(raw.spv),'Pilih kode SPV: JT, HW, AK, atau -.');
    const note=String(raw.note||'').trim();assert(note.length<=500&&!/[\r\n]/.test(note),'Keterangan maksimal 500 karakter, satu baris.');
    return {id,locationId:loc.id,sku:sku.code,kp:raw.kp,exp:expiry(raw.kp,sku.shelfDays),qty,unit,palletNo,spv:loc.group==='CSFG'?raw.spv:'',status:raw.status,note,updatedAt:now,sessionId};
  }
  function mutate(original,request,ss,uuid,now){
    const data=JSON.parse(JSON.stringify(original));
    assert(request.version===data.version,'CONFLICT: Data berubah oleh pengguna lain. Muat ulang data sebelum menyimpan.');
    const allowed=data.locations.filter(l=>l.group===ss.mode),byId=new Map(allowed.map(l=>[l.id,l]));
    if(request.action==='saveSlot'){
      const loc=byId.get(request.locationId);assert(loc,'Lokasi tidak tersedia dalam mode ini.');assert(FUNCTIONS.includes(request.functionType),'Tipe fungsi tidak valid.');
      assert(Array.isArray(request.items)&&request.items.length<=200,'Maksimal 200 item per lokasi.');
      const oldIds=new Set(data.stock.filter(i=>i.locationId===loc.id).map(i=>i.id));const used=new Set();
      const rows=request.items.map(raw=>{assert(!raw.id||oldIds.has(raw.id),'Item bukan milik lokasi ini.');const id=raw.id||uuid();assert(!used.has(id),'Duplikat item.');used.add(id);const old=data.stock.find(i=>i.id===id);return item({...raw,palletNo:raw.palletNo===undefined?old?.palletNo:raw.palletNo},loc,data.skus,id,now,ss.id);});
      data.stock=data.stock.filter(i=>i.locationId!==loc.id).concat(rows);loc.functionType=request.functionType;
    } else {
      assert(['delete','move'].includes(request.action),'Aksi tidak dikenal.');assert(Array.isArray(request.ids)&&request.ids.length>0,'Pilih item terlebih dahulu.');
      const ids=new Set(request.ids),rows=data.stock.filter(i=>ids.has(i.id));assert(rows.length===ids.size&&rows.every(i=>byId.has(i.locationId)),'Item tidak ditemukan atau di luar mode ini.');
      if(request.action==='delete')data.stock=data.stock.filter(i=>!ids.has(i.id));
      else {const to=byId.get(request.destination);assert(to,'Lokasi tujuan tidak valid.');assert(rows.every(i=>i.locationId!==to.id),'Tujuan harus berbeda dari lokasi asal.');rows.forEach(i=>{i.locationId=to.id;i.updatedAt=now;i.sessionId=ss.id;});}
    }
    data.version++;return data;
  }
  function itemText(i,mode){return `${i.sku} ${short(i.kp)}${mode==='CSFG'?' =':' '}${mode==='CSFG'?' ':''}${i.qty}${i.unit==='PACK'?' PACK':''}${mode==='CSFG'?' '+i.spv:''}${i.status==='Release'?'':(' '+i.status.toUpperCase())}${i.palletNo?' (P:'+pallet(i.palletNo)+')':''}${i.note?' '+i.note:''}`;}
  function report(data,ss,roomFilter){
    session(ss);const day=['MINGGU','SENIN','SELASA','RABU','KAMIS','JUMAT','SABTU'][date(ss.date).getUTCDay()];
    const stamp=`*${day} ${short(ss.date)}.${ss.date.slice(2,4)} ${ss.shift}*`;
    const rooms=ss.mode==='CSFG'?['CSFG C1','CSFG C2']:['CHILLER C1','CHILLER C2','CHILLER C3'];
    rooms.push('PROD WIP');const texts=[];
    for(const room of rooms){
      if(roomFilter&&roomFilter!==room)continue;
      const locs=data.locations.filter(l=>l.group===ss.mode&&l.room===room).sort((a,b)=>a.order-b.order);
      const stockAt=id=>data.stock.filter(i=>i.locationId===id);
      if(room==='PROD WIP'&&!locs.some(l=>stockAt(l.id).length))continue;
      const lines=[`*${room.replace(' C',' ')}*`,stamp,''];let lastBlock='',lastBay='';
      for(const l of locs){
        const rows=stockAt(l.id);
        if(l.kind==='rack'){
          if(l.block!==lastBlock){if(lastBlock)lines.push('');if(lastBlock||ss.mode==='CSFG')lines.push('#');lastBlock=l.block;lastBay='';}
          const bay=l.block+l.bay;if(lastBay&&bay!==lastBay)lines.push('');lastBay=bay;
          if(l.functionType!==FUNCTIONS[0])lines.push(`${l.display}= [RACK BINGKISAN & SAMPLE NON-COMMERCIAL]`);
          else if(!rows.length)lines.push(l.display+'=');
          else rows.forEach((i,n)=>lines.push((n?'          ':l.display+'= ')+itemText(i,ss.mode)));
        } else {if(l.kind==='floor')lines.push('','*LANTAI*','*');if(l.functionType!==FUNCTIONS[0])lines.push('[RACK BINGKISAN & SAMPLE NON-COMMERCIAL]');else if(rows.length)rows.forEach(i=>lines.push('- '+itemText(i,ss.mode)));else if(l.kind==='floor')lines.push('-');}
      }texts.push(lines.join('\n'));
    }return texts.join('\n\n');
  }
  // String normalization preserves large legacy identifiers without Number rounding.
  function pallet(value){return String(value??'').trim().replace(/^0+(?=\d)/,'');}
  return {STATUS,FUNCTIONS,SKU,assert,date,expiry,short,session,item,mutate,report,pallet};
})();

/* A physical pallet groups immutable source items; its label is never an item ID. */
const Pallets=(()=>{
 const key=i=>i.palletId||i.itemId||i.id;
 const label=i=>i.palletLabel||WMS.pallet(i.palletNo)||'';
 function count(items){return new Set(items.filter(i=>Number(i.qty)>0).map((i,n)=>key(i)||'unidentified-'+n)).size;}
 function expand(data,ids){const set=new Set(ids),groups=new Set(data.stock.filter(i=>set.has(i.id)&&i.palletId).map(i=>i.palletId));return data.stock.filter(i=>set.has(i.id)||i.palletId&&groups.has(i.palletId));}
 function complete(data,items){const ids=new Set(items.map(i=>i.id));WMS.assert(expand(data,[...ids]).every(i=>ids.has(i.id)),'Pilih seluruh komponen pallet gabungan untuk dipindah.');}
 function merge(original,r,ss,uuid,now){
  WMS.assert(Array.isArray(r.ids)&&r.ids.length>=2&&r.ids.length<=100&&new Set(r.ids).size===r.ids.length,'Pilih 2–100 item berbeda untuk digabung.');
  const items=r.ids.map(id=>original.stock.find(i=>i.id===id));WMS.assert(items.every(Boolean),'Barang gabungan tidak ditemukan.');complete(original,items);
  const locations=new Map(original.locations.filter(l=>l.group===ss.mode).map(l=>[l.id,l])),to=locations.get(r.destination);
  WMS.assert(items.every(i=>locations.has(i.locationId))&&to&&to.kind==='rack','Pilih rak tujuan dalam gudang yang sama.');
  WMS.assert(count(items)>=2,'Barang ini sudah berada dalam satu pallet gabungan.');
  const first=items[0];WMS.assert(items.every(i=>['sku','kp','unit','status'].every(k=>i[k]===first[k])),'Gabungkan hanya produk, KP, satuan, dan status yang sama.');
  WMS.assert(items.every(i=>WMS.pallet(i.palletNo)),'Isi nomor pallet asal sebelum menggabungkan.');
  const ids=new Set(r.ids);WMS.assert(original.stock.filter(i=>i.locationId===to.id).every(i=>ids.has(i.id)),'Rak tujuan berisi barang lain. Pilih seluruh isi tujuan atau rak kosong.');
  const palletId=r.palletId||uuid();WMS.assert(/^[A-Za-z0-9-]{20,100}$/.test(palletId)&&!original.stock.some(i=>i.palletId===palletId||i.id===palletId),'ID pallet gabungan tidak valid / sudah dipakai.');
  const labels=[...new Set(items.flatMap(i=>label(i).split(',')))];const palletLabel=labels.join(',');WMS.assert(palletLabel.length<=2200,'Identitas pallet gabungan terlalu panjang.');
  const data=JSON.parse(JSON.stringify(original));
  for(const i of data.stock)if(ids.has(i.id))Object.assign(i,{palletId,palletLabel,locationId:to.id,updatedAt:now,sessionId:ss.id});
  for(const d of data.deliveryNotes||[]){if(d.state!=='DRAFT'||d.mode!==ss.mode)continue;let changed=false;
   for(const l of d.lines)if(ids.has(l.itemId)){Object.assign(l,{palletId,palletLabel,locationId:to.id,room:to.room,location:to.display});changed=true;}
   if(changed){d.revision++;d.updatedAt=now;}
  }
  data.version++;return data;
 }
 return {key,label,count,expand,complete,merge};
})();
