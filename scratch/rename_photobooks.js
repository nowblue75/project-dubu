const fs = require('fs');
const path = require('path');

const targets = [
    {
        dir: '35. 순두부초코마들렌_완',
        mapping: {
            '순두부 초코마들렌 화보집 (0).jpg': '0.jpg',
            '순두부 초코마들렌 화보집 (1).jpg': '1.jpg',
            '순두부 초코마들렌 화보집 (2).jpg': '2.jpg'
        }
    },
    {
        dir: '40. 순두부 흑임자테린_완',
        mapping: {
            '순두부 흑임자테린 화보집 (0).jpg': '0.jpg',
            '순두부 흑임자테린 화보집 (1).jpg': '1.jpg',
            '순두부 흑임자테린 화보집 (2).jpg': '2.jpg'
        }
    },
    {
        dir: '41. 순두부콩물 파운드케익_완',
        mapping: {
            '순두부 콩물파운드케익 화보집 (0).jpg': '0.jpg',
            '순두부 콩물파운드케익 화보집 (1).jpg': '1.jpg',
            '순두부 콩물파운드케익 화보집 (2).jpg': '2.jpg'
        }
    }
];

targets.forEach(t => {
    const photobookDir = path.join(__dirname, '..', t.dir, '화보집');
    if (!fs.existsSync(photobookDir)) {
        console.log(`[오류] 폴더 없음: ${photobookDir}`);
        return;
    }

    console.log(`[작업 대상] ${t.dir}`);
    Object.keys(t.mapping).forEach(oldName => {
        const newName = t.mapping[oldName];
        const oldPath = path.join(photobookDir, oldName);
        const newPath = path.join(photobookDir, newName);

        if (fs.existsSync(oldPath)) {
            fs.renameSync(oldPath, newPath);
            console.log(`  - 변경 성공: ${oldName} -> ${newName}`);
        } else if (fs.existsSync(newPath)) {
            console.log(`  - 이미 존재함: ${newName}`);
        } else {
            console.log(`  - 찾을 수 없음: ${oldName}`);
        }
    });
});
