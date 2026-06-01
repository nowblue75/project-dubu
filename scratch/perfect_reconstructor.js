const fs = require('fs');
const path = require('path');

const logFiles = [
    'C:\\Users\\USER\\.gemini\\antigravity\\brain\\606129b3-ef74-4f61-b166-9901f38f3b49\\.system_generated\\logs\\transcript.jsonl',
    'C:\\Users\\USER\\.gemini\\antigravity\\brain\\c75feb6e-aded-4304-970d-a9831cf6b917\\.system_generated\\logs\\transcript.jsonl'
];

const outputAppPath = 'c:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\dubu_app.js';
const outputDataPath = 'c:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\dubu_data.js';

console.log('--- Initiating Perfect Reconstruct Engine v1.0 ---');

let appMap = {};  // lineNum -> content string
let dataMap = {}; // lineNum -> content string

function parseViewFileContent(content, targetMap) {
    const lines = content.split('\n');
    let codeStarted = false;
    let currentLineNum = null;
    let count = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (!codeStarted) {
            if (line.includes('include a line number before every line') || line.includes('Showing lines')) {
                codeStarted = true;
            }
            continue;
        }

        // Check if this line is a line number starter: e.g. "123: some code" or "123:some code"
        const match = line.match(/^(\d+):(.*)$/);
        if (match) {
            const lineNum = parseInt(match[1], 10);
            let lineContent = match[2];
            // Remove leading space if present
            if (lineContent.startsWith(' ')) {
                lineContent = lineContent.substring(1);
            }
            targetMap[lineNum] = lineContent;
            currentLineNum = lineNum;
            count++;
        } else {
            // It's a multiline continuation of the previous line!
            if (currentLineNum !== null) {
                // If it's the end message from tool, skip it
                if (line.includes('The above content does NOT show') || line.includes('The above content shows the entire')) {
                    continue;
                }
                targetMap[currentLineNum] += '\n' + line;
            }
        }
    }
    return count;
}

function mapToArray(map) {
    const keys = Object.keys(map).map(Number).sort((a,b)=>a-b);
    if (keys.length === 0) return [];
    const maxKey = keys[keys.length - 1];
    const arr = [];
    for (let i = 1; i <= maxKey; i++) {
        arr.push(map[i] !== undefined ? map[i] : '');
    }
    return arr;
}

function arrayToMap(arr) {
    const map = {};
    for (let i = 0; i < arr.length; i++) {
        map[i + 1] = arr[i];
    }
    return map;
}

logFiles.forEach(logFilePath => {
    if (!fs.existsSync(logFilePath)) {
        console.log(`Log file not found: ${logFilePath}`);
        return;
    }
    console.log(`Processing log file: ${logFilePath}`);
    const content = fs.readFileSync(logFilePath, 'utf8');
    const lines = content.split('\n');

    lines.forEach((line, idx) => {
        if (!line.trim()) return;
        try {
            const log = JSON.parse(line);
            const stepIndex = log.step_index;

            // --- 1. Replay VIEW_FILE (Read baseline state) ---
            if (log.type === 'VIEW_FILE' && log.status === 'DONE') {
                const logContent = log.content || '';
                const toolCall = log.tool_calls?.[0] || {};
                const filePath = (toolCall.args?.AbsolutePath || '').toLowerCase();
                const isApp = filePath.includes('dubu_app.js');
                const isData = filePath.includes('dubu_data.js');

                if (isApp || isData) {
                    const targetMap = isApp ? appMap : dataMap;
                    const loadedCount = parseViewFileContent(logContent, targetMap);
                    console.log(`[Step ${stepIndex}] Loaded ${loadedCount} lines from VIEW_FILE for ${isApp ? 'app' : 'data'}.js`);
                }
            }

            // --- 2. Replay writes & edits ---
            if (log.tool_calls && log.tool_calls.length > 0) {
                log.tool_calls.forEach(call => {
                    const toolName = call.name;
                    const filePath = (call.args?.TargetFile || '').toLowerCase();
                    const isApp = filePath.includes('dubu_app.js');
                    const isData = filePath.includes('dubu_data.js');

                    if (!isApp && !isData) return;

                    if (toolName === 'write_to_file' && call.args?.CodeContent) {
                        const fileContent = call.args.CodeContent;
                        const fileLines = fileContent.split('\n');
                        const newMap = {};
                        for (let i = 0; i < fileLines.length; i++) {
                            newMap[i + 1] = fileLines[i];
                        }
                        if (isApp) appMap = newMap;
                        else dataMap = newMap;
                        console.log(`[Step ${stepIndex}] Replayed WRITE_TO_FILE for ${isApp ? 'app' : 'data'}.js (Total lines: ${fileLines.length})`);
                    }
                    else if (toolName === 'replace_file_content') {
                        const startLine = call.args.StartLine;
                        const endLine = call.args.EndLine;
                        const replacement = call.args.ReplacementContent || '';
                        const repLines = replacement.split('\n');

                        let targetArr = mapToArray(isApp ? appMap : dataMap);
                        targetArr.splice(startLine - 1, (endLine - startLine + 1), ...repLines);

                        const newMap = arrayToMap(targetArr);
                        if (isApp) appMap = newMap;
                        else dataMap = newMap;
                        console.log(`[Step ${stepIndex}] Replayed REPLACE_FILE_CONTENT for ${isApp ? 'app' : 'data'}.js [Lines ${startLine} to ${endLine}] -> Size change to ${targetArr.length}`);
                    }
                    else if (toolName === 'multi_replace_file_content' && call.args.ReplacementChunks) {
                        let targetArr = mapToArray(isApp ? appMap : dataMap);
                        // Sort chunks descending by StartLine to avoid index shift issues during splice
                        const chunks = [...call.args.ReplacementChunks].sort((a,b) => b.StartLine - a.StartLine);
                        chunks.forEach(chunk => {
                            const startLine = chunk.StartLine;
                            const endLine = chunk.EndLine;
                            const replacement = chunk.ReplacementContent || '';
                            const repLines = replacement.split('\n');
                            targetArr.splice(startLine - 1, (endLine - startLine + 1), ...repLines);
                        });
                        const newMap = arrayToMap(targetArr);
                        if (isApp) appMap = newMap;
                        else dataMap = newMap;
                        console.log(`[Step ${stepIndex}] Replayed MULTI_REPLACE_FILE_CONTENT for ${isApp ? 'app' : 'data'}.js [${chunks.length} chunks] -> Size change to ${targetArr.length}`);
                    }
                });
            }
        } catch (e) {
            // parsing error in json lines
        }
    });
});

const appArr = mapToArray(appMap);
const dataArr = mapToArray(dataMap);

console.log(`\nReconstruction finished.`);
console.log(`Final app.js total lines in memory: ${appArr.length}`);
console.log(`Final data.js total lines in memory: ${dataArr.length}`);

if (appArr.length > 500) {
    fs.writeFileSync(outputAppPath, appArr.join('\n'), 'utf8');
    console.log(`Successfully wrote recovered dubu_app.js (${appArr.length} lines)`);
} else {
    console.log(`Skipped writing dubu_app.js: too short (${appArr.length} lines)`);
}

if (dataArr.length > 500) {
    fs.writeFileSync(outputDataPath, dataArr.join('\n'), 'utf8');
    console.log(`Successfully wrote recovered dubu_data.js (${dataArr.length} lines)`);
} else {
    console.log(`Skipped writing dubu_data.js: too short (${dataArr.length} lines)`);
}
