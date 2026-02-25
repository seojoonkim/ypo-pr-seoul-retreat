let currentLang = localStorage.getItem('lang') || 'ko';

function t(item, field) {
    if (currentLang === 'en' && item[field + '_en']) return item[field + '_en'];
    return item[field] || '';
}

document.addEventListener('DOMContentLoaded', () => {
    renderSchedule();
    applyHeaderLang(currentLang);

    document.getElementById('detailModal').addEventListener('click', (e) => {
        if (e.target.id === 'detailModal') closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
});

window.addEventListener('message', (e) => {
    if (e.data && e.data.type === 'CHANGE_LANG') {
        currentLang = e.data.lang;
        localStorage.setItem('lang', currentLang);
        renderSchedule();
        applyHeaderLang(currentLang);
    }
});

function applyHeaderLang(lang) {
    const title = document.getElementById('schedulePageTitle');
    const sub = document.getElementById('schedulePageSub');
    if (title) title.textContent = lang === 'en' ? '3-Day Schedule' : '3일 스케줄';
    if (sub) sub.textContent = lang === 'en'
        ? 'Full program & individual activity schedule overview'
        : '전체 참석 일정 및 개별 분산 체험 스케줄 안내';
}

function renderSchedule() {
    const container = document.getElementById('timelineContainer');
    container.innerHTML = scheduleData.map(dayData => `
        <div class="day-column">
            <div class="column-header">
                <div class="col-day-label">DAY ${dayData.day}</div>
                <div class="col-day-title">${currentLang === 'en' ? dayData.title_en.replace(/^DAY \d+: /, '') : dayData.title.replace(/^DAY \d+: /, '')}</div>
                <div class="col-day-date">${t(dayData, 'date')}</div>
            </div>
            <div class="timeline">
                ${dayData.events.map((evt, idx) => `
                    <div class="timeline-item" onclick="openModal(${dayData.day}, ${idx})">
                        <div class="timeline-time">${evt.time}</div>
                        <div class="timeline-body">
                            <div class="timeline-title">${evt.icon} ${t(evt, 'title')}</div>
                            <div class="timeline-desc">${t(evt, 'desc')}</div>
                            <div class="timeline-location">📍 ${t(evt, 'location')}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function openModal(dayId, eventIdx) {
    const dayData = scheduleData.find(d => d.day === dayId);
    if (!dayData) return;
    const evt = dayData.events[eventIdx];
    if (!evt) return;

    document.getElementById('modalTime').textContent = evt.time;
    document.getElementById('modalTitle').textContent = `${evt.icon} ${t(evt, 'title')}`;
    document.getElementById('modalLocation').textContent = t(evt, 'location');
    document.getElementById('modalDetail').innerHTML = t(evt, 'details').replace(/\n/g, '<br>');

    document.getElementById('detailModal').classList.add('active');
}

function closeModal() {
    document.getElementById('detailModal').classList.remove('active');
}
