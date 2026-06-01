const fs = require('fs');
const path = require('path');

const logFilePath = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\606129b3-ef74-4f61-b166-9901f38f3b49\\.system_generated\\logs\\transcript.jsonl';

const targets = {
    37: 'c:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\37. 순두부녹차요거트파운드케익_완\\index.html',
    38: 'c:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\38. 순두부 얼그레이그릭스콘_완\\index.html',
    39: 'c:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\39. 순두부 쑥 찰떡브라우니_완\\index.html',
    40: 'c:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\40. 순두부 흑임자테린_완\\index.html',
    41: 'c:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\41. 순두부콩물 파운드케익_완\\index.html'
};

// 디렉토리들이 없으면 미리 생성
for (const targetPath of Object.values(targets)) {
    const dir = path.dirname(targetPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

console.log('Reading log file...');
if (!fs.existsSync(logFilePath)) {
    console.error(`Log file not found: ${logFilePath}`);
    process.exit(1);
}

const content = fs.readFileSync(logFilePath, 'utf8');
const lines = content.split('\n');
console.log(`Total log lines: ${lines.length}`);

const recovered = {};

for (const line of lines) {
    if (!line.trim()) continue;
    try {
        const log = JSON.parse(line);
        
        // 1. VIEW_FILE 도구 결과물에서 복구
        if (log.type === 'VIEW_FILE' && log.status === 'DONE') {
            const toolCall = log.tool_calls?.[0] || {};
            const filePath = toolCall.args?.AbsolutePath || '';
            
            for (const [vol, targetPath] of Object.entries(targets)) {
                const regex = new RegExp(`${vol}\\.[^\\\\/]*index\\.html`, 'i');
                if (regex.test(filePath)) {
                    const recoveredContent = log.content;
                    const cleanedCode = cleanViewFileContent(recoveredContent);
                    if (cleanedCode.trim().length > 0) {
                        recovered[vol] = cleanedCode;
                    }
                }
            }
        }
        
        // 2. WRITE_TO_FILE 이나 REPLACE/MULTI_REPLACE 에서 복구
        if (log.tool_calls && log.tool_calls.length > 0) {
            for (const call of log.tool_calls) {
                if (call.name === 'write_to_file' || call.name === 'replace_file_content' || call.name === 'multi_replace_file_content') {
                    const targetFile = call.args?.TargetFile || '';
                    
                    for (const [vol, targetPath] of Object.entries(targets)) {
                        const regex = new RegExp(`${vol}\\.[^\\\\/]*index\\.html`, 'i');
                        if (regex.test(targetFile)) {
                            // ReplacementContent 나 CodeContent 가져오기
                            const codeContent = call.args?.CodeContent || call.args?.ReplacementContent || '';
                            if (codeContent.trim().length > 0) {
                                // 만약 write_to_file 인 경우는 통째로 저장, replace 인 경우는 부분 저장될 수 있으나
                                // 대개 write_to_file 기록이 남으므로 완전한 파일일 가능성이 큼
                                recovered[vol] = codeContent;
                            }
                        }
                    }
                }
            }
        }
    } catch (e) {
        // 파싱 에러 무시
    }
}

// 복구된 코드 디스크에 저장
for (const [vol, code] of Object.entries(recovered)) {
    const targetPath = targets[vol];
    fs.writeFileSync(targetPath, code, 'utf8');
    console.log(`Successfully recovered Vol.${vol} index.html to ${targetPath} (${code.length} bytes)`);
}

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
    return codeLines.length > 0 ? codeLines.join('\n') : content;
}
