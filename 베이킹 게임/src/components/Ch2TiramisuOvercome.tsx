import React, { useState } from 'react';
import './Ch2TiramisuOvercome.css';

export interface Ch2TiramisuCustomization {
  sweetenerType: 'honey' | 'alulose';            // 꿀 ↔ 알룰로스
  baseType: 'digestive' | 'ladyfinger' | 'wholewheat'; // 다이제 ↔ 레이디핑거 ↔ 통밀쿠키
  toppingType: 'cocoa' | 'black_sesame' | 'bean';     // 코코아 ↔ 흑임자 ↔ 콩가루
  customRecipeTitle: string;
}

interface Ch2TiramisuOvercomeProps {
  onCompleteOvercome: (customData: Ch2TiramisuCustomization) => void;
}

export const Ch2TiramisuOvercome: React.FC<Ch2TiramisuOvercomeProps> = ({ onCompleteOvercome }) => {
  const [sweetenerType, setSweetenerType] = useState<'honey' | 'alulose'>('honey');
  const [baseType, setBaseType] = useState<'digestive' | 'ladyfinger' | 'wholewheat'>('digestive');
  const [toppingType, setToppingType] = useState<'cocoa' | 'black_sesame' | 'bean'>('cocoa');
  const [customRecipeTitle, setCustomRecipeTitle] = useState<string>("나만의 노오븐 순두부 티라미수");

  const handleSubmit = () => {
    onCompleteOvercome({
      sweetenerType,
      baseType,
      toppingType,
      customRecipeTitle
    });
  };

  return (
    <div className="overcome-overlay flex-center animate-fade-in">
      <div className="overcome-panel glass-panel">
        <div className="overcome-header">
          <span className="overcome-badge">✨ 3단계: 극복 (내 배합 비틀기)</span>
          <h2 className="overcome-title">나만의 순두부 티라미수 배합 완성하기</h2>
          <p className="overcome-sub">스승의 노오븐 티라미수 배합에서 나만의 시트, 당류, 토핑 조합을 완성해보세요!</p>
        </div>

        <div className="overcome-form">
          {/* 1. 레시피 이름 */}
          <div className="form-group">
            <label className="form-label">🏷️ 나만의 티라미수 명칭 지정</label>
            <input 
              type="text" 
              className="custom-input" 
              value={customRecipeTitle}
              onChange={(e) => setCustomRecipeTitle(e.target.value)}
              placeholder="예: 홈카페용 흑임자 순두부 티라미수"
            />
          </div>

          {/* 2. 당류 종류 (꿀 ↔ 알룰로스) */}
          <div className="form-group">
            <label className="form-label">🍯 당류 종류 선택</label>
            <div className="toggle-group">
              <button 
                type="button" 
                className={`toggle-btn ${sweetenerType === 'honey' ? 'active' : ''}`}
                onClick={() => setSweetenerType('honey')}
              >
                🍯 천연 꿀 (자연스러운 달콤함)
              </button>
              <button 
                type="button" 
                className={`toggle-btn ${sweetenerType === 'alulose' ? 'active' : ''}`}
                onClick={() => setSweetenerType('alulose')}
              >
                🌱 알룰로스 (제로 칼로리 케어)
              </button>
            </div>
          </div>

          {/* 3. 베이스 종류 (다이제 ↔ 레이디핑거 ↔ 통밀쿠키) */}
          <div className="form-group">
            <label className="form-label">🍪 베이스 시트 선택</label>
            <div className="toggle-group">
              <button 
                type="button" 
                className={`toggle-btn ${baseType === 'digestive' ? 'active' : ''}`}
                onClick={() => setBaseType('digestive')}
              >
                🍪 다이제 (고소함)
              </button>
              <button 
                type="button" 
                className={`toggle-btn ${baseType === 'ladyfinger' ? 'active' : ''}`}
                onClick={() => setBaseType('ladyfinger')}
              >
                🥖 레이디핑거 (정통)
              </button>
              <button 
                type="button" 
                className={`toggle-btn ${baseType === 'wholewheat' ? 'active' : ''}`}
                onClick={() => setBaseType('wholewheat')}
              >
                🌾 통밀쿠키 (건강)
              </button>
            </div>
          </div>

          {/* 4. 토핑 종류 (코코아 ↔ 흑임자 ↔ 콩가루) */}
          <div className="form-group">
            <label className="form-label">🍫 마무리 파우더 토핑 선택</label>
            <div className="toggle-group">
              <button 
                type="button" 
                className={`toggle-btn ${toppingType === 'cocoa' ? 'active' : ''}`}
                onClick={() => setToppingType('cocoa')}
              >
                🍫 코코아 (클래식)
              </button>
              <button 
                type="button" 
                className={`toggle-btn ${toppingType === 'black_sesame' ? 'active' : ''}`}
                onClick={() => setToppingType('black_sesame')}
              >
                🖤 흑임자 (고소함)
              </button>
              <button 
                type="button" 
                className={`toggle-btn ${toppingType === 'bean' ? 'active' : ''}`}
                onClick={() => setToppingType('bean')}
              >
                🌾 콩가루 (인절미 퓨전)
              </button>
            </div>
          </div>
        </div>

        <div className="overcome-footer">
          <button className="cozy-button submit-custom-btn" onClick={handleSubmit}>
            이 배합으로 챕터 2 도감에 최종 기록하기 📖➔
          </button>
        </div>
      </div>
    </div>
  );
};
