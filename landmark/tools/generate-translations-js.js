/**
 * translations.js 파일 생성 스크립트
 * 번역 완료 후 실행하여 브라우저용 JS 파일 생성
 */

const fs = require('fs');
const path = require('path');

const transDir = path.join(__dirname, '..', 'translations');
const outputFile = path.join(__dirname, '..', 'translations.js');

const langs = ['en', 'zh', 'ja'];

let output = '// Auto-generated translations - ' + new Date().toISOString() + '\n';
output += 'const translationsBasicData = {\n';

for (const lang of langs) {
    try {
        const data = fs.readFileSync(path.join(transDir, lang, 'basic.json'), 'utf8');
        output += '  ' + lang + ': ' + data.trim() + ',\n';
    } catch(e) {
        output += '  ' + lang + ': {},\n';
        console.log(`⚠️ ${lang}/basic.json 없음`);
    }
}
output += '};\n\nconst translationsReasonsData = {\n';

for (const lang of langs) {
    try {
        const data = fs.readFileSync(path.join(transDir, lang, 'score_reasons.json'), 'utf8');
        output += '  ' + lang + ': ' + data.trim() + ',\n';
    } catch(e) {
        output += '  ' + lang + ': {},\n';
        console.log(`⚠️ ${lang}/score_reasons.json 없음`);
    }
}
output += '};\n';

fs.writeFileSync(outputFile, output, 'utf8');

console.log('✅ translations.js 생성 완료!');
console.log(`📁 위치: ${outputFile}`);

// 통계
for (const lang of langs) {
    try {
        const data = JSON.parse(fs.readFileSync(path.join(transDir, lang, 'basic.json'), 'utf8'));
        console.log(`   ${lang.toUpperCase()}: ${Object.keys(data).length}개 명소`);
    } catch(e) {}
}
