const fs = require('fs');
const path = require('path');

const files = [
    'best_onFocusAnchorChange.js',
    'best_openFocusStage.js',
    'best_getRecipeTheme.js',
    'best_downloadRecipeCard.js'
];

function decodeEscapedString(str) {
    str = str.trim();
    if (str.startsWith('"') && str.endsWith('"')) {
        str = str.slice(1, -1);
    }
    return str
        .replace(/\\n/g, '\n')
        .replace(/\\t/g, '\t')
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, '\\');
}

files.forEach(f => {
    const filePath = path.join(__dirname, f);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        let decoded = decodeEscapedString(content);
        const outName = f.replace('.js', '_clean.js');
        fs.writeFileSync(path.join(__dirname, outName), decoded, 'utf8');
        console.log(`Saved clean file to: ${outName}`);
    }
});
