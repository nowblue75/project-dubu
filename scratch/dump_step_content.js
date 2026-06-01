const fs = require('fs');

const logFilePath = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\606129b3-ef74-4f61-b166-9901f38f3b49\\.system_generated\\logs\\transcript.jsonl';
if (!fs.existsSync(logFilePath)) {
    console.log('Log not found');
    process.exit(1);
}

const content = fs.readFileSync(logFilePath, 'utf8');
const lines = content.split('\n');

lines.forEach((line) => {
    if (!line.trim()) return;
    try {
        const log = JSON.parse(line);
        if (log.step_index === 720 && log.tool_calls) {
            console.log(`=== STEP 720 TOOL_CALLS ===`);
            console.log(JSON.stringify(log.tool_calls, null, 2));
        }
    } catch (e) {}
});
