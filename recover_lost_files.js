const fs = require('fs');
const path = require('path');

const logFilePath = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\606129b3-ef74-4f61-b166-9901f38f3b49\\.system_generated\\logs\\transcript.jsonl';
const targetMugwortPath = 'c:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\39. 순두부 쑥 찰떡브라우니_완\\index.html';
const targetSesamePath = 'c:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\40. 순두부 흑임자테린_완\\index.html';

// 디렉토리가 없으면 생성
const mugwortDir = path.dirname(targetMugwortPath);
const sesameDir = path.dirname(targetSesamePath);
if (!fs.existsSync(mugwortDir)) fs.mkdirSync(mugwortDir, { recursive: true });
if (!fs.existsSync(sesameDir)) fs.mkdirSync(sesameDir, { recursive: true });

console.log('Reading log file...');
const content = fs.readFileSync(logFilePath, 'utf8');
const lines = content.split('\n');
console.log(`Total log lines: ${lines.length}`);

let mugwortCount = 0;
let sesameCount = 0;

for (const line of lines) {
    if (!line.trim()) continue;
    try {
        const log = JSON.parse(line);
        
        // 1. VIEW_FILE 도구 결과물에서 복구 (정규식 매칭)
        if (log.type === 'VIEW_FILE' && log.status === 'DONE') {
            const toolCall = log.tool_calls?.[0] || {};
            const filePath = toolCall.args?.AbsolutePath || '';
            
            if (/39\.[^\\/]*index\.html/i.test(filePath)) {
                const recoveredContent = log.content;
                const cleanedCode = cleanViewFileContent(recoveredContent);
                if (cleanedCode.trim().length > 0) {
                    fs.writeFileSync(targetMugwortPath, cleanedCode, 'utf8');
                    mugwortCount++;
                }
            }
            if (/40\.[^\\/]*index\.html/i.test(filePath)) {
                const recoveredContent = log.content;
                const cleanedCode = cleanViewFileContent(recoveredContent);
                if (cleanedCode.trim().length > 0) {
                    fs.writeFileSync(targetSesamePath, cleanedCode, 'utf8');
                    sesameCount++;
                }
            }
        }
        
        // 2. WRITE_TO_FILE 도구 호출의 CodeContent 인자에서 복구 (정규식 매칭)
        if (log.tool_calls && log.tool_calls.length > 0) {
            for (const call of log.tool_calls) {
                if (call.name === 'write_to_file' || call.name === 'replace_file_content' || call.name === 'multi_replace_file_content') {
                    const targetFile = call.args?.TargetFile || '';
                    
                    if (/39\.[^\\/]*index\.html/i.test(targetFile)) {
                        const codeContent = call.args?.CodeContent || call.args?.ReplacementContent || '';
                        if (codeContent.trim().length > 0) {
                            fs.writeFileSync(targetMugwortPath, codeContent, 'utf8');
                            mugwortCount++;
                        }
                    }
                    if (/40\.[^\\/]*index\.html/i.test(targetFile)) {
                        const codeContent = call.args?.CodeContent || call.args?.ReplacementContent || '';
                        if (codeContent.trim().length > 0) {
                            fs.writeFileSync(targetSesamePath, codeContent, 'utf8');
                            sesameCount++;
                        }
                    }
                }
            }
        }
    } catch (e) {
        // 파싱 에러 무시
    }
}

console.log(`Recovery finished. Restored 39 count: ${mugwortCount}, 40 count: ${sesameCount}`);

function cleanViewFileContent(content) {
    const lines = content.split('\n');
    const codeLines = [];
    let codeStarted = false;
    for (const line of lines) {
        if (codeStarted) {
            const match = line.match(/^\d+:\s?(.*)$/);
            if (match) {
                codeLines.push(match[1]);
            } else if (line.trim() === '') {
                codeLines.push('');
            }
        } else if (line.includes('The following code has been modified to include a line number before every line')) {
            codeStarted = true;
        }
    }
    return codeLines.join('\n');
}
