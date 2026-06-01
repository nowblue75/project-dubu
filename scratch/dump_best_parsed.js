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
        let content = fs.readFileSync(filePath, 'utf8');
        try {
            let parsed = JSON.parse(content);
            console.log(parsed);
        } catch(e) {
            console.log("PARSE ERROR, PRINT RAW:");
            console.log(content.substring(0, 1000));
        }
    } else {
        console.log(`[File Not Found] ${f}`);
    }
});
