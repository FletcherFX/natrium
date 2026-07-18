(() => {
    if (!Config.FUNCTIONAL.isSiteEnabled) {
        document.body.innerHTML = `<div class="maintenance-screen"><div class="maintenance-text">${Config.UI.maintenanceText}</div></div>`;
        return;
    }

    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) || window.innerWidth <= 768;
    
    // --- УЛЬТИМАТИВНЫЙ ДВИЖОК ЦВЕТОВ (THEME ENGINE) ---
    const ThemeEngine = {
        hexToRgb: (hex) => {
            let c = hex.replace('#', '');
            if(c.length === 3) c = c.split('').map(x => x+x).join('');
            return { r: parseInt(c.substring(0,2), 16), g: parseInt(c.substring(2,4), 16), b: parseInt(c.substring(4,6), 16) };
        },
        rgbToHex: (r,g,b) => "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase(),
        adjustColor: (rgb, amount) => ThemeEngine.rgbToHex(
            Math.max(0, Math.min(255, rgb.r + amount)),
            Math.max(0, Math.min(255, rgb.g + amount)),
            Math.max(0, Math.min(255, rgb.b + amount))
        ),
        applyTheme: (hexStr, mode) => {
            const rgb = ThemeEngine.hexToRgb(hexStr);
            const start = ThemeEngine.adjustColor(rgb, 30);
            const end = ThemeEngine.adjustColor(rgb, -30);
            
            const root = document.documentElement.style;
            root.setProperty('--primary', hexStr);
            root.setProperty('--grad-start', start);
            root.setProperty('--grad-end', end);
            
            if(mode === 'light') {
                root.setProperty('--bg-main', '#f2f2f7');
                root.setProperty('--text-main', '#1c1c1e');
                root.setProperty('--card-bg', 'rgba(255, 255, 255, 0.85)');
                root.setProperty('--modal-bg', 'rgba(255, 255, 255, 0.95)');
            } else {
                root.setProperty('--bg-main', '#050506');
                root.setProperty('--text-main', '#ffffff');
                root.setProperty('--card-bg', 'rgba(16, 16, 20, 0.85)');
                root.setProperty('--modal-bg', 'rgba(18, 18, 24, 0.95)');
            }
            
            // Кастомный скроллбар через динамический тег <style>
            let styleTag = document.getElementById('dynamic-scrollbar');
            if(!styleTag) {
                styleTag = document.createElement('style');
                styleTag.id = 'dynamic-scrollbar';
                document.head.appendChild(styleTag);
            }
            styleTag.innerHTML = `
                ::-webkit-scrollbar { width: 8px; }
                ::-webkit-scrollbar-track { background: var(--bg-main); }
                ::-webkit-scrollbar-thumb { background: var(--grad-start); border-radius: 10px; }
                ::-webkit-scrollbar-thumb:hover { background: var(--primary); }
            `;
            
            localStorage.setItem('natrium_theme_color', hexStr);
            localStorage.setItem('natrium_theme_mode', mode);
            
            // Синхронизация инпутов UI
            const colorPicker = document.getElementById('cp-native');
            if(colorPicker) {
                colorPicker.value = hexStr;
                document.getElementById('cp-hex').value = hexStr;
                document.getElementById('cp-r').value = rgb.r;
                document.getElementById('cp-g').value = rgb.g;
                document.getElementById('cp-b').value = rgb.b;
                document.getElementById('cp-mode').checked = (mode === 'light');
            }
        },
        init: () => {
            const savedColor = localStorage.getItem('natrium_theme_color');
            const savedMode = localStorage.getItem('natrium_theme_mode');
            const defWord = Config.SITE.defaultThemeWord.toLowerCase();
            const defaultHex = RussianColorMap[defWord] || "#ffaa00";
            
            ThemeEngine.applyTheme(savedColor || defaultHex, savedMode || Config.SITE.defaultMode);
            
            document.getElementById('btn-color-picker').addEventListener('click', () => {
                document.getElementById('color-picker-modal').classList.add('active');
            });
            
            const handleManualInput = () => {
                const hex = document.getElementById('cp-hex').value;
                const mode = document.getElementById('cp-mode').checked ? 'light' : 'dark';
                if(/^#[0-9A-F]{6}$/i.test(hex)) ThemeEngine.applyTheme(hex, mode);
            };
            
            document.getElementById('cp-native').addEventListener('input', (e) => {
                document.getElementById('cp-hex').value = e.target.value.toUpperCase();
                handleManualInput();
            });
            ['cp-hex', 'cp-r', 'cp-g', 'cp-b'].forEach(id => {
                document.getElementById(id).addEventListener('input', (e) => {
                    if(id !== 'cp-hex') {
                        let r = parseInt(document.getElementById('cp-r').value)||0;
                        let g = parseInt(document.getElementById('cp-g').value)||0;
                        let b = parseInt(document.getElementById('cp-b').value)||0;
                        document.getElementById('cp-hex').value = ThemeEngine.rgbToHex(r,g,b);
                    }
                    handleManualInput();
                });
            });
            document.getElementById('cp-mode').addEventListener('change', handleManualInput);
        }
    };

    // --- SEO И РЕНДЕР КОНТЕНТА ---
    const buildUI = () => {
        document.title = Config.UI.pageTitle;
        document.getElementById('meta-desc').setAttribute('content', Config.UI.siteDescription);
        
        const logo = document.getElementById('site-logo');
        logo.src = Config.SITE.logo;
        logo.setAttribute('loading', 'lazy');
        logo.setAttribute('decoding', 'async');
        logo.setAttribute('width', '160');
        logo.setAttribute('height', '160');
        
        document.getElementById('site-title').textContent = Config.UI.title;
        document.getElementById('btn-roulette-open').textContent = Config.UI.buttons.rouletteOpen;
        
        document.getElementById('versions-container').innerHTML = Config.SITE_VERSIONS.map(v => `
            <div class="card">
                <span class="card-title">${Config.UI.title}</span>
                <span class="card-version">${Config.UI.modals.versionPrefix} ${v.versionNum}</span>
                <span class="file-type">${v.fileType}</span>
                <button class="btn-primary btn-trigger-dl" data-ver="${v.versionNum}" data-link="${v.link}" data-file="${v.fileName}">${Config.UI.buttons.download}</button>
                <button class="btn-secondary" data-ver="${v.versionNum}">${Config.UI.buttons.modsList}</button>
            </div>
        `).join('');

        const advHtml = Config.ADVANTAGES.map(a => `
            <div class="advantage-card">
                <div class="adv-icon">${a.icon}</div>
                <div class="adv-title">${a.title}</div>
                <div class="adv-desc">${a.desc}</div>
            </div>
        `).join('');
        
        document.getElementById('advantages-container').innerHTML = `
            <div class="advantages-grid">${advHtml}</div>
            <div class="disclaimer-text">${Config.UI.disclaimerText}</div>
        `;

        document.getElementById('instruction-container').innerHTML = `
            <button id="btn-instruction" class="pill-button" style="margin-bottom:20px; font-weight:800; font-size:1.1rem; padding: 15px 45px;">
                ${Config.INSTRUCTION.buttonText}
            </button>
            <div class="instruction-anim-box" id="instruction-anim-box">
                <div class="instruction-inner">
                    <div class="instruction-content">
                        <div class="instruction-title">${Config.INSTRUCTION.title}</div>
                        <ol class="instruction-list">${Config.INSTRUCTION.steps.map(s => `<li>${s}</li>`).join('')}</ol>
                    </div>
                </div>
            </div>
        `;
        
        if (Config.FUNCTIONAL.showSocialLinks) {
            document.getElementById('socials-container').innerHTML = Config.SITE_SOCIALS.map(s => `
                <a href="${s.url}" target="_blank" class="pill-button">${s.text} <span>${s.span}</span></a>
            `).join('');
        }

        document.querySelectorAll('.btn-trigger-dl').forEach(btn => btn.addEventListener('click', (e) => openModal('download-modal', e.target.dataset)));
        document.querySelectorAll('.btn-secondary[data-ver]').forEach(btn => btn.addEventListener('click', (e) => openModsModal(e.target.dataset.ver)));
        document.getElementById('btn-instruction').addEventListener('click', () => document.getElementById('instruction-anim-box').classList.toggle('active'));
    };

    // --- МОДАЛЬНЫЕ ОКНА ---
    const openModal = (id, data = null) => {
        const m = document.getElementById(id);
        if(id === 'download-modal' && data) {
            document.getElementById('download-modal-title').innerHTML = `${Config.UI.modals.downloadTitlePrefix} <span>${data.ver}</span>`;
            
            const a = document.createElement('a');
            a.href = data.link; a.download = data.file;
            document.body.appendChild(a); a.click(); a.remove();
        }
        m.classList.add('active');
    };
    
    const closeModal = (id) => document.getElementById(id).classList.remove('active');
    document.querySelectorAll('.modal-close').forEach(btn => btn.addEventListener('click', (e) => e.target.closest('.modal-overlay').classList.remove('active')));
    window.addEventListener('click', (e) => { if(e.target.classList.contains('modal-overlay')) e.target.classList.remove('active'); });

    // Поиск модов (Debounce)
    const debounce = (f, t) => { let timer; return (...a) => { clearTimeout(timer); timer = setTimeout(() => f.apply(this, a), t); }; };
    const openModsModal = (ver) => {
        const list = document.getElementById('modal-mods-list');
        const search = document.getElementById('mods-search');
        const target = Config.MODS[ver] || {};
        
        const render = (q = '') => {
            const query = q.trim().toLowerCase();
            let html = '';
            Object.entries(target).forEach(([cat, mods]) => {
                const filtered = !query ? mods : mods.filter(m => {
                    const n = m.name.toLowerCase();
                    if (n.includes(query)) return true;
                    return Object.entries(Config.MODS.translit).some(([rk, ev]) => rk.includes(query) && n.includes(ev));
                });
                if(filtered.length) {
                    html += `<div class="mod-category-title">${cat}</div>` + filtered.map(m => `
                        <div class="mod-item"><div class="mod-name">${m.name}</div><div class="mod-desc">${m.desc}</div></div>
                    `).join('');
                }
            });
            list.innerHTML = html || '<div class="mod-desc" style="text-align:center;">Ничего не найдено</div>';
        };
        search.value = ''; search.oninput = debounce(() => render(search.value), Config.FUNCTIONAL.searchDebounceDelay);
        render(); openModal('mods-modal');
    };

    // Рулетка
    let isSpinning = false;
    document.getElementById('btn-roulette-open').addEventListener('click', () => {
        const tape = document.getElementById('roulette-tape');
        tape.style.transition = 'none'; tape.style.transform = 'translate3d(0,0,0)';
        document.getElementById('roulette-result-ui').classList.remove('active');
        document.getElementById('btn-spin').style.display = 'inline-flex';
        
        tape.innerHTML = Array.from({length: 35}).map(() => {
            const v = Config.SITE_VERSIONS[Math.floor(Math.random() * Config.SITE_VERSIONS.length)];
            return `<div class="roulette-item" data-v="${v.versionNum}"><div class="roulette-version">${v.versionNum}</div><div class="roulette-natrium">NATRIUM</div></div>`;
        }).join('');
        openModal('roulette-modal');
    });

    document.getElementById('btn-spin').addEventListener('click', () => {
        if(isSpinning) return;
        isSpinning = true; document.getElementById('btn-spin').style.display = 'none';
        const tape = document.getElementById('roulette-tape');
        const winIdx = Math.floor(Math.random() * 5) + 25;
        const itemW = isMobile ? 130 : 150;
        const targetX = -(winIdx * itemW) + (tape.parentElement.offsetWidth/2 - itemW/2);
        
        tape.style.transition = `transform ${Config.FUNCTIONAL.rouletteSpinDuration}ms cubic-bezier(0.4, -0.2, 0.1, 1)`;
        tape.style.transform = `translate3d(${targetX}px, 0, 0)`;
        
        setTimeout(() => {
            isSpinning = false;
            const winVer = tape.children[winIdx].dataset.v;
            const cv = Config.SITE_VERSIONS.find(v => v.versionNum === winVer);
            const dlBtn = document.getElementById('roulette-download-btn');
            dlBtn.innerText = `${Config.UI.buttons.downloadRoulette} ${cv.versionNum}`;
            dlBtn.onclick = () => { closeModal('roulette-modal'); openModal('download-modal', {ver: cv.versionNum, link: cv.link, file: cv.fileName}); };
            document.getElementById('roulette-result-ui').classList.add('active');
        }, Config.FUNCTIONAL.rouletteSpinDuration);
    });
    
    // --- ДВИЖОК ИСКР НА GPU (БЕЗ REFLOW) ---
    const initTrailEngine = () => {
        if (isMobile) return;
        const container = document.getElementById('sparks-container');
        const pool = Array.from({length: Config.TRAIL.maxSparks}, () => {
            const el = document.createElement('div');
            el.className = 'spark-particle';
            container.appendChild(el);
            return { el, active: false, x: 0, y: 0, vx: 0, vy: 0, life: 0, scale: 1 };
        });
        
        let mouseX = -1000, mouseY = -1000;
        window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; }, {passive: true});
        
        let poolIdx = 0;
        setInterval(() => {
            if(mouseX < 0 || mouseY < 0) return;
            for(let i=0; i<Config.TRAIL.sparksPerStep; i++) {
                const p = pool[poolIdx];
                p.active = true; p.x = mouseX; p.y = mouseY;
                p.vx = (Math.random() - 0.5) * 3; p.vy = (Math.random() - 0.5) * 3;
                p.life = 1; p.scale = Math.random() * Config.TRAIL.maxSize + 1;
                poolIdx = (poolIdx + 1) % pool.length;
            }
        }, 16);

        const renderSparks = () => {
            pool.forEach(p => {
                if(!p.active) return;
                p.x += p.vx; p.y += p.vy;
                p.vx *= 0.98; p.vy *= 0.98;
                p.life -= Config.TRAIL.decaySpeed;
                if(p.life <= 0) {
                    p.active = false; p.el.style.transform = `translate3d(-999px,-999px,0)`;
                } else {
                    p.el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) scale(${p.scale * p.life})`;
                    p.el.style.opacity = p.life;
                }
            });
            requestAnimationFrame(renderSparks);
        };
        requestAnimationFrame(renderSparks);
    };

    // --- АНИМАЦИИ ПРИ СКРОЛЛЕ (IntersectionObserver) ---
    const initScrollAnim = () => {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if(e.isIntersecting) {
                    e.target.style.opacity = 1;
                    e.target.style.transform = 'translateY(0)';
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.advantage-card').forEach((el, i) => {
            el.style.transitionDelay = `${i * 0.1}s`;
            obs.observe(el);
        });
    };

    // --- ПАСХАЛКА НА ЛОГОТИП (РАБОТАЕТ ВЕЗДЕ) ---
    let tapCount = 0, lastTap = 0;
    document.getElementById('site-logo').addEventListener('click', () => {
        const now = Date.now();
        if(now - lastTap > 1500) tapCount = 0;
        lastTap = now; tapCount++;
        if(tapCount >= Config.FUNCTIONAL.easterEggClicks) {
            tapCount = 0;
            if(typeof CREEPER_SOUND_BASE64 !== 'undefined') new Audio(CREEPER_SOUND_BASE64).play().catch(()=>{});
        }
    });

    // Клавиатурная пасхалка только для ПК
    if(!isMobile) {
        let keys = [];
        window.addEventListener('keydown', (e) => {
            keys.push(e.keyCode);
            if(keys.length > 7) keys.shift();
            if(keys.join(',') === Config.FUNCTIONAL.easterEggCode) {
                if(typeof CREEPER_SOUND_BASE64 !== 'undefined') new Audio(CREEPER_SOUND_BASE64).play().catch(()=>{});
            }
        });
    }

    // Виджет времени
    const updateTime = () => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString(Config.FUNCTIONAL.timeLocale, {hour:'2-digit', minute:'2-digit', second:'2-digit'});
        document.getElementById('realtime-widget').innerHTML = `${Config.UI.timePrefix} <span>${timeStr}</span>`;
        
        let h = now.getHours(), gr = Config.UI.greetings.night;
        if(h>=6 && h<12) gr = Config.UI.greetings.morning;
        else if(h>=12 && h<18) gr = Config.UI.greetings.day;
        else if(h>=18 && h<24) gr = Config.UI.greetings.evening;
        document.getElementById('site-subtitle').innerHTML = `<span style="color:var(--primary); font-weight:700;">${gr}</span><br>${Config.UI.subtitle}`;
    };
    if(Config.FUNCTIONAL.showTimeWidget) { setInterval(updateTime, 1000); updateTime(); }
    else { document.getElementById('realtime-widget').style.display = 'none'; }

    // Отложенный старт для разгрузки Main Thread
    setTimeout(() => {
        requestAnimationFrame(() => {
            ThemeEngine.init();
            buildUI();
            initTrailEngine();
            initScrollAnim();
        });
    }, 50);
})();
