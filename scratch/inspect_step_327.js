const fs = require('fs');

const logFilePath = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\c75feb6e-aded-4304-970d-a9831cf6b917\\.system_generated\\logs\\transcript.jsonl';
const content = fs.readFileSync(logFilePath, 'utf8');
const lines = content.split('\n');

for (const line of lines) {
    if (!line.trim()) continue;
    try {
        const log = JSON.parse(line);
        if (log.step_index === 327 && log.tool_calls && log.tool_calls.length > 0) {
            const call = log.tool_calls[0];
            let chunks = call.args?.ReplacementChunks;
            if (typeof chunks === 'string') {
                console.log('--- SUBSTRING 1850-1950 (JSON-escaped) ---');
                const sub = chunks.substring(1850, 1950);
                console.log(JSON.stringify(sub));
                
                console.log('--- CHAR BY CHAR ---');
                for (let i = 0; i < sub.length; i++) {
                    console.log(`[${i}] (Pos ${1850+i}): ${JSON.stringify(sub[i])} (Code: ${sub.charCodeAt(i)})`);
                }
            }
        }
    } catch (e) {
        console.error(e);
    }
}
