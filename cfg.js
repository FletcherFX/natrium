// =====================================================================
// 1. БАЗОВЫЕ НАСТРОЙКИ, ФУНКЦИОНАЛ И ТУМБЛЕРЫ (GLOBAL SETTINGS)
// =====================================================================
const Config = {
    FUNCTIONAL: {
        isSiteEnabled: true,             
        isResponsive: true,              
        showTimeWidget: true,            
        showSocialLinks: true,           
        searchDebounceDelay: 250,        
        rouletteSpinDuration: 5100,      
        timeLocale: "ru-RU",             
        easterEggCode: "78,65,84,82,73,85,77", 
        easterEggClicks: 7
    },

    // ---------------------------------------------------
    // 2. ВНЕШНИЙ ВИД И ПАРСЕР ЦВЕТОВ (АДМИН-ПАНЕЛЬ)
    // ---------------------------------------------------
    SITE: {
        favicon: "favicon.png?v=6",
        logo: "logo.webp",
        // Впишите любое из этих слов для дефолтной темы новых юзеров:
        // "золотой", "неоновый", "пурпурный", "кислотно-лаймовый", "красный", 
        // "небесно-голубой", "мятный", "изумрудный", "глубокий синий", "розовый неон", 
        // "оранжевый", "серебряный", "кровавый", "малиновый"
        defaultThemeWord: "золотой", 
        defaultMode: "dark" // "dark" или "light"
    },

    TRAIL: {
        sparksPerStep: 2,        
        maxSparks: 40,           
        decaySpeed: 0.015,       
        maxSize: 4               
    },

    // ---------------------------------------------------
    // 3. SEO, ТЕКСТЫ, ИНТЕРФЕЙС И ОПИСАНИЯ
    // ---------------------------------------------------
    UI: {
        siteTitle: "NATRIUM — Ультимативная сборка Minecraft",
        siteDescription: "Максимальная оптимизация FPS, баланс модов и стабильность. Скачай сборку Natrium в формате .mrpack и ускорь свой Minecraft.",
        vpnNotice: "Если не открывается сайт или лаунчер — включите VPN.",
        pageTitle: "NATRIUM",
        title: "NATRIUM",
        subtitle: "Сборка-каркас на Minecraft, состоящая из полной оптимизации",
        maintenanceText: "Сайт временно недоступен. Ведутся технические работы.",
        timePrefix: "Время:",
        timeZoneLabel: "GMT",
        disclaimerText: "Внимание: Прирост FPS сугубо индивидуален для каждого ПК, зависит от вашего железа, версии игры и текущих драйверов. Мы не гарантируем 1000 FPS на калькуляторах, но мы выжали абсолютный максимум из возможных оптимизаций.",
        greetings: {
            night: "Доброй ночи.", morning: "Доброе утро.", day: "Добрый день.", evening: "Добрый вечер."
        },
        buttons: {
            rouletteOpen: "Рулетка версий",
            download: "Скачать сборку",
            modsList: "Список модов",
            spin: "Крутить",
            spinAgain: "Еще раз",
            home: "Закрыть",
            downloadRoulette: "Скачать NATRIUM"
        },
        modals: {
            modsTitlePrefix: "Моды сборки",
            modsTitleHighlight: "NATRIUM",
            searchPlaceholder: "Поиск мода (например: Sodium)...",
            rouletteTitlePrefix: "Рулетка версий",
            rouletteTitleHighlight: "NATRIUM",
            versionPrefix: "Версия",
            rouletteItemHighlight: "NATRIUM",
            downloadTitlePrefix: "Начало загрузки:",
            downloadInfoText: "Ваш файл начинает загружаться. Присоединяйтесь к нашему коммьюнити, чтобы не пропустить обновления!",
            downloadLinks: [
                { text: "Наш Telegram-канал", url: "https://t.me/NatriumProject", type: "primary" },
                { text: "Блог Разработчика", url: "https://t.me/JavaFixer", type: "secondary" }
            ]
        }
    },

    // ---------------------------------------------------
    // 4. ПРЕИМУЩЕСТВА СБОРКИ (ДЛЯ НОВОГО БЛОКА)
    // ---------------------------------------------------
    ADVANTAGES: [
        {
            icon: "🚀",
            title: "Максимальный FPS",
            desc: "Каждая модификация в сборке тщательно протестирована на конфликты. Мы заменили тяжелые аналоги на современные легковесные решения, что дает буст кадров до 300%."
        },
        {
            icon: "⚖️",
            title: "Идеальный баланс",
            desc: "Никакого лишнего мусора, влияющего на ванильный геймплей. Только технические моды, исправления движка, фиксы утечек памяти и микрофризов."
        },
        {
            icon: "⚡",
            title: "Моментальный запуск",
            desc: "Благодаря внедрению современных технологий кэширования и распараллеливания процессов, сборка стартует в несколько раз быстрее обычного Minecraft."
        },
        {
            icon: "📦",
            title: "Удобный формат .mrpack",
            desc: "Забудьте про ручное перекидывание файлов в папку mods. Формат mrpack устанавливается в один клик через любой современный лаунчер, автоматически скачивая актуальные версии."
        }
    ],

    // ---------------------------------------------------
    // 5. ИНСТРУКЦИЯ ПО УСТАНОВКЕ
    // ---------------------------------------------------
    INSTRUCTION: {
        buttonText: "Как установить",
        title: "Как установить сборку Natrium:",
        steps: [
            "Скачай файл сборки в формате .mrpack под нужную версию с нашего сайта.",
            `Скачай и установи современный лаунчер с поддержкой Modrinth. <strong>(ВАЖНО: Если не открывается сайт или лаунчер — включите VPN)</strong><br>
            <ul class='instruction-sublist'>
                <li>Для лицензии: <a href='https://prismlauncher.org/' target='_blank'>Prism Launcher</a> или официальный <a href='https://modrinth.com/app' target='_blank'>Modrinth App</a>.</li>
                <li>Для пираток: <a href='https://elyprismlauncher.github.io/' target='_blank'>Ely Prism Launcher</a> или <a href='https://atlauncher.com/' target='_blank'>ATLauncher</a>.</li>
            </ul>`,
            "В лаунчере нажмите кнопку «Добавить экземпляр» (или «Импорт») и выберите скачанный ранее файл .mrpack.",
            "Дождись, пока лаунчер автоматически скачает все необходимые моды из конфига сборки, и запускай игру."
        ]
    },

    // ---------------------------------------------------
    // 6. ТЯЖЕЛЫЕ МАССИВЫ (ВЕРСИИ, СОЦСЕТИ, МОДЫ)
    // ---------------------------------------------------
    SITE_VERSIONS: [
        { versionNum: "1.20.1", fileType: "Модпак .mrpack", link: "./Natrium_1.20.1.mrpack", fileName: "Natrium_1.20.1.mrpack" },
        { versionNum: "26.1", fileType: "Модпак .mrpack", link: "./Natrium_26.1.mrpack", fileName: "Natrium_26.1.mrpack" },
        { versionNum: "1.16.5", fileType: "Модпак .mrpack", link: "./Natrium_1.16.5.mrpack", fileName: "Natrium_1.16.5.mrpack" }
    ],

    SITE_SOCIALS: [
        { text: "Наш Telegram-канал:", span: "@NatriumProject", url: "https://telegram.me/NatriumProject" },
        { text: "Наш Telegram-чат:", span: "@NatriumChat", url: "https://telegram.me/NatriumChat" },
        { text: "Нашли баг или краш? Пишите:", span: "@JavaFixerTEXbot", url: "https://telegram.me/JavaFixerTEXbot" }
    ],

    MODS: {
        translit: { "содиум": "sodium", "айрис": "iris", "оптимизация": "optimization", "энтити": "entityculling", "модернфикс": "modernfix" },
        "1.20.1": {
            "Оптимизация": [
                { name: "Alternate Current", desc: "Глубокая оптимизация алгоритмов редстоуна." },
                { name: "Clumps", desc: "Объединяет сферы опыта, убирая лаги на фермах." },
                { name: "Dynamic FPS", desc: "Снижает нагрузку на GPU при свернутой игре." },
                { name: "EntityCulling", desc: "Пропускает рендеринг невидимых мобов." },
                { name: "FerriteCore", desc: "Экстремальное сокращение потребления ОЗУ." },
                { name: "ImmediatelyFast", desc: "Ускорение рендеринга шрифтов и частиц." },
                { name: "Lithium", desc: "Оптимизация физики и ИИ мобов." },
                { name: "ModernFix", desc: "Ускорение запуска игры в разы." },
                { name: "Sodium", desc: "Главный движок оптимизации." }
            ],
            "Исправления": [
                { name: "Debugify", desc: "Комплексное исправление сотен багов." },
                { name: "Iris", desc: "Движок шейдеров с поддержкой Sodium." },
                { name: "Mod Menu", desc: "Интерфейс просмотра модов." }
            ]
        },
        "26.1": {
            "Оптимизация": [
                { name: "FerriteCore", desc: "Экстремальное сокращение потребления ОЗУ." },
                { name: "Sodium", desc: "Главный движок оптимизации." },
                { name: "Lithium", desc: "Оптимизация физики и ИИ мобов." }
            ]
        },
        "1.16.5": {
            "Оптимизация": [
                { name: "Sodium", desc: "Движок оптимизации." },
                { name: "Lithium", desc: "Оптимизация механик." }
            ]
        }
    }
};

// Справочник русских цветов для парсера
const RussianColorMap = {
    "золотой": "#ffaa00",
    "неоновый": "#b026ff",
    "пурпурный": "#e810a6",
    "кислотно-лаймовый": "#aaff00",
    "красный": "#ff3333",
    "небесно-голубой": "#00d4ff",
    "мятный": "#00ffaa",
    "изумрудный": "#00e676",
    "глубокий синий": "#1a53ff",
    "розовый неон": "#ff007f",
    "оранжевый": "#ff6a00",
    "серебряный": "#b8c6db",
    "кровавый": "#bb0a1e",
    "малиновый": "#e30b5d"
};
