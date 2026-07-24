import React, { useState } from 'react';
import './CustomRecipeOvercome.css';

export interface OvercomeCustomization {
  condensedMilkRatio: number;   // 20% ~ 150% (기본 100%)
  tofuMoistureLevel: number;    // 1 (부드러운) ~ 5 (단단한, 기본 3)
  acidSubstituted: boolean;     // false (상큼 레몬즙) vs true (고소 요거트)
  saltRatio: number;            // 0% ~ 200% (기본 100%)
  customRecipeTitle: string;
}

interface CustomRecipeOvercomeProps {
  onCompleteOvercome: (customData: OvercomeCustomization) => void;
}

export const CustomRecipeOvercome: React.FC<CustomRecipeOvercomeProps> = ({ onCompleteOvercome }) => {
  const [condensedMilkRatio, setCondensedMilkRatio] = useState<number>(100);
  const [tofuMoistureLevel, setTofuMoistureLevel] = useState<number>(3);
  const [acidSubstituted, setAcidSubstituted] = useState<boolean>(false);
  const [saltRatio, setSaltRatio] = useState<number>(100);
  const [customRecipeTitle, setCustomRecipeTitle] = useState<string>("나만의 인생 순두부 크림치즈");

  const handleSubmit = () => {
    onCompleteOvercome({
      condensedMilkRatio,
      tofuMoistureLevel,
      acidSubstituted,
      saltRatio,
      customRecipeTitle
    });
  };

  const getMoistureText = (level: number) => {
    switch (level) {
      case 1: return "수분 듬뿍 촉촉 크림형";
      case 2: return "부드럽고 가벼운 텍스처";
      case 3: return "황금 밸런스 꾸덕함 (표준)";
      case 4: return "밀도 높은 단단한 크림";
      case 5: return "극강의 꾸덕 묵직 질감";
      default: return "";
    }
  };

  return (
    <div className="overcome-overlay flex-center animate-fade-in">
      <div className="overcome-panel glass-panel">
        <div className="overcome-header">
          <span className="overcome-badge">✨ 3단계: 극복 (내 배합 비틀기)</span>
          <h2 className="overcome-title">나만의 순두부 크림치즈 배합 완성하기</h2>
          <p className="overcome-sub">스승의 정석 배합에서 나의 입맛과 가족의 취향에 맞춰 비율을 조절해 보세요!</p>
        </div>

        <div className="overcome-form">
          {/* 1. 레시피 이름 */}
          <div className="form-group">
            <label className="form-label">🏷️ 나만의 배합 이름 지정</label>
            <input 
              type="text" 
              className="custom-input" 
              value={customRecipeTitle}
              onChange={(e) => setCustomRecipeTitle(e.target.value)}
              placeholder="예: 우리집 주말용 달콤 순두부 크림치즈"
            />
          </div>

          {/* 2. 연유 비율 (단맛) */}
          <div className="form-group">
            <div className="label-with-val">
              <label className="form-label">🥛 연유 비율 (단맛 강도)</label>
              <span className="val-badge">{condensedMilkRatio}%</span>
            </div>
            <input 
              type="range" 
              min="20" 
              max="150" 
              step="10"
              value={condensedMilkRatio}
              onChange={(e) => setCondensedMilkRatio(Number(e.target.value))}
              className="custom-range"
            />
            <span className="range-hint">은은한 단맛(20%) ↔ 묵직한 디저트 단맛(150%)</span>
          </div>

          {/* 3. 순두부 물기 제거 정도 (질감) */}
          <div className="form-group">
            <div className="label-with-val">
              <label className="form-label">⬜ 순두부 물기 제거 (식감/질감)</label>
              <span className="val-badge">{getMoistureText(tofuMoistureLevel)}</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="5" 
              step="1"
              value={tofuMoistureLevel}
              onChange={(e) => setTofuMoistureLevel(Number(e.target.value))}
              className="custom-range"
            />
          </div>

          {/* 4. 산미 뉘앙스 (레몬즙 vs 요거트) */}
          <div className="form-group">
            <label className="form-label">🍋 산미 재료 변주 (대체재 선택)</label>
            <div className="toggle-group">
              <button 
                type="button" 
                className={`toggle-btn ${!acidSubstituted ? 'active' : ''}`}
                onClick={() => setAcidSubstituted(false)}
              >
                🍋 상큼한 레몬즙 (클래식)
              </button>
              <button 
                type="button" 
                className={`toggle-btn ${acidSubstituted ? 'active' : ''}`}
                onClick={() => setAcidSubstituted(true)}
              >
                🥛 고소 부드러운 요거트 (변주)
              </button>
            </div>
          </div>

          {/* 5. 소금 비율 (짠단 밸런스) */}
          <div className="form-group">
            <div className="label-with-val">
              <label className="form-label">🧂 소금 비율 (단짠 밸런스)</label>
              <span className="val-badge">{saltRatio}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="200" 
              step="20"
              value={saltRatio}
              onChange={(e) => setSaltRatio(Number(e.target.value))}
              className="custom-range"
            />
          </div>
        </div>

        <div className="overcome-footer">
          <button className="cozy-button submit-custom-btn" onClick={handleSubmit}>
            이 배합으로 도관에 최종 기록하기 📖➔
          </button>
        </div>
      </div>
    </div>
  );
};
