const fs = require('fs');
const path = require('path');

const backupPath = path.join('C:', 'Users', 'USER', 'OneDrive', 'Desktop', '컨텐츠작업', '프로젝트 두부', '.gemini', 'extracted_recovery', 'style_portal.css_step_2202_102_TOOL_CALL_REPLACE_FILE_CONTENT.txt');

try {
    const fileContent = fs.readFileSync(backupPath, 'utf8');
    const data = JSON.parse(fileContent);
    let content = data.content || data.args.ReplacementContent;
    
    if (typeof content === 'string') {
        const prepared = content
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/\t/g, '\\t');
        const resolved = JSON.parse(prepared);
        
        const outputPath = path.join('C:', 'Users', 'USER', 'OneDrive', 'Desktop', '컨텐츠작업', '프로젝트 두부', 'scratch', 'extracted_css_2202.css');
        fs.writeFileSync(outputPath, resolved, 'utf8');
        console.log('CSS double-parsed successfully and saved to:', outputPath);
    }
} catch (e) {
    console.error('Error parsing CSS:', e);
}
