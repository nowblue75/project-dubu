const fs = require('fs');

const logFilePath = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\606129b3-ef74-4f61-b166-9901f38f3b49\\.system_generated\\logs\\transcript.jsonl';
if (!fs.existsSync(logFilePath)) {
    console.log('Log not found');
    process.exit(1);
}

const content = fs.readFileSync(logFilePath, 'utf8');
const lines = content.split('\n');

let count = 0;
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('view_file') || line.includes('dubu_app.js')) {
        try {
            const log = JSON.parse(line);
            console.log(`[Line ${i}] Step: ${log.step_index} | Type: ${log.type} | Status: ${log.status}`);
            console.log(`  Keys: ${Object.keys(log).join(', ')}`);
            if (log.tool_calls) {
                console.log(`  Tool Calls: ${JSON.stringify(log.tool_calls.map(c => ({ name: c.name, args: c.args })))}`);
            }
            count++;
            if (count > 8) break;
        } catch (e) {
            console.log(`[Line ${i}] (Parse Error) Substr: ${line.substring(0, 150)}`);
        }
    }
}
