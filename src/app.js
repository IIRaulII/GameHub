// Definición de las rutas y vistas de la aplicación
const routes = {
    splash: 'splash-screen',
    menu: 'main-menu',
    game: 'game-container'
};

// Estado global de la aplicación
const appState = {
    currentView: 'splash',
    currentGame: null,
    countdown: 3
};

// Elementos DOM que se crearán dinámicamente
let rootElement;
let appContainer;
let splashScreen;
let mainMenu;
let gameContainer;
let countdownElement;

// Función para crear la estructura inicial de la aplicación
function createAppStructure() {
    rootElement = document.getElementById('root');
    
    // Crear el contenedor principal de la aplicación
    appContainer = document.createElement('div');
    appContainer.id = 'app-container';
    rootElement.appendChild(appContainer);
    
    // Crear la pantalla de splash
    splashScreen = document.createElement('div');
    splashScreen.id = 'splash-screen';
    splashScreen.className = 'splash-body';
    
    const splashContainer = document.createElement('div');
    splashContainer.className = 'splash-container';
    
    const splashTitle = document.createElement('h1');
    splashTitle.className = 'splash-title';
    splashTitle.textContent = 'Bienvenido a Game Hub';
    
    countdownElement = document.createElement('div');
    countdownElement.id = 'countdown';
    countdownElement.textContent = appState.countdown;
    
    const splashText = document.createElement('p');
    splashText.className = 'splash-text';
    splashText.textContent = 'Preparando tus juegos favoritos...';
    
    splashContainer.appendChild(splashTitle);
    splashContainer.appendChild(countdownElement);
    splashContainer.appendChild(splashText);
    splashScreen.appendChild(splashContainer);
    
    // Crear el contenedor del menú principal
    mainMenu = document.createElement('div');
    mainMenu.id = 'main-menu';
    mainMenu.style.display = 'none';
    
    // Crear el contenedor de juegos
    gameContainer = document.createElement('div');
    gameContainer.id = 'game-container';
    gameContainer.style.display = 'none';
    
    // Añadir todos los elementos al contenedor principal
    appContainer.appendChild(splashScreen);
    appContainer.appendChild(mainMenu);
    appContainer.appendChild(gameContainer);
}

// Función para navegar entre vistas
function navigateTo(route, gameId = null) {
    // Eliminar los estilos específicos de juegos anteriores
    removeGameStyles();

    // Ocultar todas las vistas
    splashScreen.style.display = 'none';
    mainMenu.style.display = 'none';
    gameContainer.style.display = 'none';

    // Actualizar el estado
    appState.currentView = route;
    
    if (gameId) {
        appState.currentGame = gameId;
    }

    // Mostrar la vista correspondiente
    switch (route) {
        case 'splash':
            splashScreen.style.display = 'flex';
            break;
        case 'menu':
            mainMenu.style.display = 'block';
            loadMainMenu();
            break;
        case 'game':
            gameContainer.style.display = 'block';
            loadGameStyles(gameId);
            loadGame(gameId);
            break;
    }
}

// Función para cargar los estilos específicos de un juego
function loadGameStyles(gameId) {
    const head = document.head;
    let styleLink = document.createElement('link');
    styleLink.rel = 'stylesheet';
    styleLink.className = 'game-specific-styles';
    
    switch (gameId) {
        case 'tres-en-raya':
            styleLink.href = 'src/tres-en-raya/tres-en-raya.css';
            break;
        case 'puzzle':
            styleLink.href = 'src/puzzle/puzzle-de-memoria.css';
            break;
        case 'piedra-papel-tijera':
            styleLink.href = 'src/piedra-papel-tijera/piedra-papel-tijera.css';
            break;
    }
    
    head.appendChild(styleLink);
}

// Función para eliminar los estilos específicos de juegos
function removeGameStyles() {
    const gameStyles = document.querySelectorAll('.game-specific-styles');
    gameStyles.forEach(style => {
        style.remove();
    });
}

// Función para crear un botón con icono
function createButtonWithIcon(text, iconSrc, className, onClick) {
    const button = document.createElement('button');
    button.className = className;
    
    if (iconSrc) {
        const buttonImg = document.createElement('img');
        buttonImg.src = iconSrc;
        buttonImg.alt = text;
        buttonImg.className = 'button-icon';
        button.appendChild(buttonImg);
        button.appendChild(document.createTextNode(` ${text}`));
    } else {
        button.textContent = text;
    }
    
    if (onClick) {
        button.onclick = onClick;
    }
    
    return button;
}

// Función para crear un contenedor de botones de control
function createControlButtons(homeCallback, newGameCallback, resetCallback, resetId) {
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    
    // Botón de volver
    const homeButton = createButtonWithIcon('Volver', 'public/volver.png', 'control-button', homeCallback);
    buttonContainer.appendChild(homeButton);
    
    // Botón de nueva partida
    if (newGameCallback) {
        const newGameButton = createButtonWithIcon('Nueva Partida', null, 'control-button', newGameCallback);
        buttonContainer.appendChild(newGameButton);
    }
    
    // Botón de resetear marcador (opcional)
    if (resetCallback && resetId) {
        const resetScoreButton = createButtonWithIcon('Resetear Marcador', null, 'control-button');
        resetScoreButton.id = resetId;
        resetScoreButton.onclick = resetCallback;
        return { buttonContainer, resetScoreButton };
    }
    
    return { buttonContainer };
}

// Función para cargar el menú principal
function loadMainMenu() {
    // Limpiar el contenedor del menú
    mainMenu.innerHTML = '';
    
    // Crear el encabezado
    const header = document.createElement('header');
    const title = document.createElement('h1');
    title.textContent = 'Bienvenido al Game Hub';
    header.appendChild(title);
    
    // Crear el contenedor principal
    const main = document.createElement('main');
    
    // Crear las tarjetas de juegos
    const games = [
        {
            id: 'tres-en-raya',
            title: 'Tres en Raya',
            description: 'Un clásico juego de estrategia para dos jugadores.',
            image: 'public/3raya.webp'
        },
        {
            id: 'puzzle',
            title: 'Puzzle de Memoria',
            description: 'Encuentra las parejas en el menor tiempo posible.',
            image: 'public/puzzle.webp'
        },
        {
            id: 'piedra-papel-tijera',
            title: 'Piedra, Papel o Tijera',
            description: 'Desafía a la computadora en este juego clásico.',
            image: 'public/ppt.webp'
        }
    ];
    
    games.forEach(game => {
        const card = document.createElement('a');
        card.href = '#';
        card.className = 'cardmenu';
        card.onclick = function() {
            navigateTo('game', game.id);
            return false;
        };
        
        const img = document.createElement('img');
        img.src = game.image;
        img.alt = game.title;
        
        const cardContent = document.createElement('div');
        cardContent.className = 'card-content';
        
        const cardTitle = document.createElement('h2');
        cardTitle.textContent = game.title;
        
        const cardDescription = document.createElement('p');
        cardDescription.textContent = game.description;
        
        cardContent.appendChild(cardTitle);
        cardContent.appendChild(cardDescription);
        
        card.appendChild(img);
        card.appendChild(cardContent);
        
        main.appendChild(card);
    });
    
    // Añadir los elementos al contenedor del menú
    mainMenu.appendChild(header);
    mainMenu.appendChild(main);
}

// Función para cargar un juego específico
function loadGame(gameId) {
    // Limpiar el contenedor de juegos
    gameContainer.innerHTML = '';
    
    // Cargar el juego correspondiente
    switch (gameId) {
        case 'tres-en-raya':
            loadTresEnRaya();
            break;
        case 'puzzle':
            loadPuzzle();
            break;
        case 'piedra-papel-tijera':
            loadPiedraPapelTijera();
            break;
    }
}

// Función para cargar el juego de Tres en Raya
function loadTresEnRaya() {
    // Crear el encabezado
    const header = document.createElement('header');
    const title = document.createElement('h1');
    title.textContent = 'Juego de Tres en Raya';
    header.appendChild(title);
    
    // Crear el contenido principal
    const main = document.createElement('main');
    
    // Crear el marcador
    const scoreboard = document.createElement('div');
    scoreboard.id = 'tres-en-raya-scoreboard';
    scoreboard.textContent = 'Jugador 1: 0 - Jugador 2: 0';
    
    // Crear la selección de jugador
    const playerSelection = document.createElement('div');
    playerSelection.id = 'player-selection';
    
    const startXButton = document.createElement('button');
    startXButton.id = 'start-x';
    startXButton.textContent = 'inicia X';
    
    const startOButton = document.createElement('button');
    startOButton.id = 'start-o';
    startOButton.textContent = 'inicia O';
    
    playerSelection.appendChild(startXButton);
    playerSelection.appendChild(startOButton);
    
    // Crear el mensaje de victoria
    const victoryMessage = document.createElement('div');
    victoryMessage.id = 'victory-message';
    victoryMessage.style.display = 'none';
    victoryMessage.style.fontSize = '1.5em';
    victoryMessage.style.marginTop = '10px';
    
    // Crear el contenedor del tablero
    const boardContainer = document.createElement('div');
    boardContainer.id = 'tres-en-raya-container';
    
    // Crear los botones de control
    const { buttonContainer, resetScoreButton } = createControlButtons(
        () => navigateTo('menu'),
        () => resetTresEnRaya(),
        () => {
            if (typeof resetTresEnRayaScore === 'function') {
                resetTresEnRayaScore();
            }
        },
        'reset-score-tres-en-raya'
    );
    
    // Añadir todos los elementos al contenido principal
    main.appendChild(scoreboard);
    main.appendChild(playerSelection);
    main.appendChild(victoryMessage);
    main.appendChild(boardContainer);
    main.appendChild(buttonContainer);
    main.appendChild(resetScoreButton);
    
    // Añadir el encabezado y el contenido principal al contenedor del juego
    gameContainer.appendChild(header);
    gameContainer.appendChild(main);
    
    // Inicializar el juego
    initTresEnRaya();
}

// Función para cargar el juego de Puzzle de Memoria
function loadPuzzle() {
    // Crear el encabezado
    const header = document.createElement('header');
    const title = document.createElement('h1');
    title.textContent = 'Puzzle de Memoria';
    header.appendChild(title);
    
    // Crear el contenido principal
    const main = document.createElement('main');
    main.id = 'puzzle-main';
    
    // Crear el temporizador
    const timer = document.createElement('div');
    timer.id = 'timer';
    timer.textContent = 'Tiempo: 0:00';
    
    // Crear el mejor tiempo
    const bestTime = document.createElement('div');
    bestTime.id = 'best-time';
    bestTime.textContent = 'Mejor Tiempo: --:--';
    
    // Crear el contenedor del puzzle
    const puzzleContainer = document.createElement('div');
    puzzleContainer.id = 'puzzle-container';
    
    // Crear el mensaje de victoria
    const victoryMessage = document.createElement('div');
    victoryMessage.id = 'victory-message';
    victoryMessage.className = 'hidden';
    
    // Crear los botones de control
    const { buttonContainer } = createControlButtons(
        () => navigateTo('menu'),
        () => resetPuzzle()
    );
    
    // Añadir todos los elementos al contenido principal
    main.appendChild(timer);
    main.appendChild(bestTime);
    main.appendChild(puzzleContainer);
    main.appendChild(victoryMessage);
    main.appendChild(buttonContainer);
    
    // Añadir el encabezado y el contenido principal al contenedor del juego
    gameContainer.appendChild(header);
    gameContainer.appendChild(main);
    
    // Inicializar el juego
    initPuzzle();
}

// Función para cargar el juego de Piedra, Papel o Tijera
function loadPiedraPapelTijera() {
    // Crear el encabezado
    const header = document.createElement('header');
    const title = document.createElement('h1');
    title.textContent = 'Piedra, Papel o Tijera';
    header.appendChild(title);
    
    // Crear el contenido principal
    const main = document.createElement('main');
    main.id = 'piedra-papel-tijera-main';
    
    // Crear el marcador
    const scoreboard = document.createElement('div');
    scoreboard.id = 'scoreboard';
    scoreboard.textContent = 'Jugador: 0 - Computadora: 0';
    
    // Crear el contenedor del juego
    const gameContainerInner = document.createElement('div');
    gameContainerInner.id = 'game-container';
    
    // Crear una estructura de dos columnas para las elecciones
    const gameGrid = document.createElement('div');
    gameGrid.className = 'game-grid';
    
    // Crear la sección de elección del jugador
    const playerChoice = document.createElement('div');
    playerChoice.id = 'player-choice';
    
    const playerTitle = document.createElement('h2');
    playerTitle.textContent = 'Tu elección:';
    
    const choices = document.createElement('div');
    choices.className = 'choices';
    
    // Crear los botones de elección
    const options = [
        { id: 'piedra', image: 'public/piedra.webp', alt: 'Piedra' },
        { id: 'papel', image: 'public/papel.webp', alt: 'Papel' },
        { id: 'tijera', image: 'public/tijera.webp', alt: 'Tijera' }
    ];
    
    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'game-button';
        button.onclick = function() {
            play(option.id);
        };
        
        const img = document.createElement('img');
        img.src = option.image;
        img.alt = option.alt;
        
        button.appendChild(img);
        choices.appendChild(button);
    });
    
    playerChoice.appendChild(playerTitle);
    playerChoice.appendChild(choices);
    
    // Crear la sección de elección de la computadora
    const computerChoiceContainer = document.createElement('div');
    computerChoiceContainer.id = 'computer-choice-container';
    
    const computerTitle = document.createElement('h2');
    computerTitle.textContent = 'Elección de la computadora:';
    
    const computerChoice = document.createElement('div');
    computerChoice.id = 'computer-choice';
    computerChoice.className = 'game-button';
    
    const computerImg = document.createElement('img');
    computerImg.id = 'computer-img';
    computerImg.src = 'public/answ.webp';
    computerImg.alt = '?';
    
    computerChoice.appendChild(computerImg);
    computerChoiceContainer.appendChild(computerTitle);
    computerChoiceContainer.appendChild(computerChoice);
    
    // Añadir las secciones al contenedor de dos columnas
    gameGrid.appendChild(playerChoice);
    gameGrid.appendChild(computerChoiceContainer);
    
    // Añadir el grid al contenedor del juego
    gameContainerInner.appendChild(gameGrid);
    
    // Crear el resultado
    const result = document.createElement('div');
    result.id = 'result';
    
    // Crear los botones de control
    const { buttonContainer } = createControlButtons(
        () => navigateTo('menu'),
        null,
        () => resetScore(),
        null
    );
    
    // Añadir el botón de resetear marcador
    const resetButton = createButtonWithIcon('Resetear Marcador', null, 'control-button', () => resetScore());
    buttonContainer.appendChild(resetButton);
    
    // Añadir todos los elementos al contenido principal
    main.appendChild(scoreboard);
    main.appendChild(gameContainerInner);
    main.appendChild(result);
    main.appendChild(buttonContainer);
    
    // Añadir el encabezado y el contenido principal al contenedor del juego
    gameContainer.appendChild(header);
    gameContainer.appendChild(main);
    
    // Inicializar el juego
    initPiedraPapelTijera();
}

// Función para actualizar la cuenta regresiva
function updateCountdown() {
    countdownElement.textContent = appState.countdown;
    
    if (appState.countdown === 0) {
        // Navegar al menú principal cuando la cuenta regresiva llegue a 0
        navigateTo('menu');
    } else {
        appState.countdown--;
        setTimeout(updateCountdown, 1000);
    }
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    // Crear la estructura de la aplicación
    createAppStructure();
    
    // Comenzar con la pantalla de splash y la cuenta regresiva
    navigateTo('splash');
    updateCountdown();
});

// Funciones para inicializar los juegos (estas serán llamadas desde los archivos JS específicos)
function initTresEnRaya() {
    if (typeof initializeTresEnRaya === 'function') {
        initializeTresEnRaya();
    }
}

function resetTresEnRaya() {
    if (typeof resetTresEnRayaGame === 'function') {
        resetTresEnRayaGame();
    }
}

function initPuzzle() {
    if (typeof initializePuzzle === 'function') {
        initializePuzzle();
    }
}

function resetPuzzle() {
    if (typeof resetPuzzleGame === 'function') {
        resetPuzzleGame();
    }
}

function initPiedraPapelTijera() {
    if (typeof initializePiedraPapelTijera === 'function') {
        initializePiedraPapelTijera();
    }
} 