const fs = require('fs');
const path = require('path');

const API_KEY = 'AIzaSyBfHgqFqiNHlO2MzLKn3H1PBl55kIY8Mzg';
const DB_PATH = path.join(__dirname, '../db.js');

const content = fs.readFileSync(DB_PATH, 'utf8');
eval(content.replace('const RESTAURANTS', 'var RESTAURANTS'));

function hasBrokenPhotos(r) {
    if (!r.photos || r.photos.length === 0) return true;
    return r.photos.some(p => p.includes('/gps-cs-s/'));
}

async function fetchPhotos(placeId) {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.status !== 'OK' || !data.result || !data.result.photos) return null;
        return data.result.photos.slice(0, 10).map(photo =>
            `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1920&photo_reference=${photo.photo_reference}&key=${API_KEY}`
        );
    } catch (error) {
        return null;
    }
}

async function main() {
    const broken = RESTAURANTS.filter(hasBrokenPhotos);
    console.log(`갱신 필요: ${broken.length}개`);

    let updated = 0;
    let failed = [];

    for (let i = 0; i < broken.length; i++) {
        const r = broken[i];

        if (!r.placeId) {
            failed.push(r.name + ' (no placeId)');
            console.log(`[${i + 1}/${broken.length}] ${r.name}: placeId 없음`);
            continue;
        }

        const photos = await fetchPhotos(r.placeId);

        if (photos && photos.length > 0) {
            const idx = RESTAURANTS.findIndex(x => x.id === r.id);
            RESTAURANTS[idx].photos = photos;
            updated++;
            console.log(`[${i + 1}/${broken.length}] ${r.name}: ${photos.length}장 OK`);
        } else {
            failed.push(r.name);
            console.log(`[${i + 1}/${broken.length}] ${r.name}: FAIL`);
        }

        await new Promise(resolve => setTimeout(resolve, 250));
    }

    console.log(`\n성공: ${updated}, 실패: ${failed.length}`);
    if (failed.length > 0) console.log('실패:', failed.join(', '));

    if (updated > 0) {
        const newContent = 'const RESTAURANTS = ' + JSON.stringify(RESTAURANTS, null, 2) + ';\n';
        fs.writeFileSync(DB_PATH, newContent, 'utf8');
        console.log('db.js 저장 완료!');
    }
}

main().catch(console.error);
