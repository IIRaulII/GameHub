document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('puzzle-container');
    const cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D']; 
    let firstCard = null;
    let secondCard = null;
    let attempts = 0;
    let matchedPairs = 0;
    let startTime = null;
    let timerInterval = null;

    const cardImages = {
        'A': '/public/cor.webp',  
        'B': '/public/diam.webp',  
        'C': '/public/pic.webp',  
        'D': '/public/tre.webp'  
    };

    const shuffleCards = () => {
        cards.sort(() => Math.random() - 0.5);
    };

    const createBoard = () => {
        container.innerHTML = '';
        cards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.value = card;
            cardElement.dataset.index = index;
            cardElement.addEventListener('click', handleCardClick);
            container.appendChild(cardElement);
        });
    };

    const formatTime = (milliseconds) => {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const updateTimer = () => {
        if (!startTime) return;
        const currentTime = Date.now() - startTime;
        document.getElementById('timer').textContent = `Tiempo: ${formatTime(currentTime)}`;
    };

    const startTimer = () => {
        if (!startTime) {
            startTime = Date.now();
            timerInterval = setInterval(updateTimer, 100);
        }
    };

    const stopTimer = () => {
        if (timerInterval) {
            clearInterval(timerInterval);
            const finalTime = Date.now() - startTime;
            const bestTime = localStorage.getItem('best-time');
            if (!bestTime || finalTime < parseInt(bestTime)) {
                localStorage.setItem('best-time', finalTime.toString());
                displayBestTime();
            }
        }
    };

    const displayBestTime = () => {
        const bestTime = localStorage.getItem('best-time');
        document.getElementById('best-time').textContent = bestTime 
            ? `Mejor Tiempo: ${formatTime(parseInt(bestTime))}` 
            : 'Mejor Tiempo: --:--';
    };

    const resetGame = () => {
        attempts = 0;
        matchedPairs = 0;
        startTime = null;
        if (timerInterval) {
            clearInterval(timerInterval);
        }
        document.getElementById('timer').textContent = 'Tiempo: 0:00';
        shuffleCards();
        createBoard();
        document.getElementById('victory-message').style.display = 'none';
    };

    const showVictoryMessage = () => {
        stopTimer();
        const finalTime = Date.now() - startTime;
        const messageElement = document.getElementById('victory-message');
        messageElement.textContent = `¡Has ganado! Tiempo: ${formatTime(finalTime)}`;
        messageElement.style.display = 'block';
        setTimeout(resetGame, 5000);
    };

    const handleCardClick = (event) => {
        startTimer(); // Iniciar el temporizador en el primer clic
        const clickedCard = event.target;
        if (!firstCard) {
            firstCard = clickedCard;
            const img = document.createElement('img');
            img.src = cardImages[firstCard.dataset.value]; 
            img.alt = firstCard.dataset.value;
            img.style.width = '100%';
            img.style.height = '100%';
            firstCard.appendChild(img);
        } else if (!secondCard && clickedCard !== firstCard) {
            secondCard = clickedCard;
            const img = document.createElement('img');
            img.src = cardImages[secondCard.dataset.value]; 
            img.style.width = '100%';
            img.style.height = '100%';
            secondCard.appendChild(img);
            attempts++;
            checkForMatch();
        }
    };

    const checkForMatch = () => {
        if (firstCard.dataset.value === secondCard.dataset.value) {
            matchedPairs++;
            firstCard = null;
            secondCard = null;
            if (matchedPairs === cards.length / 2) {
                showVictoryMessage();
            }
        } else {
            setTimeout(() => {
                firstCard.innerHTML = '';
                secondCard.innerHTML = '';
                firstCard = null;
                secondCard = null;
            }, 1000);
        }
    };

    shuffleCards();
    createBoard();
    displayBestTime();
}); 