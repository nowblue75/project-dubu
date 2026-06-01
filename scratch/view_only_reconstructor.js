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

console.log('--- View-Only Reconstruct Engine ---');

let appMap = {};
let dataMap = {};

function parseViewFileContent(content, targetMap) {
    const lines = content.split('\n');
    let currentLineNum = null;
    let count = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (line.includes('<truncated') || line.includes('truncated bytes')) {
            continue;
        }

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

logFiles.forEach(logFilePath => {
    if (!fs.existsSync(logFilePath)) {
        return;
    }
    const sessionName = path.basename(path.dirname(path.dirname(logFilePath)));
    const content = fs.readFileSync(logFilePath, 'utf8');
    const lines = content.split('\n');

    lines.forEach((line) => {
        if (!line.trim()) return;
        try {
            const log = JSON.parse(line);
            const stepIndex = log.step_index;

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
                        console.log(`[Session ${sessionName}][Step ${stepIndex}] Loaded ${loadedCount} lines from VIEW_FILE for ${isApp ? 'app' : 'data'}.js`);
                    }
                }
            }
        } catch (e) {}
    });
});

const appArr = mapToArray(appMap);
const dataArr = mapToArray(dataMap);

console.log(`\nView-Only Reconstruction finished.`);
console.log(`Final app.js lines in memory: ${appArr.length}`);
console.log(`Final data.js lines in memory: ${dataArr.length}`);

// Fix potential unicode BOM
if (appArr.length > 0) appArr[0] = appArr[0].replace(/^[^\w\/\*\{\(\[\"\'`\-]+/, '');
if (dataArr.length > 0) dataArr[0] = dataArr[0].replace(/^[^\w\/\*\{\(\[\"\'`\-]+/, '');

fs.writeFileSync(outputAppPath + '.view', appArr.join('\n'), 'utf8');
fs.writeFileSync(outputDataPath + '.view', dataArr.join('\n'), 'utf8');
console.log('Saved to .view temporary files.');
