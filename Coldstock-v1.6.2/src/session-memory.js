/* Shift identity survives navigation/reload, independently of short-lived server tokens. */
const SessionMemory=(()=>{
  const duration=12*60*60*1000;
  function read(storage,key,now=Date.now()){
    let record;try{record=JSON.parse(storage.getItem(key)||'null');}catch{return null;}
    if(!record||record.schema!==1||!Number.isFinite(record.until)||record.until<=now||record.until>now+duration)return null;
    try{WMS.session({...record.identity,mode:record.mode||'CSFG'});}catch{return null;}
    return record;
  }
  function create(session,now=Date.now()){return {schema:1,until:now+duration,identity:{name:session.name,date:session.date,shift:session.shift},mode:session.mode,sessions:{[session.mode]:session},rooms:{}};}
  function write(storage,key,record){storage.setItem(key,JSON.stringify(record));return record;}
  return {read,create,write,duration};
})();
