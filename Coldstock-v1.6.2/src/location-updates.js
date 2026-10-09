/* v1.5.4 is additive: keep existing location IDs, custom functions, stock and history. */
const Layout154=(()=>{
 function merge(locations){
  const ids=new Set(locations.map(l=>l.id));
  const added=defaultLocations_().filter(l=>l.room==='CHILLER C2'&&!ids.has(l.id));
  return {locations:locations.concat(added),added};
 }
 return {merge};
})();
