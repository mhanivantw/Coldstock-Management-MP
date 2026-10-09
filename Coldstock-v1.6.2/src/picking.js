/* KP-based ordering only; sorting never selects or modifies stock. */
const Picking=(()=>{
  function candidates(data,mode,{sku='',query='',fefo=false}={}){
    const locations=new Map(data.locations.filter(l=>l.group===mode).map(l=>[l.id,l]));
    const q=query.trim().toLowerCase();
    const rows=data.stock.filter(i=>locations.has(i.locationId)&&i.qty>0&&(!sku||i.sku===sku)&&(!q||[i.sku,i.kp,WMS.short(i.kp),Pallets.label(i),i.palletNo,i.spv,i.status,i.note,locations.get(i.locationId).room,locations.get(i.locationId).display].join(' ').toLowerCase().includes(q)));
    return rows.sort((a,b)=>{
      const la=locations.get(a.locationId),lb=locations.get(b.locationId);
      return (fefo?(a.sku.localeCompare(b.sku)||(a.status==='Release'?0:1)-(b.status==='Release'?0:1)||a.kp.localeCompare(b.kp)):0)||la.room.localeCompare(lb.room)||la.order-lb.order||a.id.localeCompare(b.id);
    });
  }
  function summary(lines){const groups=new Map();for(const l of lines){const key=JSON.stringify([l.sku,l.kp,l.unit||'CTN']);if(!groups.has(key))groups.set(key,{sku:l.sku||'Stok tidak tersedia',kp:l.kp||'',unit:l.unit||'CTN',qty:0});groups.get(key).qty+=Number(l.qty)||0;}return [...groups.values()].sort((a,b)=>a.sku.localeCompare(b.sku)||a.kp.localeCompare(b.kp)||a.unit.localeCompare(b.unit));}
  function withPallets(lines){return summary(lines).map(g=>({...g,pallets:Pallets.count(lines.filter(l=>l.sku===g.sku&&l.kp===g.kp&&(l.unit||'CTN')===g.unit))}));}
  return {candidates,summary:withPallets};
})();
