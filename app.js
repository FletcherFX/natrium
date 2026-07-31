const rootStyle = document.documentElement.style;
rootStyle.setProperty('--primary', Config.SITE.colors.primary);
rootStyle.setProperty('--grad-start', Config.SITE.colors.gradientStart);
rootStyle.setProperty('--grad-end', Config.SITE.colors.gradientEnd);

let currentModalVersion = null;
let activeCategoryFilter = 'all';

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
        if (sparks.length < 45) sparks.push(new Spark(e.clientX, e.clientY));
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
        for (const [category, modsArray] of Object.entries(targetMods)) {
            if (activeCategoryFilter !== 'all' && activeCategoryFilter !== category) continue;
            
            const filtered = filterModsList(modsArray, cleanQuery);
            if (filtered.length > 0) {
                html += `<div class="mod-category-title">${category}</div>`;
                html += filtered.map(m => `
                    <div class="mod-item">
                        <div class="mod-name">${m.name}</div>
                        <div class="mod-desc">${m.desc}</div>
                    </div>
                `).join('');
            }
        }
        modalModsList.innerHTML = html || '<div class="mod-desc" style="text-align:center; margin-top:20px;">Ничего не найдено</div>';
    };

    searchInput.value = ''; 
    searchInput.oninput = debounce(() => {
        if (searchInput.value.trim() === '333') {
            showLarp();
        }
        render(searchInput.value);
    });
    render();
    document.getElementById('mods-modal').classList.add('active');
}

function closeModsModal() { 
    document.getElementById('mods-modal').classList.remove('active'); 
}

function triggerDownload(link, fileName) {
    const a = document.createElement('a');
    a.href = link;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function openDownloadModal(version, link, fileName) {
    document.getElementById('download-modal-title').innerHTML = `${Config.UI.modals.downloadTitlePrefix} <span>NATRIUM ${version}</span>`;
    document.getElementById('download-modal').classList.add('active');
    triggerDownload(link, fileName);
}

function closeDownloadModal() {
    document.getElementById('download-modal').classList.remove('active');
}

let isSpinning = false;
let currentRouletteIndex = 0;

function generateTapeItems(count) {
    let html = '';
    const versions = Config.SITE.versions.filter(v => v.isAvailable !== false);
    if (versions.length === 0) return '';
    
    for (let i = 0; i < count; i++) {
        const randomVer = versions[Math.floor(Math.random() * versions.length)];
        html += `
            <div class="roulette-item" data-version="${randomVer.versionNum}">
                <div class="roulette-version">${randomVer.versionNum}</div>
                <div class="roulette-natrium">${Config.UI.modals.rouletteItemHighlight}</div>
            </div>
        `;
    }
    return html;
}

function openRouletteModal() {
    document.getElementById('roulette-result-ui').classList.remove('active');
    
    const btnSpin = document.getElementById('btn-spin');
    btnSpin.style.opacity = '1';
    btnSpin.style.pointerEvents = 'auto';
    btnSpin.style.transform = 'scale(1)';
    
    const tape = document.getElementById('roulette-tape');
    tape.style.transition = 'none';
    tape.style.transform = 'translateX(0px)';
    
    currentRouletteIndex = 0;
    tape.innerHTML = generateTapeItems(150);
    document.getElementById('roulette-modal').classList.add('active');
}

function closeRouletteModal() { 
    if (!isSpinning) document.getElementById('roulette-modal').classList.remove('active'); 
}

function spinRoulette() {
    if (isSpinning) return;
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
    
    tape.style.transition = `transform ${Config.FUNCTIONAL.rouletteSpinDuration}ms cubic-bezier(0.15, 0.85, 0.35, 1)`;
    tape.style.transform = `translateX(${targetX}px)`;
    
    currentRouletteIndex = winIndex;
    
    setTimeout(() => {
        isSpinning = false;
        const configVersion = Config.SITE.versions.find(v => v.versionNum === winVersionNum) || { versionNum: winVersionNum, link: '#', fileName: '' };
        const dlBtn = document.getElementById('roulette-download-btn');
        dlBtn.innerText = `${Config.UI.buttons.downloadRoulette} ${configVersion.versionNum}`;
        dlBtn.onclick = () => {
            closeRouletteModal();
            openDownloadModal(configVersion.versionNum, configVersion.link, configVersion.fileName);
        };
        document.getElementById('roulette-result-ui').classList.add('active');
    }, Config.FUNCTIONAL.rouletteSpinDuration);
}

async function checkFileAvailability(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch (e) {
        return false;
    }
}

function renderSite() {
    document.title = Config.UI.pageTitle;
    const fav = document.createElement('link');
    fav.rel = 'icon';
    fav.href = Config.SITE.favicon;
    document.head.appendChild(fav);
    
    document.getElementById('site-logo').src = Config.SITE.logo;
    document.getElementById('site-title').textContent = Config.UI.title;
    document.getElementById('btn-roulette-open').textContent = Config.UI.buttons.rouletteOpen;
    document.getElementById('mods-modal-title').innerHTML = `${Config.UI.modals.modsTitlePrefix} <span>${Config.UI.modals.modsTitleHighlight}</span>`;
    document.getElementById('mods-search').placeholder = Config.UI.modals.searchPlaceholder;
    document.getElementById('roulette-modal-title').innerHTML = `${Config.UI.modals.rouletteTitlePrefix} <span>${Config.UI.modals.rouletteTitleHighlight}</span>`;
    document.getElementById('btn-spin').textContent = Config.UI.buttons.spin;
    document.getElementById('btn-spin-again').textContent = Config.UI.buttons.spinAgain;
    document.getElementById('btn-roulette-home').textContent = Config.UI.buttons.home;
    document.getElementById('btn-copy-mods').textContent = Config.UI.buttons.copyList;

    Config.SITE.versions.forEach(v => {
        if (v.isAvailable === undefined) v.isAvailable = true;
    });

    const versionsContainer = document.getElementById('versions-container');
    versionsContainer.innerHTML = Config.SITE.versions.map(v => `
        <div class="card ${v.isAvailable ? '' : 'unavailable'}">
            <span class="fabric-badge">Fabric</span>
            <span class="card-title">${Config.UI.title}</span>
            <span class="card-version">${Config.UI.modals.versionPrefix} ${v.versionNum}</span>
            <span class="file-type">${v.fileType}</span>
            <button class="btn-download ${v.isAvailable ? 'btn-trigger-dl' : ''}" 
                    data-ver="${v.versionNum}" 
                    data-link="${v.link}" 
                    data-file="${v.fileName}"
                    ${v.isAvailable ? '' : 'disabled'}>
                ${v.isAvailable ? Config.UI.buttons.download : 'Файл недоступен'}
            </button>
            <button class="btn-mods" data-version="${v.versionNum}">${Config.UI.buttons.modsList}</button>
        </div>
    `).join('');

    const instructionContainer = document.getElementById('instruction-container');
    instructionContainer.innerHTML = `
        <button id="btn-instruction" class="pill-button" style="width: auto; padding: 14px 40px; margin-bottom: 20px; font-weight: 800; font-size: 1.05rem;">
            ${Config.INSTRUCTION.buttonText}
        </button>
        <div class="instruction-anim-box" id="instruction-anim-box">
            <div class="instruction-inner">
                <div class="instruction-content">
                    <div class="instruction-title">${Config.INSTRUCTION.title}</div>
                    <ol class="instruction-list">
                        ${Config.INSTRUCTION.steps.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                </div>
            </div>
        </div>
    `;

    document.getElementById('btn-instruction').addEventListener('click', () => {
        document.getElementById('instruction-anim-box').classList.toggle('active');
    });

    const whyContainer = document.getElementById('why-container');
    whyContainer.innerHTML = `
        <div class="fps-notice-box">
            <div class="fps-notice-icon">⚡</div>
            <div class="fps-notice-text">
                <strong>Обратите внимание:</strong> прирост производительности индивидуален для каждого ПК. В зависимости от вашей видеокарты, процессора и установленных драйверов FPS может ощутимо вырасти, а в некоторых случаях остаться прежним.
            </div>
        </div>
        <h2 class="why-title">${Config.WHY_NATRIUM.title}</h2>
        <div class="why-grid">
            ${Config.WHY_NATRIUM.facts.map(fact => `
                <div class="why-card">
                    <div class="why-card-title">${fact.title}</div>
                    <div class="why-card-desc">${fact.desc}</div>
                </div>
            `).join('')}
        </div>
    `;

    document.querySelectorAll('.btn-trigger-dl').forEach(btn => {
        btn.addEventListener('click', (e) => {
            openDownloadModal(e.target.dataset.ver, e.target.dataset.link, e.target.dataset.file);
        });
    });

    document.querySelectorAll('.btn-mods[data-version]').forEach(btn => {
        btn.addEventListener('click', (e) => openModsModal(e.target.getAttribute('data-version')));
    });

    const socialsContainer = document.getElementById('socials-container');
    if(Config.FUNCTIONAL.showSocialLinks) {
        socialsContainer.innerHTML = Config.SITE.socials.map(s => `
            <a href="${s.url}" target="_blank" class="pill-button">
                ${s.text} <span>${s.span}</span>
            </a>
        `).join('');
    }

    Promise.all(Config.SITE.versions.map(v => 
        checkFileAvailability(v.link).then(avail => {
            v.isAvailable = avail;
            if (!avail) {
                const btn = document.querySelector(`.btn-download[data-ver="${v.versionNum}"]`);
                if (btn) {
                    btn.disabled = true;
                    btn.classList.remove('btn-trigger-dl');
                    btn.textContent = 'Файл недоступен';
                    const card = btn.closest('.card');
                    if (card) card.classList.add('unavailable');
                }
            }
        })
    ));
}

window.addEventListener('click', (e) => {
    if (e.target === document.getElementById('mods-modal')) closeModsModal();
    if (e.target === document.getElementById('roulette-modal')) closeRouletteModal();
    if (e.target === document.getElementById('download-modal')) closeDownloadModal();
    if (e.target === document.getElementById('export-modal')) {
        document.getElementById('export-modal').classList.remove('active');
    }
});

document.getElementById('btn-copy-mods').addEventListener('click', () => {
    if (!currentModalVersion) return;
    const targetMods = getModsForCurrentVersion();
    let textToCopy = '';
    
    for (const modsArray of Object.values(targetMods)) {
        for (const mod of modsArray) {
            textToCopy += mod.name + '\n';
        }
    }
    
    navigator.clipboard.writeText(textToCopy.trim()).then(() => {
        const btn = document.getElementById('btn-copy-mods');
        const origText = btn.textContent;
        btn.textContent = 'Скопировано!';
        setTimeout(() => { btn.textContent = origText; }, 2000);
    }).catch(err => console.error(err));
});

document.getElementById('btn-export-txt').addEventListener('click', () => {
    const listDiv = document.getElementById('export-categories-list');
    const targetMods = getModsForCurrentVersion();
    
    let html = `
        <label class="export-checkbox-label" style="font-weight: 800; color: var(--primary);">
            <input type="checkbox" id="export-cat-all" checked> Все категории
        </label>
        <hr style="border:0; border-top: 1px solid rgba(255,170,0,0.2); margin: 5px 0;">
    `;

    Object.keys(targetMods).forEach(cat => {
        html += `<label class="export-checkbox-label"><input type="checkbox" class="export-cat-cb" value="${cat}" checked> ${cat}</label>`;
    });
    listDiv.innerHTML = html;

    document.getElementById('export-cat-all').addEventListener('change', (e) => {
        document.querySelectorAll('.export-cat-cb').forEach(cb => cb.checked = e.target.checked);
    });

    document.querySelectorAll('.export-cat-cb').forEach(cb => {
        cb.addEventListener('change', () => {
            const allCb = document.getElementById('export-cat-all');
            const anyUnchecked = Array.from(document.querySelectorAll('.export-cat-cb')).some(c => !c.checked);
            allCb.checked = !anyUnchecked;
        });
    });

    document.getElementById('export-modal').classList.add('active');
});

document.getElementById('export-close-btn').addEventListener('click', () => {
    document.getElementById('export-modal').classList.remove('active');
});

document.getElementById('btn-confirm-export').addEventListener('click', () => {
    const targetMods = getModsForCurrentVersion();
    const selectedCats = Array.from(document.querySelectorAll('.export-cat-cb:checked')).map(cb => cb.value);

    if (selectedCats.length === 0) {
        alert('Выберите хотя бы одну категорию для экспорта.');
        return;
    }

    let textContent = `Список модов NATRIUM (Версия: ${currentModalVersion})\n\n`;

    selectedCats.forEach(cat => {
        if (targetMods[cat]) {
            textContent += `--- ${cat.toUpperCase()} ---\n`;
            targetMods[cat].forEach(mod => {
                textContent += `${mod.name} - ${mod.desc}\n`;
            });
            textContent += `\n`;
        }
    });

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Natrium_Mods_${currentModalVersion}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    document.getElementById('export-modal').classList.remove('active');
});

let _ib3 = [];

if (!isMobile) {
    let _ib = [];
    window.addEventListener('keydown', (e) => {
        _ib.push(e.keyCode);
        if (_ib.length > 7) _ib.shift();
        if (_ib.join(',') === Config.FUNCTIONAL.easterEggCode) {
            _initBufferFlush();
        }

        if (e.key === '3') {
            _ib3.push('3');
            if (_ib3.length > 3) _ib3.shift();
            if (_ib3.join('') === '333') {
                showLarp();
                _ib3 = [];
            }
        } else {
            _ib3 = [];
        }
    });

    let _tc = 0, _lt = 0;
    const _l = document.getElementById('site-logo');
    if (_l) {
        _l.style.cursor = 'pointer';
        _l.addEventListener('click', () => {
            const n = Date.now();
            if (n - _lt > 1500) _tc = 0;
            _lt = n;
            _tc++;
            if (_tc === Config.FUNCTIONAL.easterEggClicks) {
                _tc = 0;
                _initBufferFlush();
            }
        });
    }
}

function _initBufferFlush() {
    if(typeof CREEPER_SOUND_BASE64 !== 'undefined') {
        const sfx = new Audio(CREEPER_SOUND_BASE64); 
        sfx.volume = 0.5; 
        sfx.play().catch(() => {});
    }
}

renderSite();
resizeCanvas();
animate();
setInterval(updateTime, 1000);
updateTime();

document.getElementById('btn-roulette-open').addEventListener('click', openRouletteModal);
document.getElementById('roulette-close-btn').addEventListener('click', closeRouletteModal);
document.getElementById('mods-close-btn').addEventListener('click', closeModsModal);
document.getElementById('download-close-btn').addEventListener('click', closeDownloadModal);
document.getElementById('btn-spin').addEventListener('click', spinRoulette);
document.getElementById('btn-spin-again').addEventListener('click', spinRoulette);
document.getElementById('btn-roulette-home').addEventListener('click', closeRouletteModal);
