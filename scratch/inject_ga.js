const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const gaId = 'G-XXXXXXXXXX'; // 사용자 교체용 ID

const gaSnippet = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${gaId}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${gaId}');
</script>
`;

// 제외 디렉토리 패턴
const excludeDirs = [
    '.git',
    'node_modules',
    '.gemini',
    'ver1.0',
    'ver1.1',
    'ver1.2',
    'ver1.3',
    'ver1.4',
    'ver1.5',
    'scratch',
    'Resolve Project Library'
];

function shouldProcess(filePath) {
    // blog_ 파일들은 블로그 백업용이므로 제외
    const baseName = path.basename(filePath);
    if (baseName.startsWith('blog_')) return false;
    
    // ver1.x 같은 디렉토리 하위는 제외
    const relative = path.relative(rootDir, filePath);
    const parts = relative.split(path.sep);
    for (const part of parts) {
        if (excludeDirs.includes(part)) {
            return false;
        }
    }
    return true;
}

function walk(dir, callback) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            walk(fullPath, callback);
        } else if (stat.isFile() && path.extname(fullPath).toLowerCase() === '.html') {
            callback(fullPath);
        }
    }
}

let modifiedCount = 0;
let skippedCount = 0;

walk(rootDir, (filePath) => {
    if (!shouldProcess(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');

    // 이미 GA4 스크립트가 들어있는지 확인 (gtag.js 또는 googletagmanager)
    if (content.includes('googletagmanager.com/gtag/js') || content.includes('gtag(')) {
        console.log(`[SKIP] Already has GA4: ${path.relative(rootDir, filePath)}`);
        skippedCount++;
        return;
    }

    // head 태그 바로 아래에 GA 스니펫 삽입
    // 대소문자 구분 없이 <head> 태그를 찾음
    const headReg = /<head[^>]*>/i;
    const match = content.match(headReg);

    if (match) {
        const insertIndex = match.index + match[0].length;
        const newContent = content.slice(0, insertIndex) + '\n' + gaSnippet + content.slice(insertIndex);
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`[INSERT] Added GA4 to: ${path.relative(rootDir, filePath)}`);
        modifiedCount++;
    } else {
        console.log(`[WARN] No <head> tag found in: ${path.relative(rootDir, filePath)}`);
    }
});

console.log(`\n작업 완료! 수정된 파일: ${modifiedCount}개, 건너뛴 파일: ${skippedCount}개`);
