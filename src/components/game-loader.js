import { createButtonWithIcon, createControlButtons } from './ui-builder.js';
import { navigateTo } from './navigation.js';
import { initTresEnRaya, resetTresEnRaya, initPuzzle, resetPuzzle, initPiedraPapelTijera } from './game-initializers.js';

// Referencia al elemento DOM del contenedor de juegos
let gameContainerElement;

/**
 * Inicializa el elemento DOM del contenedor de juegos
 * @param {HTMLElement} containerElement - Elemento DOM del contenedor de juegos
 */
export function initGameContainerElement(containerElement) {
    gameContainerElement = containerElement;
}

/**
 * Carga un juego específico en el contenedor
 * @param {string} gameId - ID del juego a cargar
 */
export function loadGame(gameId) {
    // Verificar si ya se inicializó el elemento
    if (!gameContainerElement) {
        console.error('Game container element not initialized');
        return;
    }
    
    // Limpiar el contenedor de juegos
    gameContainerElement.innerHTML = '';
    
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

/**
 * Carga el juego Tres en Raya
 */
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
    gameContainerElement.appendChild(header);
    gameContainerElement.appendChild(main);
    
    // Inicializar el juego
    initTresEnRaya();
}

/**
 * Carga el juego Puzzle de Memoria
 */
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
    gameContainerElement.appendChild(header);
    gameContainerElement.appendChild(main);
    
    // Inicializar el juego
    initPuzzle();
}

/**
 * Carga el juego Piedra, Papel o Tijera
 */
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
    gameContainerElement.appendChild(header);
    gameContainerElement.appendChild(main);
    
    // Inicializar el juego
    initPiedraPapelTijera();
} 