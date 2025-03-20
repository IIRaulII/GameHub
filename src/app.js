// Importar componentes y funciones
import { createAppStructure, updateCountdown } from './components/app-structure.js';
import { initNavigationElements, navigateTo } from './components/navigation.js';

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    // Crear la estructura de la aplicación
    const domElements = createAppStructure();
    
    // Inicializar elementos de navegación
    initNavigationElements(
        domElements.splashScreen, 
        domElements.mainMenu, 
        domElements.gameContainer
    );
    
    // Comenzar con la pantalla de splash y la cuenta regresiva
    navigateTo('splash');
    updateCountdown(domElements.countdownElement, () => navigateTo('menu'));
}); 