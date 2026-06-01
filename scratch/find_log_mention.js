const fs = require('fs');
const path = require('path');

const logFiles = [
    'C:\\Users\\USER\\.gemini\\antigravity\\brain\\606129b3-ef74-4f61-b166-9901f38f3b49\\.system_generated\\logs\\transcript.jsonl',
    'C:\\Users\\USER\\.gemini\\antigravity\\brain\\c75feb6e-aded-4304-970d-a9831cf6b917\\.system_generated\\logs\\transcript.jsonl'
];

const query = 'coming-soon-glowing-core';

console.log(`Searching logs for query: "${query}"...`);

logFiles.forEach(logFilePath => {
    if (!fs.existsSync(logFilePath)) return;
    const session = path.basename(path.dirname(path.dirname(logFilePath)));
    const content = fs.readFileSync(logFilePath, 'utf8');
    const lines = content.split('\n');
    
    lines.forEach((line, idx) => {
        if (line.includes(query)) {
            try {
                const log = JSON.parse(line);
                console.log(`\n[Session: ${session}][Step: ${log.step_index}] Match found in type: ${log.type}`);
                if (log.content) {
                    console.log('--- Log Content ---');
                    console.log(log.content.substring(0, 1500));
                }
                if (log.tool_calls) {
                    console.log('--- Tool Call Arguments ---');
                    console.log(JSON.stringify(log.tool_calls, null, 2).substring(0, 1500));
                }
            } catch (e) {
                console.log(`\n[Session: ${session}][Line: ${idx}] Raw match:`);
                console.log(line.substring(line.indexOf(query) - 100, line.indexOf(query) + 600));
            }
        }
    });
});
