// Funciones para crear elementos de interfaz de usuario

/**
 * Crea un botón con icono opcional
 * @param {string} text - Texto del botón
 * @param {string} iconSrc - Ruta al icono (opcional)
 * @param {string} className - Clase CSS
 * @param {function} onClick - Manejador de eventos
 * @returns {HTMLButtonElement} - Elemento botón
 */
export function createButtonWithIcon(text, iconSrc, className, onClick) {
    const button = document.createElement('button');
    button.className = className;
    
    if (iconSrc) {
        const buttonImg = document.createElement('img');
        buttonImg.src = iconSrc;
        buttonImg.alt = text;
        buttonImg.className = 'button-icon';
        button.appendChild(buttonImg);
        button.appendChild(document.createTextNode(` ${text}`));
    } else {
        button.textContent = text;
    }
    
    if (onClick) {
        button.onclick = onClick;
    }
    
    return button;
}

/**
 * Crea un contenedor con botones de control estándar
 * @param {function} homeCallback - Función para el botón volver
 * @param {function} newGameCallback - Función para nueva partida
 * @param {function} resetCallback - Función para resetear marcador
 * @param {string} resetId - ID para el botón de reset
 * @returns {Object} - Objeto con los elementos creados
 */
export function createControlButtons(homeCallback, newGameCallback, resetCallback, resetId) {
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    
    // Botón de volver
    const homeButton = createButtonWithIcon('Volver', 'public/volver.png', 'control-button', homeCallback);
    buttonContainer.appendChild(homeButton);
    
    // Botón de nueva partida
    if (newGameCallback) {
        const newGameButton = createButtonWithIcon('Nueva Partida', null, 'control-button', newGameCallback);
        buttonContainer.appendChild(newGameButton);
    }
    
    // Botón de resetear marcador (opcional)
    if (resetCallback && resetId) {
        const resetScoreButton = createButtonWithIcon('Resetear Marcador', null, 'control-button');
        resetScoreButton.id = resetId;
        resetScoreButton.onclick = resetCallback;
        return { buttonContainer, resetScoreButton };
    }
    
    return { buttonContainer };
} 