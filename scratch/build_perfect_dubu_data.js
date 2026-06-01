const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function run() {
  const extProjectsPath = 'C:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\scratch\\extracted_projects.js';
  const extThemesPath = 'C:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\scratch\\extracted_themes.js';
  const extIngredientsPath = 'C:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\scratch\\extracted_ingredients.js';
  const extStepsPath = 'C:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\scratch\\extracted_steps.js';

  console.log('--- dubu_data.js Re-Builder Engine (Clean Room Rebuild v3.0) ---');

  function cleanJsContent(code) {
    let cleaned = code;
    const keys = ["id", "title", "noOven", "noFlour", "noButter", "oneBowl", "desc", "path", "img", "calcPath", "isInteractive", "blogUrl", "categories", "pairing", "time", "emotionalQuote", "troubleShoot", "isNew"];
    
    keys.forEach(k => {
      const regex1 = new RegExp(`(true|false|"[^"]*")\\s*\\n\\s*"${k}"\\s*:`, 'g');
      cleaned = cleaned.replace(regex1, (match, p1) => `${p1},\n        "${k}":`);
      const regex2 = new RegExp(`(true|false|"[^"]*")\\s*\\n\\s*${k}\\s*:`, 'g');
      cleaned = cleaned.replace(regex2, (match, p1) => `${p1},\n        "${k}":`);
    });
    return cleaned;
  }

  function extractJsonBlock(str, prefix) {
    const idx = str.indexOf(prefix);
    if (idx === -1) return null;
    const startIndex = idx + prefix.length - 1;
    let braceCount = 0;
    let inString = false;
    let escape = false;
    let blockStr = '';
    
    for (let i = startIndex; i < str.length; i++) {
      const char = str[i];
      blockStr += char;
      if (inString) {
        if (escape) escape = false;
        else if (char === '\\') escape = true;
        else if (char === '"') inString = false;
      } else {
        if (char === '"') inString = true;
        else if (char === '[' || char === '{') braceCount++;
        else if (char === ']' || char === '}') {
          braceCount--;
          if (braceCount === 0) break;
        }
      }
    }
    return blockStr;
  }

  // 2. Load index.html directly from git using execSync with UTF-8 encoding
  let projects418 = [];
  try {
    const htmlContent = execSync('git show 957e2c4:index.html', { encoding: 'utf8' });
    const block = extractJsonBlock(htmlContent, 'const PROJECTS = [');
    if (block) {
      projects418 = eval("(" + block + ")");
      console.log(`Successfully extracted ${projects418.length} clean recipes from April 18 index.html directly via Git`);
    } else {
      console.log("Could not locate PROJECTS block in April 18 index.html");
    }
  } catch (e) {
    console.log(`Failed to retrieve or eval 4/18 PROJECTS from Git: ${e.message}`);
  }

  // 3. Extracted themes (which evaluates successfully)
  let THEMES = [];
  if (fs.existsSync(extThemesPath)) {
    const themesStr = fs.readFileSync(extThemesPath, 'utf8');
    try {
      THEMES = eval(themesStr);
      console.log(`Successfully evaluated THEMES: ${THEMES.length} themes`);
    } catch (e) {
      console.log(`Failed to eval THEMES: ${e.message}`);
    }
  }

  // 4. Extract active projects (id 28 ~ 40) from the new session's dubu_data.js
  let projectsMap = {};
  
  // Seed with PROJECTS 1~27 from index.html (which are clean, pre-rebrand base projects)
  projects418.forEach(p => {
    if (Number(p.id) < 28) {
      projectsMap[p.id] = p;
    }
  });

  // Extract the raw PROJECTS block from extracted_projects.js
  const rawProjectsStr = fs.readFileSync(extProjectsPath, 'utf8');
  let objCount = 0;
  let braceCount = 0;
  let inString = false;
  let escape = false;
  let curObjStr = '';
  
  for (let i = 0; i < rawProjectsStr.length; i++) {
    const char = rawProjectsStr[i];
    
    if (inString) {
      curObjStr += char;
      if (escape) escape = false;
      else if (char === '\\') escape = true;
      else if (char === '"') inString = false;
    } else {
      if (char === '{') {
        braceCount++;
        if (braceCount === 1) curObjStr = '{';
        else curObjStr += char;
      } else if (char === '}') {
        braceCount--;
        if (braceCount === 0) {
          curObjStr += '}';
          try {
            let cleanedObj = cleanJsContent(curObjStr);
            if (cleanedObj.includes('순두부화이트바크초콜릿') && !cleanedObj.includes('"id": 37')) {
              cleanedObj = cleanedObj.replace('{', '{\n        "id": 37,');
            }
            
            const recipe = eval(`(${cleanedObj})`);
            if (recipe && recipe.id) {
              const rId = Number(recipe.id);
              if (recipe.title && (recipe.path || recipe.img)) {
                if (rId >= 28) {
                  if (!projectsMap[rId] || JSON.stringify(recipe).length > JSON.stringify(projectsMap[rId]).length) {
                    projectsMap[rId] = recipe;
                    console.log(`Parsed New/Rebranded Recipe: ID ${rId} - ${recipe.title}`);
                  }
                }
                objCount++;
              }
            }
          } catch (e) {
            // skip broken ones
          }
          curObjStr = '';
        } else if (braceCount > 0) {
          curObjStr += char;
        }
      } else if (braceCount > 0) {
        curObjStr += char;
      } else if (char === '"') {
        inString = true;
        curObjStr += char;
      }
    }
  }

  // Final PROJECTS compilation
  const PROJECTS = Object.values(projectsMap).sort((a, b) => b.id - a.id);
  console.log(`Final PROJECTS count after merge: ${PROJECTS.length}`);

  // 5. Gather and parse INGREDIENT_DICT & RECIPE_STEPS_DB
  function parseDictBlock(blockStr) {
    let dict = {};
    const regex = /(?:"?(\d+)"?)\s*:\s*\[/g;
    let match;
    while ((match = regex.exec(blockStr)) !== null) {
      const key = match[1];
      const startIndex = match.index + match[0].length - 1; // index of [
      
      let braceCount = 0;
      let inString = false;
      let escape = false;
      let arrayStr = '';
      
      for (let i = startIndex; i < blockStr.length; i++) {
        const char = blockStr[i];
        arrayStr += char;
        if (inString) {
          if (escape) escape = false;
          else if (char === '\\') escape = true;
          else if (char === '"') inString = false;
        } else {
          if (char === '"') inString = true;
          else if (char === '[' || char === '{') braceCount++;
          else if (char === ']' || char === '}') {
            braceCount--;
            if (braceCount === 0) break;
          }
        }
      }
      
      try {
        let cleanedArray = cleanJsContent(arrayStr);
        const parsedArray = eval("(" + cleanedArray + ")");
        if (parsedArray && parsedArray.length > 0) {
          if (!dict[key] || parsedArray.length > dict[key].length) {
            dict[key] = parsedArray;
          }
        }
      } catch (e) {
        // skip broken
      }
    }
    return dict;
  }

  const iBlockStr = fs.readFileSync(extIngredientsPath, 'utf8');
  const sBlockStr = fs.readFileSync(extStepsPath, 'utf8');
  
  const INGREDIENT_DICT = parseDictBlock(iBlockStr);
  const RECIPE_STEPS_DB = parseDictBlock(sBlockStr);

  console.log(`Parsed INGREDIENT_DICT: ${Object.keys(INGREDIENT_DICT).length} items`);
  console.log(`Parsed RECIPE_STEPS_DB: ${Object.keys(RECIPE_STEPS_DB).length} items`);

  const finalCode = `/**
 * Maison de Dubu (프로젝트 두부)
 * Premium Digital Archive - Static Database Module (v1.0)
 * 
 * 이 파일은 플랫폼 전체에서 공통으로 사용되는 모든 정적 레시피, 테마, 식감,
 * 마스터 셰프 및 인포그래픽 유니버스 노드 데이터를 관리하는 파일입니다.
 */

// 1. 디저트 메인 데이터베이스 (각 고유의 '베이킹 DNA 속성' 및 '물성 식감 카테고리' 매핑)
const PROJECTS = ${JSON.stringify(PROJECTS, null, 4)};

// 2. 4대 시즌 특별 이벤트 테마 데이터베이스
const THEMES = ${JSON.stringify(THEMES, null, 4)};

// 3. 각 레시피별 표준 성분 비율 (계산기 연동용)
const INGREDIENT_DICT = ${JSON.stringify(INGREDIENT_DICT, null, 4)};

// 4. 레시피 공정 단계 데이터베이스 (3D 타임라인 연동용)
const RECIPE_STEPS_DB = ${JSON.stringify(RECIPE_STEPS_DB, null, 4)};
`;

  const outputPath = 'C:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\dubu_data.js';
  fs.writeFileSync(outputPath, finalCode, 'utf8');
  console.log(`\nSuccessfully wrote perfect dubu_data.js to ${outputPath}`);
}

run().catch(console.error);
