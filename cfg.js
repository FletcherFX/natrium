const Config = {
    // ---------------------------------------------------
    // 1. ФУНКЦИОНАЛЬНЫЕ НАСТРОЙКИ
    // ---------------------------------------------------
    FUNCTIONAL: {
        isSiteEnabled: true,             // Вкл/выкл сайт (false = полная блокировка и вывод экрана тех.работ)
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
    // 2. ЭКСПЕРИМЕНТЫ (ОПАСНЫЕ ФУНКЦИИ)
    // ---------------------------------------------------
    EXPERIMENTS: {
        // Убирает абсолютно все тексты на сайте (оставляет только фон, иконки и свечения)
        hideAllText: false,
        
        // Удаляет весь контент с сайта, имитируя удаление файлов (подойдет для розыгрыша)
        deleteAllFilesMode: false
    },

    // ---------------------------------------------------
    // 3. НАСТРОЙКИ САЙТА (РЕСУРСЫ И СТИЛИ)
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
    // 4. ТЕКСТЫ И ИНТЕРФЕЙС
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
    // 5. БЛОК "ПОЧЕМУ NATRIUM" (Объем сайта)
    // ---------------------------------------------------
    WHY_NATRIUM: {
        title: "Почему Natrium",
        facts: [
            { title: "Тотальная оптимизация", desc: "Глубокая переработка алгоритмов игры с помощью движков Sodium, Lithium и Krypton для достижения максимального FPS." },
            { title: "Экстремальная экономия ОЗУ", desc: "За счет FerriteCore и систем исправления утечек памяти, сборка потребляет значительно меньше оперативной памяти." },
            { title: "Стабильность и фиксы", desc: "Интеграция ModernFix и Debugify избавляет игру от микрофризов, долгих загрузок и сотен ванильных багов." },
            { title: "Универсальный фундамент", desc: "Сборка является идеальным каркасом. Вы можете легко добавлять любые свои моды поверх готовой оптимизированной базы." }
        ]
    },

    // ---------------------------------------------------
    // 6. ИНСТРУКЦИЯ ПО УСТАНОВКЕ
    // ---------------------------------------------------
    INSTRUCTION: {
        buttonText: "Как установить",
        title: "Как установить сборку Natrium:",
        steps: [
            "Скачай файл сборки в формате .mrpack под нужную версию с нашего сайта.",
            "Скачай и установи современный лаунчер с поддержкой Modrinth (например: <a href='https://elyprism.ru/' target='_blank'>PineconeMc (Elyprism)</a>, <a href='https://atlauncher.com/' target='_blank'>ATLauncher</a>, <a href='https://prismlauncher.org/' target='_blank'>Prism Launcher</a> или <a href='https://modrinth.com/app' target='_blank'>Modrinth App</a>).",
            "В лаунчере нажми кнопку «Добавить экземпляр» (или «Импорт») и выбери скачанный ранее файл .mrpack.",
            "Дождись, пока лаунчер автоматически скачает все необходимые моды из конфига сборки, и запускай игру."
        ]
    },

    // ---------------------------------------------------
    // 7. МОДЫ (С КАТЕГОРИЯМИ)
    // ---------------------------------------------------
    MODS: {
        translit: {
            "содиум": "sodium", "айрис": "iris", "оптимизация": "optimization", "мод меню": "mod menu", 
            "клампс": "clumps", "дебагифай": "debugify", "энтити": "entityculling", "модернфикс": "modernfix"
        },
        "1.20.1": {
            "Оптимизация": [
                { name: "Alternate Current", desc: "Оптимизация алгоритмов редстоуна." },
                { name: "BadOptimizations", desc: "Патчи для устранения микрофризов." },
                { name: "Clumps", desc: "Объединение сфер опыта." },
                { name: "Concurrent Chunk Management Engine", desc: "Многопоточная обработка чанков." },
                { name: "Connectivity", desc: "Оптимизация сетевых соединений." },
                { name: "cupboard", desc: "Фоновое оптимизированное ядро." },
                { name: "Dynamic FPS", desc: "Снижение нагрузки при свернутой игре." },
                { name: "Enhanced Block Entities", desc: "Рендеринг сундуков на Sodium." },
                { name: "EntityCulling", desc: "Скрытие невидимых мобов." },
                { name: "FastAnim", desc: "Ускорение просчета анимаций." },
                { name: "FerriteCore", desc: "Экстремальное сокращение потребления ОЗУ." },
                { name: "fix GPU memory leak", desc: "Блокировка утечек памяти в видеокарте." },
                { name: "ImmediatelyFast", desc: "Ускорение рендеринга." },
                { name: "Indium", desc: "Адаптер для рендеринга Sodium." },
                { name: "Krypton", desc: "Оптимизация сетевого стека." },
                { name: "Lithium", desc: "Оптимизация физики и ИИ мобов." },
                { name: "Memory Leak Fix", desc: "Очистка утечек RAM." },
                { name: "ModernFix", desc: "Ускорение запуска игры и структур данных." },
                { name: "More Culling", desc: "Отсечение рендеринга невидимых граней." },
                { name: "Sodium", desc: "Главный движок оптимизации." },
                { name: "Sodium Extra", desc: "Дополнительные настройки Sodium." },
                { name: "ThreadTweak", desc: "Умное перераспределение потоков CPU." },
                { name: "Very Many Players (Fabric)", desc: "Оптимизация для серверов." }
            ],
            "Библиотеки": [
                { name: "Bad Packets", desc: "Безопасная синхронизация пакетов." },
                { name: "Cloth Config v11", desc: "Конфигурационный экран." },
                { name: "Fabric API", desc: "Библиотека-ядро." },
                { name: "YetAnotherConfigLib", desc: "Библиотека слоев конфигурации." }
            ],
            "Исправления и Утилиты": [
                { name: "Almanac", desc: "Улучшенная документация." },
                { name: "Athena", desc: "Инструмент динамических текстур." },
                { name: "Crash Assistant", desc: "Помощник при крашах." },
                { name: "Debugify", desc: "Комплексное исправление багов." },
                { name: "Iris Shaders", desc: "Движок шейдеров." },
                { name: "Language Reload", desc: "Моментальное переключение языков." },
                { name: "Let Me Despawn", desc: "Очистка мобов." },
                { name: "Mod Menu", desc: "Интерфейс просмотра модов." },
                { name: "Model Gap Fix", desc: "Исправляет щели в 3D моделях." },
                { name: "Not Enough Crashes", desc: "Не дает вылетать при ошибке." },
                { name: "Packet Fixer", desc: "Исправляет вылеты от больших пакетов." },
                { name: "Reese's Sodium Options", desc: "Интерфейс настроек Sodium." }
            ]
        },
        "26.1": {
            "Оптимизация": [
                { name: "Alternate Current", desc: "Оптимизация редстоуна." },
                { name: "BadOptimizations", desc: "Патчи от микрофризов." },
                { name: "Clumps", desc: "Объединение сфер опыта." },
                { name: "Connectivity Mod", desc: "Сетевая оптимизация." },
                { name: "cupboard-fabric-26.1-3.7", desc: "Оптимизированное ядро." },
                { name: "Dynamic FPS", desc: "Оптимизация при свернутой игре." },
                { name: "EntityCulling", desc: "Скрытие невидимых мобов." },
                { name: "FerriteCore", desc: "Сокращение потребления ОЗУ." },
                { name: "gpumemleakfix-fabric-26.1-1.9", desc: "Фикс утечек GPU." },
                { name: "ImmediatelyFast", desc: "Ускорение рендеринга." },
                { name: "Krypton", desc: "Оптимизация сетевого стека." },
                { name: "Lithium", desc: "Оптимизация физики." },
                { name: "ModernFix-mVUS", desc: "Быстрый запуск игры." },
                { name: "More Culling", desc: "Отсечение невидимых граней." },
                { name: "Smooth Boot", desc: "Оптимизация запуска." },
                { name: "Sodium", desc: "Главный движок." },
                { name: "Sodium Extra", desc: "Тумблеры Sodium." },
                { name: "StutterFix - Refurbished!", desc: "Устранение статтеров." },
                { name: "Very Many Players (Fabric)", desc: "Оптимизация сервера." }
            ],
            "Библиотеки": [
                { name: "bad packets", desc: "Безопасная синхронизация пакетов." },
                { name: "Cloth Config API", desc: "Конфигурационный интерфейс." },
                { name: "Fabric API", desc: "Основная библиотека." },
                { name: "Fabric Language Kotlin", desc: "Поддержка языка Kotlin." },
                { name: "Text Placeholder API", desc: "Система плейсхолдеров." },
                { name: "YetAnotherConfigLib (YACL)", desc: "Интерфейсы настроек." }
            ],
            "Исправления и Утилиты": [
                { name: "Iris Shaders", desc: "Движок шейдеров." },
                { name: "Language Reload", desc: "Моментальная смена языка." },
                { name: "Mod Menu", desc: "Список модов в игре." },
                { name: "Mouse Tweaks", desc: "Улучшенное управление мышью." },
                { name: "No Chat Reports", desc: "Блокировка репортов чата." },
                { name: "Packet Fixer", desc: "Фикс пакетов." },
                { name: "Reese's Sodium Options", desc: "Меню настроек Sodium." }
            ]
        },
        "1.16.5": {
            "Оптимизация": [
                { name: "Alternate Current", desc: "Оптимизация редстоуна." },
                { name: "Cull Leaves", desc: "Оптимизация рендеринга листвы." },
                { name: "Dynamic FPS", desc: "Оптимизация свернутой игры." },
                { name: "Enhanced Block Entities", desc: "Быстрые сундуки." },
                { name: "EntityCulling-Fabric", desc: "Скрытие невидимых мобов." },
                { name: "FerriteCore", desc: "Сокращение ОЗУ." },
                { name: "Indium", desc: "Адаптер для Sodium." },
                { name: "Krypton", desc: "Снижение пинга." },
                { name: "LazyDFU", desc: "Быстрый запуск игры." },
                { name: "Lithium", desc: "Оптимизация ИИ и физики." },
                { name: "Memory Leak Fix", desc: "Очистка RAM." },
                { name: "ModernFix", desc: "Ускорение алгоритмов." },
                { name: "Phosphor", desc: "Оптимизация света." },
                { name: "Sodium", desc: "Движок рендеринга." },
                { name: "Sodium Extra", desc: "Доп. настройки Sodium." }
            ],
            "Библиотеки": [
                { name: "Fabric API", desc: "Базовая библиотека." }
            ],
            "Исправления и Утилиты": [
                { name: "Borderless Mining", desc: "Окно без рамок." },
                { name: "CleanCut", desc: "Удары сквозь траву." },
                { name: "Crash Assistant", desc: "Помощник по крашам." },
                { name: "Iris", desc: "Движок шейдеров." },
                { name: "Let Me Despawn", desc: "Очистка мобов." },
                { name: "Mod Menu", desc: "Меню модов." },
                { name: "Packet Fixer", desc: "Фикс вылетов из-за пакетов." },
                { name: "Reese's Sodium Options", desc: "Расширенные графические настройки." }
            ]
        }
    }
};
