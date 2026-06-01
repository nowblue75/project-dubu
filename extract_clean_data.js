const fs = require('fs');
const path = require('path');

const brainDirs = [
    'e5eec926-7fec-4ca8-93a2-119ff04bc302',
    '9b48c1a4-cd5c-40db-8d58-872f65caa33f',
    'ac23fb61-c55d-4de3-a56e-fa0ff0b0801b',
    '6e088353-7f9c-4c27-8f69-f6a552f98d8f',
    'a8fc305f-0184-4d04-8007-ba57fe73ad17',
    '48e4b924-3036-4882-954e-eb5eed9b607d',
    'c75feb6e-aded-4304-970d-a9831cf6b917',
    '606129b3-ef74-4f61-b166-9901f38f3b49',
    '5a18828b-4933-4ed1-8fcf-f9217d64c13d',
    'fe3ba6c6-dfb9-48ac-bf2c-e5807e93ce07'
];

console.log('Searching for clean data and scripts in logs...');

brainDirs.forEach(dirId => {
    const logPath = `C:\\Users\\USER\\.gemini\\antigravity\\brain\\${dirId}\\.system_generated\\logs\\transcript.jsonl`;
    if (!fs.existsSync(logPath)) return;

    const content = fs.readFileSync(logPath, 'utf8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
        if (!line.trim()) return;
        try {
            // 이스케이프 문자나 파싱 에러 방지를 위해 간단한 string 검사 먼저 수행
            if (line.includes('dubu_data.js') && line.length > 5000) {
                const log = JSON.parse(line);
                console.log(`[Found dubu_data in ${dirId} at step ${log.step_index}] Length: ${line.length}`);
                
                // CodeContent 나 ReplacementContent 추출
                let code = '';
                const toolCall = log.tool_calls?.[0] || {};
                if (toolCall.args) {
                    code = toolCall.args.CodeContent || toolCall.args.ReplacementContent || '';
                }
                
                if (code) {
                    const outPath = `dubu_data_extracted_${dirId.substring(0,8)}_step${log.step_index}.js`;
                    fs.writeFileSync(outPath, code, 'utf8');
                    console.log(`  => Extracted data to: ${outPath} (${code.length} chars)`);
                }
            }

            if (line.includes('dubu_app.js') && line.length > 10000) {
                const log = JSON.parse(line);
                console.log(`[Found dubu_app in ${dirId} at step ${log.step_index}] Length: ${line.length}`);
                
                let code = '';
                const toolCall = log.tool_calls?.[0] || {};
                if (toolCall.args) {
                    code = toolCall.args.CodeContent || toolCall.args.ReplacementContent || '';
                }
                
                if (code) {
                    const outPath = `dubu_app_extracted_${dirId.substring(0,8)}_step${log.step_index}.js`;
                    fs.writeFileSync(outPath, code, 'utf8');
                    console.log(`  => Extracted app to: ${outPath} (${code.length} chars)`);
                }
            }
        } catch (e) {
            // ignore
        }
    });
});
