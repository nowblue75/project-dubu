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
    'C:\\Users\\USER\\.gemini\\antigravity\\brain\\606129b3-ef74-4f61-b166-9901f38f3b49\\.system_generated\\logs\\transcript.jsonl',
    'C:\\Users\\USER\\.gemini\\antigravity\\brain\\5a18828b-4933-4ed1-8fcf-f9217d64c13d\\.system_generated\\logs\\transcript.jsonl',
    'C:\\Users\\USER\\.gemini\\antigravity\\brain\\fe3ba6c6-dfb9-48ac-bf2c-e5807e93ce07\\.system_generated\\logs\\transcript.jsonl'
];

const targetFunctions = [
    'rotateHeroSlide',
    'getRecipeTheme',
    'openFocusStage',
    'onFocusAnchorChange',
    'downloadRecipeCard',
    'triggerPageConfetti'
];

async function run() {
  console.log("=== APP FUNCTIONS EXTRACTOR ===");
  
  let extractedCodes = {};
  targetFunctions.forEach(fn => {
    extractedCodes[fn] = [];
  });

  logFiles.forEach(logFile => {
    if (!fs.existsSync(logFile)) return;
    const parts = logFile.split(path.sep);
    const brainIdx = parts.findIndex(p => p.toLowerCase() === 'brain');
    let sessionName = 'unknown';
    if (brainIdx !== -1 && brainIdx + 1 < parts.length) {
      sessionName = parts[brainIdx + 1];
    }

    const content = fs.readFileSync(logFile, 'utf8');
    const lines = content.split('\n');

    lines.forEach((line, idx) => {
      if (!line.trim()) return;
      try {
        const obj = JSON.parse(line);
        if (obj.tool_calls && obj.tool_calls.length > 0) {
          obj.tool_calls.forEach(tc => {
            const file = (tc.args?.TargetFile || '').toLowerCase();
            const name = tc.name;
            if (!file.includes('dubu_app.js')) return;

            let code = tc.args.CodeContent || tc.args.ReplacementContent || '';
            // For multi_replace
            if (tc.args.ReplacementChunks) {
              // Extract all chunks contents
              const chunks = tc.args.ReplacementChunks;
              // Simple extraction of ReplacementContent from JSON array string
              // Using a regex to pull out replacement contents
              const matchAll = chunks.match(/"ReplacementContent"\s*:\s*"((?:[^"\\]|\\.)*)"/g);
              if (matchAll) {
                matchAll.forEach(m => {
                  const contentMatch = m.match(/"ReplacementContent"\s*:\s*"((?:[^"\\]|\\.)*)"/);
                  if (contentMatch) {
                    // Unescape JSON string
                    try {
                      code += JSON.parse(`"${contentMatch[1]}"`) + '\n';
                    } catch (e) {}
                  }
                });
              }
            }

            if (!code) return;

            targetFunctions.forEach(fn => {
              if (code.includes(`function ${fn}`) || code.includes(`${fn}(`)) {
                // Determine block depth to extract function block if code contains a lot of other things
                // But if it's a replacement content, we can save the whole snippet
                extractedCodes[fn].push({
                  session: sessionName,
                  step: obj.step_index,
                  tool: name,
                  length: code.length,
                  code
                });
              }
            });
          });
        }
      } catch (e) {}
    });
  });

  targetFunctions.forEach(fn => {
    console.log(`\n>>> Function: ${fn} (Total matches: ${extractedCodes[fn].length}) <<<`);
    // print unique lengths and session/steps
    extractedCodes[fn].forEach((m, idx) => {
      console.log(` [${idx+1}] Session: ${m.session}, Step: ${m.step}, Tool: ${m.tool}, Length: ${m.length} chars`);
    });

    // Save the longest one as a potential best source
    if (extractedCodes[fn].length > 0) {
      // Sort by length descending
      extractedCodes[fn].sort((a, b) => b.length - a.length);
      const best = extractedCodes[fn][0];
      fs.writeFileSync(`C:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\scratch\\best_${fn}.js`, best.code, 'utf8');
      console.log(`Saved best candidate to scratch\\best_${fn}.js`);
    }
  });
}

run().catch(console.error);
