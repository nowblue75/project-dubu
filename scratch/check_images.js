const fs = require('fs');
const path = require('path');

const baseDir = 'c:/Users/USER/OneDrive/Desktop/컨텐츠작업/프로젝트 두부';
const checkList = [
    '27. 순두부 눈꽃컵케이크_완/0.jpg',
    '26. 순두부 3종케익_완/0.jpg',
    '25. 순두부초코번트케익_완/0.jpg',
    '24. 순두부레몬번트케익_완/0.jpg',
    '23. 순두부블랙포레스트 컵케익_완/0.jpg',
    '22. 순두부 부쉬드노엘_완/0.jpg',
    '21. 순두부슈톨렌_완/0.jpg'
];

checkList.forEach(rel => {
    const fullPath = path.join(baseDir, rel);
    const exists = fs.existsSync(fullPath);
    console.log(`Path: ${rel} | Exists: ${exists}`);
    if (exists) {
        const stats = fs.statSync(fullPath);
        console.log(`  Size: ${stats.size} bytes`);
    } else {
        // List files in that directory to see what's inside
        const dirName = path.dirname(fullPath);
        if (fs.existsSync(dirName)) {
            console.log(`  Files in ${path.basename(dirName)}:`);
            console.log(fs.readdirSync(dirName));
        } else {
            console.log(`  Directory does not exist: ${dirName}`);
        }
    }
});
