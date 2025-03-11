let count = 3;
const countdownElement = document.getElementById('countdown');

function updateCountdown() {
    countdownElement.textContent = count;
    
    if (count === 0) {
        window.location.href = 'src/index.html';
    } else {
        count--;
        setTimeout(updateCountdown, 1000);
    }
}

// Iniciar la cuenta regresiva cuando la página esté completamente cargada
document.addEventListener('DOMContentLoaded', () => {
    updateCountdown();
}); 