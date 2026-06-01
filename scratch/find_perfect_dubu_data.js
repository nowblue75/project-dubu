const fs = require('fs');
const path = require('path');

const logFiles = [
    'C:\\Users\\USER\\.gemini\\antigravity\\brain\\e5eec926-7fec-4ca8-93a2-119ff04bc302\\.system_generated\\logs\\transcript.jsonl',
    'C:\\Users\\USER\\.gemini\\antigravity\\brain\\9b48c1a4-cd5c-40db-8d58-872f65caa33f\\.system_generated\\logs\\transcript.jsonl',
    'C:\\Users\\USER\\.gemini\\antigravity\\brain\\ac23fb61-c55d-4de3-a56e-fa0ff0b0801b\\.system_generated\\logs\\transcript.jsonl',
    'C:\\Users\\USER\\.gemini\\antigravity\\brain\\6e088353-7f9c-4c27-8f69-f6a552f98d8f\\.system_generated\\logs\\transcript.jsonl',
    'C:\\Users\\USER\\.gemini\\antigravity\\brain\\a8fc305f-0184-4d04-8007-ba57fe73ad17\\.system_generated\\logs\\transcript.jsonl',
    'C:\\Users\\USER\\.gemini\\antigravity\\brain\\48e4b924-3036-4882-954e-eb5eed9b607d\\.system_generated\\logs\\transcript.jsonl',
    'C:\\Users\\USER\\.gemini\\antigravity\\brain\\c75feb6e-aded-4304-970d-a9831cf6b917\\.system_generated\\logs\\transcript.jsonl',
    'C:\\Users\\USER\\.gemini\\antigravity\\brain\\606129b3-ef74-4f61-b166-9901f38f3b49\\.system_generated\\logs\\transcript.jsonl',
    'C:\\Users\\USER\\.gemini\\antigravity\\brain\\5a18828b-4933-4ed1-8fcf-f9217d64c13d\\.system_generated\\logs\\transcript.jsonl',
    'C:\\Users\\USER\\.gemini\\antigravity\\brain\\fe3ba6c6-dfb9-48ac-bf2c-e5807e93ce07\\.system_generated\\logs\\transcript.jsonl'
];

console.log('=== Deep Scanning for Clean dubu_data.js in logs ===');

logFiles.forEach(logFilePath => {
    if (!fs.existsSync(logFilePath)) return;
    const sessionName = path.basename(path.dirname(path.dirname(logFilePath)));
    const content = fs.readFileSync(logFilePath, 'utf8');
    const lines = content.split('\n');

    lines.forEach((line) => {
        if (!line.trim()) return;
        try {
            const log = JSON.parse(line);
            if (log.tool_calls) {
                log.tool_calls.forEach(call => {
                    const file = (call.args?.TargetFile || '').toLowerCase();
                    if (file.includes('dubu_data.js')) {
                        const code = call.args.CodeContent || call.args.ReplacementContent || '';
                        console.log(`[${sessionName}] Step ${log.step_index} | Tool: ${call.name} | Code Length: ${code.length}`);
                        if (code.length > 50000) {
                            console.log(`  => Found potentially FULL file write!`);
                        }
                    }
                });
            }
        } catch (e) {}
    });
});
