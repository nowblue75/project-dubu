const fs = require('fs');
const path = require('path');

const files = [
    'best_onFocusAnchorChange.js',
    'best_openFocusStage.js',
    'best_getRecipeTheme.js',
    'best_downloadRecipeCard.js'
];

files.forEach(f => {
    const filePath = path.join(__dirname, f);
    if (fs.existsSync(filePath)) {
        console.log(`\n==================== ${f} ====================`);
        console.log(fs.readFileSync(filePath, 'utf8'));
    } else {
        console.log(`[File Not Found] ${f}`);
    }
});
