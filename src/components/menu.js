import { navigateTo } from './navigation.js';

// Referencia al elemento DOM del menú
let mainMenuElement;

/**
 * Inicializa el elemento DOM del menú
 * @param {HTMLElement} menuElement - Elemento DOM del menú principal
 */
export function initMenuElement(menuElement) {
    mainMenuElement = menuElement;
}

/**
 * Función para cargar el menú principal
 */
export function loadMainMenu() {
    // Verificar si ya se inicializó el elemento
    if (!mainMenuElement) {
        console.error('Menu element not initialized');
        return;
    }
    
    // Limpiar el contenedor del menú
    mainMenuElement.innerHTML = '';
    
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
    mainMenuElement.appendChild(header);
    mainMenuElement.appendChild(main);
} 