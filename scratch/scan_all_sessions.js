const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\USER\\.gemini\\antigravity\\brain';
const output = [];

console.log('Scanning all sessions in brain folder...');

const dirs = fs.readdirSync(brainDir);

dirs.forEach(dir => {
    const logPath = path.join(brainDir, dir, '.system_generated', 'logs', 'transcript.jsonl');
    if (!fs.existsSync(logPath)) return;

    // Stat log file size to skip very small ones if wanted, but scan all is safer
    let content;
    try {
        content = fs.readFileSync(logPath, 'utf8');
    } catch (err) {
        return;
    }

    const lines = content.split('\n');
    let stepIndex = 0;
    
    lines.forEach(line => {
        if (!line.trim()) return;
        try {
            const log = JSON.parse(line);
            stepIndex = log.step_index !== undefined ? log.step_index : stepIndex;

            if (log.tool_calls && log.tool_calls.length > 0) {
                log.tool_calls.forEach(call => {
                    const toolName = call.name;
                    const targetFile = (call.args?.TargetFile || '').toLowerCase();
                    if (targetFile.includes('dubu_app.js') || targetFile.includes('dubu_data.js')) {
                        output.push({
                            session: dir,
                            step: stepIndex,
                            type: 'TOOL_CALL',
                            tool: toolName,
                            file: targetFile,
                            size: call.args.CodeContent?.length || call.args.ReplacementContent?.length || 0
                        });
                    }
                });
            }

            if (log.type === 'VIEW_FILE' && log.status === 'DONE') {
                const toolCall = log.tool_calls?.[0] || {};
                const filePath = (toolCall.args?.AbsolutePath || '').toLowerCase();
                if (filePath.includes('dubu_app.js') || filePath.includes('dubu_data.js')) {
                    output.push({
                        session: dir,
                        step: stepIndex,
                        type: 'VIEW_FILE_RESPONSE',
                        file: filePath,
                        size: log.content?.length || 0,
                        startLine: toolCall.args?.StartLine || 1,
                        endLine: toolCall.args?.EndLine || 'EOF'
                    });
                }
            }
        } catch (e) {}
    });
});

console.log(`Scan completed. Found ${output.length} records.`);
// Sort by record size descending to find full file contents
output.sort((a, b) => b.size - a.size);

// Print top 40 records
console.log('Top 40 records (by content size):');
output.slice(0, 40).forEach(r => {
    console.log(`Session: ${r.session} | Step: ${r.step} | Type: ${r.type} | Tool/Status: ${r.tool || 'VIEW_FILE'} | File: ${path.basename(r.file)} | Size: ${r.size} | Detail: ${r.startLine ? `Lines ${r.startLine}-${r.endLine}` : ''}`);
});
