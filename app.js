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

let isMobile = false;
function checkDevice() {
    isMobile = window.innerWidth <= 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}
checkDevice();
window.addEventListener('resize', checkDevice);

if (!Config.FUNCTIONAL.isResponsive) {
    document.getElementById('meta-viewport').setAttribute('content', 'width=1100');
}

let currentTheme = localStorage.getItem('natrium_theme_mode') || Config.SITE.defaultThemeMode;
let currentColor = localStorage.getItem('natrium_base_color') || Config.COLOR_DICTIONARY[Config.SITE.defaultColor] || Config.COLOR_DICTIONARY["золотой"];

function hexToRgbArr(hex) {
    let c = hex.replace('#', '');
    if(c.length === 3) c = c.split('').map(x => x + x).join('');
    return [parseInt(c.substring(0, 2), 16), parseInt(c.substring(2, 4), 16), parseInt(c.substring(4, 6), 16)];
}

function rgbToHex(r, g, b) {
    return "#" + [r, g, b].map(x => {
        const hex = Math.max(0, Math.min(255, Math.round(x))).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }).join('');
}

function getContrastColor(hex) {
    let r = parseInt(hex.substr(1, 2), 16);
    let g = parseInt(hex.substr(3, 2), 16);
    let b = parseInt(hex.substr(5, 2), 16);
    let yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#000000' : '#ffffff';
}

function generateShades(hexColor) {
    const rgb = hexToRgbArr(hexColor);
    const start = rgbToHex(rgb[0] + 40, rgb[1] + 40, rgb[2] + 40);
    const end = rgbToHex(rgb[0] - 40, rgb[1] - 40, rgb[2] - 40);
    return { primary: hexColor, start, end, glow: hexColor };
}

function applyThemeColors() {
    const shades = generateShades(currentColor);
    const root = document.documentElement;
    const textColor = getContrastColor(currentColor);
    
    root.setAttribute('data-theme', currentTheme);
    root.style.setProperty('--primary', shades.primary);
    root.style.setProperty('--grad-start', shades.start);
    root.style.setProperty('--grad-end', shades.end);
    root.style.setProperty('--spark-glow', shades.glow);
    root.style.setProperty('--btn-text', textColor);
    
    window.ThemeVars = shades;
}

applyThemeColors();

const settingsBtn = document.getElementById('btn-open-settings');
const settingsPanel = document.getElementById('settings-panel');
const closeSettingsBtn = document.getElementById('btn-close-settings');
const themeDarkBtn = document.getElementById('theme-dark');
const themeLightBtn = document.getElementById('theme-light');
const colorPicker = document.getElementById('native-color-picker');
const hexRgbInput = document.getElementById('hex-rgb-input');

settingsBtn.addEventListener('click', () => settingsPanel.classList.add('active'));
closeSettingsBtn.addEventListener('click', () => settingsPanel.classList.remove('active'));

function updateThemeButtons() {
    if(currentTheme === 'dark') { themeDarkBtn.classList.add('active'); themeLightBtn.classList.remove('active'); }
    else { themeLightBtn.classList.add('active'); themeDarkBtn.classList.remove('active'); }
}
updateThemeButtons();

themeDarkBtn.addEventListener('click', () => { currentTheme = 'dark'; localStorage.setItem('natrium_theme_mode', 'dark'); applyThemeColors(); updateThemeButtons(); });
themeLightBtn.addEventListener('click', () => { currentTheme = 'light'; localStorage.setItem('natrium_theme_mode', 'light'); applyThemeColors(); updateThemeButtons(); });

colorPicker.value = currentColor;
hexRgbInput.value = currentColor;

function handleColorChange(newColor) {
    if (/^#[0-9A-F]{6}$/i.test(newColor)) {
        currentColor = newColor;
    } else if (/^\d{1,3},\s*\d{1,3},\s*\d{1,3}$/.test(newColor)) {
        const rgb = newColor.split(',').map(n => parseInt(n.trim()));
        currentColor = rgbToHex(rgb[0], rgb[1], rgb[2]);
    } else return;

    colorPicker.value = currentColor;
    hexRgbInput.value = currentColor;
    localStorage.setItem('natrium_base_color', currentColor);
    applyThemeColors();
}

colorPicker.addEventListener('input', (e) => handleColorChange(e.target.value));
hexRgbInput.addEventListener('input', (e) => handleColorChange(e.target.value));

const presetsContainer = document.getElementById('color-presets');
presetsContainer.style.display = 'flex';
presetsContainer.style.gap = '8px';
presetsContainer.style.flexWrap = 'wrap';
presetsContainer.style.marginTop = '15px';

Object.entries(Config.COLOR_DICTIONARY).forEach(([name, hex]) => {
    const dot = document.createElement('div');
    dot.style.width = '24px'; dot.style.height = '24px'; dot.style.borderRadius = '50%';
    dot.style.background = hex; dot.style.cursor = 'pointer'; dot.title = name;
    dot.style.border = '2px solid var(--border-color)';
    dot.style.transition = 'transform 0.3s ease';
    dot.onmouseenter = () => dot.style.transform = 'scale(1.2)';
    dot.onmouseleave = () => dot.style.transform = 'scale(1)';
    dot.onclick = () => handleColorChange(hex);
    presetsContainer.appendChild(dot);
});

const canvas = document.getElementById('atom-canvas');
const ctx = canvas.getContext('2d');
let particles = []; 
let sparks = []; 
const mouse = { x: null, y: null, radius: 140 };

function resizeCanvas() { 
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight; 
    initParticles(); 
}
window.addEventListener('resize', resizeCanvas);

if (!isMobile) {
    window.addEventListener('mousemove', (e) => { 
        mouse.x = e.clientX; 
        mouse.y = e.clientY;
        for(let i = 0; i < Config.TRAIL.sparksPerStep; i++) {
            if (sparks.length < Config.TRAIL.maxSparks) {
                sparks.push(new Spark(e.clientX, e.clientY));
            }
        }
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
        ctx.save();
        ctx.globalAlpha = Math.random() > 0.5 ? 0.3 : 0.1;
        ctx.beginPath(); 
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = Math.random() > 0.5 ? window.ThemeVars.primary : window.ThemeVars.glow; 
        ctx.fill();
        ctx.restore();
    }
}

class Spark {
    constructor(x, y) {
        this.x = x; this.y = y; 
        this.maxSize = Math.random() * Config.TRAIL.maxSize + 2; 
        this.size = this.maxSize;
        this.speedX = (Math.random() - 0.5) * 2.5; 
        this.speedY = (Math.random() - 0.5) * 2.5;
        this.alpha = 1; this.life = 1; 
        this.decay = Math.random() * (Config.TRAIL.decaySpeed * 0.5) + Config.TRAIL.decaySpeed;
    }
    update() {
        this.x += this.speedX; this.y += this.speedY; 
        this.speedX *= 0.97; this.speedY *= 0.97;
        this.life -= this.decay; this.alpha = this.life; this.size = this.maxSize * this.life;
        if (this.size < 0) this.size = 0;
    }
    draw() {
        if (this.alpha <= 0) return;
        ctx.save(); 
        ctx.globalAlpha = this.alpha; 
        ctx.beginPath(); 
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.shadowBlur = 15; 
        ctx.shadowColor = window.ThemeVars.glow; 
        ctx.fillStyle = window.ThemeVars.primary; 
        ctx.fill(); 
        ctx.restore();
    }
}

function initParticles() {
    particles = []; sparks = [];
    const density = isMobile ? 25000 : 10000;
    const count = Math.floor((canvas.width * canvas.height) / density);
    for (let i = 0; i < count; i++) particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) { p.update(); p.draw(); }
    if (!isMobile) {
        for (let i = sparks.length - 1; i >= 0; i--) { 
            sparks[i].update(); sparks[i].draw(); 
            if (sparks[i].alpha <= 0) sparks.splice(i, 1);
        }
    }
    requestAnimationFrame(animate);
}

function updateTime() {
    if(!Config.FUNCTIONAL.showTimeWidget) { document.getElementById('realtime-widget').style.display = 'none'; return; }
    const now = new Date();
    const timeStr = now.toLocaleTimeString(Config.FUNCTIONAL.timeLocale, { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const offset = -now.getTimezoneOffset() / 60;
    document.getElementById('realtime-widget').innerHTML = `${Config.UI.timePrefix} <span>${timeStr}</span> (${Config.UI.timeZoneLabel}${offset >= 0 ? '+'+offset : offset})`;
    
    const h = now.getHours();
    let g = Config.UI.greetings.night;
    if (h >= 6 && h < 12) g = Config.UI.greetings.morning;
    else if (h >= 12 && h < 18) g = Config.UI.greetings.day;
    else if (h >= 18) g = Config.UI.greetings.evening;
    
    document.getElementById('site-subtitle').innerHTML = `<span style="color: var(--primary); font-weight: 800;">${g}</span><br>${Config.UI.subtitle}`;
}
setInterval(updateTime, 1000);
updateTime();

function renderSite() {
    document.title = Config.UI.pageTitle;
    document.getElementById('site-logo').src = Config.SITE.logo;
    document.getElementById('site-title').textContent = Config.UI.title;
    document.getElementById('btn-roulette-open').textContent = Config.UI.buttons.rouletteOpen;
    document.getElementById('mods-modal-title').innerHTML = `${Config.UI.modals.modsTitlePrefix} <span>${Config.UI.modals.modsTitleHighlight}</span>`;
    document.getElementById('mods-search').placeholder = Config.UI.modals.searchPlaceholder;
    document.getElementById('roulette-modal-title').innerHTML = `${Config.UI.modals.rouletteTitlePrefix} <span>${Config.UI.modals.rouletteTitleHighlight}</span>`;
    document.getElementById('btn-spin').textContent = Config.UI.buttons.spin;
    document.getElementById('btn-spin-again').textContent = Config.UI.buttons.spinAgain;
    document.getElementById('btn-roulette-home').textContent = Config.UI.buttons.home;

    document.getElementById('download-modal-content').innerHTML = `
        <div style="margin: 20px 0; color: var(--text-muted); font-size: 1.05rem; text-align: center; font-weight: 600;">${Config.UI.modals.downloadInfoText}</div>
        <div style="display: flex; flex-direction: column; gap: 10px;">
            ${Config.UI.modals.downloadLinks.map(l => `<a href="${l.url}" target="_blank" class="${l.type === 'primary' ? 'btn-download' : 'btn-mods'}">${l.text}</a>`).join('')}
        </div>
    `;

    document.getElementById('versions-container').innerHTML = Config.VERSIONS.map(v => `
        <div class="card">
            <span class="card-title">${Config.UI.title}</span>
            <span class="card-version">${Config.UI.modals.versionPrefix} ${v.versionNum}</span>
            <span class="file-type">${v.fileType}</span>
            <button class="btn-download btn-trigger-dl" data-ver="${v.versionNum}" data-link="${v.link}" data-file="${v.fileName}">${Config.UI.buttons.download}</button>
            <button class="btn-mods" data-version="${v.versionNum}">${Config.UI.buttons.modsList}</button>
        </div>
    `).join('');

    document.getElementById('instruction-container').innerHTML = `
        <button id="btn-instruction" class="pill-button" style="width: auto; padding: 14px 40px; margin-bottom: 20px; font-weight: 800;">${Config.INSTRUCTION.buttonText}</button>
        <div class="instruction-anim-box" id="instruction-anim-box">
            <div class="instruction-inner">
                <div class="instruction-content">
                    <div class="instruction-title">${Config.INSTRUCTION.title}</div>
                    <ol class="instruction-list">${Config.INSTRUCTION.steps.map(s => `<li>${s}</li>`).join('')}</ol>
                </div>
            </div>
        </div>
    `;
    document.getElementById('btn-instruction').addEventListener('click', () => document.getElementById('instruction-anim-box').classList.toggle('active'));

    document.getElementById('advantages-container').innerHTML = `
        <h2 class="advantages-title">${Config.ADVANTAGES.title}</h2>
        <div class="advantages-grid">
            ${Config.ADVANTAGES.cards.map(c => `
                <div class="adv-card">
                    <div class="adv-icon">${c.icon}</div>
                    <div class="adv-card-title">${c.title}</div>
                    <div class="adv-card-desc">${c.desc}</div>
                </div>
            `).join('')}
        </div>
        <div class="disclaimer-text">${Config.ADVANTAGES.disclaimerText}</div>
    `;

    if(Config.FUNCTIONAL.showSocialLinks) {
        document.getElementById('socials-container').innerHTML = Config.SOCIALS.map(s => `<a href="${s.url}" target="_blank" class="pill-button">${s.text} <span>${s.span}</span></a>`).join('');
    }

    attachEvents();
    initIntersectionObserver();
}

function initIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function debounce(f, t = Config.FUNCTIONAL.searchDebounceDelay) { let tm; return (...a) => { clearTimeout(tm); tm = setTimeout(() => f.apply(this, a), t); }; }

function openModsModal(ver) { 
    const list = document.getElementById('modal-mods-list');
    const input = document.getElementById('mods-search');
    const render = (q = '') => {
        q = q.trim().toLowerCase(); let html = '';
        Object.entries(Config.MODS[ver] || {}).forEach(([cat, mods]) => {
            const filtered = q ? mods.filter(m => m.name.toLowerCase().includes(q) || Object.entries(Config.MODS.translit).some(([rus, eng]) => rus.includes(q) && m.name.toLowerCase().includes(eng))) : mods;
            if(filtered.length > 0) {
                html += `<div class="mod-category-title">${cat}</div>` + filtered.map(m => `<div class="mod-item"><div class="mod-name">${m.name}</div><div class="mod-desc">${m.desc}</div></div>`).join('');
            }
        });
        list.innerHTML = html || '<div class="mod-desc" style="text-align:center; margin-top:20px;">Ничего не найдено</div>';
    };
    input.value = ''; input.oninput = debounce(() => render(input.value)); render();
    document.getElementById('mods-modal').classList.add('active');
}

function openDownloadModal(ver, link, file) {
    document.getElementById('download-modal-title').innerHTML = `${Config.UI.modals.downloadTitlePrefix} <br><span>NATRIUM ${ver}</span>`;
    document.getElementById('download-modal').classList.add('active');
    const a = document.createElement('a'); a.href = link; a.download = file; document.body.appendChild(a); a.click(); a.remove();
}

let isSpinning = false;
function openRouletteModal() {
    document.getElementById('roulette-result-ui').classList.remove('active');
    document.getElementById('btn-spin').style.display = 'inline-flex';
    const tape = document.getElementById('roulette-tape');
    tape.style.transition = 'none'; tape.style.transform = 'translateX(0px)';
    tape.innerHTML = Array.from({length: 35}).map(() => {
        const v = Config.VERSIONS[Math.floor(Math.random() * Config.VERSIONS.length)];
        return `<div class="roulette-item" data-version="${v.versionNum}"><div class="roulette-version">${v.versionNum}</div><div class="roulette-natrium">${Config.UI.modals.rouletteItemHighlight}</div></div>`;
    }).join('');
    document.getElementById('roulette-modal').classList.add('active');
}

function spinRoulette() {
    if (isSpinning) return; isSpinning = true;
    document.getElementById('roulette-result-ui').classList.remove('active');
    document.getElementById('btn-spin').style.display = 'none';
    const tape = document.getElementById('roulette-tape'); tape.style.transition = 'none'; tape.style.transform = 'translateX(0px)'; tape.offsetHeight;
    
    const winIndex = Math.floor(Math.random() * 5) + 25;
    const winVer = tape.children[winIndex].getAttribute('data-version');
    const itemWidth = isMobile ? 130 : 150;
    const targetX = -(winIndex * itemWidth) + (document.querySelector('.roulette-container').offsetWidth / 2 - itemWidth / 2);
    
    tape.style.transition = `transform ${Config.FUNCTIONAL.rouletteSpinDuration}ms cubic-bezier(0.4, -0.3, 0.1, 1.2)`;
    tape.style.transform = `translateX(${targetX}px)`;
    
    setTimeout(() => {
        isSpinning = false;
        const cv = Config.VERSIONS.find(v => v.versionNum === winVer);
        const dlBtn = document.getElementById('roulette-download-btn');
        dlBtn.innerText = `${Config.UI.buttons.downloadRoulette} ${cv.versionNum}`;
        dlBtn.onclick = () => { document.getElementById('roulette-modal').classList.remove('active'); openDownloadModal(cv.versionNum, cv.link, cv.fileName); };
        document.getElementById('roulette-result-ui').classList.add('active');
    }, Config.FUNCTIONAL.rouletteSpinDuration);
}

function attachEvents() {
    document.querySelectorAll('.btn-trigger-dl').forEach(b => b.addEventListener('click', e => openDownloadModal(e.target.dataset.ver, e.target.dataset.link, e.target.dataset.file)));
    document.querySelectorAll('.btn-mods').forEach(b => b.hasAttribute('data-version') && b.addEventListener('click', e => openModsModal(e.target.dataset.version)));
    document.getElementById('btn-roulette-open').addEventListener('click', openRouletteModal);
    document.getElementById('roulette-close-btn').addEventListener('click', () => !isSpinning && document.getElementById('roulette-modal').classList.remove('active'));
    document.getElementById('mods-close-btn').addEventListener('click', () => document.getElementById('mods-modal').classList.remove('active'));
    document.getElementById('download-close-btn').addEventListener('click', () => document.getElementById('download-modal').classList.remove('active'));
    document.getElementById('btn-spin').addEventListener('click', spinRoulette);
    document.getElementById('btn-spin-again').addEventListener('click', spinRoulette);
    document.getElementById('btn-roulette-home').addEventListener('click', () => document.getElementById('roulette-modal').classList.remove('active'));
    
    window.addEventListener('click', e => {
        if(e.target.classList.contains('modal-overlay') && !isSpinning) e.target.classList.remove('active');
    });
}

function triggerEasterEgg() {
    if(typeof CREEPER_SOUND_BASE64 !== 'undefined') {
        const sfx = new Audio(CREEPER_SOUND_BASE64); sfx.volume = 0.5; sfx.play().catch(()=>{});
    }
}

if (!isMobile) {
    let _ib = [];
    window.addEventListener('keydown', (e) => {
        _ib.push(e.keyCode); if (_ib.length > 7) _ib.shift();
        if (_ib.join(',') === Config.FUNCTIONAL.easterEggCode) triggerEasterEgg();
    });
}

let _tc = 0, _lt = 0;
const _l = document.getElementById('site-logo');
_l.addEventListener('click', () => {
    const n = Date.now(); if (n - _lt > 1500) _tc = 0; _lt = n; _tc++;
    if (_tc === Config.FUNCTIONAL.easterEggClicks) { _tc = 0; triggerEasterEgg(); }
});

renderSite();
resizeCanvas();
animate();
