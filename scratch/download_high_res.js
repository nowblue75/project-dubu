const https = require('https');
const fs = require('fs');
const path = require('path');

const imgUrl1 = 'https://postfiles.pstatic.net/MjAyNjA1MTRfMTY2/MDAxNzc4NzM1ODg0MTcz.K4dKZdoOE2FzaHRs1maz09LJhHF_khC9SxfGUXiBB14g.reTrDeGROvxh7zsPiTW3tqK2d9pK5JmRT1H7Og_2C4wg.JPEG/SE-2275d156-f464-4342-8250-a21aa6c51031.jpg';
const imgUrl2 = 'https://mblogthumb-phinf.pstatic.net/MjAyNjA1MTRfMTY2/MDAxNzc4NzM1ODg0MTcz.K4dKZdoOE2FzaHRs1maz09LJhHF_khC9SxfGUXiBB14g.reTrDeGROvxh7zsPiTW3tqK2d9pK5JmRT1H7Og_2C4wg.JPEG/SE-2275d156-f464-4342-8250-a21aa6c51031.jpg';

function downloadFile(url, filename) {
    console.log(`Downloading ${url} -> ${filename}`);
    const file = fs.createWriteStream(filename);
    https.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
    }, (response) => {
        response.pipe(file);
        file.on('finish', () => {
            file.close();
            const stats = fs.statSync(filename);
            console.log(`Finished downloading ${filename}. Size: ${stats.size} bytes`);
        });
    }).on('error', (err) => {
        fs.unlink(filename, () => {});
        console.error(`Error downloading ${url}:`, err.message);
    });
}

downloadFile(imgUrl1, path.join(__dirname, 'test_postfiles.jpg'));
downloadFile(imgUrl2, path.join(__dirname, 'test_mblogthumb.jpg'));
