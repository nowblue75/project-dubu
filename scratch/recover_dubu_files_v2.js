const fs = require('fs');
const path = require('path');

// We only process the parent log which contains the clean and fully validated version
const logFiles = [
    'C:\\Users\\USER\\.gemini\\antigravity\\brain\\606129b3-ef74-4f61-b166-9901f38f3b49\\.system_generated\\logs\\transcript.jsonl'
];

const outputAppPath = 'c:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\dubu_app.js';
const outputDataPath = 'c:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\dubu_data.js';

console.log('Starting reconstruction v6 (Parent Log Full Replay)...');

let appMap = {};  // lineNum -> content string
let dataMap = {}; // lineNum -> content string

function parseViewFileContent(content, targetMap) {
    const lines = content.split('\n');
    let count = 0;
    for (const line of lines) {
        const match = line.match(/^(\d+):\s?(.*)$/);
        if (match) {
            const lineNum = parseInt(match[1], 10);
            const lineContent = match[2];
            targetMap[lineNum] = lineContent;
            count++;
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

for (const logFilePath of logFiles) {
    if (!fs.existsSync(logFilePath)) {
        console.log(`Log file not found: ${logFilePath}`);
        continue;
    }
    console.log(`Processing log file: ${logFilePath}`);
    const content = fs.readFileSync(logFilePath, 'utf8');
    const lines = content.split('\n');

    for (const line of lines) {
        if (!line.trim()) continue;
        try {
            const log = JSON.parse(line);
            
            // --- 1. Replay VIEW_FILE ---
            if (log.type === 'VIEW_FILE' && log.status === 'DONE') {
                const logContent = log.content || '';
                const filePathMatch = logContent.match(/File Path: `file:\/\/\/(.*)`/i);
                if (!filePathMatch) continue;
                
                const filePath = filePathMatch[1].toLowerCase();
                const isApp = filePath.includes('dubu_app.js');
                const isData = filePath.includes('dubu_data.js');
                
                if (isApp || isData) {
                    const targetMap = isApp ? appMap : dataMap;
                    parseViewFileContent(logContent, targetMap);
                }
            }
            
            // --- 2. Replay writes & edits ---
            if (log.tool_calls && log.tool_calls.length > 0) {
                for (const call of log.tool_calls) {
                    const toolName = call.name;
                    const filePath = (call.args?.TargetFile || '').toLowerCase();
                    const isApp = filePath.includes('dubu_app.js');
                    const isData = filePath.includes('dubu_data.js');
                    
                    if (!isApp && !isData) continue;
                    
                    if (toolName === 'write_to_file' && call.args?.CodeContent) {
                        const fileContent = call.args.CodeContent;
                        const fileLines = fileContent.split('\n');
                        const newMap = {};
                        for (let i = 0; i < fileLines.length; i++) {
                            newMap[i + 1] = fileLines[i];
                        }
                        if (isApp) appMap = newMap;
                        else dataMap = newMap;
                        console.log(`Replayed WRITE_TO_FILE for ${isApp ? 'app' : 'data'}.js`);
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
                        console.log(`Replayed REPLACE_FILE_CONTENT for ${isApp ? 'app' : 'data'}.js [Lines ${startLine} to ${endLine}]`);
                    }
                    else if (toolName === 'multi_replace_file_content' && call.args.ReplacementChunks) {
                        let targetArr = mapToArray(isApp ? appMap : dataMap);
                        const chunks = [...call.args.ReplacementChunks].sort((a,b) => b.StartLine - a.StartLine);
                        for (const chunk of chunks) {
                            const startLine = chunk.StartLine;
                            const endLine = chunk.EndLine;
                            const replacement = chunk.ReplacementContent || '';
                            const repLines = replacement.split('\n');
                            targetArr.splice(startLine - 1, (endLine - startLine + 1), ...repLines);
                        }
                        const newMap = arrayToMap(targetArr);
                        if (isApp) appMap = newMap;
                        else dataMap = newMap;
                        console.log(`Replayed MULTI_REPLACE_FILE_CONTENT for ${isApp ? 'app' : 'data'}.js [${chunks.length} chunks]`);
                    }
                }
            }
        } catch (e) {
            // parsing error
        }
    }
}

const appArr = mapToArray(appMap);
const dataArr = mapToArray(dataMap);

console.log(`Recovered app.js total lines: ${appArr.length}`);
console.log(`Recovered data.js total lines: ${dataArr.length}`);

// Write back if lines are reasonable
if (appArr.length > 2500) {
    fs.writeFileSync(outputAppPath, appArr.join('\n'), 'utf8');
    console.log(`Successfully wrote recovered dubu_app.js (${appArr.length} lines)`);
} else {
    console.log(`Skipped writing dubu_app.js: too short (${appArr.length} lines)`);
}

if (dataArr.length > 2500) {
    fs.writeFileSync(outputDataPath, dataArr.join('\n'), 'utf8');
    console.log(`Successfully wrote recovered dubu_data.js (${dataArr.length} lines)`);
} else {
    console.log(`Skipped writing dubu_data.js: too short (${dataArr.length} lines)`);
}
