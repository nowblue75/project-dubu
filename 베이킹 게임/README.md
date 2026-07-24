# 🍮 순두부 베이킹 어드벤처 (Soft Tofu Baking Adventure)

> 오븐 없이 중탕과 냉장 휴지만으로 정갈한 노오븐 순두부 디저트를 완성해나가는 포근한 베이킹 어드벤처 게임입니다.

---

## 🌟 주요 특징 (Key Features)

- **스승 온(溫)과의 디저트 학습 스토리**: 차분하고 따뜻한 스승 온의 피드백과 함께 배우는 노오븐 디저트 베이킹.
- **2개 재료 믹싱볼 조합 시스템**: 콩의 비린내를 잡고 부드러운 산미와 단짠 크림 베이스를 완성하는 조합 시뮬레이션.
- **다중 대안 경로 (Multi-path) 지원**: 현실적이고 상식적인 디저트 제조 순서를 존중하여 어떤 경로든 타당한 조합물로 완성 수렴.
- **단계적 & 수동 힌트 시스템**: 막힐 때 언제든 클릭할 수 있는 `💡 힌트 보기` 버튼 및 반복 시도 반응형 힌트.
- **디저트 수집 도감 & 실제 레시피 연동**: 완성한 디저트의 커스텀 수치 기록 및 네이버 공식 레시피 블로그 포스팅 연결.
- **하이브리드 데스크톱/웹 플랫폼**: React + Vite 웹 빌드 및 Tauri v2 데스크톱 패키징 지원.

---

## 🚀 로컬 실행 방법 (Local Development)

### 1. 패키지 설치
```bash
npm install
```

### 2. 웹 개발 서버 구동 (개발 모드)
```bash
npm run dev
```

### 3. 유닛 테스트 실행
```bash
npm run test
```

### 4. 생산용 Web 번들 빌드
```bash
npm run build
```

---

## 📂 프로젝트 구조
- `src/logic/combinationLogic.ts`: 조합 규칙, 대안 경로 4종 및 단계적 힌트 알고리즘
- `src/components/BakingTable.tsx`: Potion Craft 스타일 헤더, 믹싱볼 & 보관함 UX
- `src/components/RecipeJournal.tsx`: 디저트 수집 도감 & 네이버 블로그 연결
- `src/services/saveSystem.ts`: 데스크톱 Standard I/O & localStorage 하이브리드 세이브
