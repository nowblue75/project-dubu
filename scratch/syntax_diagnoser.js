const fs = require('fs');

function diagnoseFile(filePath) {
    console.log(`\n=== Diagnosing ${filePath} ===`);
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    console.log(`Total lines: ${lines.length}`);

    let inDoubleQuote = false;
    let inSingleQuote = false;
    let inBacktick = false;
    let escape = false;

    // Detect extremely long lines (often double-encoded garbage)
    lines.forEach((line, idx) => {
        if (line.length > 1000) {
            console.log(`[Line ${idx + 1}] WARNING: Extremely long line (${line.length} chars). Preview: ${line.substring(0, 100)}...`);
        }
    });

    // Diagnosing unescaped string bounds
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Skip comment lines
        if (line.trim().startsWith('//')) continue;
        
        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            
            if (escape) {
                escape = false;
                continue;
            }
            
            if (char === '\\') {
                escape = true;
                continue;
            }
            
            if (inDoubleQuote) {
                if (char === '"') inDoubleQuote = false;
            } else if (inSingleQuote) {
                if (char === '\'') inSingleQuote = false;
            } else if (inBacktick) {
                if (char === '`') inBacktick = false;
            } else {
                if (char === '"') inDoubleQuote = true;
                else if (char === '\'') inSingleQuote = true;
                else if (char === '`') inBacktick = true;
            }
        }
        
        // If double quote or single quote is not closed at the end of the line, that's a JS syntax error!
        // (Except backtick which is allowed to span lines)
        if (inDoubleQuote) {
            console.log(`[Line ${i + 1}] ERROR: Unclosed double quote (") at end of line. Content: ${line.trim()}`);
            inDoubleQuote = false; // Reset to prevent cascade errors
        }
        if (inSingleQuote) {
            console.log(`[Line ${i + 1}] ERROR: Unclosed single quote (') at end of line. Content: ${line.trim()}`);
            inSingleQuote = false; // Reset
        }
    }
}

diagnoseFile('dubu_app.js');
diagnoseFile('dubu_data.js');
