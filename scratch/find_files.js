const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        try {
            const stat = fs.statSync(fullPath);
            if (stat && stat.isDirectory()) {
                if (!file.startsWith('.') && file !== 'node_modules' && file !== 'scratch') {
                    results = results.concat(walk(fullPath));
                }
            } else {
                const ext = path.extname(file).toLowerCase();
                if (ext === '.jpg' || ext === '.png' || ext === '.jpeg') {
                    results.push(fullPath);
                }
            }
        } catch (e) {}
    });
    return results;
}

const targetDir = path.join('C:', 'Users', 'USER', 'OneDrive', 'Desktop', '컨텐츠작업', '프로젝트 두부');
try {
    const files = walk(targetDir);
    console.log(`Total image files found: ${files.length}`);
    const outPath = path.join(targetDir, 'scratch', 'all_images.txt');
    fs.writeFileSync(outPath, files.join('\n'), 'utf8');
    console.log('All image paths written to:', outPath);
} catch (e) {
    console.error(e);
}
