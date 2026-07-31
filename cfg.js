const Config = {
    FUNCTIONAL: {
        isSiteEnabled: false, // Включение или отключение работоспособности сайта
        isResponsive: true, // Поддержка адаптивности интерфейса под разные экраны
        showTimeWidget: true, // Отображение виджета реального времени в шапке
        showSocialLinks: true, // Отображение блока ссылок на социальные сети
        searchDebounceDelay: 250, // Задержка (в мс) перед срабатыванием поиска модов
        rouletteSpinDuration: 5100, // Длительность анимации прокрутки рулетки версий (в мс)
        timeLocale: "ru-RU", // Локаль для отображения текущего времени и даты
        easterEggCode: "78,65,84,82,73,85,77", // Код клавиш для активации пасхалки
        easterEggClicks: 7 // Количество кликов для активации пасхалки на логотипе
    },
    EXPERIMENTS: {
        hideAllText: false, // Скрыть весь текст на странице (экспериментально)
        deleteAllFilesMode: false, // Режим удаления всех файлов (опасно, для отладки)
        rainbowMode: false, // Включение радужного режима оформления
        disableCanvasBackground: false, // Отключение фоновой анимации Canvas
        ultraLowMemoryMode: false, // Режим ультра-низкого потребления памяти
        disableRoulette: false // Полное отключение мини-игры «Рулетка версий»
    },
    SITE: {
        favicon: "favicon.webp?v=5", // Путь к файлу иконки сайта
        logo: "logo.webp", // Путь к файлу главного логотипа сборки
        colors: {
            primary: "#ffaa00", // Основной акцентный цвет
            gradientStart: "#ffcc00", // Начальный цвет градиента
            gradientEnd: "#ff5500", // Конечный цвет градиента
            background: "#050506", // Цвет основного фона страницы
            modalBg: "rgba(18, 18, 24, 0.95)" // Цвет фона модальных окон
        },
        versions: [
            { versionNum: "1.21.11", fileType: "Модпак .mrpack", link: "./Natrium_1.21.11.mrpack", fileName: "Natrium_1.21.11.mrpack" },
            { versionNum: "1.21.4", fileType: "Модпак .mrpack", link: "./Natrium_1.21.4.mrpack", fileName: "Natrium_1.21.4.mrpack" },
            { versionNum: "1.20.1", fileType: "Модпак .mrpack", link: "./Natrium_1.20.1.mrpack", fileName: "Natrium_1.20.1.mrpack" },
            { versionNum: "1.18.2", fileType: "Модпак .mrpack", link: "./Natrium_1.18.2.mrpack", fileName: "Natrium_1.18.2.mrpack" },
            { versionNum: "26.1", fileType: "Модпак .mrpack", link: "./Natrium_26.1.mrpack", fileName: "Natrium_26.1.mrpack" },
            { versionNum: "1.16.5", fileType: "Модпак .mrpack", link: "./Natrium_1.16.5.mrpack", fileName: "Natrium_1.16.5.mrpack" }
        ],
        socials: [
            { text: "Наш Telegram-канал:", span: "@NatriumProject", url: "https://telegram.me/NatriumProject" },
            { text: "Наш Telegram-чат:", span: "@NatriumChat", url: "https://telegram.me/NatriumChat" },
            { text: "Нашли баг или краш? Пишите в бота:", span: "@JavaFixerTEXbot", url: "https://telegram.me/JavaFixerTEXbot" }
        ]
    },
    UI: {
        pageTitle: "NATRIUM",
        title: "NATRIUM",
        subtitle: "Сборка-каркас для Minecraft, обеспечивающая максимальную оптимизацию",
        maintenanceText: "Сайт временно недоступен. Ведутся технические работы.",
        timePrefix: "",
        timeZoneLabel: "GMT",
        greetings: {
            night: "Доброй ночи.",
            morning: "Доброе утро.",
            day: "Добрый день.",
            evening: "Добрый вечер."
        },
        buttons: {
            rouletteOpen: "Рулетка версий",
            download: "Скачать сборку",
            modsList: "Список модов",
            copyList: "Скопировать список",
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
    WHY_NATRIUM: {
        title: "Почему Natrium",
        facts: [
            { title: "Тотальная оптимизация", desc: "Глубокая переработка алгоритмов игры с помощью движков Sodium, Lithium и Krypton для достижения максимального FPS." },
            { title: "Экстремальная экономия ОЗУ", desc: "За счет FerriteCore и систем исправления утечек памяти, сборка потребляет значительно меньше оперативной памяти." },
            { title: "Стабильность и фиксы", desc: "Интеграция ModernFix и Debugify избавляет игру от микрофризов, долгих загрузок и сотен ванильных багов." },
            { title: "Универсальный фундамент", desc: "Сборка является идеальным каркасом. Вы можете легко добавлять любые свои моды поверх готовой оптимизированной базы." }
        ]
    },
    INSTRUCTION: {
        buttonText: "Как установить",
        title: "Как установить сборку Natrium:",
        steps: [
            "Скачай файл сборки в формате .mrpack под нужную версию с нашего сайта.",
            "Установи современный лаунчер с поддержкой Modrinth (например: <a href='https://elyprism.ru/' target='_blank'>PineconeMC (Elyprism)</a>, <a href='https://atlauncher.com/' target='_blank'>ATLauncher</a>, <a href='https://prismlauncher.org/' target='_blank'>Prism Launcher</a> или <a href='https://modrinth.com/app' target='_blank'>Modrinth App</a>).",
            "В лаунчере нажми кнопку «Добавить экземпляр» (или «Импорт») и выбери скачанный ранее файл .mrpack.",
            "Дождись, пока лаунчер автоматически скачает все необходимые моды из конфига сборки, и запусти игру."
        ]
    },
    MODS: typeof MODS_DATA !== 'undefined' ? MODS_DATA : {}
};
