const fs = require('fs');
const path = require('path');

const dirs = fs.readdirSync(path.join(__dirname, '..'));

dirs.forEach(d => {
    const stat = fs.statSync(path.join(__dirname, '..', d));
    if (stat.isDirectory()) {
        const subPath = path.join(__dirname, '..', d, '화보집');
        if (fs.existsSync(subPath)) {
            console.log(`[화보집 존재 폴더] ${d}`);
            try {
                const files = fs.readdirSync(subPath);
                console.log(`  - 파일 목록:`, files);
            } catch(e) {}
        }
    }
});
