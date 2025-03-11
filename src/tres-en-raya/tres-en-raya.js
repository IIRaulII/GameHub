document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('tres-en-raya-container');
    const board = Array(9).fill(null);
    let currentPlayer = 'X';

    const createBoard = () => {
        container.innerHTML = '';
        board.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.dataset.index = index;
            cellElement.addEventListener('click', handleCellClick);
            container.appendChild(cellElement);
        });
    };

    const checkWinner = () => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
            [0, 4, 8], [2, 4, 6]            // Diagonales
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    };

    const updateScore = (winner) => {
        const scoreKey = `${winner}-score`;
        const currentScore = parseInt(localStorage.getItem(scoreKey) || '0', 10);
        localStorage.setItem(scoreKey, currentScore + 1);
        displayScores();
    };

    const displayScores = () => {
        const xScore = localStorage.getItem('X-score') || 0;
        const oScore = localStorage.getItem('O-score') || 0;
        document.getElementById('scoreboard').textContent = `Player 1: ${xScore} - Player 2: ${oScore}`;
    };

    const showVictoryMessage = (winner) => {
        const winnerMessage = winner === 'X' ? '¡Player 1 ha ganado!' : '¡Player 2 ha ganado!';
        document.getElementById('victory-message').innerText = winnerMessage;
        document.getElementById('victory-message').style.display = 'block';
    };

    const handleCellClick = (event) => {
        const index = event.target.dataset.index;
        if (!board[index]) {
            board[index] = currentPlayer;
            const img = document.createElement('img');
            img.src = currentPlayer === 'X' ? '/public/x.png' : '/public/o.png';
            img.alt = currentPlayer;
            img.style.width = '100%';
            img.style.height = '100%';
            event.target.appendChild(img);
            const winner = checkWinner();
            if (winner) {
                showVictoryMessage(winner);
                updateScore(winner);
                document.querySelectorAll('.cell').forEach(cell => {
                    cell.removeEventListener('click', handleCellClick);
                });
                return;
            }
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    };

    document.getElementById('start-x').addEventListener('click', () => {
        currentPlayer = 'X';
        resetGame();
    });

    document.getElementById('start-o').addEventListener('click', () => {
        currentPlayer = 'O';
        resetGame();
    });

    const resetGame = () => {
        board.fill(null);
        createBoard();
        document.querySelectorAll('.cell').forEach(cell => {
            cell.addEventListener('click', handleCellClick);
        });
        document.getElementById('victory-message').style.display = 'none';
    };

    document.getElementById('reset-score').addEventListener('click', () => {
        localStorage.setItem('X-score', '0');
        localStorage.setItem('O-score', '0');
        displayScores();
    });

    createBoard();
    displayScores();
}); 