// =====================================================================
// ИНИЦИАЛИЗАЦИЯ И ОПРЕДЕЛЕНИЕ ТИПА УСТРОЙСТВА (LIGHTHOUSE OPTIMIZATION)
// =====================================================================

const isMobileDevice = window.innerWidth <= 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0;

let activeSparks = [];
const mouseVector = { x: 0, y: 0 };
const canvasParticles = [];
let isRouletteSpinning = false;

// Обертка инициализации тяжелых интерфейсов в свободные фреймы
document.addEventListener("DOMContentLoaded", () => {
    // Вынос рендеринга за пределы основного потока парсинга
    setTimeout(() => {
        applyThemeAndColors();
        renderApplicationDOM();
        initializeResponsiveCanvas();
        setupScrollAnimationObserver();
        setupThemeEventListeners();
    }, 0);
});

// =====================================================================
// ПАРСИНГ И ИНТЕГРАЦИЯ ЦВЕТОВОЙ ПАЛИТРЫ (LOCALSTORAGE & CFG)
// =====================================================================

function applyThemeAndColors() {
    const savedColor = localStorage.getItem("natrium_custom_color");
    const savedTheme = localStorage.getItem("natrium_custom_theme") || "dark";
    
    // Применение глобальной темной/светлой темы к тегу html
    document.documentElement.setAttribute("data-theme", savedTheme);
    
    let colorPalette;
    if (savedColor) {
        colorPalette = generateGradientsFromHex(savedColor);
    } else {
        colorPalette = parseAdminColorKeyword(Config.SITE.colors.theme);
    }
    
    const rootStyle = document.documentElement.style;
    rootStyle.setProperty('--primary', colorPalette.primary);
    rootStyle.setProperty('--grad-start', colorPalette.start);
    rootStyle.setProperty('--grad-end', colorPalette.end);
    rootStyle.setProperty('--accent-shadow', colorPalette.shadow);
    
    if (!savedColor) {
        const adminBg = parseAdminColorKeyword(Config.SITE.colors.background || Config.SITE.colors.theme);
        if (savedTheme === "dark") {
            rootStyle.setProperty('--bg-main', adminBg.bg);
        }
    } else if (savedTheme === "dark") {
        // Деликатный расчет темного фона на основе выбранного пользователем цвета
        const hex = savedColor.replace(/^#/, '');
        const r = Math.max(4, Math.round(parseInt(hex.substring(0, 2), 16) * 0.04));
        const g = Math.max(4, Math.round(parseInt(hex.substring(2, 4), 16) * 0.04));
        const b = Math.max(6, Math.round(parseInt(hex.substring(4, 6), 16) * 0.05));
        rootStyle.setProperty('--bg-main', `rgb(${r}, ${g}, ${b})`);
    }

    // Синхронизация значений внутри UI элементов палитры
    const currentHex = savedColor || colorPalette.primary;
    const pickerInput = document.getElementById("custom-color-picker");
    const hexInput = document.getElementById("custom-color-hex");
    const rgbInput = document.getElementById("custom-color-rgb");
    const toggleInput = document.getElementById("theme-toggle");

    if (pickerInput) pickerInput.value = currentHex;
    if (hexInput) hexInput.value = currentHex;
    if (rgbInput) {
        let cleanHex = currentHex.replace(/^#/, '');
        if (cleanHex.length === 3) cleanHex = cleanHex.replace(/(.)/g, '$1$1');
        const r = parseInt(cleanHex.substring(0, 2), 16);
        const g = parseInt(cleanHex.substring(2, 4), 16);
        const b = parseInt(cleanHex.substring(4, 6), 16);
        rgbInput.value = `${r}, ${g}, ${b}`;
    }
    if (toggleInput) toggleInput.checked = (savedTheme === "light");
}

// =====================================================================
// УЛЬТИМАТИВНЫЙ ТРЕЙЛ ИСКР БЕЗ FORCED REFLOW (ТОЛЬКО ДЛЯ ПК)
// =====================================================================

if (!isMobileDevice) {
    window.addEventListener("mousemove", (e) => {
        mouseVector.x = e.clientX;
        mouseVector.y = e.clientY;
        
        const container = document.getElementById("trail-container");
        if (!container) return;

        for (let i = 0; i < Config.TRAIL.sparksPerStep; i++) {
            if (activeSparks.length >= Config.TRAIL.maxSparks) {
                const oldSpark = activeSparks.shift();
                if (oldSpark && oldSpark.domElement) oldSpark.domElement.remove();
            }

            const el = document.createElement("div");
            el.className = "spark-element";
            container.appendChild(el);

            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * Config.TRAIL.baseSpeed;

            activeSparks.push({
                domElement: el,
                x: e.clientX,
                y: e.clientY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                opacity: 1,
                size: Math.random() * 2 + 1
            });
        }
    });
}

function processSparksAnimationFrame() {
    if (isMobileDevice) return;

    for (let i = activeSparks.length - 1; i >= 0; i--) {
        const s = activeSparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.95;
        s.vy *= 0.95;
        s.opacity -= Config.TRAIL.decaySpeed;

        if (s.opacity <= 0) {
            s.domElement.remove();
            activeSparks.splice(i, 1);
        } else {
            // СТРОГОЕ использование transform: translate3d и opacity для изоляции Forced Reflow
            s.domElement.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) scale(${s.size})`;
            s.domElement.style.opacity = s.opacity;
        }
    }
    requestAnimationFrame(processSparksAnimationFrame);
}
if (!isMobileDevice) requestAnimationFrame(processSparksAnimationFrame);

// =====================================================================
// ДИНАМИЧЕСКИЙ СИНХРОННЫЙ РЕНДЕР ИНТЕРФЕЙСА (DOM GENERATION)
// =====================================================================

function renderApplicationDOM() {
    if (!Config.FUNCTIONAL.isSiteEnabled) {
        document.body.innerHTML = `
            <div class="maintenance-screen">
                <div class="logo-container maintenance-logo-container">
                    <img src="${Config.SITE.logo}" alt="Logo" class="logo maintenance-logo">
                </div>
                <div class="maintenance-text">${Config.UI.maintenanceText}</div>
            </div>
        `;
        return;
    }

    // Заполнение SEO мета-тегов из конфига
    document.getElementById('head-title').textContent = Config.UI.pageTitle;
    document.getElementById('meta-desc').setAttribute('content', Config.SITE.siteDescription);

    if (!Config.FUNCTIONAL.isResponsive) {
        document.getElementById('meta-viewport').setAttribute('content', 'width=1100');
    }
    if (!Config.FUNCTIONAL.showTimeWidget) {
        document.getElementById('realtime-widget').style.display = 'none';
    }

    document.getElementById('site-logo').src = Config.SITE.logo;
    document.getElementById('site-title').textContent = Config.UI.title;
    document.getElementById('btn-roulette-open').textContent = Config.UI.buttons.rouletteOpen;
    document.getElementById('mods-modal-title').innerHTML = `${Config.UI.modals.modsTitlePrefix} <span>${Config.UI.modals.modsTitleHighlight}</span>`;
    document.getElementById('mods-search').placeholder = Config.UI.modals.searchPlaceholder;
    document.getElementById('roulette-modal-title').innerHTML = `${Config.UI.modals.rouletteTitlePrefix} <span>${Config.UI.modals.rouletteTitleHighlight}</span>`;
    document.getElementById('btn-spin').textContent = Config.UI.buttons.spin;
    document.getElementById('btn-spin-again').textContent = Config.UI.buttons.spinAgain;
    document.getElementById('btn-roulette-home').textContent = Config.UI.buttons.home;

    // Рендер модального окна загрузки
    document.getElementById('download-modal-content').innerHTML = `
        <div style="margin: 20px 0; color: var(--text-muted); font-size: 1rem; line-height: 1.5;">
            ${Config.UI.modals.downloadInfoText}
        </div>
        <div style="display: flex; flex-direction: column; gap: 10px;">
            ${Config.UI.modals.downloadLinks.map(l => `
                <a href="${l.url}" target="_blank" class="${l.type === 'primary' ? 'btn-download' : 'btn-mods'}" style="${l.type === 'primary' ? 'margin-bottom: 0;' : 'padding: 16px; border-radius: 14px;'}">${l.text}</a>
            `).join('')}
        </div>
    `;

    // Рендер карточек версий
    document.getElementById('versions-container').innerHTML = Config.SITE_DATA.versions.map(v => `
        <div class="card">
            <span class="card-title">${Config.UI.title}</span>
            <span class="card-version">${Config.UI.modals.versionPrefix} ${v.versionNum}</span>
            <span class="file-type">${v.fileType}</span>
            <button class="btn-download" onclick="openDownloadModal('${v.versionNum}', '${v.link}', '${v.fileName}')">${Config.UI.buttons.download}</button>
            <button class="btn-mods" onclick="openModsModal('${v.versionNum}')">${Config.UI.buttons.modsList}</button>
        </div>
    `).join('');

    // Рендер блока «Как установить» с интеграцией VPN-дисклеймера
    document.getElementById('instruction-container').innerHTML = `
        <button id="btn-instruction" class="pill-button" style="width: auto; padding: 14px 40px; margin-bottom: 20px; font-weight: 800; font-size: 1.05rem;">
            ${Config.INSTRUCTION.buttonText}
        </button>
        <div class="instruction-anim-box" id="instruction-anim-box">
            <div class="instruction-inner">
                <div class="instruction-content">
                    <div class="instruction-title">${Config.INSTRUCTION.title}</div>
                    <ol class="instruction-list">
                        ${Config.INSTRUCTION.steps.map((step, idx) => {
                            if (idx === 1) {
                                return `<li>${step}<br><span style="display: block; margin-top: 8px; font-weight: 700; color: var(--primary); font-size: 0.95rem;">💡 ${Config.INSTRUCTION.vpnNotice}</span></li>`;
                            }
                            return `<li>${step}</li>`;
                        }).join('')}
                    </ol>
                </div>
            </div>
        </div>
    `;

    document.getElementById('btn-instruction').addEventListener('click', () => {
        document.getElementById('instruction-anim-box').classList.toggle('active');
    });

    // Рендер нового блока преимуществ из объекта ADVANTAGES
    document.getElementById('advantages-grid').innerHTML = Config.ADVANTAGES.map(adv => `
        <div class="advantage-card">
            <h4>${adv.title}</h4>
            <p>${adv.desc}</p>
        </div>
    `).join('');
    document.getElementById('disclaimer-text').textContent = Config.UI.disclaimerText;

    // Рендер социальных ссылок
    if (Config.FUNCTIONAL.showSocialLinks) {
        document.getElementById('socials-container').innerHTML = Config.SITE_DATA.socials.map(s => `
            <a href="${s.url}" target="_blank" class="pill-button">
                ${s.text} <span>${s.span}</span>
            </a>
        `).join('');
    }

    // Инициализация виджета времени
    if (Config.FUNCTIONAL.showTimeWidget) {
        setInterval(refreshWidgetTime, 1000);
        refreshWidgetTime();
    }
}

function refreshWidgetTime() {
    const timeNode = document.getElementById('realtime-widget');
    if (!timeNode) return;
    const now = new Date();
    const hours = now.getHours();
    const timeStr = now.toLocaleTimeString(Config.FUNCTIONAL.timeLocale, { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const offset = -now.getTimezoneOffset() / 60;
    const zoneStr = offset >= 0 ? `+${offset}` : `${offset}`;
    timeNode.innerHTML = `${Config.UI.timePrefix} <span>${timeStr}</span> (${Config.UI.timeZoneLabel}${zoneStr})`;
    
    let greeting = Config.UI.greetings.night;
    if (hours >= 6 && hours < 12) greeting = Config.UI.greetings.morning;
    else if (hours >= 12 && hours < 18) greeting = Config.UI.greetings.day;
    else if (hours >= 18 && hours < 24) greeting = Config.UI.greetings.evening;
    
    document.getElementById('site-subtitle').innerHTML = `<span style="color: var(--primary); font-weight: 700;">${greeting}</span><br style="margin-bottom: 6px;">${Config.UI.subtitle}`;
}

// =====================================================================
// ИНТЕРФЕЙС И ЛОГИКА ИНТЕРАКТИВНОЙ ПАЛИТРЫ ЦВЕТОВ
// =====================================================================

function setupThemeEventListeners() {
    const gearBtn = document.getElementById("gear-settings-btn");
    const closeBtn = document.getElementById("settings-panel-close");
    const panel = document.getElementById("settings-panel");
    const picker = document.getElementById("custom-color-picker");
    const hexInput = document.getElementById("custom-color-hex");
    const rgbInput = document.getElementById("custom-color-rgb");
    const themeToggle = document.getElementById("theme-toggle");
    const resetBtn = document.getElementById("reset-theme-btn");

    gearBtn.addEventListener("click", () => panel.classList.add("active"));
    closeBtn.addEventListener("click", () => panel.classList.remove("active"));

    const updateColorGlobal = (hex) => {
        if (/^#[0-9A-F]{6}$/i.test(hex)) {
            localStorage.setItem("natrium_custom_color", hex);
            applyThemeAndColors();
        }
    };

    picker.addEventListener("input", (e) => updateColorGlobal(e.target.value));
    
    hexInput.addEventListener("change", (e) => {
        let val = e.target.value.trim();
        if (!val.startsWith("#")) val = "#" + val;
        updateColorGlobal(val);
    });

    rgbInput.addEventListener("change", (e) => {
        const parts = e.target.value.split(",").map(p => parseInt(p.trim()));
        if (parts.length === 3 && parts.every(p => !isNaN(p) && p >= 0 && p <= 255)) {
            const hex = "#" + parts.map(p => p.toString(16).padStart(2, "0")).join("");
            updateColorGlobal(hex);
        }
    });

    themeToggle.addEventListener("change", (e) => {
        const mode = e.target.checked ? "light" : "dark";
        localStorage.setItem("natrium_custom_theme", mode);
        applyThemeAndColors();
    });

    resetBtn.addEventListener("click", () => {
        localStorage.removeItem("natrium_custom_color");
        localStorage.removeItem("natrium_custom_theme");
        applyThemeAndColors();
    });
}

// =====================================================================
// АНИМАЦИОННЫЙ СКРОЛЛ-ОБСЕРВЕР (INTERSECTION OBSERVER)
// =====================================================================

function setupScrollAnimationObserver() {
    const observedElements = document.querySelectorAll('.fade-in-scroll');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        observedElements.forEach(el => observer.observe(el));
    } else {
        observedElements.forEach(el => el.classList.add('visible'));
    }
}

// =====================================================================
// ФОНОВЫЙ ХОЛСТ ЧАСТИЦ (ATOM CANVAS ANIMATION)
// =====================================================================

function initializeResponsiveCanvas() {
    const cvs = document.getElementById('atom-canvas');
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    
    const resize = () => {
        cvs.width = window.innerWidth;
        cvs.height = window.innerHeight;
        generateParticlesPool(cvs.width, cvs.height);
    };
    window.addEventListener('resize', resize);
    resize();

    function renderLoop() {
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
        
        for (let p of canvasParticles) {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > cvs.width) p.vx *= -1;
            if (p.y < 0 || p.y > cvs.height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = accentColor;
            ctx.globalAlpha = p.alpha;
            ctx.fill();
        }
        requestAnimationFrame(renderLoop);
    }
    requestAnimationFrame(renderLoop);
}

function generateParticlesPool(w, h) {
    canvasParticles.length = 0;
    const count = Math.floor((w * h) / (isMobileDevice ? 25000 : 12000));
    for (let i = 0; i < count; i++) {
        canvasParticles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            size: Math.random() * 2 + 1,
            alpha: Math.random() * 0.15 + 0.05
        });
    }
}

// =====================================================================
// ИНТЕЛЛЕКТУАЛЬНЫЙ МОДАЛЬНЫЙ ПОИСК И ФИЛЬТРАЦИЯ МОДОВ (DRY)
// =====================================================================

function openModsModal(versionKey) {
    const targetMods = Config.MODS[versionKey] || {};
    const listNode = document.getElementById('modal-mods-list');
    const searchInput = document.getElementById('mods-search');

    const renderFilteredList = (query = '') => {
        const cleanQuery = query.trim().toLowerCase();
        let finalHtml = '';

        for (const [category, modsArray] of Object.entries(targetMods)) {
            const filtered = modsArray.filter(m => {
                const name = m.name.toLowerCase();
                if (name.includes(cleanQuery)) return true;
                for (const [rusKey, engValue] of Object.entries(Config.MODS.translit)) {
                    if (rusKey.includes(cleanQuery) && name.includes(engValue)) return true;
                }
                return false;
            });

            if (filtered.length > 0) {
                finalHtml += `<div class="mod-category-title">${category}</div>`;
                finalHtml += filtered.map(m => `
                    <div class="mod-item">
                        <div class="mod-name">${m.name}</div>
                        <div class="mod-desc">${m.desc}</div>
                    </div>
                `).join('');
            }
        }
        listNode.innerHTML = finalHtml || `<div class="mod-desc" style="text-align:center; margin-top:20px;">По вашему запросу ничего не найдено</div>`;
    };

    searchInput.value = '';
    let debounceTimer;
    searchInput.oninput = (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => renderFilteredList(e.target.value), Config.FUNCTIONAL.searchDebounceDelay);
    };

    renderFilteredList();
    document.getElementById('mods-modal').classList.add('active');
}

function closeModsModal() { document.getElementById('mods-modal').classList.remove('active'); }

// =====================================================================
// МОДАЛЬНОЕ ОКНО ЗАГРУЗКИ С АВТОСКАТЫВАНИЕМ БИНАРНИКА
// =====================================================================

function openDownloadModal(version, url, filename) {
    document.getElementById('download-modal-title').innerHTML = `${Config.UI.modals.downloadTitlePrefix} <span>NATRIUM ${version}</span>`;
    document.getElementById('download-modal').classList.add('active');
    
    // Безопасный триггер скачивания структуры данных через создание виртуальной ссылки
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
}

function closeDownloadModal() { document.getElementById('download-modal').classList.remove('active'); }

// =====================================================================
// ГЕЙМИФИЦИРОВАННАЯ ИНТЕРАКТИВНАЯ РУЛЕТКА СБОРКИ
// =====================================================================

function openRouletteModal() {
    if (isRouletteSpinning) return;
    document.getElementById('roulette-result-ui').classList.remove('active');
    document.getElementById('btn-spin').style.display = 'inline-flex';
    
    const tape = document.getElementById('roulette-tape');
    tape.style.transition = 'none';
    tape.style.transform = 'translate3d(0px, 0px, 0px)';
    
    let tapeHTML = '';
    const versions = Config.SITE_DATA.versions;
    for (let i = 0; i < 40; i++) {
        const randVer = versions[Math.floor(Math.random() * versions.length)];
        tapeHTML += `
            <div class="roulette-item" data-version="${randVer.versionNum}">
                <div class="roulette-version">${randVer.versionNum}</div>
                <div class="roulette-natrium">${Config.UI.modals.rouletteItemHighlight}</div>
            </div>
        `;
    }
    tape.innerHTML = tapeHTML;
    document.getElementById('roulette-modal').classList.add('active');
}

function spinRouletteAnimation() {
    if (isRouletteSpinning) return;
    isRouletteSpinning = true;
    
    document.getElementById('roulette-result-ui').classList.remove('active');
    document.getElementById('btn-spin').style.display = 'none';
    
    const tape = document.getElementById('roulette-tape');
    const winningIndex = Math.floor(Math.random() * 6) + 28; 
    const winnerVersion = tape.children[winningIndex].getAttribute('data-version');
    
    const elementWidth = isMobileDevice ? 130 : 150; 
    const centerOffset = document.querySelector('.roulette-container').offsetWidth / 2 - elementWidth / 2;
    const targetOffset = -(winningIndex * elementWidth) + centerOffset;
    
    tape.style.transition = `transform ${Config.FUNCTIONAL.rouletteSpinDuration}ms cubic-bezier(0.1, 0.8, 0.1, 1)`;
    tape.style.transform = `translate3d(${targetOffset}px, 0px, 0px)`;
    
    setTimeout(() => {
        isRouletteSpinning = false;
        const targetVersionObject = Config.SITE_DATA.versions.find(v => v.versionNum === winnerVersion);
        const dlBtn = document.getElementById('roulette-download-btn');
        
        dlBtn.innerText = `${Config.UI.buttons.downloadRoulette} ${winnerVersion}`;
        dlBtn.onclick = () => {
            document.getElementById('roulette-modal').classList.remove('active');
            openDownloadModal(targetVersionObject.versionNum, targetVersionObject.link, targetVersionObject.fileName);
        };
        document.getElementById('roulette-result-ui').classList.add('active');
    }, Config.FUNCTIONAL.rouletteSpinDuration);
}

function closeRouletteModal() {
    if (!isRouletteSpinning) document.getElementById('roulette-modal').classList.remove('active');
}

// =====================================================================
// ПАСХАЛКИ И ДЕКОПЛИНГ СЛУШАТЕЛЕЙ ВВОДА (LIGHTHOUSE TASK AVOIDANCE)
// =====================================================================

function triggerEasterEggSfx() {
    if (typeof CREEPER_SOUND_BASE64 !== 'undefined') {
        const audio = new Audio(CREEPER_SOUND_BASE64);
        audio.volume = 0.4;
        audio.play().catch(() => {});
    }
}

// Жесткое физическое отключение прослушивания клавиатуры на смартфонах
if (!isMobileDevice) {
    let keyBuffer = [];
    window.addEventListener('keydown', (e) => {
        keyBuffer.push(e.keyCode);
        if (keyBuffer.length > 7) keyBuffer.shift();
        if (keyBuffer.join(',') === Config.FUNCTIONAL.easterEggCode) {
            triggerEasterEggSfx();
        }
    });
}

// Железобетонно сохраненная мобильная/ПК пасхалка тапов по логотипу
let logoClicksCounter = 0;
let lastClickTimestamp = 0;
const logoNode = document.getElementById('site-logo');
if (logoNode) {
    logoNode.style.cursor = 'pointer';
    logoNode.addEventListener('click', () => {
        const currentTimestamp = Date.now();
        if (currentTimestamp - lastClickTimestamp > 1500) logoClicksCounter = 0;
        lastClickTimestamp = currentTimestamp;
        logoClicksCounter++;
        if (logoClicksCounter === Config.FUNCTIONAL.easterEggClicks) {
            logoClicksCounter = 0;
            triggerEasterEggSfx();
        }
    });
}

// Общие глобальные триггеры закрытия модальных окон по оверлею
window.addEventListener('click', (e) => {
    if (e.target === document.getElementById('mods-modal')) closeModsModal();
    if (e.target === document.getElementById('roulette-modal')) closeRouletteModal();
    if (e.target === document.getElementById('download-modal')) closeDownloadModal();
});

document.getElementById('btn-roulette-open').addEventListener('click', openRouletteModal);
document.getElementById('roulette-close-btn').addEventListener('click', closeRouletteModal);
document.getElementById('mods-close-btn').addEventListener('click', closeModsModal);
document.getElementById('download-close-btn').addEventListener('click', closeDownloadModal);
document.getElementById('btn-spin').addEventListener('click', spinRouletteAnimation);
document.getElementById('btn-spin-again').addEventListener('click', openRouletteModal);
document.getElementById('btn-roulette-home').addEventListener('click', closeRouletteModal);
