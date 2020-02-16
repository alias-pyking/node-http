const http = require('http');
const hostname = "localhost";
const fs = require('fs');
const path = require('path');
const port = 3000;
const server = http.createServer((req, res)=>{
    console.log(`Request for ${req.url} by method ${req.method}`);
    if(req.method=='GET'){
        let fileUrl;
        if(req.url == '/'){
            fileUrl = '/index.html';
        } else{
            fileUrl = req.url;
        }
        console.log('file url ',fileUrl);
        let filePath = path.resolve('./public'+fileUrl);
        console.log('file path ',filePath);
        const fileExt = path.extname(filePath);
        if(fileExt == '.html'){
            fs.exists(filePath, (exists) => {
                if(!exists) {
                    res.statusCode = 404;
                    res.setHeader('Content-type','text/html');
                    res.end('<html><body>Error 404 </body></html>');
                } else{
                    res.statusCode = 200;
                    res.setHeader('Content-type','text/html');
                    fs.createReadStream(filePath).pipe(res);
                }
            });
        } else{
            res.statusCode = 404;
            res.setHeader('Content-type','text/html');
            res.end('<html><body>Error 404 </body></html>');
        }
    } else{
        res.statusCode = 404;
        res.setHeader('Content-type','text/html');
        res.end('<html><body>Error req method not supported </body></html>');
    }
});

server.listen(port,hostname,() =>{
    console.log(`Server running at http://${hostname}:${port}`)
});