const fs = require('fs');
const path = require('path');

const backupDirs = [
    'c:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\.gemini\\extracted_recovery',
    'c:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\.gemini\\extracted_recovery_all'
];

const outputAppPath = 'c:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\dubu_app.js';
const outputDataPath = 'c:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\dubu_data.js';

console.log('--- Initiating Perfect Reconstruct Engine v9.0 (Local File Replay) ---');

// Chronological order of sessions
const sessionOrder = [
    'e5eec926',
    '9b48c1a4',
    'ac23fb61',
    '6e088353',
    'a8fc305f',
    '48e4b924',
    'c75feb6e',
    '606129b3' // final clean state
];

let appMap = {};  // lineNum -> content string
let dataMap = {}; // lineNum -> content string

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

// 1. Gather all files across directories
const allFiles = [];

backupDirs.forEach(dir => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    files.forEach(f => {
        allFiles.push({ name: f, dir: dir, path: path.join(dir, f) });
    });
});

// 2. Parse filenames and filter
const parsedRecords = [];

allFiles.forEach(f => {
    // Expected formats: 
    // [session]_[target]_step_[stepIndex]_[index]_[type].txt
    // e.g. 606129b3_dubu_app.js_step_1000_62_TOOL_CALL_REPLACE_FILE_CONTENT.txt
    const basename = f.name;
    const match = basename.match(/^([a-f0-9]+)_(dubu_app\.js|dubu_data\.js)_step_(\d+)_(\d+)_(TOOL_CALL_[A-Z_]+|LOG_CONTENT_MATCH)\.txt$/i);
    if (match) {
        const session = match[1];
        const target = match[2].toLowerCase();
        const stepIndex = parseInt(match[3], 10);
        const fileIndex = parseInt(match[4], 10);
        const type = match[5].toUpperCase();
        
        parsedRecords.push({
            session: session,
            target: target,
            stepIndex: stepIndex,
            fileIndex: fileIndex,
            type: type,
            file: f
        });
    }
});

// 3. Sort chronologically
parsedRecords.sort((a, b) => {
    // First, sort by session order
    const aSessionIdx = sessionOrder.indexOf(a.session.substring(0, 8));
    const bSessionIdx = sessionOrder.indexOf(b.session.substring(0, 8));
    
    if (aSessionIdx !== bSessionIdx) {
        return aSessionIdx - bSessionIdx;
    }
    
    // Within same session, sort by stepIndex
    if (a.stepIndex !== b.stepIndex) {
        return a.stepIndex - b.stepIndex;
    }
    
    // Then sort by fileIndex
    return a.fileIndex - b.fileIndex;
});

console.log(`Sorted ${parsedRecords.length} records for replay.`);

// 4. Group records by step to match TOOL_CALL and its corresponding LOG_CONTENT_MATCH
const steps = {};

parsedRecords.forEach(r => {
    const key = `${r.session}_${r.target}_${r.stepIndex}_${r.fileIndex}`;
    if (!steps[key]) {
        steps[key] = {
            session: r.session,
            target: r.target,
            stepIndex: r.stepIndex,
            fileIndex: r.fileIndex
        };
    }
    if (r.type.startsWith('TOOL_CALL')) {
        steps[key].toolCall = r;
    } else if (r.type === 'LOG_CONTENT_MATCH') {
        steps[key].logMatch = r;
    }
});

// Re-sort the grouped steps
const sortedKeys = Object.keys(steps).sort((a, b) => {
    const sa = steps[a];
    const sb = steps[b];
    const aSessionIdx = sessionOrder.indexOf(sa.session.substring(0, 8));
    const bSessionIdx = sessionOrder.indexOf(sb.session.substring(0, 8));
    
    if (aSessionIdx !== bSessionIdx) {
        return aSessionIdx - bSessionIdx;
    }
    if (sa.stepIndex !== sb.stepIndex) {
        return sa.stepIndex - sb.stepIndex;
    }
    return sa.fileIndex - sb.fileIndex;
});

console.log(`Replaying ${sortedKeys.length} operations...`);

// 5. Execute replay
sortedKeys.forEach(key => {
    const op = steps[key];
    if (!op.toolCall) return; // Must have tool call to know what to do
    
    const targetMap = op.target === 'dubu_app.js' ? appMap : dataMap;
    const isApp = op.target === 'dubu_app.js';
    
    let callData;
    try {
        const rawContent = fs.readFileSync(op.toolCall.file.path, 'utf8');
        callData = JSON.parse(rawContent);
    } catch (e) {
        console.error(`Failed to parse tool call file ${op.toolCall.file.name}:`, e);
        return;
    }

    const toolType = op.toolCall.type;
    
    if (toolType === 'TOOL_CALL_VIEW_FILE') {
        // VIEW_FILE needs logMatch for the actual content
        if (op.logMatch) {
            try {
                let viewContent = fs.readFileSync(op.logMatch.file.path, 'utf8');
                // LOG_CONTENT_MATCH might be JSON if it's raw logs dump, parse it
                try {
                    const matchJSON = JSON.parse(viewContent);
                    viewContent = matchJSON.content || viewContent;
                } catch(errJSON) {}
                
                const loaded = parseViewFileContent(viewContent, targetMap);
                console.log(`[Session ${op.session}] [Step ${op.stepIndex}] Loaded ${loaded} lines from VIEW_FILE for ${op.target}`);
            } catch (err) {
                console.error(`Failed to load VIEW_FILE content for ${op.toolCall.file.name}:`, err);
            }
        }
    } 
    else if (toolType === 'TOOL_CALL_REPLACE_FILE_CONTENT') {
        const args = callData.args || {};
        const startLine = parseInt(args.StartLine, 10);
        const endLine = parseInt(args.EndLine, 10);
        let replacement = args.ReplacementContent || '';
        
        // Strip string quotes if double-encoded
        if (replacement.startsWith('"') && replacement.endsWith('"')) {
            try {
                replacement = JSON.parse(replacement);
            } catch(e) {}
        }
        
        const repLines = replacement.split('\n');
        let targetArr = mapToArray(targetMap);
        targetArr.splice(startLine - 1, (endLine - startLine + 1), ...repLines);
        
        const newMap = arrayToMap(targetArr);
        if (isApp) appMap = newMap;
        else dataMap = newMap;
        console.log(`[Session ${op.session}] [Step ${op.stepIndex}] Replayed REPLACE [Lines ${startLine}-${endLine}] for ${op.target} -> Size: ${targetArr.length}`);
    } 
    else if (toolType === 'TOOL_CALL_MULTI_REPLACE_FILE_CONTENT') {
        const args = callData.args || {};
        let chunks = args.ReplacementChunks;
        
        if (typeof chunks === 'string') {
            try {
                // simple unescape of stringified json
                chunks = JSON.parse(chunks);
            } catch(err) {
                // Apply safe scanner
                let resultStr = '';
                let inStr = false;
                let esc = false;
                for (let i = 0; i < chunks.length; i++) {
                    const c = chunks[i];
                    if (inStr) {
                        if (esc) { resultStr += c; esc = false; }
                        else if (c === '\\') { resultStr += c; esc = true; }
                        else if (c === '"') { resultStr += c; inStr = false; }
                        else if (c === '\n') resultStr += '\\n';
                        else if (c === '\r') resultStr += '\\r';
                        else if (c === '\t') resultStr += '\\t';
                        else resultStr += c;
                    } else {
                        if (c === '"') inStr = true;
                        resultStr += c;
                    }
                }
                chunks = JSON.parse(resultStr);
            }
        }
        
        if (Array.isArray(chunks)) {
            let targetArr = mapToArray(targetMap);
            const sortedChunks = [...chunks].sort((a,b) => b.StartLine - a.StartLine);
            sortedChunks.forEach(chunk => {
                const startLine = parseInt(chunk.StartLine, 10);
                const endLine = parseInt(chunk.EndLine, 10);
                let replacement = chunk.ReplacementContent || '';
                
                if (replacement.startsWith('"') && replacement.endsWith('"')) {
                    try { replacement = JSON.parse(replacement); } catch(e) {}
                }
                
                const repLines = replacement.split('\n');
                targetArr.splice(startLine - 1, (endLine - startLine + 1), ...repLines);
            });
            const newMap = arrayToMap(targetArr);
            if (isApp) appMap = newMap;
            else dataMap = newMap;
            console.log(`[Session ${op.session}] [Step ${op.stepIndex}] Replayed MULTI_REPLACE (${sortedChunks.length} chunks) for ${op.target} -> Size: ${targetArr.length}`);
        } else {
            console.warn(`[Session ${op.session}] [Step ${op.stepIndex}] Skipped MULTI_REPLACE: chunks is not array`);
        }
    }
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
