const fs = require('fs');
const path = require('path');

const targetDirs = [
    "13. 순두부크림치즈롤케익_완",
    "12. 순두부 치즈스콘_완",
    "11. 순두부 레몬케이크_완",
    "9. 순두부 찹쌀모찌 케이크_완",
    "8. 순두부 크림치즈쿠키_완",
    "7. 얼그레이순두부케이크_완",
    "32. 순두부찰떡파이_완"
];

targetDirs.forEach(dirName => {
    const dirPath = path.join(__dirname, '..', dirName);
    if (!fs.existsSync(dirPath)) {
        console.log(`[폴더 없음] ${dirName}`);
        return;
    }
    
    const files = fs.readdirSync(dirPath);
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp'];
    const images = files.filter(f => {
        const ext = path.extname(f).toLowerCase();
        return imageExtensions.includes(ext) && fs.statSync(path.join(dirPath, f)).isFile();
    });
    
    console.log(`\n=== ${dirName} ===`);
    if (images.length === 0) {
        console.log("이미지 파일 없음");
    } else {
        images.forEach(img => {
            console.log(`  - ${img}`);
        });
    }
});
