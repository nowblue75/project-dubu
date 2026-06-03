const https = require('https');
const fs = require('fs');
const path = require('path');

const urls = {
    'w800_mblog': 'https://mblogthumb-phinf.pstatic.net/MjAyNjA1MTRfMTY2/MDAxNzc4NzM1ODg0MTcz.K4dKZdoOE2FzaHRs1maz09LJhHF_khC9SxfGUXiBB14g.reTrDeGROvxh7zsPiTW3tqK2d9pK5JmRT1H7Og_2C4wg.JPEG/SE-2275d156-f464-4342-8250-a21aa6c51031.jpg?type=w800',
    'w800_post': 'https://postfiles.pstatic.net/MjAyNjA1MTRfMTY2/MDAxNzc4NzM1ODg0MTcz.K4dKZdoOE2FzaHRs1maz09LJhHF_khC9SxfGUXiBB14g.reTrDeGROvxh7zsPiTW3tqK2d9pK5JmRT1H7Og_2C4wg.JPEG/SE-2275d156-f464-4342-8250-a21aa6c51031.jpg?type=w800',
    'w966_post': 'https://postfiles.pstatic.net/MjAyNjA1MTRfMTY2/MDAxNzc4NzM1ODg0MTcz.K4dKZdoOE2FzaHRs1maz09LJhHF_khC9SxfGUXiBB14g.reTrDeGROvxh7zsPiTW3tqK2d9pK5JmRT1H7Og_2C4wg.JPEG/SE-2275d156-f464-4342-8250-a21aa6c51031.jpg?type=w966',
    'w2000_post': 'https://postfiles.pstatic.net/MjAyNjA1MTRfMTY2/MDAxNzc4NzM1ODg0MTcz.K4dKZdoOE2FzaHRs1maz09LJhHF_khC9SxfGUXiBB14g.reTrDeGROvxh7zsPiTW3tqK2d9pK5JmRT1H7Og_2C4wg.JPEG/SE-2275d156-f464-4342-8250-a21aa6c51031.jpg?type=w2000'
};

function downloadFile(url, key) {
    const filename = path.join(__dirname, `test_${key}.jpg`);
    console.log(`Downloading ${key}: ${url} -> ${filename}`);
    const file = fs.createWriteStream(filename);
    https.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Referer': 'https://m.blog.naver.com/project_dubu/224291999885'
        }
    }, (response) => {
        response.pipe(file);
        file.on('finish', () => {
            file.close();
            const stats = fs.statSync(filename);
            console.log(`Finished ${key}. Size: ${stats.size} bytes`);
        });
    }).on('error', (err) => {
        fs.unlink(filename, () => {});
        console.error(`Error downloading ${key}:`, err.message);
    });
}

for (const [key, url] of Object.entries(urls)) {
    downloadFile(url, key);
}
