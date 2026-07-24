import { useState, useEffect } from 'react';
import { loadGameData, saveGameData, clearGameData, type SaveData } from './services/saveSystem';
import { RecipeBook } from './components/RecipeBook';
import { ChapterSelect } from './components/ChapterSelect';
import { BakingTable } from './components/BakingTable';
import { GestureMiniGame } from './components/GestureMiniGame';
import { ChillingGesture } from './components/ChillingGesture';
import { CustomRecipeOvercome, type OvercomeCustomization } from './components/CustomRecipeOvercome';
import { Ch2TiramisuOvercome, type Ch2TiramisuCustomization } from './components/Ch2TiramisuOvercome';
import { RecipeJournal } from './components/RecipeJournal';
import { IMAGES } from './assets/images';
import './App.css';

type GameScene = 'intro' | 'chapter_select' | 'book' | 'table' | 'gesture' | 'chilling' | 'overcome' | 'ch2_overcome' | 'result' | 'journal';

function App() {
  const [scene, setScene] = useState<GameScene>('intro');
  const [previousScene, setPreviousScene] = useState<GameScene>('intro');
  const [currentChapter, setCurrentChapter] = useState<number>(1);
  const [saveData, setSaveData] = useState<SaveData | null>(null);
  
  // 현재 진행 중인 베이킹 작업 데이터
  const [bakingResult, setBakingResult] = useState<'Normal' | 'Good' | 'Perfect' | null>(null);
  const [ch1CustomData, setCh1CustomData] = useState<OvercomeCustomization | null>(null);
  const [ch2CustomData, setCh2CustomData] = useState<Ch2TiramisuCustomization | null>(null);
  const [isNewUnlock, setIsNewUnlock] = useState<boolean>(false);

  // 게임 기동 시 세이브 데이터 로드
  useEffect(() => {
    const initGame = async () => {
      const data = await loadGameData();
      setSaveData(data);
    };
    initGame();
  }, []);

  const openJournal = async (fromScene: GameScene) => {
    const latestData = await loadGameData();
    setSaveData(latestData);
    setPreviousScene(fromScene);
    setScene('journal');
  };

  const closeJournal = () => {
    if (previousScene === 'result') {
      setScene('table');
    } else {
      setScene(previousScene);
    }
  };

  const handleContinueGame = () => {
    setScene('chapter_select');
  };

  const handleNewGame = async () => {
    const isConfirmed = window.confirm("정말 새로 시작하시겠습니까? 기존의 모든 진행 상황과 커스텀 배합 기록이 삭제됩니다.");
    if (!isConfirmed) return;

    const freshData = await clearGameData();
    setSaveData(freshData);
    setCurrentChapter(1);
    setScene('chapter_select');
  };

  const handleSelectChapter = (chId: number) => {
    setCurrentChapter(chId);
    if (chId === 1 && saveData && !saveData.recipes.includes('tofu_cream_cheese')) {
      setScene('book');
    } else {
      setScene('table');
    }
  };

  const handleDialogueComplete = () => {
    setScene('table');
  };

  const handleIngredientUnlocked = async (newIngId: string) => {
    if (!saveData) return;
    if (!saveData.ingredients.includes(newIngId)) {
      const updatedIngredients = [...saveData.ingredients, newIngId];
      const newSave = { ...saveData, ingredients: updatedIngredients };
      setSaveData(newSave);
      await saveGameData(newSave);
    }
  };

  const handleReadyForBainMarie = () => {
    setCurrentChapter(1);
    setScene('gesture');
  };

  const handleReadyForChilling = () => {
    setCurrentChapter(2);
    setScene('chilling');
  };

  const handleBainMarieComplete = (score: 'Normal' | 'Good' | 'Perfect') => {
    setBakingResult(score);
    setScene('overcome');
  };

  const handleChillingComplete = (score: 'Normal' | 'Good' | 'Perfect') => {
    setBakingResult(score);
    setScene('ch2_overcome');
  };

  const getGradeScore = (grade?: string): number => {
    switch (grade) {
      case '명작': case 'Perfect': return 3;
      case '숙련': case 'Good': return 2;
      default: return 1;
    }
  };

  // 요구사항: 챕터 1 완성 시 별도 "등록" 버튼 없이 100% 자동 기록 세이브 함수
  const handleCompleteCh1Overcome = async (custom: OvercomeCustomization) => {
    setCh1CustomData(custom);
    setScene('result');

    if (!saveData) return;

    const gradeMap = { Normal: '보통', Good: '숙련', Perfect: '명작' };
    const currentGradeStr = gradeMap[bakingResult || 'Normal'];

    const isAlreadyUnlocked = saveData.recipes.includes('tofu_cream_cheese');
    setIsNewUnlock(!isAlreadyUnlocked);

    const updatedRecipes = isAlreadyUnlocked 
      ? saveData.recipes 
      : [...saveData.recipes, 'tofu_cream_cheese'];

    const mentorSpeech = getMentorFeedback(1, bakingResult || 'Normal', custom);

    const recipeId = 'tofu_cream_cheese';
    const prevRecord: any = saveData.customHistory?.[recipeId];

    // 시도 횟수 자동 +1 누적
    const prevAttemptCount = prevRecord?.attemptCount || 0;
    const newAttemptCount = prevAttemptCount + 1;

    // 등급별 도전 횟수 분포 누적
    const prevGradeCounts = prevRecord?.gradeCounts || { perfect: 0, good: 0, normal: 0 };
    const currentScoreType = bakingResult === 'Perfect' ? 'perfect' : bakingResult === 'Good' ? 'good' : 'normal';
    const newGradeCounts = {
      ...prevGradeCounts,
      [currentScoreType]: (prevGradeCounts[currentScoreType] || 0) + 1
    };

    const prevScore = getGradeScore(prevRecord?.grade);
    const newScore = getGradeScore(currentGradeStr);

    let updatedHistoryRecord: any;

    // 기존 기록이 없거나 새로 달성한 등급이 더 높거나 같으면 최고 기록 자동 갱신!
    if (!prevRecord || newScore >= prevScore) {
      updatedHistoryRecord = {
        ...custom,
        grade: currentGradeStr,
        mentorComment: mentorSpeech,
        attemptCount: newAttemptCount,
        gradeCounts: newGradeCounts
      };
    } else {
      // 등급이 더 낮을 경우 기존 최고 등급/배합수치/평가는 보존하되 시도횟수와 등급분포만 갱신!
      updatedHistoryRecord = {
        ...prevRecord,
        attemptCount: newAttemptCount,
        gradeCounts: newGradeCounts
      };
    }

    const updatedCustomHistory = {
      ...(saveData.customHistory || {}),
      [recipeId]: updatedHistoryRecord
    };

    const updatedHighScores = {
      ...saveData.highScores,
      [recipeId]: newScore >= prevScore 
        ? `${currentGradeStr} (${custom.customRecipeTitle})`
        : (saveData.highScores[recipeId] || `${currentGradeStr} (${custom.customRecipeTitle})`)
    };

    const newSave: SaveData = {
      ...saveData,
      recipes: updatedRecipes,
      highScores: updatedHighScores,
      customHistory: updatedCustomHistory,
      mentorAffection: !isAlreadyUnlocked ? saveData.mentorAffection + 1 : saveData.mentorAffection,
      mentorDialogueStep: 1
    };

    setSaveData(newSave);
    await saveGameData(newSave);
  };

  // 요구사항: 챕터 2 완성 시 별도 "등록" 버튼 없이 100% 자동 기록 세이브 함수
  const handleCompleteCh2Overcome = async (custom: Ch2TiramisuCustomization) => {
    setCh2CustomData(custom);
    setScene('result');

    if (!saveData) return;

    const gradeMap = { Normal: '보통', Good: '숙련', Perfect: '명작' };
    const currentGradeStr = gradeMap[bakingResult || 'Perfect'];

    const isAlreadyUnlocked = saveData.recipes.includes('tofu_tiramisu');
    setIsNewUnlock(!isAlreadyUnlocked);

    const updatedRecipes = isAlreadyUnlocked 
      ? saveData.recipes 
      : [...saveData.recipes, 'tofu_tiramisu'];

    const mentorSpeech = getMentorFeedback(2, bakingResult || 'Perfect', null, custom);

    const recipeId = 'tofu_tiramisu';
    const prevRecord: any = saveData.customHistory?.[recipeId];

    const prevAttemptCount = prevRecord?.attemptCount || 0;
    const newAttemptCount = prevAttemptCount + 1;

    const prevGradeCounts = prevRecord?.gradeCounts || { perfect: 0, good: 0, normal: 0 };
    const currentScoreType = bakingResult === 'Perfect' ? 'perfect' : bakingResult === 'Good' ? 'good' : 'normal';
    const newGradeCounts = {
      ...prevGradeCounts,
      [currentScoreType]: (prevGradeCounts[currentScoreType] || 0) + 1
    };

    const prevScore = getGradeScore(prevRecord?.grade);
    const newScore = getGradeScore(currentGradeStr);

    let updatedHistoryRecord: any;

    if (!prevRecord || newScore >= prevScore) {
      updatedHistoryRecord = {
        sweetenerType: custom.sweetenerType,
        baseType: custom.baseType,
        toppingType: custom.toppingType,
        customRecipeTitle: custom.customRecipeTitle,
        grade: currentGradeStr,
        mentorComment: mentorSpeech,
        attemptCount: newAttemptCount,
        gradeCounts: newGradeCounts
      };
    } else {
      updatedHistoryRecord = {
        ...prevRecord,
        attemptCount: newAttemptCount,
        gradeCounts: newGradeCounts
      };
    }

    const updatedCustomHistory = {
      ...(saveData.customHistory || {}),
      [recipeId]: updatedHistoryRecord
    };

    const updatedHighScores = {
      ...saveData.highScores,
      [recipeId]: newScore >= prevScore 
        ? `${currentGradeStr} (${custom.customRecipeTitle})`
        : (saveData.highScores[recipeId] || `${currentGradeStr} (${custom.customRecipeTitle})`)
    };

    const newSave: SaveData = {
      ...saveData,
      recipes: updatedRecipes,
      highScores: updatedHighScores,
      customHistory: updatedCustomHistory,
      mentorAffection: !isAlreadyUnlocked ? saveData.mentorAffection + 1 : saveData.mentorAffection,
      mentorDialogueStep: 2
    };

    setSaveData(newSave);
    await saveGameData(newSave);
  };

  const handleRestart = () => {
    setBakingResult(null);
    setCh1CustomData(null);
    setCh2CustomData(null);
    setScene('table');
  };

  const getGradeText = (score: 'Normal' | 'Good' | 'Perfect') => {
    switch (score) {
      case 'Perfect': return '🏆 명작 (Masterpiece)';
      case 'Good': return '⭐ 숙련 (Expert)';
      default: return '👍 보통 (Normal)';
    }
  };

  const getMentorFeedback = (
    ch: number,
    score: 'Normal' | 'Good' | 'Perfect',
    ch1Custom?: OvercomeCustomization | null,
    ch2Custom?: Ch2TiramisuCustomization | null
  ) => {
    if (ch === 2) {
      const isAlulose = ch2Custom?.sweetenerType === 'alulose';
      const baseName = ch2Custom?.baseType === 'ladyfinger' ? '레이디핑거' : ch2Custom?.baseType === 'wholewheat' ? '통밀쿠키' : '다이제';
      let comment = `챕터 1의 순두부 크림치즈와 ${baseName} 시트, 그리고 차가운 냉숙성이 입안에서 사르르 녹아드는 완벽한 티라미수를 만들어냈구나!`;
      if (isAlulose) comment += " 알룰로스로 단맛 칼로리를 줄인 감각도 돋보이는군!";
      return comment;
    }

    const isYogurt = ch1Custom?.acidSubstituted;
    const milkRatio = ch1Custom?.condensedMilkRatio || 100;

    let baseComment = "";
    if (score === 'Perfect') {
      baseComment = "수분감과 치즈의 풍미가 은은한 중탕 속에서 완벽한 꾸덕함으로 피어난 순두부 크림치즈다!";
    } else if (score === 'Good') {
      baseComment = "오호, 중탕 온도를 제법 잘 맞춰서 비린내 하나 없이 몽글몽글하고 고소하구나. 훌륭하다.";
    } else {
      baseComment = "중탕 불 조절이 살짝 아쉽지만 순두부 크림 특유의 산뜻함은 잘 느껴지는구나.";
    }

    if (isYogurt) baseComment += " 레몬즙 대신 요거트를 쓴 것은 신선한 시도였어. 고소함이 한층 강화되었군!";
    if (milkRatio > 120) baseComment += " 연유 비율이 높아 달콤함이 강렬하구나.";

    return baseComment;
  };

  if (!saveData) {
    return <div className="loading-screen flex-center"><h3>레시피 북을 펼치는 중...</h3></div>;
  }

  const hasSaveHistory = saveData.recipes.length > 0;

  return (
    <div className="game-app-container flex-center">
      {/* Intro Scene */}
      {scene === 'intro' && (
        <div className="scene intro-scene animate-fade-in flex-center">
          <div className="title-logo animate-float">
            <span className="logo-sub">스승의 레시피북을 찾아서</span>
            <h1 className="logo-main">순두부 베이킹 어드벤처</h1>
          </div>

          <div className="intro-actions flex-center" style={{ gap: '15px' }}>
            {hasSaveHistory ? (
              <>
                <button className="cozy-button start-btn" onClick={handleContinueGame}>
                  ▶ 이어하기 ➔
                </button>
                <button className="cozy-button reset-new-game-btn" onClick={handleNewGame}>
                  🔄 새로 시작
                </button>
              </>
            ) : (
              <button className="cozy-button start-btn" onClick={handleContinueGame}>
                ✨ 게임 시작 ➔
              </button>
            )}
            <button className="cozy-button journal-btn" onClick={() => openJournal('intro')}>
              📖 디저트 도감
            </button>
          </div>

          <div className="intro-footer">
            <p>v0.2.0 (Tauri & Steam Edition)</p>
          </div>
        </div>
      )}

      {/* Chapter Select Scene */}
      {scene === 'chapter_select' && (
        <ChapterSelect 
          saveData={saveData}
          onSelectChapter={handleSelectChapter}
          onBackToTitle={() => setScene('intro')}
          onOpenJournal={() => openJournal('chapter_select')}
        />
      )}

      {/* Book Scene */}
      {scene === 'book' && (
        <RecipeBook 
          currentChapter={currentChapter}
          saveData={saveData}
          dialogueStep={saveData.mentorDialogueStep}
          onDialogueComplete={handleDialogueComplete}
          onBackToTitle={() => setScene('intro')}
          mentorAffection={saveData.mentorAffection}
        />
      )}

      {/* Table Scene */}
      {scene === 'table' && (
        <BakingTable 
          currentChapter={currentChapter}
          onOpenChapterSelect={() => setScene('chapter_select')}
          unlockedIngredients={saveData.ingredients}
          unlockedRecipes={saveData.recipes}
          onIngredientUnlocked={handleIngredientUnlocked}
          onReadyForBainMarie={handleReadyForBainMarie}
          onReadyForChilling={handleReadyForChilling}
          onBackToBook={() => setScene('book')}
          onBackToTitle={() => setScene('intro')}
          onOpenJournal={() => openJournal('table')}
        />
      )}

      {/* Gesture 1 Scene */}
      {scene === 'gesture' && (
        <GestureMiniGame onGameComplete={handleBainMarieComplete} />
      )}

      {/* Gesture 2 Scene */}
      {scene === 'chilling' && (
        <ChillingGesture onGestureComplete={handleChillingComplete} />
      )}

      {/* Overcome 1 Scene */}
      {scene === 'overcome' && (
        <CustomRecipeOvercome onCompleteOvercome={handleCompleteCh1Overcome} />
      )}

      {/* Overcome 2 Scene */}
      {scene === 'ch2_overcome' && (
        <Ch2TiramisuOvercome onCompleteOvercome={handleCompleteCh2Overcome} />
      )}

      {/* Recipe Journal Scene */}
      {scene === 'journal' && (
        <RecipeJournal 
          saveData={saveData} 
          onCloseJournal={closeJournal} 
        />
      )}

      {/* Result Scene */}
      {scene === 'result' && bakingResult && (
        <div className="scene result-scene glass-panel animate-fade-in flex-center">
          <h2 className="result-title">
            🎉 {currentChapter === 1 ? '챕터 1: 순두부 크림치즈' : '챕터 2: 노오븐 순두부 티라미수'} 완성!
          </h2>
          
          <div className="result-box">
            <div className="result-display flex-center">
              <img 
                src={currentChapter === 1 ? IMAGES.tofuCreamCheese : IMAGES.tofuTiramisu} 
                alt="완성 디저트" 
                className="result-dessert-img animate-float" 
              />
              <h3 className="result-name">
                {currentChapter === 1 
                  ? (ch1CustomData?.customRecipeTitle || '순두부 크림치즈')
                  : (ch2CustomData?.customRecipeTitle || '노오븐 순두부 티라미수')
                }
              </h3>
              <span className={`result-grade ${bakingResult.toLowerCase()}`}>
                {getGradeText(bakingResult)}
              </span>

              {currentChapter === 1 && ch1CustomData && (
                <div className="custom-summary-grid">
                  <span>🥛 연유: {ch1CustomData.condensedMilkRatio}%</span>
                  <span>⬜ 식감: {ch1CustomData.tofuMoistureLevel}단계</span>
                  <span>🍋 산미: {ch1CustomData.acidSubstituted ? '요거트' : '레몬즙'}</span>
                  <span>🧂 소금: {ch1CustomData.saltRatio}%</span>
                </div>
              )}

              {currentChapter === 2 && ch2CustomData && (
                <div className="custom-summary-grid">
                  <span>🍯 당류: {ch2CustomData.sweetenerType === 'alulose' ? '알룰로스' : '자연 꿀'}</span>
                  <span>🍪 시트: {ch2CustomData.baseType === 'ladyfinger' ? '레이디핑거' : ch2CustomData.baseType === 'wholewheat' ? '통밀쿠키' : '다이제'}</span>
                  <span>🍫 토핑: {ch2CustomData.toppingType === 'black_sesame' ? '흑임자' : ch2CustomData.toppingType === 'bean' ? '콩가루' : '코코아'}</span>
                  <span>❄️ 숙성: 저온 냉장 휴지</span>
                </div>
              )}
            </div>

            {isNewUnlock && (
              <div className="unlock-banner animate-float">
                ✨ 챕터 {currentChapter} 도감 자동 수집 완료! 
                {currentChapter === 1 ? ' 챕터 1 디저트가 챕터 2 기본 재료로 연결됩니다.' : ' 챕터 2 수집 성공!'} (친밀도 Lv.+1 상승!)
              </div>
            )}

            <div className="result-mentor-feedback mentor-tone-warm animate-fade-in">
              <div className="mentor-header flex-center">
                <img src={IMAGES.on02} alt="스승 온 따뜻한 미소" className="mentor-result-img" />
                <span className="mentor-title-label">📖 스승 온(溫)의 평가</span>
              </div>
              <p className="mentor-comment">
                "{getMentorFeedback(currentChapter, bakingResult || 'Normal', ch1CustomData, ch2CustomData)}"
              </p>
            </div>
          </div>

          <div className="result-actions">
            <button className="cozy-button reset-btn" onClick={handleRestart}>
              작업대로 이동 🥣
            </button>
            <button className="cozy-button journal-btn" onClick={() => openJournal('result')}>
              도감에서 확인 📖
            </button>
            <button className="cozy-button back-btn" onClick={() => setScene('intro')}>
              타이틀로 이동 🏠
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
