// Jalankan: node serve.cjs, lalu buka http://localhost:4173
const http=require('http'),fs=require('fs'),path=require('path');
http.createServer((req,res)=>{const url=new URL(req.url,'http://localhost');if(url.pathname!=='/'&&url.pathname!=='/Index.html'){res.writeHead(404);return res.end('Not found');}res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});fs.createReadStream(path.join(__dirname,'Index.html')).pipe(res);}).listen(4173,'127.0.0.1',()=>console.log('Coldstock preview: http://127.0.0.1:4173'));
