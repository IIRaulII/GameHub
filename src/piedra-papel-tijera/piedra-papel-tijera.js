let playerScore = 0;
let computerScore = 0;

// Opciones disponibles
const options = ['piedra', 'papel', 'tijera'];
const optionImages = {
    'piedra': '/public/piedra.webp',
    'papel': '/public/papel.webp',
    'tijera': '/public/tijera.webp'
};

function play(playerChoice) {
    // Desactivar botones durante la animación
    const buttons = document.querySelectorAll('.game-button');
    buttons.forEach(button => button.disabled = true);
    
    // Limpiar resultado anterior
    document.getElementById('result').textContent = 'Eligiendo...';
    
    // Iniciar animación de selección aleatoria
    const computerImg = document.getElementById('computer-img');
    let animationCount = 0;
    const animationDuration = 3000; // 3 segundos
    const intervalTime = 100; // Cambiar imagen cada 100ms
    const totalFrames = animationDuration / intervalTime;
    
    const animationInterval = setInterval(() => {
        // Seleccionar una opción aleatoria para la animación
        const randomOption = options[Math.floor(Math.random() * options.length)];
        computerImg.src = optionImages[randomOption];
        computerImg.alt = randomOption;
        
        animationCount++;
        
        // Detener la animación después de 3 segundos
        if (animationCount >= totalFrames) {
            clearInterval(animationInterval);
            
            // Seleccionar la opción final de la computadora
            const computerChoice = getComputerChoice();
            computerImg.src = optionImages[computerChoice];
            computerImg.alt = computerChoice;
            
            // Determinar el ganador
            const result = determineWinner(playerChoice, computerChoice);
            updateScore(result);
            displayResult(playerChoice, computerChoice, result);
            
            // Reactivar botones
            buttons.forEach(button => button.disabled = false);
        }
    }, intervalTime);
}

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}

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

function updateScore(result) {
    if (result === 'jugador') {
        playerScore++;
    } else if (result === 'computadora') {
        computerScore++;
    }
    
    document.getElementById('scoreboard').textContent = `Jugador: ${playerScore} - Computadora: ${computerScore}`;
}

function displayResult(playerChoice, computerChoice, result) {
    let message = '';
    
    if (result === 'empate') {
        message = '¡Empate!';
    } else if (result === 'jugador') {
        message = `¡Ganaste! ${playerChoice} vence a ${computerChoice}`;
    } else {
        message = `¡Perdiste! ${computerChoice} vence a ${playerChoice}`;
    }
    
    document.getElementById('result').textContent = message;
}

function resetScore() {
    playerScore = 0;
    computerScore = 0;
    document.getElementById('scoreboard').textContent = 'Jugador: 0 - Computadora: 0';
    document.getElementById('result').textContent = '';
    document.getElementById('computer-img').src = '/game-hub/public/answ.webp';
    document.getElementById('computer-img').alt = '?';
}