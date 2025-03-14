// Variables globales
let playerScore = 0;
let computerScore = 0;

// Variable para almacenar los temporizadores
let resultTimer = null;
let fadeTimer = null;
let resetTimer = null;

// Función para inicializar el juego
function initializePiedraPapelTijera() {
    // Inicializar variables
    playerScore = parseInt(localStorage.getItem('pptPlayerScore') || '0');
    computerScore = parseInt(localStorage.getItem('pptComputerScore') || '0');
    
    // Actualizar el marcador
    updateScoreboard();
}

// Función para jugar
function play(playerChoice) {
    // Limpiar temporizadores pendientes
    if (resultTimer) clearTimeout(resultTimer);
    if (fadeTimer) clearTimeout(fadeTimer);
    if (resetTimer) clearTimeout(resetTimer);
    
    // Opciones del juego
    const choices = ['piedra', 'papel', 'tijera'];
    
    // Limpiar el resultado anterior
    document.getElementById('result').textContent = '';
    
    // Elección aleatoria de la computadora
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    
    // Mostrar la elección de la computadora con animación
    showComputerChoice(computerChoice);
    
    // Esperar a que termine la animación antes de mostrar el resultado
    resultTimer = setTimeout(() => {
        // Determinar el ganador
        const result = determineWinner(playerChoice, computerChoice);
        
        // Actualizar el marcador
        updateScore(result);
        
        // Mostrar el resultado
        showResult(result, playerChoice, computerChoice);
    }, 10 * 150 + 100); // Tiempo total de la animación + un pequeño margen
}

// Función para mostrar la elección de la computadora
function showComputerChoice(choice) {
    const computerImg = document.getElementById('computer-img');
    const computerChoice = document.getElementById('computer-choice');
    const choices = ['piedra', 'papel', 'tijera'];
    let counter = 0;
    const maxIterations = 10; // Número de cambios aleatorios antes de mostrar la elección final
    
    // Añadir clase para la animación de sacudida
    computerChoice.classList.add('animating');
    
    // Desactivar los botones durante la animación
    const buttons = document.querySelectorAll('.game-button');
    buttons.forEach(button => {
        button.disabled = true;
        button.style.opacity = '0.7';
        button.style.cursor = 'not-allowed';
    });
    
    // Función para mostrar una opción aleatoria
    function showRandomChoice() {
        if (counter < maxIterations) {
            // Mostrar una opción aleatoria
            const randomChoice = choices[Math.floor(Math.random() * choices.length)];
            computerImg.src = `public/${randomChoice}.webp`;
            computerImg.alt = randomChoice;
            
            // Incrementar el contador
            counter++;
            
            // Llamar a la función de nuevo después de un tiempo
            setTimeout(showRandomChoice, 150);
        } else {
            // Mostrar la elección final
            computerImg.src = `public/${choice}.webp`;
            computerImg.alt = choice;
            
            // Quitar la clase de animación
            computerChoice.classList.remove('animating');
            
            // Reactivar los botones
            buttons.forEach(button => {
                button.disabled = false;
                button.style.opacity = '1';
                button.style.cursor = 'pointer';
            });
        }
    }
    
    // Iniciar la animación
    showRandomChoice();
}

// Función para determinar el ganador
function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'empate';
    }
    
    if (
        (playerChoice === 'piedra' && computerChoice === 'tijera') ||
        (playerChoice === 'papel' && computerChoice === 'piedra') ||
        (playerChoice === 'tijera' && computerChoice === 'papel')
    ) {
        return 'jugador';
    }
    
    return 'computadora';
}

// Función para actualizar el marcador
function updateScore(result) {
    if (result === 'jugador') {
        playerScore++;
    } else if (result === 'computadora') {
        computerScore++;
    }
    
    // Guardar el marcador en localStorage
    localStorage.setItem('pptPlayerScore', playerScore.toString());
    localStorage.setItem('pptComputerScore', computerScore.toString());
    
    // Actualizar el marcador en la interfaz
    updateScoreboard();
}

// Función para actualizar el marcador en la interfaz
function updateScoreboard() {
    const scoreboard = document.getElementById('scoreboard');
    scoreboard.textContent = `Jugador: ${playerScore} - Computadora: ${computerScore}`;
}

// Función para mostrar el resultado
function showResult(result, playerChoice, computerChoice) {
    const resultElement = document.getElementById('result');
    
    if (result === 'empate') {
        resultElement.textContent = `¡Empate! Ambos eligieron ${playerChoice}.`;
    } else if (result === 'jugador') {
        resultElement.textContent = `¡Ganaste! ${playerChoice} vence a ${computerChoice}.`;
    } else {
        resultElement.textContent = `¡Perdiste! ${computerChoice} vence a ${playerChoice}.`;
    }
    
    // Después de 2 segundos, reiniciar la imagen de la computadora con efecto de desvanecimiento
    fadeTimer = setTimeout(() => {
        const computerImg = document.getElementById('computer-img');
        
        // Añadir clase para el efecto de desvanecimiento
        computerImg.classList.add('fading');
        
        // Después de completar la transición, cambiar la imagen y quitar la clase
        resetTimer = setTimeout(() => {
            computerImg.src = 'public/answ.webp';
            computerImg.alt = '?';
            
            // Quitar la clase después de un breve retraso para permitir que se vea la nueva imagen
            setTimeout(() => {
                computerImg.classList.remove('fading');
            }, 50);
        }, 300); // Tiempo de la transición de opacidad
    }, 2000);
}

// Función para resetear el marcador
function resetScore() {
    // Limpiar temporizadores pendientes
    if (resultTimer) clearTimeout(resultTimer);
    if (fadeTimer) clearTimeout(fadeTimer);
    if (resetTimer) clearTimeout(resetTimer);
    
    playerScore = 0;
    computerScore = 0;
    
    // Guardar el marcador en localStorage
    localStorage.setItem('pptPlayerScore', '0');
    localStorage.setItem('pptComputerScore', '0');
    
    // Actualizar el marcador en la interfaz
    updateScoreboard();
    
    // Limpiar el resultado
    document.getElementById('result').textContent = '';
    
    // Resetear la imagen de la computadora
    const computerImg = document.getElementById('computer-img');
    computerImg.classList.remove('fading'); // Asegurarse de que no tenga la clase de desvanecimiento
    computerImg.src = 'public/answ.webp';
    computerImg.alt = '?';
}