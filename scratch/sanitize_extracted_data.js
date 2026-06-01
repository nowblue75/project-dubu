const fs = require('fs');

function sanitizeProjects(block) {
  // Try to repair common syntax issues in projects block
  let cleaned = block;
  
  // 1. Fix missing commas between properties
  // e.g. "오븐 구움\"" isNew => "오븐 구움\", isNew"
  // Let's replace common patterns
  cleaned = cleaned.replace(/"\s*\n\s*"isNew"/g, '",\n        "isNew"');
  cleaned = cleaned.replace(/"\s*\n\s*"id"/g, '",\n        "id"');
  cleaned = cleaned.replace(/"\s*\n\s*"title"/g, '",\n        "title"');
  cleaned = cleaned.replace(/true\s*\n\s*\}\s*,\s*\{/g, 'true\n    },\n    {');
  
  // 2. We can try to parse individual objects
  // Each project object starts with { and ends with } (sometimes with trailing comma)
  // Let's use a regex to extract objects
  const objRegex = /\{\s*([^{}]+|\{[^{}]*\})+\s*\}/g;
  // Actually, since eval can run lax JS, let's write a small wrapper that turns the block into an array and evals it
  // But wait, there are broken objects (like id 36, id 18 having duplicate fields or missing brackets)
  // Let's examine the raw projectsBlock
  return cleaned;
}

async function run() {
  const pBlock = fs.readFileSync('C:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\scratch\\extracted_projects.js', 'utf8');
  const tBlock = fs.readFileSync('C:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\scratch\\extracted_themes.js', 'utf8');
  
  console.log("Projects block sample:");
  console.log(pBlock.substring(0, 1000));
}

run().catch(console.error);
