const rootStyle = document.documentElement.style;
rootStyle.setProperty('--primary', Config.SITE.colors.primary);
rootStyle.setProperty('--grad-start', Config.SITE.colors.gradientStart);
rootStyle.setProperty('--grad-end', Config.SITE.colors.gradientEnd);

let currentModalVersion = null;
let activeCategoryFilter = 'all';
let activeRouletteVersions = new Set(Config.SITE.versions.map(v => v.versionNum));

if (Config.EXPERIMENTS.hideAllText) {
    document.documentElement.style.color = 'transparent';
    const style = document.createElement('style');
    style.innerHTML = '* { color: transparent !important; text-shadow: none !important; }';
    document.head.appendChild(style);
}

if (Config.EXPERIMENTS.deleteAllFilesMode) {
    document.getElementById('app').innerHTML = '';
}

if (Config.EXPERIMENTS.rainbowMode) {
    const style = document.createElement('style');
    style.innerHTML = '@keyframes rainbow { 0%{filter: hue-rotate(0deg);} 100%{filter: hue-rotate(360deg);} } body { animation: rainbow 8s linear infinite; }';
    document.head.appendChild(style);
}

if (Config.EXPERIMENTS.disableCanvasBackground) {
    const atomCanvas = document.getElementById('atom-canvas');
    if (atomCanvas) atomCanvas.style.display = 'none';
}

if (!Config.FUNCTIONAL.isSiteEnabled) {
    const canvasToRemove = document.getElementById('atom-canvas');
    if (canvasToRemove) canvasToRemove.remove();
    particles = null; 
    sparks = null;
    
    document.body.innerHTML = `
        <div class="maintenance-screen">
            <div class="logo-container maintenance-logo-container">
                <img src="${Config.SITE.logo}" alt="Logo" class="logo maintenance-logo">
            </div>
            <div class="maintenance-text">${Config.UI.maintenanceText}</div>
        </div>
    `;
    throw new Error('Maintenance Mode Active');
}

if (!Config.FUNCTIONAL.isResponsive) {
    document.getElementById('meta-viewport').setAttribute('content', 'width=1100');
}

if (!Config.FUNCTIONAL.showTimeWidget) {
    document.getElementById('realtime-widget').style.display = 'none';
}

function updateTime() {
    const now = new Date();
    const hours = now.getHours();
    const timeStr = now.toLocaleTimeString(Config.FUNCTIONAL.timeLocale, { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const offsetHours = -now.getTimezoneOffset() / 60;
    const zoneStr = offsetHours >= 0 ? `+${offsetHours}` : `${offsetHours}`;
    document.getElementById('realtime-widget').innerHTML = `${Config.UI.timePrefix} <span>${timeStr}</span> (${Config.UI.timeZoneLabel}${zoneStr})`;
    
    let greeting = Config.UI.greetings.night;
    if (hours >= 6 && hours < 12) greeting = Config.UI.greetings.morning;
    else if (hours >= 12 && hours < 18) greeting = Config.UI.greetings.day;
    else if (hours >= 18 && hours < 24) greeting = Config.UI.greetings.evening;
    
    document.getElementById('site-subtitle').innerHTML = `<span style="color: var(--primary); font-weight: 700;">${greeting}</span><br style="margin-bottom: 6px;">${Config.UI.subtitle}`;
}

const canvas = document.getElementById('atom-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let particles = []; 
let sparks = []; 
const mouse = { x: null, y: null, radius: 140 };
const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0;

function resizeCanvas() { 
    if (!canvas || Config.EXPERIMENTS.disableCanvasBackground) return;
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = window.innerWidth * dpr; 
    canvas.height = window.innerHeight * dpr; 
    ctx.scale(dpr, dpr);
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    
    initParticles(); 
}

if (!isMobile) {
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', (e) => { 
        mouse.x = e.clientX; 
        mouse.y = e.clientY;
        if (sparks && sparks.length < 45) sparks.push(new Spark(e.clientX, e.clientY));
    });
    window.addEventListener('mouseout', () => { mouse.x = null; mouse.y = null; });
}

class Particle {
    constructor(x, y) {
        this.x = x; this.y = y; this.baseX = x; this.baseY = y; this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.4; this.speedY = (Math.random() - 0.5) * 0.4;
    }
    update() {
        this.baseX += this.speedX; this.baseY += this.speedY;
        if (this.baseX < 0 || this.baseX > window.innerWidth) this.speedX *= -1;
        if (this.baseY < 0 || this.baseY > window.innerHeight) this.speedY *= -1;
        let targetX = this.baseX; let targetY = this.baseY;
        
        if (!isMobile && mouse.x != null && mouse.y != null) {
            let dx = mouse.x - this.baseX; let dy = mouse.y - this.baseY; let distance = Math.hypot(dx, dy);
            if (distance < mouse.radius) {
                let force = (mouse.radius - distance) / mouse.radius; let angle = Math.atan2(dy, dx);
                targetX = this.baseX - Math.cos(angle) * force * 45; targetY = this.baseY - Math.sin(angle) * force * 45;
            }
        }
        this.x += (targetX - this.x) * 0.08; this.y += (targetY - this.y) * 0.08;
    }
    draw() {
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 180, 0, 0.25)' : 'rgba(255, 85, 0, 0.15)'; ctx.fill();
    }
}

class Spark {
    constructor(x, y) {
        this.x = x; this.y = y; this.maxSize = Math.random() * 3 + 2; this.size = this.maxSize;
        this.speedX = (Math.random() - 0.5) * 2.5; this.speedY = (Math.random() - 0.5) * 2.5;
        this.alpha = 1; this.life = 1; this.decay = Math.random() * 0.015 + 0.012;
    }
    update() {
        this.x += this.speedX; this.y += this.speedY; this.speedX *= 0.97; this.speedY *= 0.97;
        this.life -= this.decay; this.alpha = this.life; this.size = this.maxSize * this.life;
        if (this.size < 0) this.size = 0;
    }
    draw() {
        if (this.alpha <= 0) return;
        ctx.save(); ctx.globalAlpha = this.alpha; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.shadowBlur = 15; ctx.shadowColor = '#ff8800'; ctx.fillStyle = '#ffbb00'; ctx.fill(); ctx.restore();
    }
}

function initParticles() {
    if (!ctx || Config.EXPERIMENTS.disableCanvasBackground) return;
    particles = []; 
    const density = isMobile ? 35000 : 9000;
    const count = Math.floor((window.innerWidth * window.innerHeight) / density);
    for (let i = 0; i < count; i++) particles.push(new Particle(Math.random() * window.innerWidth, Math.random() * window.innerHeight));
}

function animate() {
    if (!ctx || Config.EXPERIMENTS.disableCanvasBackground) return;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let p of particles) { p.update(); p.draw(); }
    if (!isMobile) {
        for (let i = sparks.length - 1; i >= 0; i--) { 
            sparks[i].update(); 
            sparks[i].draw(); 
            if (sparks[i].alpha <= 0) { sparks.splice(i, 1); } 
        }
    }
    requestAnimationFrame(animate);
}

function debounce(func, timeout = Config.FUNCTIONAL.searchDebounceDelay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

function filterModsList(modsArray, query) {
    if (!query) return modsArray;
    return modsArray.filter(mod => 
        mod.name.toLowerCase().includes(query) || 
        mod.desc.toLowerCase().includes(query)
    );
}

function showLarp() {
    const larp = document.createElement('div');
    larp.textContent = 'LARP';
    larp.className = 'larp-text';
    document.body.appendChild(larp);
    setTimeout(() => larp.remove(), 2500);
}

function getModsForCurrentVersion() {
    const allMods = (Config.MODS && Object.keys(Config.MODS).length > 0) ? Config.MODS : (typeof MODS_DATA !== 'undefined' ? MODS_DATA : {});
    const targetMods = {};
    for (const [category, versionsObj] of Object.entries(allMods)) {
        if (versionsObj[currentModalVersion]) {
            targetMods[category] = versionsObj[currentModalVersion];
        }
    }
    return targetMods;
}

function openModsModal(versionKey) { 
    currentModalVersion = versionKey;
    activeCategoryFilter = 'all';
    const targetMods = getModsForCurrentVersion();

    const modalModsList = document.getElementById('modal-mods-list');
    const searchInput = document.getElementById('mods-search');
    const filterContainer = document.getElementById('mods-category-filters');

    let filtersHtml = `<button class="cat-btn active" data-cat="all">Все категории</button>`;
    for (const category of Object.keys(targetMods)) {
        filtersHtml += `<button class="cat-btn" data-cat="${category}">${category}</button>`;
    }
    filterContainer.innerHTML = filtersHtml;

    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            activeCategoryFilter = e.target.getAttribute('data-cat');
            render(searchInput.value);
        });
    });

    const render = (query = '') => {
        const cleanQuery = query.trim().toLowerCase();
        let html = '';
        let hasMods = false;

        for (const [category, mods] of Object.entries(targetMods)) {
            if (activeCategoryFilter !== 'all' && activeCategoryFilter !== category) continue;
            
            const filteredMods = filterModsList(mods, cleanQuery);
            if (filteredMods.length > 0) {
                hasMods = true;
                html += `<div class="mod-category-title">${category}</div>`;
                filteredMods.forEach(mod => {
                    html += `
                        <div class="mod-item">
                            <div class="mod-name">${mod.name}</div>
                            <div class="mod-desc">${mod.desc}</div>
                        </div>
                    `;
                });
            }
        }

        if (!hasMods) {
            html = `<div style="text-align: center; color: #94a3b8; padding: 20px;">Моды не найдены.</div>`;
        }
        modalModsList.innerHTML = html;
    };

    searchInput.value = '';
    searchInput.oninput = debounce((e) => {
        if (e.target.value.toLowerCase() === 'larp') showLarp();
        render(e.target.value);
    });

    render();
    
    document.getElementById('mods-modal').classList.add('active');
}

function closeModsModal() {
    document.getElementById('mods-modal').classList.remove('active');
    currentModalVersion = null;
}

function openExportModal() {
    const targetMods = getModsForCurrentVersion();
    const categoriesList = document.getElementById('export-categories-list');
    let html = '';
    
    for (const category of Object.keys(targetMods)) {
        html += `
            <label class="export-checkbox-label">
                <input type="checkbox" class="export-cat-cb" value="${category}" checked>
                ${category}
            </label>
        `;
    }
    
    categoriesList.innerHTML = html || '<div style="color: #94a3b8;">Нет доступных категорий.</div>';
    document.getElementById('export-modal').classList.add('active');
}

function closeExportModal() {
    document.getElementById('export-modal').classList.remove('active');
}

let isSpinning = false;
let currentRouletteIndex = 0;
let rouletteAnimFrame;

function generateTapeItems(count) {
    let items = '';
    const availableVersions = Config.SITE.versions.filter(v => v.isAvailable !== false && activeRouletteVersions.has(v.versionNum));
    
    if (availableVersions.length === 0) return items;

    for (let i = 0; i < count; i++) {
        const randVer = availableVersions[Math.floor(Math.random() * availableVersions.length)].versionNum;
        items += `
            <div class="roulette-item" data-version="${randVer}">
                <div class="roulette-version">${randVer}</div>
                <div class="roulette-natrium">${Config.UI.modals.rouletteItemHighlight}</div>
            </div>
        `;
    }
    return items;
}

function openRouletteModal() {
    const tape = document.getElementById('roulette-tape');
    const toggleContainer = document.getElementById('roulette-version-toggles');
    
    let toggleHtml = '';
    Config.SITE.versions.forEach(v => {
        if (v.isAvailable !== false) {
            const isActive = activeRouletteVersions.has(v.versionNum);
            toggleHtml += `<button class="cat-btn ${isActive ? 'active' : ''}" data-roulette-ver="${v.versionNum}">${v.versionNum}</button>`;
        }
    });
    toggleContainer.innerHTML = toggleHtml;

    toggleContainer.querySelectorAll('.cat-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (isSpinning) return;
            const ver = e.target.getAttribute('data-roulette-ver');
            if (activeRouletteVersions.has(ver)) {
                if (activeRouletteVersions.size > 1) {
                    activeRouletteVersions.delete(ver);
                    e.target.classList.remove('active');
                }
            } else {
                activeRouletteVersions.add(ver);
                e.target.classList.add('active');
            }
            tape.style.transform = 'translateX(0px)';
            currentRouletteIndex = 0;
            tape.innerHTML = generateTapeItems(150);
            document.getElementById('roulette-result-ui').classList.remove('active');
            const btnSpin = document.getElementById('btn-spin');
            btnSpin.style.opacity = '1';
            btnSpin.style.pointerEvents = 'auto';
            btnSpin.style.transform = 'scale(1)';
        });
    });

    tape.style.transform = 'translateX(0px)';
    currentRouletteIndex = 0;
    tape.innerHTML = generateTapeItems(150);

    const btnSpin = document.getElementById('btn-spin');
    btnSpin.style.opacity = '1';
    btnSpin.style.pointerEvents = 'auto';
    btnSpin.style.transform = 'scale(1)';
    document.getElementById('roulette-result-ui').classList.remove('active');
    
    document.getElementById('roulette-modal').classList.add('active');
}

function closeRouletteModal() {
    if (isSpinning) return;
    document.getElementById('roulette-modal').classList.remove('active');
    if (rouletteAnimFrame) cancelAnimationFrame(rouletteAnimFrame);
}

function spinRoulette() {
    if (isSpinning) return;
    
    const availableVersions = Config.SITE.versions.filter(v => v.isAvailable !== false && activeRouletteVersions.has(v.versionNum));
    if (availableVersions.length === 0) return;

    isSpinning = true;

    document.getElementById('roulette-result-ui').classList.remove('active');
    
    const btnSpin = document.getElementById('btn-spin');
    btnSpin.style.opacity = '0';
    btnSpin.style.pointerEvents = 'none';
    btnSpin.style.transform = 'scale(0.95)';

    const tape = document.getElementById('roulette-tape');
    const advanceBy = Math.floor(Math.random() * 8) + 25;
    const winIndex = currentRouletteIndex + advanceBy;

    if (winIndex >= tape.children.length - 10) {
        tape.innerHTML += generateTapeItems(100);
    }

    const targetItem = tape.children[winIndex];
    const winVersionNum = targetItem.getAttribute('data-version');
    
    const itemWidth = isMobile ? 130 : 150; 
    const containerWidth = document.querySelector('.roulette-container').offsetWidth;
    const centerOffset = containerWidth / 2 - itemWidth / 2;
    
    const targetX = -(winIndex * itemWidth) + centerOffset;
    
    let currentTransform = tape.style.transform;
    let startX = 0;
    if (currentTransform && currentTransform.includes('translateX')) {
        startX = parseFloat(currentTransform.replace('translateX(', '').replace('px)', ''));
    }

    const startTime = performance.now();
    const duration = Config.FUNCTIONAL.rouletteSpinDuration;

    tape.style.transition = 'none';

    function animateSpin(currentTime) {
        const elapsed = currentTime - startTime;
        let progress = elapsed / duration;
        if (progress > 1) progress = 1;

        const ease = 1 - Math.pow(1 - progress, 4);
        const currentX = startX + (targetX - startX) * ease;

        tape.style.transform = `translateX(${currentX}px)`;

        if (progress < 1) {
            rouletteAnimFrame = requestAnimationFrame(animateSpin);
        } else {
            currentRouletteIndex = winIndex;
            isSpinning = false;
            
            const configVersion = Config.SITE.versions.find(v => v.versionNum === winVersionNum) || { versionNum: winVersionNum, link: '#', fileName: '' };
            
            const dlBtn = document.getElementById('roulette-download-btn');
            dlBtn.innerText = `${Config.UI.buttons.downloadRoulette} ${configVersion.versionNum}`;
            dlBtn.onclick = () => {
                closeRouletteModal();
                openDownloadModal(configVersion.versionNum, configVersion.link, configVersion.fileName);
            };
            
            document.getElementById('roulette-result-ui').classList.add('active');
        }
    }

    rouletteAnimFrame = requestAnimationFrame(animateSpin);
}

function openDownloadModal(versionNum, link, fileName) {
    document.getElementById('download-modal-title').innerHTML = `${Config.UI.modals.downloadTitlePrefix} <span style="color: var(--primary);">${versionNum}</span>`;
    document.getElementById('download-modal').classList.add('active');

    const a = document.createElement('a');
    a.href = link;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function closeDownloadModal() {
    document.getElementById('download-modal').classList.remove('active');
}

function renderSite() {
    document.title = Config.UI.pageTitle;
    document.getElementById('site-logo').src = Config.SITE.logo;
    document.getElementById('site-title').innerText = Config.UI.title;
    
    const fav = document.createElement('link');
    fav.rel = 'icon';
    fav.href = Config.SITE.favicon;
    document.head.appendChild(fav);

    if (Config.FUNCTIONAL.showTimeWidget) {
        updateTime();
        setInterval(updateTime, 1000);
    }

    const btnRoulette = document.getElementById('btn-roulette-open');
    if (!Config.EXPERIMENTS.disableRoulette) {
        btnRoulette.innerText = Config.UI.buttons.rouletteOpen;
        btnRoulette.onclick = openRouletteModal;
    } else {
        btnRoulette.style.display = 'none';
    }

    const versionsContainer = document.getElementById('versions-container');
    let versionsHtml = '';
    Config.SITE.versions.forEach(v => {
        if (v.isAvailable === false) {
            versionsHtml += `
                <div class="card unavailable">
                    <span class="fabric-badge">Fabric</span>
                    <span class="card-title">${v.versionNum}</span>
                    <span class="card-version">${Config.UI.modals.versionPrefix}</span>
                    <span class="file-type">${v.fileType}</span>
                    <button class="btn-download">Недоступно</button>
                    <button class="btn-mods" style="opacity: 0.5; cursor: not-allowed;">${Config.UI.buttons.modsList}</button>
                </div>
            `;
        } else {
            versionsHtml += `
                <div class="card">
                    <span class="fabric-badge">Fabric</span>
                    <span class="card-title">${v.versionNum}</span>
                    <span class="card-version">${Config.UI.modals.versionPrefix}</span>
                    <span class="file-type">${v.fileType}</span>
                    <button class="btn-download" onclick="openDownloadModal('${v.versionNum}', '${v.link}', '${v.fileName}')">${Config.UI.buttons.download}</button>
                    <button class="btn-mods" onclick="openModsModal('${v.versionNum}')">${Config.UI.buttons.modsList}</button>
                </div>
            `;
        }
    });
    versionsContainer.innerHTML = versionsHtml;

    document.getElementById('mods-modal-title').innerHTML = `${Config.UI.modals.modsTitlePrefix} <span>${Config.UI.modals.modsTitleHighlight}</span>`;
    document.getElementById('mods-search').placeholder = Config.UI.modals.searchPlaceholder;
    document.getElementById('mods-close-btn').onclick = closeModsModal;

    document.getElementById('btn-copy-mods').innerText = Config.UI.buttons.copyList;
    
    document.getElementById('export-close-btn').onclick = closeExportModal;
    document.getElementById('btn-export-txt').onclick = openExportModal;

    document.getElementById('btn-confirm-export').addEventListener('click', () => {
        const targetMods = getModsForCurrentVersion();
        const selectedCats = Array.from(document.querySelectorAll('.export-cat-cb:checked')).map(cb => cb.value);
        const formatNode = document.querySelector('input[name="export-format"]:checked');
        const format = formatNode ? formatNode.value : 'txt';

        if (selectedCats.length === 0) return alert('Выберите хотя бы одну категорию для экспорта.');

        let textContent = '';
        let fileExt = '';
        let mimeType = '';

        if (format === 'txt') {
            textContent = `Список модов NATRIUM (Версия: ${currentModalVersion})\n\n`;
            selectedCats.forEach(cat => {
                if (targetMods[cat]) {
                    textContent += `--- ${cat.toUpperCase()} ---\n`;
                    targetMods[cat].forEach(mod => { textContent += `${mod.name} - ${mod.desc}\n`; });
                    textContent += `\n`;
                }
            });
            fileExt = 'txt';
            mimeType = 'text/plain';
        } else if (format === 'json') {
            const exportObj = {};
            selectedCats.forEach(cat => { if (targetMods[cat]) exportObj[cat] = targetMods[cat]; });
            textContent = JSON.stringify({ version: currentModalVersion, mods: exportObj }, null, 4);
            fileExt = 'json';
            mimeType = 'application/json';
        } else if (format === 'csv') {
            textContent = `Category,Name,Description\n`;
            selectedCats.forEach(cat => {
                if (targetMods[cat]) {
                    targetMods[cat].forEach(mod => {
                        const safeName = mod.name.replace(/"/g, '""');
                        const safeDesc = mod.desc.replace(/"/g, '""');
                        textContent += `"${cat}","${safeName}","${safeDesc}"\n`;
                    });
                }
            });
            fileExt = 'csv';
            mimeType = 'text/csv';
        } else if (format === 'md') {
            textContent = `# Список модов NATRIUM (Версия: ${currentModalVersion})\n\n`;
            selectedCats.forEach(cat => {
                if (targetMods[cat]) {
                    textContent += `## ${cat}\n`;
                    targetMods[cat].forEach(mod => { textContent += `- **${mod.name}**: ${mod.desc}\n`; });
                    textContent += `\n`;
                }
            });
            fileExt = 'md';
            mimeType = 'text/markdown';
        }

        const blob = new Blob([textContent], { type: `${mimeType};charset=utf-8` });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Natrium_Mods_${currentModalVersion}.${fileExt}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        closeExportModal();
    });

    document.getElementById('btn-copy-mods').addEventListener('click', () => {
        const targetMods = getModsForCurrentVersion();
        let textToCopy = `Список модов NATRIUM (Версия: ${currentModalVersion})\n\n`;
        for (const [category, mods] of Object.entries(targetMods)) {
            textToCopy += `--- ${category.toUpperCase()} ---\n`;
            mods.forEach(mod => { textToCopy += `${mod.name} - ${mod.desc}\n`; });
            textToCopy += `\n`;
        }
        navigator.clipboard.writeText(textToCopy).then(() => {
            const btn = document.getElementById('btn-copy-mods');
            const originalText = btn.innerText;
            btn.innerText = "Скопировано!";
            setTimeout(() => { btn.innerText = originalText; }, 2000);
        }).catch(err => {
            console.error('Ошибка копирования: ', err);
            alert('Не удалось скопировать текст.');
        });
    });

    document.getElementById('roulette-modal-title').innerHTML = `${Config.UI.modals.rouletteTitlePrefix} <span>${Config.UI.modals.rouletteTitleHighlight}</span>`;
    document.getElementById('roulette-close-btn').onclick = closeRouletteModal;
    document.getElementById('btn-spin').innerText = Config.UI.buttons.spin;
    document.getElementById('btn-spin').onclick = spinRoulette;
    document.getElementById('btn-spin-again').innerText = Config.UI.buttons.spinAgain;
    document.getElementById('btn-spin-again').onclick = spinRoulette;
    document.getElementById('btn-roulette-home').innerText = Config.UI.buttons.home;
    document.getElementById('btn-roulette-home').onclick = closeRouletteModal;

    document.getElementById('download-close-btn').onclick = closeDownloadModal;

    const whyContainer = document.getElementById('why-container');
    let whyHtml = `<div class="why-title">${Config.WHY_NATRIUM.title}</div><div class="why-grid">`;
    Config.WHY_NATRIUM.facts.forEach(fact => {
        whyHtml += `
            <div class="why-card">
                <div class="why-card-title">${fact.title}</div>
                <div class="why-card-desc">${fact.desc}</div>
            </div>
        `;
    });
    whyHtml += `</div>`;
    whyContainer.innerHTML = whyHtml;

    const instContainer = document.getElementById('instruction-container');
    let instHtml = `
        <button class="pill-button" id="btn-toggle-instruction">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px;"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
            ${Config.INSTRUCTION.buttonText}
        </button>
        <div class="instruction-anim-box" id="instruction-box">
            <div class="instruction-inner">
                <div class="instruction-content">
                    <div class="instruction-title">${Config.INSTRUCTION.title}</div>
                    <ol class="instruction-list">
    `;
    Config.INSTRUCTION.steps.forEach(step => { instHtml += `<li>${step}</li>`; });
    instHtml += `</ol></div></div></div>`;
    instContainer.innerHTML = instHtml;

    document.getElementById('btn-toggle-instruction').addEventListener('click', () => {
        document.getElementById('instruction-box').classList.toggle('active');
    });

    if (Config.FUNCTIONAL.showSocialLinks) {
        const socialsContainer = document.getElementById('socials-container');
        let socHtml = '';
        Config.SITE.socials.forEach(soc => {
            socHtml += `<a href="${soc.url}" target="_blank" class="pill-button">${soc.text} <span>${soc.span}</span></a>`;
        });
        socialsContainer.innerHTML = socHtml;
    }

    let easterEggCounter = 0;
    document.getElementById('site-logo').addEventListener('click', () => {
        easterEggCounter++;
        if (easterEggCounter >= Config.FUNCTIONAL.easterEggClicks) {
            easterEggCounter = 0;
            if (typeof triggerAudioEasterEgg === 'function') triggerAudioEasterEgg();
        }
    });

    const targetCode = Config.FUNCTIONAL.easterEggCode;
    let inputBuffer = [];
    window.addEventListener('keydown', (e) => {
        inputBuffer.push(e.keyCode);
        if (inputBuffer.length > targetCode.split(',').length) inputBuffer.shift();
        if (inputBuffer.join(',') === targetCode) {
            inputBuffer = [];
            if (typeof triggerAudioEasterEgg === 'function') triggerAudioEasterEgg();
        }
    });

    resizeCanvas();
    animate();
}

window.addEventListener('DOMContentLoaded', renderSite);
