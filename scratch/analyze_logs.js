const fs = require('fs');
const path = require('path');

const logFiles = [
    { name: '606129b3', path: 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\606129b3-ef74-4f61-b166-9901f38f3b49\\.system_generated\\logs\\transcript.jsonl' },
    { name: 'c75feb6e', path: 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\c75feb6e-aded-4304-970d-a9831cf6b917\\.system_generated\\logs\\transcript.jsonl' }
];

console.log('--- Analyzing Logs for dubu_app.js and dubu_data.js ---');

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

            // 1. Check tool_calls (Write, Replace, MultiReplace)
            if (log.tool_calls && log.tool_calls.length > 0) {
                log.tool_calls.forEach(call => {
                    const toolName = call.name;
                    const targetFile = (call.args?.TargetFile || '').toLowerCase();
                    const isApp = targetFile.includes('dubu_app.js');
                    const isData = targetFile.includes('dubu_data.js');

                    if (isApp || isData) {
                        const fileLabel = isApp ? 'dubu_app.js' : 'dubu_data.js';
                        if (toolName === 'write_to_file') {
                            console.log(`[Step ${stepIndex}] [${fileLabel}] WRITE_TO_FILE (Overlap: ${call.args.Overwrite}, ContentLength: ${call.args.CodeContent?.length || 0})`);
                        } else if (toolName === 'replace_file_content') {
                            console.log(`[Step ${stepIndex}] [${fileLabel}] REPLACE_FILE_CONTENT (Lines: ${call.args.StartLine} - ${call.args.EndLine}, ContentLength: ${call.args.ReplacementContent?.length || 0})`);
                        } else if (toolName === 'multi_replace_file_content') {
                            const chunkDetails = call.args.ReplacementChunks?.map(c => `${c.StartLine}-${c.EndLine}`).join(', ');
                            console.log(`[Step ${stepIndex}] [${fileLabel}] MULTI_REPLACE_FILE_CONTENT (Chunks: ${chunkDetails})`);
                        }
                    }
                });
            }

            // 2. Check VIEW_FILE status
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
            // Ignore syntax error in JSON lines
        }
    });
});
