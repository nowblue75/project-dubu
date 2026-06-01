const fs = require('fs');
const readline = require('readline');

async function run() {
  const logFile = `C:\\Users\\USER\\.gemini\\antigravity\\brain\\606129b3-ef74-4f61-b166-9901f38f3b49\\.system_generated\\logs\\transcript.jsonl`;
  if (!fs.existsSync(logFile)) {
    console.log("606129b3 Log file not found");
    return;
  }
  const fileStream = fs.createReadStream(logFile);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let toolCalls = [];
  let userRequests = [];
  let modelResponses = [];

  for await (const line of rl) {
    if (!line) continue;
    try {
      const obj = JSON.parse(line);
      if (obj.type === 'USER_INPUT') {
        userRequests.push({ step: obj.step_index, content: obj.content });
      } else if (obj.tool_calls && obj.tool_calls.length > 0) {
        obj.tool_calls.forEach(tc => {
          if (tc.name === 'default_api:write_to_file' || tc.name === 'default_api:replace_file_content' || tc.name === 'default_api:multi_replace_file_content') {
            toolCalls.push({
              step: obj.step_index,
              name: tc.name,
              target: tc.arguments.TargetFile,
              desc: tc.arguments.Description,
              args: tc.arguments
            });
          }
        });
      }
    } catch (e) {}
  }

  console.log(`Total USER REQUESTS: ${userRequests.length}`);
  userRequests.forEach((ur, index) => {
    console.log(`[Req ${index + 1} / Step ${ur.step}]: ${ur.content.substring(0, 300).replace(/\r?\n/g, ' ')}`);
  });

  console.log(`\nTotal File Modify Tool Calls: ${toolCalls.length}`);
  // print the last 10 tool calls to see what was written
  const count = Math.min(toolCalls.length, 10);
  for (let i = toolCalls.length - count; i < toolCalls.length; i++) {
    console.log(`[Step ${toolCalls[i].step}]: ${toolCalls[i].name} on ${toolCalls[i].target} (${toolCalls[i].desc || 'no desc'})`);
  }
}

run().catch(console.error);
