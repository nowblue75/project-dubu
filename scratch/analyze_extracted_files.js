const fs = require('fs');
const path = require('path');

const extractedDir = 'c:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\.gemini\\extracted_recovery_all';
if (!fs.existsSync(extractedDir)) {
    console.log('Extracted recovery directory not found.');
    process.exit(1);
}

const files = fs.readdirSync(extractedDir);
console.log(`Total extracted recovery files: ${files.length}`);

const sessionSummary = {};

files.forEach(file => {
    // Filename format: [session]_[target]_[step]_[index]_[type].txt
    // e.g. 606129b3_dubu_app.js_step_1000_62_TOOL_CALL_REPLACE_FILE_CONTENT.txt
    const parts = file.split('_');
    if (parts.length < 5) return;
    
    const session = parts[0];
    // Find target (could be dubu_app.js, dubu_data.js, index.html, style_portal.css)
    let target = '';
    if (file.includes('dubu_app.js')) target = 'dubu_app.js';
    else if (file.includes('dubu_data.js')) target = 'dubu_data.js';
    else if (file.includes('index.html')) target = 'index.html';
    else if (file.includes('style_portal.css')) target = 'style_portal.css';
    else target = 'other';

    let type = '';
    if (file.includes('TOOL_CALL_REPLACE_FILE_CONTENT')) type = 'REPLACE';
    else if (file.includes('TOOL_CALL_MULTI_REPLACE_FILE_CONTENT')) type = 'MULTI_REPLACE';
    else if (file.includes('TOOL_CALL_VIEW_FILE')) type = 'VIEW_CALL';
    else if (file.includes('LOG_CONTENT_MATCH')) type = 'LOG_MATCH';
    else type = 'other';

    if (!sessionSummary[session]) {
        sessionSummary[session] = {
            total: 0,
            targets: {}
        };
    }
    
    sessionSummary[session].total++;
    if (!sessionSummary[session].targets[target]) {
        sessionSummary[session].targets[target] = {
            total: 0,
            types: {}
        };
    }
    sessionSummary[session].targets[target].total++;
    sessionSummary[session].targets[target].types[type] = (sessionSummary[session].targets[target].types[type] || 0) + 1;
});

console.log('\n--- Session Recovery Files Summary ---');
for (const [session, data] of Object.entries(sessionSummary)) {
    console.log(`\nSession: ${session} (Total Files: ${data.total})`);
    for (const [target, tData] of Object.entries(data.targets)) {
        console.log(`  * ${target} (Files: ${tData.total})`);
        console.log(`    Types: ${JSON.stringify(tData.types)}`);
    }
}
