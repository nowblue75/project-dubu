const fs = require('fs');
const readline = require('readline');

async function run() {
  const logFile = `C:\\Users\\USER\\.gemini\\antigravity\\brain\\fe3ba6c6-dfb9-48ac-bf2c-e5807e93ce07\\.system_generated\\logs\\transcript.jsonl`;
  if (!fs.existsSync(logFile)) {
    console.log("fe3ba6c6 Log file not found");
    return;
  }
  const fileStream = fs.createReadStream(logFile);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let plannerResponses = [];
  for await (const line of rl) {
    if (!line) continue;
    try {
      const obj = JSON.parse(line);
      if (obj.source === 'MODEL' && obj.content) {
        const text = obj.content.trim();
        // Skip huge code segments or JSON, focus on explanatory text
        if (!text.startsWith('{') && !text.startsWith('[') && text.length > 500 && text.length < 15000) {
          plannerResponses.push({
            step: obj.step_index,
            content: text
          });
        }
      }
    } catch (e) {}
  }

  console.log(`Found ${plannerResponses.length} potential report responses.`);
  // print the last 3 potential report responses
  const count = Math.min(plannerResponses.length, 3);
  for (let i = plannerResponses.length - count; i < plannerResponses.length; i++) {
    console.log(`\n=================== RESPONSE (Step ${plannerResponses[i].step}) ===================`);
    console.log(plannerResponses[i].content);
  }
}

run().catch(console.error);
