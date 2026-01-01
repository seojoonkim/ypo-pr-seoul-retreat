/**
 * 원본 데이터 추출 스크립트
 * db.js에서 번역 대상 텍스트를 JSON으로 추출
 */

const fs = require('fs');
const path = require('path');

// db.js 읽기
const dbPath = path.join(__dirname, '..', 'db.js');
const dbContent = fs.readFileSync(dbPath, 'utf8');

// landmarkData 추출
const match = dbContent.match(/const landmarkData = (\[[\s\S]*?\]);/);
if (!match) {
    console.error('landmarkData를 찾을 수 없습니다.');
    process.exit(1);
}

const landmarkData = eval(match[1]);

// 1. 기본 필드 추출 (name, description, tips, location)
const basicData = {};
landmarkData.forEach(item => {
    basicData[item.id] = {
        name: item.name,
        description: item.description,
        tips: item.tips,
        location: item.location
    };
});

// 2. score_reasons 추출
const scoreReasonsData = {};
landmarkData.forEach(item => {
    if (item.score_reasons) {
        scoreReasonsData[item.id] = item.score_reasons;
    }
});

// 3. 저장
const sourcePath = path.join(__dirname, '..', 'source');

fs.writeFileSync(
    path.join(sourcePath, 'basic.json'),
    JSON.stringify(basicData, null, 2),
    'utf8'
);

fs.writeFileSync(
    path.join(sourcePath, 'score_reasons.json'),
    JSON.stringify(scoreReasonsData, null, 2),
    'utf8'
);

// 통계 출력
let totalBasic = Object.keys(basicData).length * 4;
let totalReasons = 0;
Object.values(scoreReasonsData).forEach(categories => {
    Object.values(categories).forEach(arr => {
        totalReasons += arr.length;
    });
});

console.log('=== 원본 추출 완료 ===');
console.log(`명소 수: ${Object.keys(basicData).length}`);
console.log(`기본 필드: ${totalBasic}개`);
console.log(`Score Reasons: ${totalReasons}개`);
console.log(`총 번역 대상: ${totalBasic + totalReasons}개`);
console.log('');
console.log('저장 위치:');
console.log(`  - ${sourcePath}/basic.json`);
console.log(`  - ${sourcePath}/score_reasons.json`);
