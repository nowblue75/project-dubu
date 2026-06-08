const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/log_debug') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            fs.writeFileSync(path.join(__dirname, 'debug_output.json'), body, 'utf8');
            console.log("=== Debug output saved to debug_output.json ===");
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('OK');
        });
        return;
    }

    let urlPath = req.url.split('?')[0];
    try {
        urlPath = decodeURIComponent(urlPath);
    } catch(e) {}

    // GET /api/scan_images API 구현
    if (req.method === 'GET' && urlPath === '/api/scan_images') {
        const urlParams = new URL(req.url, `http://${req.headers.host || 'localhost'}`).searchParams;
        const recipeId = urlParams.get('recipeId');
        if (!recipeId) {
            res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: "recipeId is required" }));
            return;
        }

        fs.readdir(__dirname, (err, files) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ error: "Failed to read directory" }));
                return;
            }

            const targetRegex = new RegExp('^' + recipeId + '\\b');
            const matchedDir = files.find(file => {
                try {
                    const isDir = fs.statSync(path.join(__dirname, file)).isDirectory();
                    return isDir && targetRegex.test(file);
                } catch(e) {
                    return false;
                }
            });

            if (!matchedDir) {
                res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ error: `Directory for recipeId ${recipeId} not found`, images: [] }));
                return;
            }

            const dirPath = path.join(__dirname, matchedDir);
            fs.readdir(dirPath, (err, subFiles) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end(JSON.stringify({ error: "Failed to read subdirectory" }));
                    return;
                }

                const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.gif'];
                const images = subFiles
                    .filter(file => {
                        try {
                            const isFile = fs.statSync(path.join(dirPath, file)).isFile();
                            const ext = path.extname(file).toLowerCase();
                            return isFile && imageExtensions.includes(ext);
                        } catch(e) {
                            return false;
                        }
                    })
                    .map(file => `/${matchedDir}/${file}`)
                    .sort();

                res.writeHead(200, { 
                    'Content-Type': 'application/json; charset=utf-8',
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
                });
                res.end(JSON.stringify({ recipeId, directory: matchedDir, images }));
            });
        });
        return;
    }

    // SPA Fallback: /lookbook 으로 시작하면서 확장자가 없는 주소는 index.html로 서빙
    const isSPARoute = urlPath.startsWith('/lookbook') && !path.extname(urlPath);
    let filePath = path.join(__dirname, (urlPath === '/' || isSPARoute) ? 'index.html' : urlPath);

    const ext = path.extname(filePath).toLowerCase();
    let contentType = 'text/html; charset=utf-8';
    if (ext === '.js') contentType = 'text/javascript; charset=utf-8';
    else if (ext === '.css') contentType = 'text/css; charset=utf-8';
    else if (ext === '.png') contentType = 'image/png';
    else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    else if (ext === '.webp') contentType = 'image/webp';
    else if (ext === '.gif') contentType = 'image/gif';
    else if (ext === '.svg') contentType = 'image/svg+xml';
    else if (ext === '.mp4') contentType = 'video/mp4';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.log(`[404] ${req.url} -> File Not Found`);
                res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('404 Not Found');
            } else {
                console.log(`[500] ${req.url} -> Internal error: ${err.message}`);
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('500 Internal Error');
            }
        } else {
            console.log(`[200] ${req.url}`);
            // 강력한 캐시 방지 헤더 설정
            res.writeHead(200, { 
                'Content-Type': contentType,
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            });
            res.end(content);
        }
    });
}).listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
