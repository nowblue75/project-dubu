const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'test_w966_post.jpg');
const destPath = path.join(__dirname, '..', '41. 순두부콩물 파운드케익_완', '순두부 콩물 파운드케익 (0).png');

if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${srcPath} to ${destPath}`);
    const stats = fs.statSync(destPath);
    console.log(`Destination file size: ${stats.size} bytes`);
} else {
    console.error(`Source file does not exist: ${srcPath}`);
}
