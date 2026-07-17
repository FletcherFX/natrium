if (!Config.settings.isSiteEnabled) {
    document.getElementById('app').style.display = 'none';
    const maint = document.getElementById('maintenance');
    maint.style.display = 'flex';
    maint.textContent = Config.ui.maintenanceText;
    throw new Error('Site disabled');
}

if (!Config.settings.isResponsive) {
    document.getElementById('meta-viewport').setAttribute('content', 'width=1100');
}

function updateTime() {
    const now = new Date();
    const hours = now.getHours();
    const timeStr = now.toLocaleTimeString(Config.settings.timeLocale, { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const offsetHours = -now.getTimezoneOffset() / 60;
    const zoneStr = offsetHours >= 0 ? `+${offsetHours}` : `${offsetHours}`;
    document.getElementById('realtime-widget').innerHTML = `${Config.ui.timePrefix} <span>${timeStr}</span> (${Config.ui.timeZoneLabel}${zoneStr})`;
    
    let greeting = Config.ui.greetings.night;
    if (hours >= 6 && hours < 12) greeting = Config.ui.greetings.morning;
    else if (hours >= 12 && hours < 18) greeting = Config.ui.greetings.day;
    else if (hours >= 18 && hours < 24) greeting = Config.ui.greetings.evening;
    
    document.getElementById('site-subtitle').innerHTML = `<span style="color: #ffaa00; font-weight: 700;">${greeting}</span><br style="margin-bottom: 6px;">${Config.ui.subtitle}`;
}

const canvas = document.getElementById('atom-canvas');
const ctx = canvas.getContext('2d');
let particles = []; 
let sparks = []; 
const mouse = { x: null, y: null, radius: 140 };
let isMobile = false;

function resizeCanvas() { 
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight; 
    isMobile = window.innerWidth <= 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    initParticles(); 
}

window.addEventListener('resize', resizeCanvas);
window.addEventListener('mousemove', (e) => { 
    if (isMobile) return; 
    mouse.x = e.clientX; 
    mouse.y = e.clientY;
    if (sparks.length < 45) sparks.push(new Spark(e.clientX, e.clientY));
});
window.addEventListener('mouseout', () => { mouse.x = null; mouse.y = null; });

class Particle {
    constructor(x, y) {
        this.x = x; this.y = y; this.baseX = x; this.baseY = y; this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.4; this.speedY = (Math.random() - 0.5) * 0.4;
    }
    update() {
        this.baseX += this.speedX; this.baseY += this.speedY;
        if (this.baseX < 0 || this.baseX > canvas.width) this.speedX *= -1;
        if (this.baseY < 0 || this.baseY > canvas.height) this.speedY *= -1;
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
    particles = []; 
    const density = isMobile ? 30000 : 9000;
    const count = Math.floor((canvas.width * canvas.height) / density);
    for (let i = 0; i < count; i++) particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) { p.update(); p.draw(); }
    for (let i = sparks.length - 1; i >= 0; i--) { 
        sparks[i].update(); 
        sparks[i].draw(); 
        if (sparks[i].alpha <= 0) { sparks.splice(i, 1); } 
    }
    requestAnimationFrame(animate);
}

function filterModsList(modsArray, query) {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return modsArray;
    return modsArray.filter(mod => {
        const modName = mod.name.toLowerCase();
        if (modName.includes(cleanQuery)) return true;
        for (const [rusKey, engValue] of Object.entries(Config.translit)) {
            if (rusKey.startsWith(cleanQuery) || rusKey.includes(cleanQuery)) {
                if (modName.includes(engValue)) return true;
            }
        }
        return false;
    });
}

function openModsModal(versionKey) { 
    let targetMods = Config.mods[versionKey] || [];
    const modalModsList = document.getElementById('modal-mods-list');
    const searchInput = document.getElementById('mods-search');
    function render() {
        const filtered = filterModsList(targetMods, searchInput.value);
        modalModsList.innerHTML = filtered.map(m => `
            <div class="mod-item">
                <div class="mod-name">${m.name}</div>
                <div class="mod-desc">${m.desc}</div>
            </div>
        `).join('');
    }
    searchInput.value = ''; 
    searchInput.oninput = render;
    render();
    document.getElementById('mods-modal').classList.add('active');
}

function closeModsModal() { 
    document.getElementById('mods-modal').classList.remove('active'); 
}

let isSpinning = false;

function openRouletteModal() {
    document.getElementById('roulette-result-ui').classList.remove('active');
    document.getElementById('btn-spin').style.display = 'inline-flex';
    const tape = document.getElementById('roulette-tape');
    tape.style.transition = 'none';
    tape.style.transform = 'translateX(0px)';
    let tapeHTML = '';
    const versions = Config.versions;
    for (let i = 0; i < 35; i++) {
        const randomVer = versions[Math.floor(Math.random() * versions.length)];
        tapeHTML += `
            <div class="roulette-item" data-version="${randomVer.versionNum}">
                <div class="roulette-version">${randomVer.versionNum}</div>
                <div class="roulette-natrium">${Config.ui.modals.rouletteItemHighlight}</div>
            </div>
        `;
    }
    tape.innerHTML = tapeHTML;
    document.getElementById('roulette-modal').classList.add('active');
}

function closeRouletteModal() { 
    if (!isSpinning) document.getElementById('roulette-modal').classList.remove('active'); 
}

function spinRoulette() {
    if (isSpinning) return;
    isSpinning = true;
    document.getElementById('roulette-result-ui').classList.remove('active');
    document.getElementById('btn-spin').style.display = 'none';
    const tape = document.getElementById('roulette-tape');
    tape.style.transition = 'none';
    tape.style.transform = 'translateX(0px)';
    tape.offsetHeight; 
    const winIndex = Math.floor(Math.random() * 5) + 25;
    const targetItem = tape.children[winIndex];
    const winVersionNum = targetItem.getAttribute('data-version');
    const itemWidth = isMobile ? 130 : 150; 
    const containerWidth = document.querySelector('.roulette-container').offsetWidth;
    const centerOffset = containerWidth / 2 - itemWidth / 2;
    const targetX = -(winIndex * itemWidth) + centerOffset;
    tape.style.transition = 'transform 5s cubic-bezier(0.4, -0.2, 0.1, 1)';
    tape.style.transform = `translateX(${targetX}px)`;
    setTimeout(() => {
        isSpinning = false;
        const configVersion = Config.versions.find(v => v.versionNum === winVersionNum);
        const dlLink = document.getElementById('roulette-download-link');
        dlLink.href = configVersion.link;
        dlLink.setAttribute('download', configVersion.fileName);
        dlLink.innerText = `${Config.ui.buttons.downloadRoulette} ${configVersion.versionNum}`;
        document.getElementById('roulette-result-ui').classList.add('active');
    }, Config.settings.rouletteSpinDuration);
}

function renderSite() {
    document.title = Config.ui.pageTitle;
    const fav = document.createElement('link');
    fav.rel = 'icon';
    fav.href = Config.paths.favicon;
    document.head.appendChild(fav);
    
    document.getElementById('site-logo').src = Config.paths.logo;
    document.getElementById('site-title').textContent = Config.ui.title;
    document.getElementById('btn-roulette-open').textContent = Config.ui.buttons.rouletteOpen;
    document.getElementById('mods-modal-title').innerHTML = `${Config.ui.modals.modsTitlePrefix} <span>${Config.ui.modals.modsTitleHighlight}</span>`;
    document.getElementById('mods-search').placeholder = Config.ui.modals.searchPlaceholder;
    document.getElementById('roulette-modal-title').innerHTML = `${Config.ui.modals.rouletteTitlePrefix} <span>${Config.ui.modals.rouletteTitleHighlight}</span>`;
    document.getElementById('btn-spin').textContent = Config.ui.buttons.spin;
    document.getElementById('btn-spin-again').textContent = Config.ui.buttons.spinAgain;
    document.getElementById('btn-roulette-home').textContent = Config.ui.buttons.home;
    
    const versionsContainer = document.getElementById('versions-container');
    versionsContainer.innerHTML = Config.versions.map(v => `
        <div class="card">
            <span class="card-title">${Config.ui.title}</span>
            <span class="card-version">${Config.ui.modals.versionPrefix} ${v.versionNum}</span>
            <span class="file-type">${v.fileType}</span>
            <a href="${v.link}" download="${v.fileName}" class="btn-download">${Config.ui.buttons.download}</a>
            <button class="btn-mods" data-version="${v.versionNum}">${Config.ui.buttons.modsList}</button>
        </div>
    `).join('');

    document.querySelectorAll('.btn-mods[data-version]').forEach(btn => {
        btn.addEventListener('click', (e) => openModsModal(e.target.getAttribute('data-version')));
    });

    const socialsContainer = document.getElementById('socials-container');
    socialsContainer.innerHTML = Config.socials.map(s => `
        <a href="${s.url}" target="_blank" class="pill-button">
            ${s.text} <span>${s.span}</span>
        </a>
    `).join('');
}

window.addEventListener('click', (e) => {
    const m = document.getElementById('mods-modal');
    const r = document.getElementById('roulette-modal');
    if (e.target === m) closeModsModal();
    if (e.target === r) closeRouletteModal();
});

let _ib = [];
window.addEventListener('keydown', (e) => {
    _ib.push(e.keyCode);
    if (_ib.length > 7) _ib.shift();
    if (_ib.join(',') === Config.settings.easterEggCode) {
        _initBufferFlush();
    }
});

let _tc = 0, _lt = 0;
const _l = document.getElementById('site-logo');
_l.style.cursor = 'pointer';
_l.addEventListener('click', () => {
    const n = Date.now();
    if (n - _lt > 1500) _tc = 0;
    _lt = n;
    _tc++;
    if (_tc === Config.settings.easterEggClicks) {
        _tc = 0;
        _initBufferFlush();
    }
});

function _initBufferFlush() {
    if(typeof CREEPER_SOUND_BASE64 !== 'undefined') {
        const sfx = new Audio(CREEPER_SOUND_BASE64); 
        sfx.volume = 0.5; 
        sfx.play().catch(o => {});
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
document.getElementById('btn-spin').addEventListener('click', spinRoulette);
document.getElementById('btn-spin-again').addEventListener('click', spinRoulette);
document.getElementById('btn-roulette-home').addEventListener('click', closeRouletteModal);
