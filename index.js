const http = require('http');
const fs = require('fs/promises');
const path = require('path');

const hostname = 'localhost';
const port = 8080;

async function readContentOfFile(url) {
    try{
        let filePath;
        switch(url) {
            case '/':
                filePath = path.join(__dirname,'index.html');
                break;
            case '/about':
                filePath = path.join(__dirname,'about.html');
                break;
            case '/contact':
                filePath = path.join(__dirname,'contact.html');
                break;
            default:
                filePath = path.join(__dirname,'404.html');
        }
        const fileContent = await fs.readFile(filePath,'utf8');
        return fileContent;
    }
    catch(err) {
        console.log(err);
    }
    
}

const server = http.createServer(async(req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    const fileContent = await readContentOfFile(req.url);
    res.end(fileContent);
});
  
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});