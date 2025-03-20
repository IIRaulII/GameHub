import { appState } from './state.js';

/**
 * Crea la estructura inicial de la aplicación
 * @returns {Object} - Objeto con las referencias a los elementos DOM principales
 */
export function createAppStructure() {
    const rootElement = document.getElementById('root');
    
    // Crear el contenedor principal de la aplicación
    const appContainer = document.createElement('div');
    appContainer.id = 'app-container';
    rootElement.appendChild(appContainer);
    
    // Crear la pantalla de splash
    const splashScreen = document.createElement('div');
    splashScreen.id = 'splash-screen';
    splashScreen.className = 'splash-body';
    
    const splashContainer = document.createElement('div');
    splashContainer.className = 'splash-container';
    
    const splashTitle = document.createElement('h1');
    splashTitle.className = 'splash-title';
    splashTitle.textContent = 'Bienvenido a Game Hub';
    
    const countdownElement = document.createElement('div');
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
    const mainMenu = document.createElement('div');
    mainMenu.id = 'main-menu';
    mainMenu.style.display = 'none';
    
    // Crear el contenedor de juegos
    const gameContainer = document.createElement('div');
    gameContainer.id = 'game-container';
    gameContainer.style.display = 'none';
    
    // Añadir todos los elementos al contenedor principal
    appContainer.appendChild(splashScreen);
    appContainer.appendChild(mainMenu);
    appContainer.appendChild(gameContainer);
    
    return {
        rootElement,
        appContainer,
        splashScreen,
        mainMenu,
        gameContainer,
        countdownElement
    };
}

/**
 * Actualiza la cuenta regresiva y navega al menú cuando termina
 * @param {HTMLElement} countdownElement - Elemento DOM del contador
 * @param {Function} navigateToMenu - Función para navegar al menú
 */
export function updateCountdown(countdownElement, navigateToMenu) {
    countdownElement.textContent = appState.countdown;
    
    if (appState.countdown === 0) {
        // Navegar al menú principal cuando la cuenta regresiva llegue a 0
        navigateToMenu();
    } else {
        appState.countdown--;
        setTimeout(() => updateCountdown(countdownElement, navigateToMenu), 1000);
    }
} 