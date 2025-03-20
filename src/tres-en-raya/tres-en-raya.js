// Variables globales
let currentPlayer = 'x';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;
let scores = { x: 0, o: 0 };

// Función para inicializar el juego
function initializeTresEnRaya() {
    // Cargar puntuaciones guardadas
    scores.x = parseInt(localStorage.getItem('tresEnRayaScoreX') || '0');
    scores.o = parseInt(localStorage.getItem('tresEnRayaScoreO') || '0');
    
    // Crear el tablero de juego
    const boardContainer = document.getElementById('tres-en-raya-container');
    boardContainer.innerHTML = '';
    
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', () => handleCellClick(i));
        boardContainer.appendChild(cell);
    }
    
    // Configurar los botones de selección de jugador
    document.getElementById('start-x').addEventListener('click', () => startGame('x'));
    document.getElementById('start-o').addEventListener('click', () => startGame('o'));
    
    // Inicializar el marcador
    updateTresEnRayaScoreboard();
    
    // Iniciar el juego con el jugador X por defecto
    startGame('x');
}

// Función para iniciar el juego
function startGame(player) {
    currentPlayer = player;
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    
    // Limpiar el tablero
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        // No necesitamos limpiar el texto, solo las clases
        cell.classList.remove('x', 'o');
    });
    
    // Ocultar el mensaje de victoria
    const victoryMessage = document.getElementById('victory-message');
    victoryMessage.style.display = 'none';
    
    // Actualizar el marcador
    updateTresEnRayaScoreboard();
}

// Función para manejar el clic en una celda
function handleCellClick(index) {
    if (!gameActive || gameBoard[index] !== '') return;
    
    // Actualizar el tablero
    gameBoard[index] = currentPlayer;
    
    // Actualizar la interfaz
    const cell = document.querySelector(`.cell[data-index="${index}"]`);
    cell.classList.add(currentPlayer);
    
    // Verificar si hay un ganador
    if (checkWinner()) {
        gameActive = false;
        scores[currentPlayer]++;
        
        // Guardar puntuaciones en localStorage
        localStorage.setItem('tresEnRayaScoreX', scores.x.toString());
        localStorage.setItem('tresEnRayaScoreO', scores.o.toString());
        
        updateTresEnRayaScoreboard();
        showVictoryMessage(`¡Jugador ${currentPlayer.toUpperCase()} ha ganado!`);
        return;
    }
    
    // Verificar si hay empate
    if (gameBoard.every(cell => cell !== '')) {
        gameActive = false;
        showVictoryMessage('¡Empate!');
        return;
    }
    
    // Cambiar de jugador
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
}

// Función para verificar si hay un ganador
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
        [0, 4, 8], [2, 4, 6]             // Diagonales
    ];
    
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

// Función para actualizar el marcador
function updateTresEnRayaScoreboard() {
    const scoreboard = document.getElementById('tres-en-raya-scoreboard');
    scoreboard.textContent = `Jugador X: ${scores.x} - Jugador O: ${scores.o}`;
    
    // Guardar puntuaciones en localStorage
    localStorage.setItem('tresEnRayaScoreX', scores.x.toString());
    localStorage.setItem('tresEnRayaScoreO', scores.o.toString());
}

// Función para mostrar el mensaje de victoria
function showVictoryMessage(message) {
    const victoryMessage = document.getElementById('victory-message');
    victoryMessage.textContent = message;
    victoryMessage.style.display = 'block';
}

// Función para resetear el marcador
function resetTresEnRayaScore() {
    scores = { x: 0, o: 0 };
    
    // Limpiar puntuaciones en localStorage
    localStorage.setItem('tresEnRayaScoreX', '0');
    localStorage.setItem('tresEnRayaScoreO', '0');
    
    updateTresEnRayaScoreboard();
    startGame(currentPlayer);
}

// Función para resetear el juego (llamada desde app.js)
function resetTresEnRayaGame() {
    startGame(currentPlayer);
}

// Exponer las funciones como variables globales para mantener compatibilidad
window.initializeTresEnRaya = initializeTresEnRaya;
window.resetTresEnRayaGame = resetTresEnRayaGame;
window.resetTresEnRayaScore = resetTresEnRayaScore; 