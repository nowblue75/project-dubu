const fs = require('fs');
const path = require('path');

const logFiles = [
    'C:\\Users\\USER\\.gemini\\antigravity\\brain\\606129b3-ef74-4f61-b166-9901f38f3b49\\.system_generated\\logs\\transcript.jsonl',
    'C:\\Users\\USER\\.gemini\\antigravity\\brain\\c75feb6e-aded-4304-970d-a9831cf6b917\\.system_generated\\logs\\transcript.jsonl'
];

const outputAppPath = 'c:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\dubu_app.js';
const outputDataPath = 'c:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\dubu_data.js';

console.log('Starting cross-conversation reconstruction...');

let appLines = [];
let dataLines = [];

function cleanViewFileContent(content) {
    const lines = content.split('\n');
    const codeLines = [];
    let codeStarted = false;
    for (const line of lines) {
        if (codeStarted) {
            const match = line.match(/^\d+:\s?(.*)$/);
            if (match) {
                codeLines.push(match[1]);
            } else if (line.trim() === '' && codeLines.length > 0) {
                codeLines.push('');
            }
        } else if (line.includes('include a line number before every line') || line.includes('Showing lines')) {
            codeStarted = true;
        }
    }
    if (codeLines.length === 0 && content.trim()) {
        return content.split('\n');
    }
    return codeLines;
}

for (const logFilePath of logFiles) {
    if (!fs.existsSync(logFilePath)) {
        console.log(`Log file not found: ${logFilePath}`);
        continue;
    }
    console.log(`Processing log file: ${logFilePath}`);
    const content = fs.readFileSync(logFilePath, 'utf8');
    const lines = content.split('\n');
    console.log(`Read ${lines.length} lines.`);

    for (const line of lines) {
        if (!line.trim()) continue;
        try {
            const log = JSON.parse(line);
            
            // --- Replay VIEW_FILE ---
            if (log.type === 'VIEW_FILE' && log.status === 'DONE') {
                const toolCall = log.tool_calls?.[0] || {};
                const filePath = (toolCall.args?.AbsolutePath || '').toLowerCase();
                const startLine = toolCall.args?.StartLine || 1;
                
                const isApp = filePath.includes('dubu_app.js');
                const isData = filePath.includes('dubu_data.js');
                
                if (isApp || isData) {
                    const recoveredLines = cleanViewFileContent(log.content);
                    const targetArray = isApp ? appLines : dataLines;
                    
                    for (let i = 0; i < recoveredLines.length; i++) {
                        targetArray[startLine - 1 + i] = recoveredLines[i];
                    }
                }
            }
            
            // --- Replay writes ---
            if (log.tool_calls && log.tool_calls.length > 0) {
                for (const call of log.tool_calls) {
                    const toolName = call.name;
                    const filePath = (call.args?.TargetFile || '').toLowerCase();
                    const isApp = filePath.includes('dubu_app.js');
                    const isData = filePath.includes('dubu_data.js');
                    
                    if (!isApp && !isData) continue;
                    const targetArray = isApp ? appLines : dataLines;
                    
                    if (toolName === 'write_to_file' && call.args?.CodeContent) {
                        const fileContent = call.args.CodeContent;
                        const newLines = fileContent.split('\n');
                        if (isApp) appLines = newLines;
                        else dataLines = newLines;
                    } 
                    else if (toolName === 'replace_file_content') {
                        const startLine = call.args.StartLine;
                        const endLine = call.args.EndLine;
                        const replacement = call.args.ReplacementContent || '';
                        const repLines = replacement.split('\n');
                        targetArray.splice(startLine - 1, (endLine - startLine + 1), ...repLines);
                    } 
                    else if (toolName === 'multi_replace_file_content' && call.args.ReplacementChunks) {
                        const chunks = [...call.args.ReplacementChunks].sort((a,b) => b.StartLine - a.StartLine);
                        for (const chunk of chunks) {
                            const startLine = chunk.StartLine;
                            const endLine = chunk.EndLine;
                            const replacement = chunk.ReplacementContent || '';
                            const repLines = replacement.split('\n');
                            targetArray.splice(startLine - 1, (endLine - startLine + 1), ...repLines);
                        }
                    }
                }
            }
        } catch (e) {
            // parsing error
        }
    }
}

// Clean up arrays
for (let i = 0; i < appLines.length; i++) {
    if (appLines[i] === undefined) appLines[i] = '';
}
for (let i = 0; i < dataLines.length; i++) {
    if (dataLines[i] === undefined) dataLines[i] = '';
}

console.log(`Final appLines count: ${appLines.length}`);
console.log(`Final dataLines count: ${dataLines.length}`);

if (appLines.length > 2500) {
    fs.writeFileSync(outputAppPath, appLines.join('\n'), 'utf8');
    console.log(`Successfully restored dubu_app.js (lines: ${appLines.length})`);
} else {
    console.log(`Warning: Reconstruction appLines count (${appLines.length}) is too low, skipping write.`);
}

if (dataLines.length > 2500) {
    fs.writeFileSync(outputDataPath, dataLines.join('\n'), 'utf8');
    console.log(`Successfully restored dubu_data.js (lines: ${dataLines.length})`);
} else {
    console.log(`Warning: Reconstruction dataLines count (${dataLines.length}) is too low, skipping write.`);
}
