const fs = require('fs');
const path = require('path');

async function run() {
  const dataPath = 'C:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\dubu_data.js';
  if (!fs.existsSync(dataPath)) {
    console.log("dubu_data.js not found");
    return;
  }
  
  const content = fs.readFileSync(dataPath, 'utf8');
  let cleaned = content.replace(/^\uFEFF/, '').trim();
  
  function extractBlock(name, str) {
    const regex = new RegExp(`const\\s+${name}\\s*=\\s*([\\[\\{])`);
    const match = str.match(regex);
    if (!match) {
      console.log(`Could not find ${name}`);
      return null;
    }
    const startChar = match[1];
    const startIndex = match.index + match[0].length - 1;
    
    let braceCount = 0;
    let inString = false;
    let escape = false;
    let blockStr = '';
    
    for (let i = startIndex; i < str.length; i++) {
      const char = str[i];
      blockStr += char;
      
      if (inString) {
        if (escape) {
          escape = false;
        } else if (char === '\\') {
          escape = true;
        } else if (char === '"') {
          inString = false;
        }
      } else {
        if (char === '"') {
          inString = true;
        } else if (char === '[' || char === '{') {
          braceCount++;
        } else if (char === ']' || char === '}') {
          braceCount--;
          if (braceCount === 0) {
            break;
          }
        }
      }
    }
    return blockStr;
  }

  const projectsBlock = extractBlock('PROJECTS', cleaned);
  const themesBlock = extractBlock('THEMES', cleaned);
  const ingredientBlock = extractBlock('INGREDIENT_DICT', cleaned);
  const stepsBlock = extractBlock('RECIPE_STEPS_DB', cleaned);
  
  if (projectsBlock) fs.writeFileSync('C:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\scratch\\extracted_projects.js', projectsBlock, 'utf8');
  if (themesBlock) fs.writeFileSync('C:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\scratch\\extracted_themes.js', themesBlock, 'utf8');
  if (ingredientBlock) fs.writeFileSync('C:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\scratch\\extracted_ingredients.js', ingredientBlock, 'utf8');
  if (stepsBlock) fs.writeFileSync('C:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\scratch\\extracted_steps.js', stepsBlock, 'utf8');
  
  console.log("Extraction complete!");
}

run().catch(console.error);
