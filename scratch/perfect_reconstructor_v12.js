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
    'C:\\Users\\USER\\.gemini\\antigravity\\brain\\606129b3-ef74-4f61-b166-9901f38f3b49\\.system_generated\\logs\\transcript.jsonl'
];

const outputAppPath = 'c:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\dubu_app.js';
const outputDataPath = 'c:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\dubu_data.js';

console.log('--- Initiating Perfect Reconstruct Engine v12.0 (Auto-Padding Engine) ---');

let appMap = {};  // lineNum -> content string
let dataMap = {}; // lineNum -> content string

function lenientParseJSON(str) {
    if (typeof str !== 'string') return str;
    
    let cleanStr = str;
    const truncIdx = str.indexOf('<truncated');
    if (truncIdx !== -1) {
        cleanStr = str.substring(0, truncIdx);
    }
    
    let inString = false;
    let escape = false;
    let result = '';
    
    for (let i = 0; i < cleanStr.length; i++) {
        const char = cleanStr[i];
        if (inString) {
            if (escape) { result += char; escape = false; }
            else if (char === '\\') { result += char; escape = true; }
            else if (char === '"') { result += char; inString = false; }
            else if (char === '\n') result += '\\n';
            else if (char === '\r') result += '\\r';
            else if (char === '\t') result += '\\t';
            else result += char;
        } else {
            if (char === '"') inString = true;
            result += char;
        }
    }
    
    let testStr = result.trim();
    for (let len = testStr.length; len > 0; len--) {
        let sub = testStr.substring(0, len).trim();
        
        const suffixes = ['', ']', '}', ']}', '"]}', '\\"]}', '"}', '"}]'];
        for (const suffix of suffixes) {
            try {
                const candidate = sub + suffix;
                const parsed = JSON.parse(candidate);
                if (Array.isArray(parsed)) {
                    return parsed;
                }
            } catch (e) {}
        }
    }
    
    return [];
}

function parseViewFileContent(content, targetMap) {
    const lines = content.split('\n');
    let currentLineNum = null;
    let count = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        const match = line.match(/^(\d+):(.*)$/);
        if (match) {
            const lineNum = parseInt(match[1], 10);
            let lineContent = match[2];
            if (lineContent.startsWith(' ')) {
                lineContent = lineContent.substring(1);
            }
            targetMap[lineNum] = lineContent;
            currentLineNum = lineNum;
            count++;
        } else {
            if (currentLineNum !== null) {
                if (line.includes('The above content does NOT show') || 
                    line.includes('The above content shows the entire') ||
                    line.includes('File Path:') ||
                    line.includes('Total Lines:') ||
                    line.includes('Total Bytes:') ||
                    line.includes('Showing lines') ||
                    line.includes('include a line number before every line')) {
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
    const sessionName = path.basename(path.dirname(path.dirname(logFilePath)));
    console.log(`\n>>> Processing session: ${sessionName} <<<`);
    
    const content = fs.readFileSync(logFilePath, 'utf8');
    const lines = content.split('\n');

    lines.forEach((line, idx) => {
        if (!line.trim()) return;
        try {
            const log = JSON.parse(line);
            const stepIndex = log.step_index;

            // --- 1. Replay VIEW_FILE ---
            if (log.type === 'VIEW_FILE' && log.status === 'DONE') {
                const logContent = log.content || '';
                const filePathMatch = logContent.match(/File Path: `file:\/\/\/(.*)`/i);
                if (filePathMatch) {
                    const filePath = filePathMatch[1].toLowerCase();
                    const isApp = filePath.includes('dubu_app.js');
                    const isData = filePath.includes('dubu_data.js');
                    
                    if (isApp || isData) {
                        const targetMap = isApp ? appMap : dataMap;
                        const loadedCount = parseViewFileContent(logContent, targetMap);
                        console.log(`[Step ${stepIndex}] Loaded ${loadedCount} lines from VIEW_FILE for ${isApp ? 'app' : 'data'}.js`);
                    }
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
                        const startLine = parseInt(call.args.StartLine, 10);
                        const endLine = parseInt(call.args.EndLine, 10);
                        const replacement = call.args.ReplacementContent || '';
                        const repLines = replacement.split('\n');

                        let targetArr = mapToArray(isApp ? appMap : dataMap);
                        
                        // Apply padding
                        if (targetArr.length < startLine - 1) {
                            while (targetArr.length < startLine - 1) {
                                targetArr.push('');
                            }
                        }

                        targetArr.splice(startLine - 1, (endLine - startLine + 1), ...repLines);

                        const newMap = arrayToMap(targetArr);
                        if (isApp) appMap = newMap;
                        else dataMap = newMap;
                        console.log(`[Step ${stepIndex}] Replayed REPLACE_FILE_CONTENT for ${isApp ? 'app' : 'data'}.js [Lines ${startLine} to ${endLine}] -> Size change to ${targetArr.length}`);
                    }
                    else if (toolName === 'multi_replace_file_content' && call.args.ReplacementChunks) {
                        let targetArr = mapToArray(isApp ? appMap : dataMap);
                        let chunks = call.args.ReplacementChunks;
                        
                        try {
                            chunks = lenientParseJSON(chunks);
                            
                            const sortedChunks = [...chunks].sort((a,b) => b.StartLine - a.StartLine);
                            sortedChunks.forEach(chunk => {
                                const startLine = parseInt(chunk.StartLine, 10);
                                const endLine = parseInt(chunk.EndLine, 10);
                                const replacement = chunk.ReplacementContent || '';
                                const repLines = replacement.split('\n');
                                
                                // Apply padding
                                if (targetArr.length < startLine - 1) {
                                    while (targetArr.length < startLine - 1) {
                                        targetArr.push('');
                                    }
                                }

                                targetArr.splice(startLine - 1, (endLine - startLine + 1), ...repLines);
                            });
                            const newMap = arrayToMap(targetArr);
                            if (isApp) appMap = newMap;
                            else dataMap = newMap;
                            console.log(`[Step ${stepIndex}] Replayed MULTI_REPLACE_FILE_CONTENT for ${isApp ? 'app' : 'data'}.js [${sortedChunks.length} chunks] -> Size change to ${targetArr.length}`);
                        } catch (chunkErr) {
                            console.log(`[Step ${stepIndex}] Failed to lenient-parse MULTI_REPLACE chunks: ${chunkErr.message}`);
                        }
                    }
                });
            }
        } catch (e) {
            console.error(`Error at step parsing:`, e);
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
}

if (dataArr.length > 500) {
    fs.writeFileSync(outputDataPath, dataArr.join('\n'), 'utf8');
    console.log(`Successfully wrote recovered dubu_data.js (${dataArr.length} lines)`);
}
