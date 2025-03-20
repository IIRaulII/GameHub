// Variables globales
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let totalPairs = 4; // 
let timer = null;
let seconds = 0;
let timerStarted = false; // Variable para controlar si el temporizador ha sido iniciado
let bestTime = '--:--'; // Inicializar con valor por defecto

// Verificar que localStorage funciona
function checkLocalStorage() {
    try {
        const testKey = 'puzzleStorageTest';
        localStorage.setItem(testKey, 'test');
        const testValue = localStorage.getItem(testKey);
        localStorage.removeItem(testKey);
        
        return testValue === 'test';
    } catch (error) {
        return false;
    }
}

// Cargar el mejor tiempo desde localStorage
function loadBestTime() {
    // Verificar que localStorage funciona
    if (!checkLocalStorage()) {
        return;
    }
    
    try {
        const savedBestTime = localStorage.getItem('puzzleBestTime');
        if (savedBestTime && savedBestTime !== 'undefined' && savedBestTime !== 'null') {
            bestTime = savedBestTime;
        } else {
            localStorage.removeItem('puzzleBestTime'); // Limpiar si hay un valor inválido
        }
    } catch (error) {
        // Manejar el error silenciosamente
    }
    
    // Actualizar la visualización del mejor tiempo
    const bestTimeElement = document.getElementById('best-time');
    if (bestTimeElement) {
        bestTimeElement.textContent = `Mejor Tiempo: ${bestTime}`;
    }
}

// Imágenes para las cartas 
const cardImages = [
    { name: 'diamante', src: 'public/diam.webp' },
    { name: 'corazón', src: 'public/cor.webp' },
    { name: 'trébol', src: 'public/tre.webp' },
    { name: 'pica', src: 'public/pic.webp' },
    { name: 'diamante', src: 'public/diam.webp' },
    { name: 'corazón', src: 'public/cor.webp' },
    { name: 'trébol', src: 'public/tre.webp' },
    { name: 'pica', src: 'public/pic.webp' }
];

// Función para inicializar el juego
function initializePuzzle() {
    // Cargar el mejor tiempo
    loadBestTime();
    
    // Ocultar mensaje de victoria si está visible
    const victoryMessage = document.getElementById('victory-message');
    victoryMessage.classList.add('hidden');
    
    // Inicializar variables
    cards = [];
    flippedCards = [];
    matchedPairs = 0;
    seconds = 0;
    timerStarted = false; // Reiniciar el estado del temporizador
    
    // Detener el temporizador si está en marcha
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
    
    // Actualizar el display del temporizador a 0:00
    document.getElementById('timer').textContent = 'Tiempo: 0:00';
    
    // Crear las cartas
    createCards();
}

// Función para crear las cartas
function createCards() {
    const puzzleContainer = document.getElementById('puzzle-container');
    puzzleContainer.innerHTML = '';
    
    // Mezclar las cartas
    const shuffledCards = [...cardImages].sort(() => Math.random() - 0.5);
    
    // Crear las cartas en el DOM
    shuffledCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.cardName = card.name;
        cardElement.dataset.index = index;
        
        // Crear la parte frontal de la carta (imagen)
        const frontFace = document.createElement('img');
        frontFace.src = card.src;
        frontFace.alt = card.name;
        frontFace.classList.add('hidden'); // Asegurar que la imagen está oculta
        
        // Crear el signo de interrogación para el reverso
        const questionMark = document.createElement('img');
        questionMark.src = 'public/answ.webp';
        questionMark.alt = '?';
        questionMark.classList.add('question-mark');
        
        // Añadir la carta al contenedor
        cardElement.appendChild(frontFace);
        cardElement.appendChild(questionMark);
        puzzleContainer.appendChild(cardElement);
        
        // Añadir evento de clic
        cardElement.addEventListener('click', () => flipCard(cardElement, index));
        
        // Añadir la carta al array de cartas
        cards.push({
            element: cardElement,
            name: card.name,
            matched: false
        });
    });
}

// Función para voltear una carta
function flipCard(cardElement, index) {
    // Si ya hay dos cartas volteadas o la carta ya está volteada o emparejada, no hacer nada
    if (flippedCards.length >= 2 || cards[index].matched || flippedCards.includes(index)) {
        return;
    }
    
    // Iniciar el temporizador si es la primera carta que se voltea
    if (!timerStarted) {
        startTimer();
        timerStarted = true;
    }
    
    // Mostrar la imagen de la carta y ocultar el signo de interrogación
    const image = cardElement.querySelector('img:not(.question-mark)');
    const questionMark = cardElement.querySelector('.question-mark');
    
    image.classList.remove('hidden');
    questionMark.classList.add('hidden');
    cardElement.classList.add('flipped'); 
    
    // Añadir la carta a las cartas volteadas
    flippedCards.push(index);
    
    // Si hay dos cartas volteadas, comprobar si son iguales
    if (flippedCards.length === 2) {
        const [index1, index2] = flippedCards;
        
        if (cards[index1].name === cards[index2].name) {
            // Las cartas son iguales
            cards[index1].matched = true;
            cards[index2].matched = true;
            
            // Añadir clase para cartas emparejadas
            cards[index1].element.classList.add('matched');
            cards[index1].element.classList.remove('flipped');
            cards[index2].element.classList.remove('flipped');
            cards[index2].element.classList.add('matched');
            
            flippedCards = [];
            matchedPairs++;
            
            // Comprobar si se han encontrado todas las parejas
            if (matchedPairs === totalPairs) {
                endGame();
            }
        } else {
            // Las cartas no son iguales, voltearlas de nuevo después de un tiempo
            setTimeout(() => {
                const card1 = cards[index1].element;
                const card2 = cards[index2].element;
                
                // Ocultar las imágenes y mostrar los signos de interrogación
                card1.querySelector('img:not(.question-mark)').classList.add('hidden');
                card2.querySelector('img:not(.question-mark)').classList.add('hidden');
                card1.querySelector('.question-mark').classList.remove('hidden');
                card2.querySelector('.question-mark').classList.remove('hidden');
                
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                
                flippedCards = [];
            }, 1000);
        }
    }
}

// Función para iniciar el temporizador
function startTimer() {
    // Detener el temporizador si ya está en marcha
    if (timer) {
        clearInterval(timer);
    }
    
    // Iniciar el temporizador
    seconds = 0;
    updateTimer();
    timer = setInterval(updateTimer, 1000);
}

// Función para actualizar el temporizador
function updateTimer() {
    seconds++;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    document.getElementById('timer').textContent = `Tiempo: ${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Función para finalizar el juego
function endGame() {
    // Detener el temporizador
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
    
    // Mostrar mensaje de victoria
    const victoryMessage = document.getElementById('victory-message');
    victoryMessage.textContent = `¡Felicidades! Has completado el puzzle en ${formatTime(seconds)}`;
    victoryMessage.classList.remove('hidden');
    
    // Actualizar el mejor tiempo
    updateBestTime();
}

// Función para actualizar el mejor tiempo
function updateBestTime() {
    // Verificar que localStorage funciona
    if (!checkLocalStorage()) {
        return;
    }
    
    try {
        const currentBestTime = localStorage.getItem('puzzleBestTime');
        const currentTimeInSeconds = seconds;
        
        // Verificar si el tiempo actual es mejor que el mejor tiempo guardado
        if (currentBestTime === '--:--' || currentBestTime === null || currentBestTime === undefined || 
            currentTimeInSeconds < parseBestTime(currentBestTime)) {
            
            const formattedTime = formatTime(currentTimeInSeconds);
            
            // Guardar en localStorage
            localStorage.setItem('puzzleBestTime', formattedTime);
            bestTime = formattedTime;
            
            // Actualizar la visualización
            document.getElementById('best-time').textContent = `Mejor Tiempo: ${formattedTime}`;
        }
    } catch (error) {
        // Manejar el error silenciosamente
    }
}

// Función para formatear el tiempo
function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Función para parsear el mejor tiempo
function parseBestTime(timeString) {
    if (!timeString || timeString === '--:--' || timeString === 'undefined' || timeString === 'null') {
        return Infinity;
    }
    
    try {
        const [minutes, seconds] = timeString.split(':').map(Number);
        return minutes * 60 + seconds;
    } catch (error) {
        return Infinity;
    }
}

// Función para resetear el juego (llamada desde app.js)
function resetPuzzleGame() {
    initializePuzzle();
}

// Exponer las funciones como variables globales para mantener compatibilidad
window.initializePuzzle = initializePuzzle;
window.resetPuzzleGame = resetPuzzleGame; 