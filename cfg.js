const Config = {
    FUNCTIONAL: {
        isSiteEnabled: true, // Включение или отключение работоспособности сайта
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
            { versionNum: "1.21.4", fileType: "Модпак .mrpack", link: "./Natrium_1.21.4.mrpack", fileName: "Natrium_1.21.4.mrpack" }, // Версия 1.21.4
            { versionNum: "1.20.1", fileType: "Модпак .mrpack", link: "./Natrium_1.20.1.mrpack", fileName: "Natrium_1.20.1.mrpack" }, // Версия 1.20.1
            { versionNum: "1.18.2", fileType: "Модпак .mrpack", link: "./Natrium_1.18.2.mrpack", fileName: "Natrium_1.18.2.mrpack" }, // Версия 1.18.2
            { versionNum: "26.1", fileType: "Модпак .mrpack", link: "./Natrium_26.1.mrpack", fileName: "Natrium_26.1.mrpack" }, // Версия 26.1
            { versionNum: "1.16.5", fileType: "Модпак .mrpack", link: "./Natrium_1.16.5.mrpack", fileName: "Natrium_1.16.5.mrpack" } // Версия 1.16.5
        ],
        socials: [
            { text: "Наш Telegram-канал:", span: "@NatriumProject", url: "https://telegram.me/NatriumProject" }, // Канал Telegram
            { text: "Наш Telegram-чат:", span: "@NatriumChat", url: "https://telegram.me/NatriumChat" }, // Чат Telegram
            { text: "Нашли баг или краш? Пишите в бота:", span: "@JavaFixerTEXbot", url: "https://telegram.me/JavaFixerTEXbot" } // Бот поддержки
        ]
    },
    UI: {
        pageTitle: "NATRIUM", // Заголовок вкладки в браузере
        title: "NATRIUM", // Главный заголовок на странице
        subtitle: "Сборка-каркас для Minecraft, обеспечивающая максимальную оптимизацию", // Подзаголовок с описанием
        maintenanceText: "Сайт временно недоступен. Ведутся технические работы.", // Текст технических работ
        timePrefix: "", // Префикс перед часами
        timeZoneLabel: "GMT", // Метка часового пояса
        greetings: {
            night: "Доброй ночи.", // Приветствие ночью
            morning: "Доброе утро.", // Приветствие утром
            day: "Добрый день.", // Приветствие днем
            evening: "Добрый вечер." // Приветствие вечером
        },
        buttons: {
            rouletteOpen: "Рулетка версий", // Кнопка открытия рулетки
            download: "Скачать сборку", // Кнопка скачивания
            modsList: "Список модов", // Кнопка списка модов
            copyList: "Скопировать список", // Кнопка копирования
            spin: "Крутить рулетку", // Кнопка вращения рулетки
            spinAgain: "Крутить еще раз", // Кнопка повтора рулетки
            home: "На главную", // Кнопка возврата на главную
            downloadRoulette: "Скачать NATRIUM" // Кнопка скачивания из рулетки
        },
        modals: {
            modsTitlePrefix: "Моды сборки", // Префикс заголовка модов
            modsTitleHighlight: "NATRIUM", // Акцент в заголовке модов
            searchPlaceholder: "Поиск мода...", // Плейсхолдер поиска
            rouletteTitlePrefix: "Рулетка версий", // Префикс заголовка рулетки
            rouletteTitleHighlight: "NATRIUM", // Акцент в заголовке рулетки
            versionPrefix: "Версия", // Префикс версии
            rouletteItemHighlight: "NATRIUM", // Метка в рулетке
            downloadTitlePrefix: "Начало загрузки:" // Префикс загрузки
        }
    },
    WHY_NATRIUM: {
        title: "Почему Natrium", // Заголовок блока преимуществ
        facts: [
            { title: "Тотальная оптимизация", desc: "Глубокая переработка алгоритмов игры с помощью движков Sodium, Lithium и Krypton для достижения максимального FPS." }, // Факт 1
            { title: "Экстремальная экономия ОЗУ", desc: "За счет FerriteCore и систем исправления утечек памяти, сборка потребляет значительно меньше оперативной памяти." }, // Факт 2
            { title: "Стабильность и фиксы", desc: "Интеграция ModernFix и Debugify избавляет игру от микрофризов, долгих загрузок и сотен ванильных багов." }, // Факт 3
            { title: "Универсальный фундамент", desc: "Сборка является идеальным каркасом. Вы можете легко добавлять любые свои моды поверх готовой оптимизированной базы." } // Факт 4
        ]
    },
    INSTRUCTION: {
        buttonText: "Как установить", // Кнопка инструкции
        title: "Как установить сборку Natrium:", // Заголовок инструкции
        steps: [
            "Скачай файл сборки в формате .mrpack под нужную версию с нашего сайта.", // Шаг 1
            "Установи современный лаунчер с поддержкой Modrinth (например: <a href='https://elyprism.ru/' target='_blank'>PineconeMC (Elyprism)</a>, <a href='https://atlauncher.com/' target='_blank'>ATLauncher</a>, <a href='https://prismlauncher.org/' target='_blank'>Prism Launcher</a> или <a href='https://modrinth.com/app' target='_blank'>Modrinth App</a>).", // Шаг 2
            "В лаунчере нажми кнопку «Добавить экземпляр» (или «Импорт») и выбери скачанный ранее файл .mrpack.", // Шаг 3
            "Дождись, пока лаунчер автоматически скачает все необходимые моды из конфига сборки, и запусти игру." // Шаг 4
        ]
    },
    MODS: typeof MODS_DATA !== 'undefined' ? MODS_DATA : {} // Подключение списка всех модификаций из mods.js
};
