/**
 * 번역 검증 스크립트
 * 
 * 사용법:
 *   node validate.js --lang=en
 *   node validate.js --lang=all
 *   node validate.js --lang=zh --verbose
 */

const fs = require('fs');
const path = require('path');

// 인자 파싱
function parseArgs() {
    const args = {};
    process.argv.slice(2).forEach(arg => {
        if (arg.startsWith('--')) {
            const [key, value] = arg.slice(2).split('=');
            args[key] = value || true;
        }
    });
    return args;
}

// 데이터 로드
function loadJSON(filePath) {
    if (!fs.existsSync(filePath)) {
        return null;
    }
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

// 검증 실행
function validateTranslations(lang, verbose = false) {
    const sourcePath = path.join(__dirname, '..', 'source');
    const transPath = path.join(__dirname, '..', 'translations', lang);
    
    const results = {
        lang,
        basic: { total: 0, translated: 0, errors: [] },
        score_reasons: { total: 0, translated: 0, sentenceMismatch: [], errors: [] }
    };
    
    // 원본 로드
    const sourceBasic = loadJSON(path.join(sourcePath, 'basic.json'));
    const sourceReasons = loadJSON(path.join(sourcePath, 'score_reasons.json'));
    
    // 번역 로드
    const transBasic = loadJSON(path.join(transPath, 'basic.json'));
    const transReasons = loadJSON(path.join(transPath, 'score_reasons.json'));
    
    // 1. Basic 검증
    if (sourceBasic) {
        const landmarkIds = Object.keys(sourceBasic);
        results.basic.total = landmarkIds.length;
        
        landmarkIds.forEach(id => {
            if (!transBasic || !transBasic[id]) {
                results.basic.errors.push({ id, error: 'Missing translation' });
            } else {
                results.basic.translated++;
                
                // 필드 확인
                ['name', 'description', 'tips', 'location'].forEach(field => {
                    if (!transBasic[id][field]) {
                        results.basic.errors.push({ id, error: `Missing field: ${field}` });
                    }
                });
            }
        });
    }
    
    // 2. Score Reasons 검증
    if (sourceReasons) {
        const landmarkIds = Object.keys(sourceReasons);
        results.score_reasons.total = landmarkIds.length;
        
        landmarkIds.forEach(id => {
            if (!transReasons || !transReasons[id]) {
                results.score_reasons.errors.push({ id, error: 'Missing translation' });
                return;
            }
            
            results.score_reasons.translated++;
            
            // 카테고리별 문장 수 확인
            const categories = Object.keys(sourceReasons[id]);
            categories.forEach(category => {
                const sourceCount = sourceReasons[id][category]?.length || 0;
                const transCount = transReasons[id][category]?.length || 0;
                
                if (sourceCount !== transCount) {
                    results.score_reasons.sentenceMismatch.push({
                        id,
                        category,
                        source: sourceCount,
                        translated: transCount
                    });
                }
            });
        });
    }
    
    return results;
}

// 결과 출력
function printResults(results, verbose) {
    console.log('\n' + '='.repeat(60));
    console.log(`Translation Validation Report - ${results.lang.toUpperCase()}`);
    console.log('='.repeat(60));
    
    // Basic
    console.log('\n📄 Basic Fields:');
    console.log(`   Total landmarks: ${results.basic.total}`);
    console.log(`   Translated: ${results.basic.translated}`);
    console.log(`   Missing: ${results.basic.total - results.basic.translated}`);
    
    if (results.basic.errors.length > 0 && verbose) {
        console.log('\n   Errors:');
        results.basic.errors.forEach(e => {
            console.log(`   - ${e.id}: ${e.error}`);
        });
    }
    
    // Score Reasons
    console.log('\n📊 Score Reasons:');
    console.log(`   Total landmarks: ${results.score_reasons.total}`);
    console.log(`   Translated: ${results.score_reasons.translated}`);
    console.log(`   Missing: ${results.score_reasons.total - results.score_reasons.translated}`);
    console.log(`   Sentence mismatches: ${results.score_reasons.sentenceMismatch.length}`);
    
    if (results.score_reasons.sentenceMismatch.length > 0) {
        console.log('\n   ⚠️  Sentence Count Mismatches:');
        const mismatches = verbose 
            ? results.score_reasons.sentenceMismatch 
            : results.score_reasons.sentenceMismatch.slice(0, 10);
        
        mismatches.forEach(m => {
            console.log(`   - ${m.id}/${m.category}: ${m.source} → ${m.translated}`);
        });
        
        if (!verbose && results.score_reasons.sentenceMismatch.length > 10) {
            console.log(`   ... and ${results.score_reasons.sentenceMismatch.length - 10} more`);
        }
    }
    
    if (results.score_reasons.errors.length > 0 && verbose) {
        console.log('\n   Errors:');
        results.score_reasons.errors.forEach(e => {
            console.log(`   - ${e.id}: ${e.error}`);
        });
    }
    
    // 요약
    const basicComplete = results.basic.translated === results.basic.total;
    const reasonsComplete = results.score_reasons.translated === results.score_reasons.total;
    const noMismatches = results.score_reasons.sentenceMismatch.length === 0;
    
    console.log('\n' + '-'.repeat(60));
    console.log('Summary:');
    console.log(`   Basic: ${basicComplete ? '✅ Complete' : '❌ Incomplete'}`);
    console.log(`   Score Reasons: ${reasonsComplete ? '✅ Complete' : '❌ Incomplete'}`);
    console.log(`   Sentence Counts: ${noMismatches ? '✅ All match' : '⚠️  Mismatches found'}`);
    
    const allGood = basicComplete && reasonsComplete && noMismatches;
    console.log('\n' + (allGood ? '🎉 All validations passed!' : '⚠️  Some issues need attention'));
    
    return allGood;
}

// 샘플 품질 검사
function sampleQualityCheck(lang) {
    const transPath = path.join(__dirname, '..', 'translations', lang);
    const transReasons = loadJSON(path.join(transPath, 'score_reasons.json'));
    
    if (!transReasons) {
        console.log('\n❌ No translations found for quality check');
        return;
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('Sample Quality Check (Random Samples)');
    console.log('='.repeat(60));
    
    const ids = Object.keys(transReasons);
    const sampleIds = ids.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    sampleIds.forEach(id => {
        console.log(`\n📍 ${id}:`);
        const categories = Object.keys(transReasons[id]);
        const sampleCategory = categories[Math.floor(Math.random() * categories.length)];
        
        console.log(`   Category: ${sampleCategory}`);
        console.log(`   Sample sentences:`);
        
        const sentences = transReasons[id][sampleCategory] || [];
        sentences.slice(0, 2).forEach((s, i) => {
            console.log(`   ${i + 1}. ${s.substring(0, 80)}${s.length > 80 ? '...' : ''}`);
        });
    });
}

// 메인
function main() {
    const args = parseArgs();
    const verbose = args.verbose || false;
    
    let langs = ['en', 'zh', 'ja'];
    if (args.lang && args.lang !== 'all') {
        langs = [args.lang];
    }
    
    let allPassed = true;
    
    langs.forEach(lang => {
        const results = validateTranslations(lang, verbose);
        const passed = printResults(results, verbose);
        allPassed = allPassed && passed;
        
        if (args.sample) {
            sampleQualityCheck(lang);
        }
    });
    
    process.exit(allPassed ? 0 : 1);
}

main();
