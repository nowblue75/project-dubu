const fs = require('fs');
const path = require('path');

const logFiles = [
    { name: '1. e5eec926', path: 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\e5eec926-7fec-4ca8-93a2-119ff04bc302\\.system_generated\\logs\\transcript.jsonl' },
    { name: '2. 9b48c1a4', path: 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\9b48c1a4-cd5c-40db-8d58-872f65caa33f\\.system_generated\\logs\\transcript.jsonl' },
    { name: '3. ac23fb61', path: 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\ac23fb61-c55d-4de3-a56e-fa0ff0b0801b\\.system_generated\\logs\\transcript.jsonl' },
    { name: '4. 6e088353', path: 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\6e088353-7f9c-4c27-8f69-f6a552f98d8f\\.system_generated\\logs\\transcript.jsonl' },
    { name: '5. a8fc305f', path: 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\a8fc305f-0184-4d04-8007-ba57fe73ad17\\.system_generated\\logs\\transcript.jsonl' },
    { name: '6. 48e4b924', path: 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\48e4b924-3036-4882-954e-eb5eed9b607d\\.system_generated\\logs\\transcript.jsonl' },
    { name: '7. c75feb6e', path: 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\c75feb6e-aded-4304-970d-a9831cf6b917\\.system_generated\\logs\\transcript.jsonl' },
    { name: '8. 606129b3', path: 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\606129b3-ef74-4f61-b166-9901f38f3b49\\.system_generated\\logs\\transcript.jsonl' },
    { name: '9. 5a18828b', path: 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\5a18828b-4933-4ed1-8fcf-f9217d64c13d\\.system_generated\\logs\\transcript.jsonl' },
    { name: '10. fe3ba6c6', path: 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\fe3ba6c6-dfb9-48ac-bf2c-e5807e93ce07\\.system_generated\\logs\\transcript.jsonl' }
];

console.log('--- Tracing All Sessions to Detect Dubu Edits ---');

logFiles.forEach(logFile => {
    if (!fs.existsSync(logFile.path)) {
        console.log(`Log file not found: ${logFile.name}`);
        return;
    }
    console.log(`\n================== SESSION: ${logFile.name} ==================`);
    const content = fs.readFileSync(logFile.path, 'utf8');
    const lines = content.split('\n');
    let stepIndex = 0;

    lines.forEach((line) => {
        if (!line.trim()) return;
        try {
            const log = JSON.parse(line);
            stepIndex = log.step_index !== undefined ? log.step_index : stepIndex;

            if (log.tool_calls && log.tool_calls.length > 0) {
                log.tool_calls.forEach(call => {
                    const toolName = call.name;
                    const targetFile = (call.args?.TargetFile || '').toLowerCase();
                    const isApp = targetFile.includes('dubu_app.js');
                    const isData = targetFile.includes('dubu_data.js');

                    if (isApp || isData) {
                        const fileLabel = isApp ? 'dubu_app.js' : 'dubu_data.js';
                        if (toolName === 'write_to_file') {
                            console.log(`[Step ${stepIndex}] [${fileLabel}] WRITE_TO_FILE (Overwrite: ${call.args.Overwrite}, ContentLength: ${call.args.CodeContent?.length || 0})`);
                        } else if (toolName === 'replace_file_content') {
                            console.log(`[Step ${stepIndex}] [${fileLabel}] REPLACE_FILE_CONTENT (Lines: ${call.args.StartLine} - ${call.args.EndLine}, ContentLength: ${call.args.ReplacementContent?.length || 0})`);
                        } else if (toolName === 'multi_replace_file_content') {
                            let chunks = call.args.ReplacementChunks;
                            let chunkCount = Array.isArray(chunks) ? chunks.length : 0;
                            console.log(`[Step ${stepIndex}] [${fileLabel}] MULTI_REPLACE_FILE_CONTENT (Chunks: ${chunkCount})`);
                        }
                    }
                });
            }

            if (log.type === 'VIEW_FILE' && log.status === 'DONE') {
                const toolCall = log.tool_calls?.[0] || {};
                const filePath = (toolCall.args?.AbsolutePath || '').toLowerCase();
                const isApp = filePath.includes('dubu_app.js');
                const isData = filePath.includes('dubu_data.js');
                if (isApp || isData) {
                    const fileLabel = isApp ? 'dubu_app.js' : 'dubu_data.js';
                    const startLine = toolCall.args?.StartLine || 1;
                    const endLine = toolCall.args?.EndLine || 'EOF';
                    console.log(`[Step ${stepIndex}] [${fileLabel}] VIEW_FILE (Read Lines: ${startLine} - ${endLine}, OutputLength: ${log.content?.length || 0})`);
                }
            }
        } catch (e) {
            // ignore
        }
    });
});
