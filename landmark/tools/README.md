# Seoul Landmarks 다국어 번역 시스템

## 📁 폴더 구조

```
seoul-landmarks-i18n/
├── db.js                    # 원본 데이터 (한국어)
├── index.html               # 메인 앱
├── app.js                   # 앱 로직
├── style.css                # 스타일
├── i18n.js                  # 다국어 전환 로직
├── translations.js          # 기존 영어 번역 (교체 예정)
│
├── source/                  # 원본 추출 데이터
│   ├── basic.json           # name, description, tips, location
│   └── score_reasons.json   # 10개 카테고리 × 108 명소
│
├── translations/            # 번역 결과 저장
│   ├── en/                  # 영어
│   ├── zh/                  # 중국어 (简体)
│   └── ja/                  # 일본어
│
└── tools/                   # 번역 도구
    ├── extract_source.js    # 원본 추출
    ├── translate_batch.js   # Claude API 번역
    ├── validate.js          # 번역 검증
    └── prompts/
        ├── system_en.md     # 영어 프롬프트
        ├── system_zh.md     # 중국어 프롬프트
        └── system_ja.md     # 일본어 프롬프트
```

## 🚀 사용 방법

### 1. 원본 데이터 추출 (이미 완료)

```bash
cd seoul-landmarks-i18n
node tools/extract_source.js
```

### 2. Claude API로 번역 실행

```bash
# 환경변수 설정
export ANTHROPIC_API_KEY=your_api_key_here

# 영어 번역 (전체)
node tools/translate_batch.js --lang=en --type=all

# 중국어 번역 (score_reasons만)
node tools/translate_batch.js --lang=zh --type=score_reasons

# 일본어 번역 (처음 10개만 테스트)
node tools/translate_batch.js --lang=ja --limit=10

# Dry run (API 호출 없이 테스트)
node tools/translate_batch.js --lang=en --dry-run
```

### 3. 번역 검증

```bash
# 영어 번역 검증
node tools/validate.js --lang=en

# 전체 언어 검증 (상세)
node tools/validate.js --lang=all --verbose

# 샘플 품질 검사 포함
node tools/validate.js --lang=en --sample
```

## 💰 예상 비용 (Claude 3.5 Sonnet)

| 언어 | 비용 |
|-----|------|
| 영어 (EN) | ~$14 |
| 중국어 (ZH) | ~$11 |
| 일본어 (JA) | ~$12 |
| **총합** | **~$37 (약 54,000원)** |

## 📊 번역 대상 통계

- **명소 수**: 108개
- **기본 필드**: 432개 (name, description, tips, location)
- **Score Reasons**: 6,098개 (10 카테고리 × ~6 문장)
- **언어당 총합**: 6,530개
- **3개 언어 총합**: 19,590개

## 🎯 번역 품질 가이드라인

### 핵심 원칙
1. **문장 수 보존** - 원본 N개 → 번역 N개 (필수!)
2. **디테일 보존** - 시간, 장소, 팁 정확히 유지
3. **문화 용어 처리** - 한글 발음 + 현지어 설명 병기
4. **감성 유지** - 원본의 시적 표현 보존

### 언어별 특화
- **영어**: 관광 가이드 톤, 문화 용어에 romanization
- **중국어**: 한류 영향 고려, 한자어 직접 대응 활용
- **일본어**: 한자+히라가나 병기, 정중체 사용

## 🔧 앱 통합 방법

번역 완료 후 `i18n.js`에서 새 번역 파일 로드:

```javascript
// translations/{lang}/basic.json 및 score_reasons.json 로드
async function loadTranslations(lang) {
    const basic = await fetch(`translations/${lang}/basic.json`).then(r => r.json());
    const scoreReasons = await fetch(`translations/${lang}/score_reasons.json`).then(r => r.json());
    return { basic, scoreReasons };
}
```

## ✅ 체크리스트

- [x] 폴더 구조 생성
- [x] 원본 데이터 추출
- [x] 영어 프롬프트 작성
- [x] 중국어 프롬프트 작성
- [x] 일본어 프롬프트 작성
- [x] 배치 번역 스크립트
- [x] 검증 스크립트
- [ ] 영어 번역 실행
- [ ] 중국어 번역 실행
- [ ] 일본어 번역 실행
- [ ] 앱 통합 및 테스트
