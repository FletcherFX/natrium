// Файл: cfg.js
// Главный конфигурационный файл проекта NATRIUM.

const Config = {
    // ---------------------------------------------------
    // 1. ФУНКЦИОНАЛЬНЫЕ НАСТРОЙКИ
    // ---------------------------------------------------
    FUNCTIONAL: {
        isSiteEnabled: true,             // Вкл/выкл сайт (false = тех. работы)
        isResponsive: true,              // Адаптивность для мобильных
        showTimeWidget: true,            // Отображать ли виджет времени
        showSocialLinks: true,           // Отображать ли ссылки на соцсети внизу
        searchDebounceDelay: 250,        // Задержка поиска модов (в мс)
        rouletteSpinDuration: 5100,      // Длительность рулетки (в мс)
        timeLocale: "ru-RU",             // Локаль времени
        easterEggCode: "78,65,84,82,73,85,77", // Пасхалка: NATRIUM
        easterEggClicks: 7
    },

    // ---------------------------------------------------
    // 2. НАСТРОЙКИ САЙТА (РЕСУРСЫ И СТИЛИ)
    // ---------------------------------------------------
    SITE: {
        favicon: "favicon.png?v=5",
        logo: "logo.webp",
        colors: {
            primary: "#ffaa00",
            gradientStart: "#ffcc00",
            gradientEnd: "#ff5500",
            background: "#050506",
            modalBg: "rgba(18, 18, 24, 0.95)"
        },
        versions: [
            { versionNum: "1.20.1", fileType: "Модпак .mrpack", link: "./Natrium_1.20.1.mrpack", fileName: "Natrium_1.20.1.mrpack" },
            { versionNum: "26.1", fileType: "Модпак .mrpack", link: "./Natrium_26.1.mrpack", fileName: "Natrium_26.1.mrpack" },
            { versionNum: "1.16.5", fileType: "Модпак .mrpack", link: "./Natrium_1.16.5.mrpack", fileName: "Natrium_1.16.5.mrpack" }
        ],
        socials: [
            { text: "Наш Telegram-канал:", span: "@NatriumProject", url: "https://telegram.me/NatriumProject" },
            { text: "Наш Telegram-чат:", span: "@NatriumChat", url: "https://telegram.me/NatriumChat" },
            { text: "Нашли баг или краш? Пишите в бота:", span: "@JavaFixerTEXbot", url: "https://telegram.me/JavaFixerTEXbot" }
        ]
    },

    // ---------------------------------------------------
    // 3. ТЕКСТЫ И ИНТЕРФЕЙС
    // ---------------------------------------------------
    UI: {
        pageTitle: "NATRIUM",
        title: "NATRIUM",
        subtitle: "Сборка-каркас на Minecraft, состоящая из полной оптимизации",
        maintenanceText: "Сайт временно недоступен. Ведутся технические работы.",
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
            modsTitlePrefix: "Моды сборки",
            modsTitleHighlight: "NATRIUM",
            searchPlaceholder: "Поиск мода...",
            rouletteTitlePrefix: "Рулетка версий",
            rouletteTitleHighlight: "NATRIUM",
            versionPrefix: "Версия",
            rouletteItemHighlight: "NATRIUM",
            downloadTitlePrefix: "Начало загрузки:"
        }
    },

    // ---------------------------------------------------
    // 4. МОДЫ (С КАТЕГОРИЯМИ)
    // ---------------------------------------------------
    MODS: {
        translit: {
            "содиум": "sodium", "айрис": "iris", "оптимизация": "optimization", "мод меню": "mod menu", 
            "клампс": "clumps", "дебагифай": "debugify", "энтити": "entityculling", "модернфикс": "modernfix"
        },
        "1.20.1": {
            "Оптимизация": [
                { name: "Alternate Current", desc: "Глубокая оптимизация алгоритмов редстоуна." },
                { name: "BadOptimizations", desc: "Патчи, убирающие микрофризы." },
                { name: "Clumps", desc: "Объединяет сферы опыта, убирая лаги на фермах." },
                { name: "Concurrent Chunk Management Engine", desc: "Многопоточный движок обработки чанков." },
                { name: "Connectivity Mod", desc: "Оптимизация сетевых соединений." },
                { name: "Dynamic FPS", desc: "Снижает нагрузку на GPU при свернутой игре." },
                { name: "Enhanced Block Entities", desc: "Переводит рендеринг сундуков на Sodium." },
                { name: "EntityCulling", desc: "Пропускает рендеринг невидимых мобов." },
                { name: "FastAnim", desc: "Оптимизация просчета анимаций." },
                { name: "FerriteCore", desc: "Экстремальное сокращение потребления ОЗУ." },
                { name: "Gpu memory leak fix mod", desc: "Блокировка утечек памяти в видеокарте." },
                { name: "ImmediatelyFast", desc: "Ускорение рендеринга шрифтов и частиц." },
                { name: "Indium", desc: "Адаптер для Sodium." },
                { name: "Krypton", desc: "Оптимизация сетевого стека." },
                { name: "Lithium", desc: "Оптимизация физики и ИИ мобов." },
                { name: "Memory Leak Fix", desc: "Зачистка утечек RAM." },
                { name: "ModernFix", desc: "Ускорение запуска игры в разы." },
                { name: "More Culling", desc: "Отсечение рендеринга невидимых граней." },
                { name: "Sodium", desc: "Главный движок оптимизации." },
                { name: "Sodium Extra", desc: "Дополнительные тумблеры оптимизации." },
                { name: "ThreadTweak", desc: "Умное перераспределение потоков CPU." },
                { name: "Very Many Players", desc: "Оптимизация для серверов с кучей игроков." },
                { name: "cupboard", desc: "Оптимизированное фоновое ядро." }
            ],
            "Библиотеки": [
                { name: "Fabric API", desc: "Библиотека-ядро." },
                { name: "Cloth Config v11", desc: "Стабильный конфигурационный экран." },
                { name: "Bad Packets", desc: "Служебный API для безопасной синхронизации пакетов." },
                { name: "YetAnotherConfigLib", desc: "Библиотека слоев конфигурации." }
            ],
            "Исправления и Утилиты": [
                { name: "Almanac", desc: "Улучшенная интеграция и управление внутриигровой документацией." },
                { name: "Athena", desc: "Инструмент для создания комплексных, динамических текстур." },
                { name: "Crash Assistant", desc: "Помощник при крашах." },
                { name: "Debugify", desc: "Комплексное исправление сотен багов." },
                { name: "Iris", desc: "Движок шейдеров с поддержкой Sodium." },
                { name: "Language Reload", desc: "Моментальное переключение языков." },
                { name: "Let Me Despawn", desc: "Очистка ненужных мобов на расстоянии." },
                { name: "Mod Menu", desc: "Интерфейс просмотра модов." },
                { name: "Model Gap Fix", desc: "Исправляет щели в 3D моделях." },
                { name: "Not Enough Crashes", desc: "Не дает вылетать при ошибке." },
                { name: "PacketFixer", desc: "Исправляет вылеты от больших пакетов данных." },
                { name: "Reese's Sodium Options", desc: "Интерфейс для настроек Sodium." }
            ]
        },
        "26.1": {
            "Оптимизация": [
                { name: "Alternate Current", desc: "Глубокая оптимизация алгоритмов редстоуна." },
                { name: "BadOptimizations", desc: "Патчи, убирающие микрофризы." },
                { name: "Clumps", desc: "Объединяет сферы опыта, убирая лаги на фермах." },
                { name: "Connectivity Mod", desc: "Оптимизация сетевых соединений." },
                { name: "Dynamic FPS", desc: "Снижает нагрузку на GPU при свернутой игре." },
                { name: "EntityCulling", desc: "Пропускает рендеринг невидимых мобов." },
                { name: "FerriteCore", desc: "Экстремальное сокращение потребления ОЗУ." },
                { name: "Gpu memory leak fix mod", desc: "Блокировка утечек памяти в видеокарте." },
                { name: "ImmediatelyFast", desc: "Ускорение рендеринга шрифтов и частиц." },
                { name: "Krypton", desc: "Оптимизация сетевого стека." },
                { name: "Lithium", desc: "Оптимизация физики и ИИ мобов." },
                { name: "ModernFix", desc: "Ускорение запуска игры в разы." },
                { name: "More Culling", desc: "Отсечение рендеринга невидимых граней." },
                { name: "Smooth Boot", desc: "Оптимизация нагрузки на процессор при запуске." },
                { name: "Sodium", desc: "Главный движок оптимизации." },
                { name: "Sodium Extra", desc: "Дополнительные тумблеры оптимизации." },
                { name: "Stutterfix", desc: "Устранение статтеров и микролагов." },
                { name: "Very Many Players", desc: "Оптимизация для серверов с кучей игроков." },
                { name: "cupboard", desc: "Оптимизированное фоновое ядро." }
            ],
            "Библиотеки": [
                { name: "Fabric API", desc: "Библиотека-ядро." },
                { name: "Bad Packets", desc: "Служебный API для безопасной синхронизации пакетов." },
                { name: "Cloth Config v26.1", desc: "Стабильный конфигурационный экран." },
                { name: "Fabric Language Kotlin", desc: "Поддержка языка Kotlin для модов." },
                { name: "Placeholder API", desc: "API для использования плейсхолдеров." },
                { name: "YetAnotherConfigLib", desc: "Библиотека слоев конфигурации." }
            ],
            "Исправления и Утилиты": [
                { name: "Iris", desc: "Движок шейдеров с поддержкой Sodium." },
                { name: "Language Reload", desc: "Моментальное переключение языков." },
                { name: "Mod Menu", desc: "Интерфейс просмотра модов." },
                { name: "Mouse Tweaks", desc: "Улучшенное управление мышью в инвентаре." },
                { name: "No Chat Reports", desc: "Блокировка репортов и телеметрии чата." },
                { name: "Packet Fixer", desc: "Исправляет вылеты от больших пакетов данных." },
                { name: "Reese's Sodium Options", desc: "Интерфейс для настроек Sodium." }
            ]
        },
        "1.16.5": {
            "Оптимизация": [
                { name: "Alternate Current", desc: "Оптимизация алгоритмов редстоуна." },
                { name: "Cull Leaves", desc: "Оптимизация рендеринга листвы." },
                { name: "Dynamic FPS", desc: "Снижает нагрузку при свернутой игре." },
                { name: "Enhanced Block Entities", desc: "Рендеринг сундуков на Sodium." },
                { name: "EntityCulling-Fabric", desc: "Пропускает рендеринг мобов за стенами." },
                { name: "FerriteCore", desc: "Сокращение потребления ОЗУ." },
                { name: "Indium", desc: "Поддержка графики на Sodium." },
                { name: "Krypton", desc: "Снижение пинга." },
                { name: "LazyDFU", desc: "Ускоряет запуск игры." },
                { name: "Lithium", desc: "Оптимизация механик." },
                { name: "Memory Leak Fix", desc: "Зачистка утечек RAM." },
                { name: "ModernFix", desc: "Ускорение структур данных." },
                { name: "Phosphor", desc: "Оптимизация света." },
                { name: "Sodium", desc: "Движок оптимизации." },
                { name: "Sodium Extra", desc: "Доп. настройки оптимизации." }
            ],
            "Библиотеки": [
                { name: "Fabric API", desc: "Базовая библиотека." }
            ],
            "Исправления и Утилиты": [
                { name: "Borderless Mining", desc: "Окно без рамок." },
                { name: "CleanCut", desc: "Удары сквозь траву." },
                { name: "Crash Assistant", desc: "Логи крашей." },
                { name: "Iris", desc: "Движок шейдеров." },
                { name: "Let Me Despawn", desc: "Очистка мобов на расстоянии." },
                { name: "Mod Menu", desc: "Меню модов." },
                { name: "Packet Fixer", desc: "Фикс вылетов при больших пакетах." },
                { name: "Reese's Sodium Options", desc: "Расширенные графические настройки." }
            ]
        }
    }
};
