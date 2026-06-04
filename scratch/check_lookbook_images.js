const fs = require('fs');
const path = require('path');

const baseDir = 'c:/Users/USER/OneDrive/Desktop/컨텐츠작업/프로젝트 두부';
const checkList = [
    '27. 순두부 눈꽃컵케이크_완/0.jpg',
    
    '26. 순두부 3종케익_완/0.jpg',
    '26. 순두부 3종케익_완/1.jpg',
    '26. 순두부 3종케익_완/2.jpg',
    '26. 순두부 3종케익_완/3.jpg',
    
    '25. 순두부초코번트케익_완/0.jpg',
    '25. 순두부초코번트케익_완/1.jpg',
    '25. 순두부초코번트케익_완/2.jpg',
    '25. 순두부초코번트케익_완/3.jpg',
    
    '24. 순두부레몬번트케익_완/0.jpg',
    '24. 순두부레몬번트케익_완/1.jpg',
    '24. 순두부레몬번트케익_완/2.jpg',
    '24. 순두부레몬번트케익_완/3.jpg',
    
    '23. 순두부블랙포레스트 컵케익_완/0.jpg',
    '23. 순두부블랙포레스트 컵케익_완/KakaoTalk_20251118_160003343.jpg',
    '23. 순두부블랙포레스트 컵케익_완/KakaoTalk_20251119_182329961_01.jpg',
    '23. 순두부블랙포레스트 컵케익_완/KakaoTalk_20251120_165803876.jpg',
    
    '22. 순두부 부쉬드노엘_완/0.jpg',
    '22. 순두부 부쉬드노엘_완/KakaoTalk_20251119_182329961_02.jpg',
    '22. 순두부 부쉬드노엘_완/KakaoTalk_20251119_182329961_05.jpg',
    '22. 순두부 부쉬드노엘_완/KakaoTalk_20251119_182329961_11.jpg',
    
    '21. 순두부슈톨렌_완/0.jpg',
    '21. 순두부슈톨렌_완/KakaoTalk_20251117_204301264_01.jpg',
    '21. 순두부슈톨렌_완/KakaoTalk_20251117_204301264_04.jpg',
    '21. 순두부슈톨렌_완/KakaoTalk_20251118_155920121.jpg'
];

checkList.forEach(rel => {
    const fullPath = path.join(baseDir, rel);
    const exists = fs.existsSync(fullPath);
    if (!exists) {
        console.log(`[MISSING] ${rel}`);
        const dirName = path.dirname(fullPath);
        if (fs.existsSync(dirName)) {
            console.log(`  Directory contents for ${path.basename(dirName)}:`);
            console.log(fs.readdirSync(dirName).filter(f => f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.jpeg')));
        } else {
            console.log(`  Directory does not exist: ${dirName}`);
        }
    } else {
        console.log(`[OK] ${rel}`);
    }
});
