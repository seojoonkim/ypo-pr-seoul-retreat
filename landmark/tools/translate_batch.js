/**
 * Claude API 배치 번역 스크립트
 * 
 * 사용법:
 *   node translate_batch.js --lang=en --type=score_reasons
 *   node translate_batch.js --lang=zh --type=basic
 *   node translate_batch.js --lang=ja --type=all
 * 
 * 환경변수:
 *   ANTHROPIC_API_KEY=your_api_key
 * 
 * 옵션:
 *   --lang: en, zh, ja (필수)
 *   --type: basic, score_reasons, all (기본: all)
 *   --start: 시작 인덱스 (기본: 0)
 *   --limit: 처리할 명소 수 (기본: 전체)
 *   --dry-run: API 호출 없이 테스트
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// 설정
const CONFIG = {
    MODEL: 'claude-sonnet-4-20250514',
    MAX_TOKENS: 4096,
    BATCH_SIZE: 5,  // 한 번에 처리할 명소 수
    RATE_LIMIT_DELAY: 1000,  // ms between requests
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 5000
};

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

// 시스템 프롬프트 로드
function loadSystemPrompt(lang) {
    const promptPath = path.join(__dirname, 'prompts', `system_${lang}.md`);
    if (!fs.existsSync(promptPath)) {
        throw new Error(`System prompt not found: ${promptPath}`);
    }
    return fs.readFileSync(promptPath, 'utf8');
}

// 원본 데이터 로드
function loadSourceData(type) {
    const sourcePath = path.join(__dirname, '..', 'source');
    const data = {};
    
    if (type === 'basic' || type === 'all') {
        const basicPath = path.join(sourcePath, 'basic.json');
        if (fs.existsSync(basicPath)) {
            data.basic = JSON.parse(fs.readFileSync(basicPath, 'utf8'));
        }
    }
    
    if (type === 'score_reasons' || type === 'all') {
        const reasonsPath = path.join(sourcePath, 'score_reasons.json');
        if (fs.existsSync(reasonsPath)) {
            data.score_reasons = JSON.parse(fs.readFileSync(reasonsPath, 'utf8'));
        }
    }
    
    return data;
}

// 기존 번역 로드 (이어서 작업용)
function loadExistingTranslations(lang, type) {
    const transPath = path.join(__dirname, '..', 'translations', lang);
    const data = {};
    
    if (type === 'basic' || type === 'all') {
        const basicPath = path.join(transPath, 'basic.json');
        if (fs.existsSync(basicPath)) {
            data.basic = JSON.parse(fs.readFileSync(basicPath, 'utf8'));
        }
    }
    
    if (type === 'score_reasons' || type === 'all') {
        const reasonsPath = path.join(transPath, 'score_reasons.json');
        if (fs.existsSync(reasonsPath)) {
            data.score_reasons = JSON.parse(fs.readFileSync(reasonsPath, 'utf8'));
        }
    }
    
    return data;
}

// 번역 결과 저장
function saveTranslations(lang, type, data) {
    const transPath = path.join(__dirname, '..', 'translations', lang);
    
    if (!fs.existsSync(transPath)) {
        fs.mkdirSync(transPath, { recursive: true });
    }
    
    if (data.basic) {
        fs.writeFileSync(
            path.join(transPath, 'basic.json'),
            JSON.stringify(data.basic, null, 2),
            'utf8'
        );
    }
    
    if (data.score_reasons) {
        fs.writeFileSync(
            path.join(transPath, 'score_reasons.json'),
            JSON.stringify(data.score_reasons, null, 2),
            'utf8'
        );
    }
    
    console.log(`✅ Saved translations to ${transPath}`);
}

// Claude API 호출
async function callClaudeAPI(systemPrompt, userMessage, retries = CONFIG.RETRY_ATTEMPTS) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
        throw new Error('ANTHROPIC_API_KEY environment variable not set');
    }
    
    const requestBody = JSON.stringify({
        model: CONFIG.MODEL,
        max_tokens: CONFIG.MAX_TOKENS,
        system: systemPrompt,
        messages: [{ role: 'user', content: userMessage }]
    });
    
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.anthropic.com',
            path: '/v1/messages',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            }
        };
        
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const response = JSON.parse(data);
                    if (response.error) {
                        if (retries > 0 && response.error.type === 'rate_limit_error') {
                            console.log(`⏳ Rate limited, retrying in ${CONFIG.RETRY_DELAY}ms...`);
                            setTimeout(() => {
                                callClaudeAPI(systemPrompt, userMessage, retries - 1)
                                    .then(resolve)
                                    .catch(reject);
                            }, CONFIG.RETRY_DELAY);
                        } else {
                            reject(new Error(response.error.message));
                        }
                    } else {
                        resolve(response.content[0].text);
                    }
                } catch (e) {
                    reject(e);
                }
            });
        });
        
        req.on('error', reject);
        req.write(requestBody);
        req.end();
    });
}

// 배치 번역 실행
async function translateBatch(landmarks, sourceData, systemPrompt, type) {
    const results = {};
    
    for (const landmarkId of landmarks) {
        const landmarkData = {};
        
        if (type === 'basic' || type === 'all') {
            if (sourceData.basic && sourceData.basic[landmarkId]) {
                landmarkData.basic = sourceData.basic[landmarkId];
            }
        }
        
        if (type === 'score_reasons' || type === 'all') {
            if (sourceData.score_reasons && sourceData.score_reasons[landmarkId]) {
                landmarkData.score_reasons = sourceData.score_reasons[landmarkId];
            }
        }
        
        if (Object.keys(landmarkData).length === 0) continue;
        
        const userMessage = `Translate the following Korean content for landmark "${landmarkId}" to the target language.

IMPORTANT: 
- Return ONLY valid JSON, no markdown code blocks
- Preserve the exact same structure
- Maintain the exact number of sentences/items in each array

Input:
${JSON.stringify(landmarkData, null, 2)}`;
        
        console.log(`🔄 Translating: ${landmarkId}...`);
        
        try {
            const response = await callClaudeAPI(systemPrompt, userMessage);
            
            // JSON 추출 (마크다운 코드블록 제거)
            let jsonStr = response;
            if (jsonStr.includes('```json')) {
                jsonStr = jsonStr.replace(/```json\n?/g, '').replace(/```\n?/g, '');
            } else if (jsonStr.includes('```')) {
                jsonStr = jsonStr.replace(/```\n?/g, '');
            }
            
            const translated = JSON.parse(jsonStr.trim());
            results[landmarkId] = translated;
            
            console.log(`✅ Completed: ${landmarkId}`);
            
            // Rate limit 대기
            await new Promise(r => setTimeout(r, CONFIG.RATE_LIMIT_DELAY));
            
        } catch (error) {
            console.error(`❌ Error translating ${landmarkId}:`, error.message);
            results[landmarkId] = { error: error.message };
        }
    }
    
    return results;
}

// 결과 병합
function mergeResults(existing, newResults, type) {
    const merged = {
        basic: { ...(existing.basic || {}) },
        score_reasons: { ...(existing.score_reasons || {}) }
    };
    
    for (const [landmarkId, data] of Object.entries(newResults)) {
        if (data.error) continue;
        
        if (data.basic) {
            merged.basic[landmarkId] = data.basic;
        }
        if (data.score_reasons) {
            merged.score_reasons[landmarkId] = data.score_reasons;
        }
    }
    
    return merged;
}

// 진행 상황 표시
function showProgress(current, total, lang) {
    const percent = Math.round((current / total) * 100);
    const bar = '█'.repeat(Math.floor(percent / 5)) + '░'.repeat(20 - Math.floor(percent / 5));
    console.log(`\n[${bar}] ${percent}% (${current}/${total}) - ${lang.toUpperCase()}\n`);
}

// 메인 함수
async function main() {
    const args = parseArgs();
    
    // 필수 인자 확인
    if (!args.lang || !['en', 'zh', 'ja'].includes(args.lang)) {
        console.error('Usage: node translate_batch.js --lang=<en|zh|ja> [--type=<basic|score_reasons|all>]');
        process.exit(1);
    }
    
    const lang = args.lang;
    const type = args.type || 'all';
    const startIndex = parseInt(args.start) || 0;
    const limit = args.limit ? parseInt(args.limit) : null;
    const dryRun = args['dry-run'] || false;
    
    console.log('='.repeat(60));
    console.log(`Seoul Landmarks Translation - ${lang.toUpperCase()}`);
    console.log('='.repeat(60));
    console.log(`Type: ${type}`);
    console.log(`Start Index: ${startIndex}`);
    console.log(`Limit: ${limit || 'all'}`);
    console.log(`Dry Run: ${dryRun}`);
    console.log('='.repeat(60));
    
    // 데이터 로드
    const systemPrompt = loadSystemPrompt(lang);
    const sourceData = loadSourceData(type);
    const existingTranslations = loadExistingTranslations(lang, type);
    
    // 처리할 명소 목록
    let landmarkIds = Object.keys(sourceData.score_reasons || sourceData.basic || {});
    
    // 범위 적용
    if (startIndex > 0 || limit) {
        landmarkIds = landmarkIds.slice(startIndex, limit ? startIndex + limit : undefined);
    }
    
    console.log(`\n📋 Landmarks to translate: ${landmarkIds.length}`);
    console.log(landmarkIds.slice(0, 5).join(', ') + (landmarkIds.length > 5 ? '...' : ''));
    
    if (dryRun) {
        console.log('\n🔍 Dry run mode - no API calls will be made');
        console.log('\nSample prompt:');
        console.log(systemPrompt.slice(0, 500) + '...');
        return;
    }
    
    // 배치 처리
    const totalBatches = Math.ceil(landmarkIds.length / CONFIG.BATCH_SIZE);
    let allResults = {};
    
    for (let i = 0; i < totalBatches; i++) {
        const batchStart = i * CONFIG.BATCH_SIZE;
        const batchEnd = Math.min(batchStart + CONFIG.BATCH_SIZE, landmarkIds.length);
        const batch = landmarkIds.slice(batchStart, batchEnd);
        
        showProgress(batchStart, landmarkIds.length, lang);
        
        const batchResults = await translateBatch(batch, sourceData, systemPrompt, type);
        allResults = { ...allResults, ...batchResults };
        
        // 중간 저장 (5배치마다)
        if ((i + 1) % 5 === 0) {
            const merged = mergeResults(existingTranslations, allResults, type);
            saveTranslations(lang, type, merged);
            console.log(`💾 Checkpoint saved after batch ${i + 1}/${totalBatches}`);
        }
    }
    
    // 최종 저장
    const finalMerged = mergeResults(existingTranslations, allResults, type);
    saveTranslations(lang, type, finalMerged);
    
    showProgress(landmarkIds.length, landmarkIds.length, lang);
    console.log('\n✅ Translation complete!');
    
    // 통계
    const successCount = Object.values(allResults).filter(r => !r.error).length;
    const errorCount = Object.values(allResults).filter(r => r.error).length;
    console.log(`\n📊 Results: ${successCount} success, ${errorCount} errors`);
    
    if (errorCount > 0) {
        console.log('\n❌ Failed landmarks:');
        Object.entries(allResults)
            .filter(([_, r]) => r.error)
            .forEach(([id, r]) => console.log(`  - ${id}: ${r.error}`));
    }
}

// 실행
main().catch(console.error);
