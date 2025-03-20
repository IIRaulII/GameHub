import { appState } from './state.js';
import { loadMainMenu } from './menu.js';
import { loadGame } from './game-loader.js';

// Referencias a elementos DOM
let splashScreen;
let mainMenu;
let gameContainer;

/**
 * Inicializa las referencias DOM para la navegación
 * @param {HTMLElement} splash - Elemento de pantalla de splash
 * @param {HTMLElement} menu - Elemento de menú principal
 * @param {HTMLElement} game - Elemento contenedor de juegos
 */
export function initNavigationElements(splash, menu, game) {
    splashScreen = splash;
    mainMenu = menu;
    gameContainer = game;
    
    // Inicializar elementos en otros módulos
    import('./menu.js').then(menuModule => {
        if (typeof menuModule.initMenuElement === 'function') {
            menuModule.initMenuElement(menu);
        }
    });
    
    import('./game-loader.js').then(gameLoaderModule => {
        if (typeof gameLoaderModule.initGameContainerElement === 'function') {
            gameLoaderModule.initGameContainerElement(game);
        }
    });
}

/**
 * Función para navegar entre vistas
 * @param {string} route - Ruta a la que navegar
 * @param {string} gameId - ID del juego (opcional)
 */
export function navigateTo(route, gameId = null) {
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

/**
 * Función para cargar los estilos específicos de un juego
 * @param {string} gameId - ID del juego
 */
export function loadGameStyles(gameId) {
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

/**
 * Función para eliminar los estilos específicos de juegos
 */
export function removeGameStyles() {
    const gameStyles = document.querySelectorAll('.game-specific-styles');
    gameStyles.forEach(style => {
        style.remove();
    });
} 