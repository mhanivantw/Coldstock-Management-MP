/* Draft lines reserve quantities; issue commits physical stock + immutable history. */
const Delivery=(()=>{
  const clone=x=>JSON.parse(JSON.stringify(x)),assert=WMS.assert;
  const fields=['id','number','mode','state','date','destination','note','createdAt','createdBy','createdName','updatedAt','revision','confirmedAt','confirmedBy','confirmedName','cancelledAt','truck','shift','pickingNumber','sjNumber'];
  const lineFields=['itemId','locationId','room','location','sku','kp','exp','qty','unit','palletNo','spv','status','note','palletId','palletLabel'];
  const identity=['locationId','sku','kp','exp','unit','palletNo','spv','status','palletId','palletLabel'];
  const validId=id=>typeof id==='string'&&/^[A-Za-z0-9-]{20,100}$/.test(id);
  const clean=(v,max,label)=>{const s=String(v??'').trim();assert(s.length<=max&&!/[\r\n]/.test(s),label+' maksimal '+max+' karakter, satu baris.');return s;};
  const find=(data,id)=>(data.deliveryNotes||[]).find(d=>d.id===id);
  // Derived from all open drafts, never a second mutable balance or a shift filter.
  function reservationIndex(data,exceptId){const index=new Map();for(const d of data.deliveryNotes||[]){if(d.state!=='DRAFT'||d.id===exceptId)continue;for(const l of d.lines){const key=d.mode+':'+l.itemId;if(!index.has(key))index.set(key,[]);index.get(key).push({documentId:d.id,number:d.pickingNumber||d.number,truck:d.truck||d.destination,qty:Number(l.qty)});}}return index;}
  function availability(data,itemId,exceptId,index){const item=data.stock.find(i=>i.id===itemId),loc=item&&data.locations.find(l=>l.id===item.locationId);const allocations=loc?(index||reservationIndex(data,exceptId)).get(loc.group+':'+itemId)||[]:[];const physical=Number(item?.qty)||0,reserved=allocations.reduce((n,a)=>n+a.qty,0);return {physical,reserved,available:Math.max(0,physical-reserved),overbooked:reserved>physical,allocations};}
  function fingerprint(data,id){const d=find(data,id);return JSON.stringify(d?[[...fields.slice(0,19).map(k=>d[k]??''),...(d.sjNumber?[d.sjNumber]:[])],d.lines.map(l=>[...lineFields.slice(0,13).map(k=>l[k]??''),...(l.palletId?[l.palletId,l.palletLabel]:[])])]:null);}
  function suratJalan(value){assert(typeof value==='string','No. SJ wajib diisi dari surat jalan SAP.');const sj=clean(value,80,'No. SJ');assert(sj&&!/[\u0000-\u001f\u007f]/.test(sj),'No. SJ wajib diisi, tanpa karakter kontrol.');return sj;}
  function locations(data,request){
    const ids=request.action==='saveDelivery'?(request.lines||[]).map(l=>l.itemId):(find(data,request.documentId)?.lines||[]).map(l=>l.itemId);
    return [...new Set(data.stock.filter(i=>ids.includes(i.id)).map(i=>i.locationId))];
  }
  function mutate(original,request,ss,uuid,now){
    assert(request.version===original.version,'CONFLICT: Data berubah. Muat ulang sebelum menyimpan.');
    if(request.action==='correctItem'){
      const old=original.stock.find(i=>i.id===request.itemId),loc=old&&original.locations.find(l=>l.id===old.locationId&&l.group===ss.mode);
      assert(loc,'Item koreksi tidak ditemukan dalam gudang sesi.');
      assert(request.before&&['locationId','sku','kp','qty','palletNo','spv','note','status','updatedAt','palletId','palletLabel'].every(k=>String(request.before[k]??'')===String(old[k]??'')),'CONFLICT: Data barang berubah sejak formulir dibuka. Buka ulang Koreksi data.');
      const reason=clean(request.reason,500,'Alasan koreksi');assert(reason.length>=5,'Isi alasan koreksi minimal 5 karakter.');
      const next=WMS.item({...old,...request.item,unit:old.unit,status:old.status},loc,original.skus,old.id,now,ss.id);
      const changed=['sku','kp','qty','palletNo','spv','note'].filter(k=>String(next[k]??'')!==String(old[k]??''));
      assert(changed.length,'Tidak ada perubahan data.');
      assert(!old.palletId||!changed.some(k=>['sku','kp','palletNo'].includes(k)),'Identitas komponen pallet gabungan perlu dipisahkan dahulu; koreksi QTY/SPV/catatan tetap tersedia.');
      const allocation=availability(original,old.id);assert(next.qty>=allocation.reserved,'Jumlah koreksi lebih kecil dari alokasi picking. Kurangi atau batalkan draft terkait dahulu.');
      const identityChanged=changed.some(k=>['sku','kp','palletNo','spv'].includes(k));
      assert(!identityChanged||allocation.reserved===0,'Barang masih dialokasikan picking. Hapus dari draft sebelum koreksi identitas.');
      assert(!identityChanged||!(original.deliveryNotes||[]).some(d=>d.state==='ISSUED'&&d.lines.some(l=>l.itemId===old.id)),'Identitas sudah dipakai pengiriman. Perlu rekonsiliasi admin; riwayat SJ tidak boleh berubah. Koreksi QTY/catatan masih bisa.');
      const data=clone(original),i=data.stock.find(i=>i.id===old.id);Object.assign(i,next);
      if(old.palletId){i.palletId=old.palletId;i.palletLabel=old.palletLabel;}
      data.version++;return data;
    }
    if(request.action==='mergePallet')return Pallets.merge(original,request,ss,uuid,now);
    if(request.action==='moveBatch'){
      assert(Array.isArray(request.rows)&&request.rows.length>0&&request.rows.length<=100,'Pilih 1–100 item untuk dipindahkan.');
      const seen=new Set(),targets=new Map(),locations=new Map(original.locations.filter(l=>l.group===ss.mode).map(l=>[l.id,l]));
      const rows=request.rows.map(r=>{
        assert(r&&!seen.has(r.itemId),'Item pindah duplikat.');seen.add(r.itemId);
        const item=original.stock.find(i=>i.id===r.itemId),to=locations.get(r.destination);
        assert(item&&locations.has(item.locationId),'Item tidak ditemukan atau di luar area sesi.');
        assert(item.locationId===r.from,'CONFLICT: Lokasi asal barang berubah. Susun ulang perpindahan.');
        assert(to&&to.kind==='rack','Pilih rak tujuan dalam area sesi.');
        assert(to.id!==item.locationId,'Tujuan harus berbeda dari lokasi asal.');
        assert(!targets.has(to.id)||item.palletId&&targets.get(to.id)===item.palletId,'Setiap pallet fisik harus memiliki rak tujuan berbeda.');targets.set(to.id,item.palletId||item.id);
        assert(!original.stock.some(i=>i.locationId===to.id),'CONFLICT: Rak '+to.display+' sudah terisi. Pilih rak kosong.');
        return {item,to};
      });
      Pallets.complete(original,rows.map(r=>r.item));
      const groupTargets=new Map();for(const r of rows){const k=Pallets.key(r.item);assert(!groupTargets.has(k)||groupTargets.get(k)===r.to.id,'Pallet gabungan harus dipindahkan utuh ke satu tujuan.');groupTargets.set(k,r.to.id);}
      const data=clone(original),moved=new Map(rows.map(r=>[r.item.id,r]));
      for(const item of data.stock){const r=moved.get(item.id);if(r)Object.assign(item,{locationId:r.to.id,updatedAt:now,sessionId:ss.id});}
      // Draft allocations follow the same item ID. Never rewrite issued/cancelled history,
      // or silently repair any previously stale product/status snapshot.
      for(const d of data.deliveryNotes||[]){
        if(d.state!=='DRAFT'||d.mode!==ss.mode)continue;let changed=false;
        for(const line of d.lines){const r=moved.get(line.itemId);if(r&&line.locationId===r.item.locationId){Object.assign(line,{locationId:r.to.id,room:r.to.room,location:r.to.display});changed=true;}}
        if(changed){d.revision++;d.updatedAt=now;}
      }
      data.version++;return data;
    }
    if(request.action==='bulkReceive'){
      assert(Array.isArray(request.rows)&&request.rows.length>0&&request.rows.length<=100,'Pilih 1–100 rak kosong.');
      const used=new Set(original.stock.map(i=>i.id)),seen=new Set();let room;
      const rows=request.rows.map(raw=>{
        const loc=original.locations.find(l=>l.id===raw.locationId);
        assert(loc&&loc.kind==='rack'&&loc.group===ss.mode,'Pilih rak dalam area sesi.');
        if(room===undefined||room===null)room=loc.room;assert(loc.room===room,'Pilih rak dalam satu ruangan.');
        assert(!seen.has(loc.id),'Rak duplikat.');seen.add(loc.id);
        assert(!original.stock.some(i=>i.locationId===loc.id),'CONFLICT: Rak '+loc.display+' sudah terisi. Pilih rak kosong.');
        const id=raw.id||uuid();assert(validId(id)&&!used.has(id),'ID item tidak valid atau duplikat.');used.add(id);
        return WMS.item({...request.item,unit:'CTN',qty:raw.qty,palletNo:raw.palletNo},loc,original.skus,id,now,ss.id);
      });
      const data=clone(original);data.stock.push(...rows);data.version++;return data;
    }
    if(!['saveDelivery','issueDelivery','cancelDelivery'].includes(request.action)){
      assert(request.action!=='delete','Barang keluar harus dicatat melalui delivery note.');
      if(request.action==='saveSlot'){
        for(const old of original.stock.filter(i=>i.locationId===request.locationId)){
          const next=(request.items||[]).find(i=>i.id===old.id);
          assert(next&&Number(next.qty)>=old.qty,'Gunakan delivery note untuk mengurangi atau mengeluarkan stok.');
          assert(['sku','kp','palletNo','spv'].every(k=>String(k==='palletNo'?WMS.pallet(next[k]):next[k]??'')===String(k==='palletNo'?WMS.pallet(old[k]):old[k]??'')),'Gunakan Koreksi data untuk mengubah SKU, KP, nomor pallet, atau SPV.');
          assert((next.unit||'CTN')===old.unit,'Satuan stok tersimpan tidak dapat diubah.');
        }
      }
      if(request.action==='move')Pallets.complete(original,original.stock.filter(i=>(request.ids||[]).includes(i.id)));
      const next=WMS.mutate(original,request,ss,uuid,now);
      for(const i of next.stock){const old=original.stock.find(o=>o.id===i.id);if(old?.palletId){
       assert(['sku','kp','unit','palletNo'].every(k=>i[k]===old[k])&&i.qty===old.qty,'Identitas dan jumlah komponen gabungan tidak dapat diedit langsung. Pengeluaran melalui picking.');
       i.palletId=old.palletId;i.palletLabel=old.palletLabel;
      }}
      for(const id of new Set(next.stock.filter(i=>i.palletId).map(i=>i.palletId))){const members=next.stock.filter(i=>i.palletId===id);assert(members.every(i=>i.status===members[0].status),'Status Hold / update berlaku untuk seluruh pallet gabungan. Samakan status seluruh komponennya.');}
      return next;
    }
    const data=clone(original);if(!data.deliveryNotes)data.deliveryNotes=[];
    assert(validId(request.documentId),'ID delivery note tidak valid.');
    let d=find(data,request.documentId);
    if(d){assert(d.mode===ss.mode,'Delivery note di luar area sesi.');assert(d.state==='DRAFT','Delivery note sudah diproses dan tidak dapat diubah.');assert(request.documentRevision===d.revision,'CONFLICT: Delivery note berubah. Muat ulang.');}
    else assert(request.action==='saveDelivery'&&request.documentRevision===0,'Delivery note tidak ditemukan.');
    if(request.action==='saveDelivery'){
      WMS.date(request.date);const destination=clean(request.destination,120,'Tujuan/penerima'),note=clean(request.note,500,'Catatan');assert(destination,'Isi tujuan/penerima.');
      assert(Array.isArray(request.lines)&&request.lines.length>0&&request.lines.length<=100,'Pilih 1–100 item untuk picklist.');
      const reservations=reservationIndex(data,request.documentId),seen=new Set(),lines=request.lines.map(raw=>{
        assert(!seen.has(raw.itemId),'Item picklist duplikat.');seen.add(raw.itemId);
        const item=data.stock.find(i=>i.id===raw.itemId),loc=item&&data.locations.find(l=>l.id===item.locationId&&l.group===ss.mode);assert(loc,'Stok picklist tidak ditemukan dalam area sesi.');
        const qty=Number(raw.qty);assert(Number.isInteger(qty)&&qty>0&&qty<=item.qty,'Jumlah ambil harus 1 sampai stok tersedia.');
        const free=availability(data,item.id,request.documentId,reservations);assert(qty<=free.available,'Sisa tersedia untuk picking '+item.sku+' di '+loc.display+': '+free.available+' '+item.unit+'. '+free.reserved+' '+item.unit+' dicadangkan picking lain. Kurangi jumlah atau edit/batalkan draft terkait.');
        return {itemId:item.id,locationId:loc.id,room:loc.room,location:loc.display,sku:item.sku,kp:item.kp,exp:item.exp,qty,unit:item.unit,palletNo:item.palletNo||'',spv:item.spv,status:item.status,note:item.note,...(item.palletId?{palletId:item.palletId,palletLabel:item.palletLabel}:{})};
      });
      if(!d){const number='DN-'+ss.mode+'-'+request.date.replace(/-/g,'')+'-'+request.documentId.replace(/-/g,'').slice(0,12).toUpperCase();assert(!data.deliveryNotes.some(x=>x.number===number),'Nomor dokumen sudah ada. Buat draft baru.');d={id:request.documentId,number,mode:ss.mode,state:'DRAFT',date:request.date,destination,note,createdAt:now,createdBy:ss.id,createdName:ss.name,updatedAt:now,revision:0,confirmedAt:'',confirmedBy:'',confirmedName:'',cancelledAt:'',lines:[]};data.deliveryNotes.push(d);}
      Object.assign(d,{date:request.date,destination,note,lines});
      if(request.truck!==undefined){const truck=clean(request.truck,80,'Identitas truk');assert(truck,'Isi nomor polisi atau identitas truk.');d.truck=truck;}
      if(request.shift!==undefined){assert(['S1','S2','S3'].includes(request.shift),'Pilih shift picking.');d.shift=request.shift;}else if(!d.shift)d.shift=ss.shift;
      if(!d.pickingNumber)d.pickingNumber='PL-'+d.mode+'-'+d.date.replace(/-/g,'')+'-'+d.id.replace(/-/g,'').slice(0,12).toUpperCase();
    }else if(request.action==='issueDelivery'){
      const sjNumber=suratJalan(request.sjNumber);
      const reservations=reservationIndex(data,d.id);
      for(const line of d.lines){const item=data.stock.find(i=>i.id===line.itemId);assert(item&&identity.every(k=>(k==='palletNo'?WMS.pallet(item[k]):item[k]??'')===(k==='palletNo'?WMS.pallet(line[k]):line[k]??'')),'Isi/lokasi barang berubah sejak picklist dibuat. Perbarui draft terlebih dahulu.');assert(item.qty>=line.qty,'Stok tidak cukup untuk '+line.sku+' di '+line.location+'.');}
      for(const line of d.lines){const free=availability(data,line.itemId,d.id,reservations);assert(line.qty<=free.available,'Alokasi picking melebihi stok '+line.sku+' di '+line.location+'. Sisa tersedia '+free.available+' '+line.unit+'. Edit/batalkan draft yang bertumpang tindih sebelum selesai muat.');}
      for(const line of d.lines){const item=data.stock.find(i=>i.id===line.itemId);item.qty-=line.qty;item.updatedAt=now;item.sessionId=ss.id;}
      data.stock=data.stock.filter(i=>i.qty>0);Object.assign(d,{state:'ISSUED',sjNumber,confirmedAt:now,confirmedBy:ss.id,confirmedName:ss.name});
    }else {d.state='CANCELLED';d.cancelledAt=now;}
    d.updatedAt=now;d.revision++;data.version++;return data;
  }
  function text(d,kind){if(kind==='picking'){const body=text({...d,state:'DRAFT'},'raw');return body.replace('PICKLIST — DRAFT (BELUM MENGURANGI STOK)',d.state==='ISSUED'?'PICKING LIST — SELESAI MUAT':d.state==='CANCELLED'?'PICKING LIST — DIBATALKAN':'PICKING LIST — BELUM MENGURANGI STOK').replace(d.number,d.pickingNumber||d.number);}
    const title=d.state==='DRAFT'?'PICKLIST — DRAFT (BELUM MENGURANGI STOK)':d.state==='ISSUED'?'DELIVERY NOTE — BARANG KELUAR':'DELIVERY NOTE — DIBATALKAN';
    return [title,...(d.state==='ISSUED'?['No. SJ: '+(d.sjNumber||'Belum tercatat (dokumen lama)'),'Referensi internal: '+d.number]:[d.number]),'Tanggal: '+d.date,'Area: '+d.mode,...(d.shift?['Shift: '+d.shift]:[]),...(d.truck?['Truk: '+d.truck]:[]),...(d.state==='ISSUED'&&d.pickingNumber?['Picking list: '+d.pickingNumber]:[]),'Tujuan: '+d.destination,'Dibuat oleh: '+d.createdName,...(d.confirmedAt?['Dikonfirmasi oleh: '+d.confirmedName,'Waktu keluar: '+d.confirmedAt]:[]),'',...d.lines.map((l,n)=>`${n+1}. ${l.room} / ${l.location} | ${l.sku} | KP ${l.kp} | ${l.qty} ${l.unit}${l.spv?' | SPV '+l.spv:''} | ${l.status}${l.palletNo?' | Pallet '+Pallets.label(l)+(l.palletId?' (asal P '+WMS.pallet(l.palletNo)+')':''):''}${l.note?' | '+l.note:''}`),'',...['CTN','PACK'].map(u=>[u,d.lines.filter(l=>l.unit===u).reduce((n,l)=>n+l.qty,0)]).filter(([,n])=>n).map(([u,n])=>'Total: '+n+' '+u),...(d.note?['Catatan: '+d.note]:[])].join('\n');
  }
  return {fields,lineFields,identity,validId,find,fingerprint,locations,mutate,text,reservationIndex,availability,suratJalan};
})();
