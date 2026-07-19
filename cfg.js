// =====================================================================
// ГЛОБАЛЬНЫЕ НАСТРОЙКИ СБОРКИ NATRIUM
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

    SITE: {
        favicon: "favicon.png",
        logo: "logo.webp",
        defaultThemeMode: "dark",
        defaultColor: "красный"
    },

    COLOR_DICTIONARY: {
        "золотой": "#ffaa00",
        "неоновый": "#ff00ff",
        "пурпурный": "#9933ff",
        "кислотно-лаймовый": "#ccff00",
        "красный": "#ff3333",
        "небесно-голубой": "#33ccff",
        "мятный": "#00ffcc",
        "изумрудный": "#00e676",
        "глубокий синий": "#0055cc",
        "розовый неон": "#ff00aa",
        "оранжевый": "#ff6600",
        "малиновый": "#e6005c",
        "бирюзовый": "#00b3b3",
        "лавандовый": "#b399ff",
        "белый": "#ffffff"
    },

    TRAIL: {
        sparksPerStep: 2,
        maxSparks: 50,
        decaySpeed: 0.015,
        maxSize: 3
    },

    UI: {
        pageTitle: "NATRIUM",
        title: "NATRIUM",
        subtitle: "Сборка-каркас на Minecraft, состоящая из бескомпромиссной оптимизации",
        maintenanceText: "Сайт временно недоступен. Идёт обновление квантовых ядер.",
        timePrefix: "Время:",
        timeZoneLabel: "GMT",
        greetings: {
            night: "Доброй ночи.", morning: "Доброе утро.", day: "Добрый день.", evening: "Добрый вечер."
        },
        buttons: {
            rouletteOpen: "Рулетка версий",
            download: "Скачать сборку",
            modsList: "Список модов",
            spin: "Крутить рулетку",
            spinAgain: "Крутить еще раз",
            home: "На главную",
            downloadRoulette: "Скачать NATRIUM"
        },
        modals: {
            modsTitlePrefix: "Моды",
            modsTitleHighlight: "NATRIUM",
            searchPlaceholder: "Умный поиск модов...",
            rouletteTitlePrefix: "Рулетка",
            rouletteTitleHighlight: "NATRIUM",
            versionPrefix: "Версия",
            rouletteItemHighlight: "NATRIUM",
            downloadTitlePrefix: "Начало загрузки:",
            downloadInfoText: "Ваша сборка генерируется и скоро скачается. Присоединяйтесь к нашим ресурсам!",
            downloadLinks: [
                { text: "Telegram-канал проекта", url: "https://t.me/NatriumProject", type: "primary" },
                { text: "Канал разработчика", url: "https://t.me/JavaFixer", type: "secondary" }
            ]
        }
    },

    INSTRUCTION: {
        buttonText: "Как установить сборку",
        title: "Пошаговая установка Natrium:",
        steps: [
            "Скачай файл сборки в формате .mrpack под нужную версию с нашего сайта.",
            `Скачай и установи современный лаунчер с поддержкой Modrinth.<br>
            <ul style='margin-top: 10px; margin-bottom: 10px; padding-left: 20px; list-style-type: disc; color: var(--text-muted);'>
                <li style='margin-bottom: 6px;'>Лицензия: <a href='https://prismlauncher.org/' target='_blank' style='color: var(--primary); font-weight: bold;'>Prism Launcher</a> или <a href='https://modrinth.com/app' target='_blank' style='color: var(--primary); font-weight: bold;'>Modrinth App</a>.</li>
                <li>Пиратки: <a href='https://elyprismlauncher.github.io/' target='_blank' style='color: var(--primary); font-weight: bold;'>Ely Prism</a> или <a href='https://atlauncher.com/' target='_blank' style='color: var(--primary); font-weight: bold;'>ATLauncher</a>.</li>
            </ul>
            <span style="color: var(--primary); font-size: 0.9em; font-weight: 600;">Важно: Если не открывается сайт или лаунчер — включите VPN!</span>`,
            "В лаунчере нажми кнопку «Добавить экземпляр» (или Импорт) и выбери скачанный файл .mrpack.",
            "Дождись, пока лаунчер автоматически загрузит все моды, и запускай игру."
        ]
    },

    ADVANTAGES: {
        title: "Почему именно Natrium?",
        disclaimerText: "Внимание: Фактический прирост FPS строго индивидуален и зависит от конфигурации вашего ПК, фоновых процессов и выбранной версии игры.",
        cards: [
            { icon: "🚀", title: "Максимальный FPS", desc: "Ядро сборки настроено на экстремальное повышение частоты кадров даже на слабых ПК." },
            { icon: "⚖️", title: "Идеальный баланс", desc: "Никаких конфликтов. Только проверенные моды, работающие как единый часовой механизм." },
            { icon: "⚡", title: "Мгновенный запуск", desc: "Забудьте о долгих загрузках благодаря алгоритмической оптимизации кэширования." },
            { icon: "📦", title: "Формат .mrpack", desc: "Современный и легкий формат. Лаунчер сам скачает актуальные версии модов без лишнего мусора." }
        ]
    },

    VERSIONS: [
        { versionNum: "1.20.1", fileType: "Модпак .mrpack", link: "./Natrium_1.20.1.mrpack", fileName: "Natrium_1.20.1.mrpack" },
        { versionNum: "26.1", fileType: "Модпак .mrpack", link: "./Natrium_26.1.mrpack", fileName: "Natrium_26.1.mrpack" },
        { versionNum: "1.16.5", fileType: "Модпак .mrpack", link: "./Natrium_1.16.5.mrpack", fileName: "Natrium_1.16.5.mrpack" }
    ],

    SOCIALS: [
        { text: "Наш Telegram-канал:", span: "@NatriumProject", url: "https://telegram.me/NatriumProject" },
        { text: "Наш Telegram-чат:", span: "@NatriumChat", url: "https://telegram.me/NatriumChat" },
        { text: "Нашли баг или краш? Бот:", span: "@JavaFixerTEXbot", url: "https://telegram.me/JavaFixerTEXbot" }
    ],

    MODS: {
        translit: {
            "содиум": "sodium", "айрис": "iris", "мод меню": "mod menu", 
            "клампс": "clumps", "дебагифай": "debugify", "энтити": "entityculling", "модернфикс": "modernfix"
        },
        "1.20.1": {
            "Оптимизация": [
                { name: "Alternate Current", desc: "Оптимизация редстоуна." },
                { name: "BadOptimizations", desc: "Патчи микрофризов." },
                { name: "Clumps", desc: "Группировка сфер опыта." },
                { name: "Concurrent Chunk Management Engine", desc: "Многопоточные чанки." },
                { name: "Connectivity Mod", desc: "Ускорение сети." },
                { name: "Dynamic FPS", desc: "Снижение нагрузки в фоне." },
                { name: "Enhanced Block Entities", desc: "Быстрые сундуки и таблички." },
                { name: "Entity Culling", desc: "Скрытие невидимых мобов." },
                { name: "FastAnim", desc: "Быстрые анимации." },
                { name: "FerriteCore", desc: "Глубокая очистка RAM." },
                { name: "ImmediatelyFast", desc: "Ускорение рендера частиц." },
                { name: "Krypton", desc: "Сетевая оптимизация." },
                { name: "Lithium", desc: "Оптимизация ИИ и физики." },
                { name: "Memory Leak Fix", desc: "Устранение утечек RAM." },
                { name: "ModernFix", desc: "Экстремально быстрый запуск." },
                { name: "More Culling", desc: "Отсечение граней блоков." },
                { name: "Sodium", desc: "Главный движок рендера." },
                { name: "Sodium Extra", desc: "Настройки графики." },
                { name: "ThreadTweak", desc: "Оптимизация потоков." },
                { name: "Very Many Players", desc: "Серверная стабильность." },
                { name: "cupboard", desc: "Библиотека оптимизации." },
                { name: "fix GPU memory leak", desc: "Устранение утечек VRAM." }
            ],
            "Библиотеки": [
                { name: "Cloth Config API", desc: "База для конфигов." },
                { name: "Fabric API", desc: "Базовое ядро Fabric." },
                { name: "Indium", desc: "Рендер-адаптер для Sodium." },
                { name: "YetAnotherConfigLib (YACL)", desc: "Интерфейс настроек." },
                { name: "bad packets", desc: "Сетевая библиотека." }
            ],
            "Исправления и Утилиты": [
                { name: "Almanac", desc: "Внутриигровые руководства." },
                { name: "Athena", desc: "Поддержка CTM текстур." },
                { name: "Crash Assistant", desc: "Помощник при крашах." },
                { name: "Debugify", desc: "Сборник багфиксов игры." },
                { name: "Iris Shaders", desc: "Шейдерный движок." },
                { name: "Language Reload", desc: "Быстрая смена языка." },
                { name: "Let Me Despawn", desc: "Исправление деспавна." },
                { name: "Mod Menu", desc: "Список модов в игре." },
                { name: "Model Gap Fix", desc: "Убирает щели в моделях." },
                { name: "Not Enough Crashes", desc: "Перехват крашей в меню." },
                { name: "Packet Fixer", desc: "Снятие лимита пакетов." },
                { name: "Reese's Sodium Options", desc: "Удобное меню настроек." }
            ]
        },
        "26.1": {
            "Оптимизация": [
                { name: "Alternate Current", desc: "Оптимизация редстоуна." },
                { name: "BadOptimizations", desc: "Устранение статтеров." },
                { name: "Clumps", desc: "Группировка сфер опыта." },
                { name: "Dynamic FPS", desc: "Оптимизация свернутой игры." },
                { name: "EntityCulling", desc: "Скрытие объектов вне поля зрения." },
                { name: "FerriteCore", desc: "Агрессивная чистка памяти." },
                { name: "ImmediatelyFast", desc: "Быстрый рендер геометрии." },
                { name: "Krypton", desc: "Патчи сетевого стека." },
                { name: "Lithium", desc: "Серверная физика и ИИ." },
                { name: "ModernFix-mVUS", desc: "Ускорение меню и загрузки." },
                { name: "More Culling", desc: "Дополнительный куллинг." },
                { name: "Smooth Boot", desc: "Сглаживание пиков CPU." },
                { name: "Sodium", desc: "Движок рендера." },
                { name: "Sodium Extra", desc: "Тумблеры Sodium." },
                { name: "StutterFix - Refurbished!", desc: "Фикс микрофризов." },
                { name: "Very Many Players", desc: "Мультиплеерная оптимизация." },
                { name: "cupboard", desc: "Служебная оптимизация." },
                { name: "gpumemleakfix-fabric-26.1-1.9", desc: "Патч утечек видеопамяти." }
            ],
            "Библиотеки": [
                { name: "Cloth Config API", desc: "Настройки модов." },
                { name: "Fabric API", desc: "Базовое ядро." },
                { name: "Fabric Language Kotlin", desc: "Поддержка Kotlin." },
                { name: "Text Placeholder API", desc: "Работа с текстом." },
                { name: "YetAnotherConfigLib (YACL)", desc: "UI для настроек." },
                { name: "bad packets", desc: "Сетевая библиотека." },
                { name: "connectivity-fabric-26.1-7.6", desc: "Сетевые исправления." }
            ],
            "Исправления и Утилиты": [
                { name: "Iris Shaders", desc: "Поддержка шейдеров." },
                { name: "Language Reload", desc: "Язык без зависаний." },
                { name: "Mod Menu", desc: "Меню модификаций." },
                { name: "Mouse Tweaks", desc: "Улучшенное управление мышью." },
                { name: "No Chat Reports", desc: "Блокировка репортов чата." },
                { name: "Packet Fixer", desc: "Снятие ограничений NBT." },
                { name: "Reese's Sodium Options", desc: "Кастомное меню." }
            ]
        },
        "1.16.5": {
            "Оптимизация": [
                { name: "Alternate Current", desc: "Патч логики редстоуна." },
                { name: "Cull Leaves", desc: "Оптимизация рендера листвы." },
                { name: "Dynamic FPS", desc: "Контроль FPS в фоне." },
                { name: "Enhanced Block Entities", desc: "Быстрые тайл-энтити." },
                { name: "EntityCulling-Fabric", desc: "Отсечение мобов." },
                { name: "FerriteCore", desc: "Снижение потребления RAM." },
                { name: "LazyDFU", desc: "Ускорение инициализации." },
                { name: "Lithium", desc: "Ускорение серверного тика." },
                { name: "Memory Leak Fix", desc: "Фикс утечек памяти." },
                { name: "ModernFix", desc: "Универсальный фиксер." },
                { name: "Phosphor", desc: "Быстрый просчет света." },
                { name: "Sodium", desc: "Движок Sodium." },
                { name: "Sodium Extra", desc: "Дополнительные опции." }
            ],
            "Библиотеки": [
                { name: "Fabric API", desc: "Базовый мод ядра." },
                { name: "Indium", desc: "Совместимость рендера." }
            ],
            "Исправления и Утилиты": [
                { name: "Borderless Mining", desc: "Режим без рамок." },
                { name: "CleanCut", desc: "Удары сквозь траву." },
                { name: "Crash Assistant", desc: "Помощь с логами." },
                { name: "Iris", desc: "Шейдеры." },
                { name: "Krypton", desc: "Ускорение сети." },
                { name: "Let Me Despawn", desc: "Исправление деспавна." },
                { name: "Mod Menu", desc: "Управление модами." },
                { name: "Packet Fixer", desc: "Большие пакеты данных." },
                { name: "Reese's Sodium Options", desc: "Улучшенное меню графики." }
            ]
        }
    }
};
