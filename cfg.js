// Файл: cfg.js
// Главный конфигурационный файл проекта NATRIUM.
// Здесь находятся все настраиваемые параметры, тексты, ссылки и пути.

const Config = {

    // ---------------------------------------------------
    // 1. БАЗОВЫЕ НАСТРОЙКИ САЙТА
    // ---------------------------------------------------
    settings: {
        // Управление доступностью сайта: true (включен), false (заглушка о техработах)
        isSiteEnabled: true,
        
        // Включение адаптивности для мобильных устройств (true - включено, false - сайт отображается как на ПК)
        isResponsive: true,
        
        // Локаль для отображения времени в виджете
        timeLocale: "ru-RU",
        
        // Длительность анимации прокрутки рулетки в миллисекундах (5100 = 5.1 секунды)
        rouletteSpinDuration: 5100,
        
        // Код для пасхалки (ввод слова NATRIUM на клавиатуре, ASCII коды)
        easterEggCode: "78,65,84,82,73,85,77",
        
        // Количество кликов по логотипу для активации пасхалки
        easterEggClicks: 7
    },

    // ---------------------------------------------------
    // 2. ПУТИ К ФАЙЛАМ И АССЕТАМ
    // ---------------------------------------------------
    paths: {
        // Путь к иконке сайта
        favicon: "favicon.png?v=5",
        
        // Путь к логотипу сайта
        logo: "logo.webp"
    },

    // ---------------------------------------------------
    // 3. ТЕКСТЫ И ИНТЕРФЕЙС
    // ---------------------------------------------------
    ui: {
        // Заголовок вкладки браузера
        pageTitle: "NATRIUM",
        
        // Главный заголовок на странице
        title: "NATRIUM",
        
        // Подзаголовок (описание под логотипом)
        subtitle: "Сборка-каркас на Minecraft, состоящая из полной оптимизации",
        
        // Текст заглушки при isSiteEnabled = false
        maintenanceText: "Сайт временно недоступен. Ведутся технические работы.",
        
        // Префикс для виджета времени
        timePrefix: "Время:",
        
        // Подпись часового пояса
        timeZoneLabel: "GMT",
        
        // Приветствия, меняющиеся в зависимости от времени суток
        greetings: {
            night: "Доброй ночи.",
            morning: "Доброе утро.",
            day: "Добрый день.",
            evening: "Добрый вечер."
        },
        
        // Тексты на всех кнопках
        buttons: {
            rouletteOpen: "Рулетка версий",
            download: "Скачать сборку",
            modsList: "Список модов",
            spin: "Крутить рулетку",
            spinAgain: "Крутить еще раз",
            home: "На главную",
            downloadRoulette: "Скачать NATRIUM"
        },
        
        // Тексты и заголовки в модальных окнах
        modals: {
            modsTitlePrefix: "Моды сборки",
            modsTitleHighlight: "NATRIUM",
            searchPlaceholder: "Поиск мода...",
            rouletteTitlePrefix: "Рулетка версий",
            rouletteTitleHighlight: "NATRIUM",
            versionPrefix: "Версия",
            rouletteItemHighlight: "NATRIUM"
        }
    },

    // ---------------------------------------------------
    // 4. ДОСТУПНЫЕ ВЕРСИИ ДЛЯ СКАЧИВАНИЯ
    // ---------------------------------------------------
    // Список карточек, отображаемых на главной странице и участвующих в рулетке
    versions: [
        { versionNum: "1.20.1", fileType: "Модпак .mrpack", link: "./Natrium_1.20.1.mrpack", fileName: "Natrium_1.20.1.mrpack" },
        { versionNum: "26.1", fileType: "Модпак .mrpack", link: "./Natrium_26.1.mrpack", fileName: "Natrium_26.1.mrpack" },
        { versionNum: "1.16.5", fileType: "Модпак .mrpack", link: "./Natrium_1.16.5.mrpack", fileName: "Natrium_1.16.5.mrpack" }
    ],

    // ---------------------------------------------------
    // 5. СОЦИАЛЬНЫЕ СЕТИ И ССЫЛКИ
    // ---------------------------------------------------
    // Нижние кнопки связи с комьюнити
    socials: [
        { text: "Наш Telegram-канал:", span: "@NatriumProject", url: "https://telegram.me/NatriumProject" },
        { text: "Наш Telegram-чат:", span: "@NatriumChat", url: "https://telegram.me/NatriumChat" },
        { text: "Нашли баг или краш? Пишите в бота:", span: "@JavaFixerTEXbot", url: "https://telegram.me/JavaFixerTEXbot" }
    ],

    // ---------------------------------------------------
    // 6. СПИСКИ МОДОВ ПО ВЕРСИЯМ
    // ---------------------------------------------------
    // Ключи объекта должны строго совпадать с versionNum из блока "versions" (выше)
    mods: {
        "1.20.1": [
            { name: "Almanac", desc: "Улучшенная интеграция и управление внутриигровой документацией." },
            { name: "Alternate Current", desc: "Глубокая оптимизация алгоритмов редстоуна." },
            { name: "Athena", desc: "Инструмент для создания комплексных, динамических текстур." },
            { name: "Bad Packets", desc: "Служебный API для безопасной синхронизации пакетов." },
            { name: "BadOptimizations", desc: "Патчи, убирающие микрофризы." },
            { name: "Cloth Config v11", desc: "Стабильный конфигурационный экран." },
            { name: "Clumps", desc: "Объединяет сферы опыта, убирая лаги на фермах." },
            { name: "Concurrent Chunk Management Engine", desc: "Многопоточный движок обработки чанков." },
            { name: "Connectivity Mod", desc: "Оптимизация сетевых соединений." },
            { name: "Crash Assistant", desc: "Помощник при крашах." },
            { name: "Debugify", desc: "Комплексное исправление сотен багов." },
            { name: "Dynamic FPS", desc: "Снижает нагрузку на GPU при свернутой игре." },
            { name: "Enhanced Block Entities", desc: "Переводит рендеринг сундуков на Sodium." },
            { name: "EntityCulling", desc: "Пропускает рендеринг невидимых мобов." },
            { name: "Fabric API", desc: "Библиотека-ядро." },
            { name: "FastAnim", desc: "Оптимизация просчета анимаций." },
            { name: "FerriteCore", desc: "Экстремальное сокращение потребления ОЗУ." },
            { name: "Gpu memory leak fix mod", desc: "Блокировка утечек памяти в видеокарте." },
            { name: "ImmediatelyFast", desc: "Ускорение рендеринга шрифтов и частиц." },
            { name: "Indium", desc: "Адаптер для Sodium." },
            { name: "Iris", desc: "Движок шейдеров с поддержкой Sodium." },
            { name: "Krypton", desc: "Оптимизация сетевого стека." },
            { name: "Language Reload", desc: "Моментальное переключение языков." },
            { name: "Let Me Despawn", desc: "Очистка ненужных мобов на расстоянии." },
            { name: "Lithium", desc: "Оптимизация физики и ИИ мобов." },
            { name: "Memory Leak Fix", desc: "Зачистка утечек RAM." },
            { name: "Mod Menu", desc: "Интерфейс просмотра модов." },
            { name: "Model Gap Fix", desc: "Исправляет щели в 3D моделях." },
            { name: "ModernFix", desc: "Ускорение запуска игры в разы." },
            { name: "More Culling", desc: "Отсечение рендеринга невидимых граней." },
            { name: "Not Enough Crashes", desc: "Не дает вылетать при ошибке." },
            { name: "PacketFixer", desc: "Исправляет вылеты от больших пакетов данных." },
            { name: "Reese's Sodium Options", desc: "Интерфейс для настроек Sodium." },
            { name: "Sodium", desc: "Главный движок оптимизации." },
            { name: "Sodium Extra", desc: "Дополнительные тумблеры оптимизации." },
            { name: "ThreadTweak", desc: "Умное перераспределение потоков CPU." },
            { name: "Very Many Players", desc: "Оптимизация для серверов с кучей игроков." },
            { name: "YetAnotherConfigLib", desc: "Библиотека слоев конфигурации." },
            { name: "cupboard", desc: "Оптимизированное фоновое ядро." }
        ],
        "26.1": [
            { name: "Alternate Current", desc: "Глубокая оптимизация алгоритмов редстоуна." },
            { name: "Bad Packets", desc: "Служебный API для безопасной синхронизации пакетов." },
            { name: "BadOptimizations", desc: "Патчи, убирающие микрофризы." },
            { name: "Cloth Config v26.1", desc: "Стабильный конфигурационный экран." },
            { name: "Clumps", desc: "Объединяет сферы опыта, убирая лаги на фермах." },
            { name: "Connectivity Mod", desc: "Оптимизация сетевых соединений." },
            { name: "Dynamic FPS", desc: "Снижает нагрузку на GPU при свернутой игре." },
            { name: "EntityCulling", desc: "Пропускает рендеринг невидимых мобов." },
            { name: "Fabric API", desc: "Библиотека-ядро." },
            { name: "Fabric Language Kotlin", desc: "Поддержка языка Kotlin для модов." },
            { name: "FerriteCore", desc: "Экстремальное сокращение потребления ОЗУ." },
            { name: "Gpu memory leak fix mod", desc: "Блокировка утечек памяти в видеокарте." },
            { name: "ImmediatelyFast", desc: "Ускорение рендеринга шрифтов и частиц." },
            { name: "Iris", desc: "Движок шейдеров с поддержкой Sodium." },
            { name: "Krypton", desc: "Оптимизация сетевого стека." },
            { name: "Language Reload", desc: "Моментальное переключение языков." },
            { name: "Lithium", desc: "Оптимизация физики и ИИ мобов." },
            { name: "Mod Menu", desc: "Интерфейс просмотра модов." },
            { name: "ModernFix", desc: "Ускорение запуска игры в разы." },
            { name: "More Culling", desc: "Отсечение рендеринга невидимых граней." },
            { name: "Mouse Tweaks", desc: "Улучшенное управление мышью в инвентаре." },
            { name: "No Chat Reports", desc: "Блокировка репортов и телеметрии чата." },
            { name: "Packet Fixer", desc: "Исправляет вылеты от больших пакетов данных." },
            { name: "Placeholder API", desc: "API для использования плейсхолдеров." },
            { name: "Reese's Sodium Options", desc: "Интерфейс для настроек Sodium." },
            { name: "Smooth Boot", desc: "Оптимизация нагрузки на процессор при запуске." },
            { name: "Sodium", desc: "Главный движок оптимизации." },
            { name: "Sodium Extra", desc: "Дополнительные тумблеры оптимизации." },
            { name: "Stutterfix", desc: "Устранение статтеров и микролагов." },
            { name: "Very Many Players", desc: "Оптимизация для серверов с кучей игроков." },
            { name: "YetAnotherConfigLib", desc: "Библиотека слоев конфигурации." },
            { name: "cupboard", desc: "Оптимизированное фоновое ядро." }
        ],
        "1.16.5": [
            { name: "Alternate Current", desc: "Оптимизация алгоритмов редстоуна." },
            { name: "Borderless Mining", desc: "Окно без рамок." },
            { name: "CleanCut", desc: "Удары сквозь траву." },
            { name: "Crash Assistant", desc: "Логи крашей." },
            { name: "Cull Leaves", desc: "Оптимизация рендеринга листвы." },
            { name: "Dynamic FPS", desc: "Снижает нагрузку при свернутой игре." },
            { name: "Enhanced Block Entities", desc: "Рендеринг сундуков на Sodium." },
            { name: "EntityCulling-Fabric", desc: "Пропускает рендеринг мобов за стенами." },
            { name: "Fabric API", desc: "Базовая библиотека." },
            { name: "FerriteCore", desc: "Сокращение потребления ОЗУ." },
            { name: "Indium", desc: "Поддержка графики на Sodium." },
            { name: "Iris", desc: "Движок шейдеров." },
            { name: "Krypton", desc: "Снижение пинга." },
            { name: "LazyDFU", desc: "Ускоряет запуск игры." },
            { name: "Let Me Despawn", desc: "Очистка мобов на расстоянии." },
            { name: "Lithium", desc: "Оптимизация механик." },
            { name: "Memory Leak Fix", desc: "Зачистка утечек RAM." },
            { name: "Mod Menu", desc: "Меню модов." },
            { name: "ModernFix", desc: "Ускорение структур данных." },
            { name: "Packet Fixer", desc: "Фикс вылетов при больших пакетах." },
            { name: "Phosphor", desc: "Оптимизация света." },
            { name: "Reese's Sodium Options", desc: "Расширенные графические настройки." },
            { name: "Sodium", desc: "Движок оптимизации." },
            { name: "Sodium Extra", desc: "Доп. настройки оптимизации." }
        ]
    },

    // ---------------------------------------------------
    // 7. СЛОВАРЬ ТРАНСЛИТЕРАЦИИ ДЛЯ ПОИСКА МОДОВ
    // ---------------------------------------------------
    // Позволяет находить моды при вводе кириллицей или при неточных запросах
    translit: {
        "содиум": "sodium", "натриум": "sodium", "судиум": "sodium", "содем": "sodium", "натрим": "sodium", "содум": "sodium", "садиум": "sodium", "натрий": "sodium",
        "содиум экстра": "sodium extra", "натриум экстра": "sodium extra", "содиумэкстра": "sodium extra", "экстра": "sodium extra", "екстра": "sodium extra",
        "литиум": "lithium", "лициум": "lithium", "литум": "lithium", "литий": "lithium",
        "индиум": "indium", "индим": "indium", "индум": "indium", "индий": "indium",
        "ферритекор": "ferritecore", "феррите кор": "ferritecore", "ферите коре": "ferritecore", "феритекор": "ferritecore", "феррит": "ferritecore", "ферит": "ferritecore", "ферриткор": "ferritecore", "фериткор": "ferritecore", "феррите коря": "ferritecore",
        "модернфикс": "modernfix", "модерн фикс": "modernfix", "модернфик": "modernfix", "модерн фик": "modernfix", "модерн": "modernfix", "модернфих": "modernfix",
        "криптон": "krypton", "криптун": "krypton", "риптон": "krypton",
        "атлант": "athena", "афина": "athena", "атена": "athena",
        "айрис": "iris", "ирис": "iris", "айрес": "iris", "ирес": "iris", "ириска": "iris", "шейдеры": "iris",
        "спарк": "spark", "шпарк": "spark",
        "мод меню": "mod menu", "модменю": "mod menu", "меню модов": "mod menu", "модмену": "mod menu", "мод мену": "mod menu",
        "клот": "cloth", "клот конфиг": "cloth config v11", "клотконфиг": "cloth config v11", "клоф": "cloth", "клофконфиг": "cloth config v11",
        "клампс": "clumps", "кламп": "clumps", "опыт": "clumps",
        "дебагифай": "debugify", "дебаг": "debugify", "дебагфай": "debugify", "фиксы багов": "debugify",
        "энтити": "entityculling", "энтити калинг": "entityculling", "энтитикалинг": "entityculling", "куллинг": "entityculling", "кулинг": "entityculling", "антити": "entityculling", "антити калинг": "entityculling", "рендеринг мобов": "entityculling",
        "фосфор": "phosphor", "фосвор": "phosphor", "фасфар": "phosphor",
        "лейзи дфу": "lazydfu", "лейзидфу": "lazydfu", "lazy dfu": "lazydfu", "дфу": "lazydfu", "dfu": "lazydfu", "лези дфу": "lazydfu", "лезидфу": "lazydfu", "лазу дфу": "lazydfu", "лазудфу": "lazydfu", "лайзи дфу": "lazydfu", "лази дфу": "lazydfu", "лазидфу": "lazydfu", "лази": "lazydfu", "лейзи": "lazydfu", "лези": "lazydfu", "быстрый запуск": "lazydfu",
        "динамик фпс": "dynamic fps", "динамикфпс": "dynamic fps", "динамик": "dynamic fps", "свернуть игру": "dynamic fps",
        "энхансед блок": "enhanced block entities", "енхансед": "enhanced block entities", "блок антити": "enhanced block entities", "энхансед блок антитис": "enhanced block entities", "сундуки": "enhanced block entities",
        "мемори лик": "memory leak fix", "меморилик": "memory leak fix", "мемори": "memory leak fix", "утечка памяти": "memory leak fix", "мемори лек": "memory leak fix", "память": "memory leak fix",
        "пакет фиксер": "packet fixer", "пакетфиксер": "packet fixer", "packetfixer": "packet fixer", "пакет": "packet fixer", "пакеты": "packet fixer", "пакет фикс": "packet fixer",
        "бордерлес": "borderless mining", "бордерлесс": "borderless mining", "окно без рамок": "borderless mining", "бордер": "borderless mining", "без рамок": "borderless mining",
        "альт каррент": "alternate current", "альтернате": "alternate current", "редстоун фикс": "alternate current", "редстоун": "alternate current", "альт": "alternate current",
        "бед пакетс": "bad packets", "бедпакетс": "bad packets", "бед пакет": "bad packets", "бедпакет": "bad packets", "плохие пакеты": "bad packets",
        "бед оптимизейшнс": "badoptimizations", "бедоптимизейшнс": "badoptimizations", "бед оптимизаци": "badoptimizations", "бед оптимайз": "badoptimizations", "бед": "badoptimizations", "бедоптимизация": "badoptimizations", "микрофризы": "badoptimizations",
        "конкурент чанк": "concurrent chunk management engine", "ссме": "concurrent chunk management engine", "ccme": "concurrent chunk management engine", "чанк движок": "concurrent chunk management engine", "многопоточность": "concurrent chunk management engine",
        "коннективити": "connectivity mod", "коннект": "connectivity mod", "сеть": "connectivity mod", "пинг": "connectivity mod",
        "фастаним": "fastanim", "фаст аним": "fastanim", "быстрые анимации": "fastanim", "анимации": "fastanim",
        "гпу мемори": "gpu memory leak fix mod", "гпу лик": "gpu memory leak fix mod", "видеокарта утечка": "gpu memory leak fix mod", "видеокарта": "gpu memory leak fix mod", "гпу": "gpu memory leak fix mod",
        "имедиатлифаст": "immediatelyfast", "имедиатли фаст": "immediatelyfast", "иммидиатли": "immediatelyfast", "имедиали": "immediatelyfast", "имедиат": "immediatelyfast", "имедиатли": "immediatelyfast", "шрифты": "immediatelyfast",
        "ленгвидж релоад": "language reload", "язык": "language reload", "перевод": "language reload", "смена языка": "language reload",
        "мор куллинг": "more culling", "моркуллинг": "more culling", "море куллинг": "more culling", "мор кулинг": "more culling", "граней": "more culling",
        "нот инаф крашес": "not enough crashes", "краш фикс": "not enough crashes", "не вылетать": "not enough crashes", "краши": "not enough crashes",
        "рис содиум": "reese's sodium options", "рис": "reese's sodium options", "интерфейс содиум": "reese's sodium options", "рисе содиум": "reese's sodium options", "рисе": "reese's sodium options",
        "тред твик": "threadtweak", "тредтвик": "threadtweak", "потоки": "threadtweak", "процессор": "threadtweak", "тред": "threadtweak",
        "вери мени плеерс": "very many players", "вмп": "very many players", "vmp": "very many players", "оптимизация игроков": "very many players", "сервер игроков": "very many players",
        "капборд": "cupboard", "кубборд": "cupboard",
        "краш ассистент": "crash assistant", "краш": "crash assistant", "ассистент": "crash assistant", "крашассистент": "crash assistant", "логи": "crash assistant", "логер": "crash assistant",
        "клианкат": "cleancut", "клиан кат": "cleancut", "клинкат": "cleancut", "удары сквозь траву": "cleancut", "трава удары": "cleancut", "клин кат": "cleancut",
        "леме деспавн": "let me despawn", "деспавн": "let me despawn", "очистка мобов": "let me despawn", "удаление мобов": "let me despawn"
    }
};
