const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const messageContainer = document.getElementById('message-container');
const whatsappButton = document.getElementById('whatsapp-button');

// Ajusta el tamaño del canvas para móviles
canvas.width = 400;
canvas.height = 600;

// Carga las imágenes
const dinosaurImg = new Image();
dinosaurImg.src = 'dinosaur.png'; // Asegúrate de tener esta imagen

const goalImg = new Image();
goalImg.src = 'goal.png'; // Opcional

// Configuración del jugador (dinosaurio)
const player = {
    width: 60,
    height: 60,
    speed: 5,
    lane: 1, // 0: izquierda, 1: centro, 2: derecha
    y: canvas.height - 100,
    velocityY: 0,
    gravity: 1,
    isJumping: false,
    jumpForce: -15
};
player.x = canvas.width / 2 - player.width / 2; // Inicialmente en el carril central

// Configuración de los carriles
const lanes = [canvas.width / 4 - player.width / 2, canvas.width / 2 - player.width / 2, canvas.width * 3 / 4 - player.width / 2];

// Configuración de la meta
const goal = {
    width: 80,
    height: 80,
    x: canvas.width / 2 - 40, // Inicialmente en el carril central
    y: -200 // Aparecerá desde arriba
};
const goalSpeed = 2;

// Variables para el movimiento táctil
let touchStartX = null;
let touchStartY = null;

// Event listeners para controles táctiles
canvas.addEventListener('touchstart', handleTouchStart);
canvas.addEventListener('touchmove', handleTouchMove);
canvas.addEventListener('touchend', handleTouchEnd);

function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
}

function handleTouchMove(event) {
    if (!touchStartX || !touchStartY) {
        return;
    }

    const touchEndX = event.touches[0].clientX;
    const touchEndY = event.touches[0].clientY;

    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Movimiento horizontal (cambio de carril)
        if (deltaX > 50) {
            // Swipe derecho
            player.lane = Math.min(player.lane + 1, 2);
        } else if (deltaX < -50) {
            // Swipe izquierdo
            player.lane = Math.max(player.lane - 1, 0);
        }
    } else {
        // Movimiento vertical (salto)
        if (deltaY < -50 && !player.isJumping) {
            player.velocityY = player.jumpForce;
            player.isJumping = true;
        }
    }

    touchStartX = null;
    touchStartY = null;
}

function handleTouchEnd() {
    touchStartX = null;
    touchStartY = null;
}

function collisionDetection(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

function drawPlayer() {
    ctx.drawImage(dinosaurImg, lanes[player.lane], player.y - player.height, player.width, player.height);
}

function drawGoal() {
    ctx.fillStyle = 'green';
    ctx.fillRect(goal.x, goal.y, goal.width, goal.height);
    // Opcional: ctx.drawImage(goalImg, goal.x, goal.y, goal.width, goal.height);
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Actualizar la posición horizontal del jugador según el carril
    player.x = lanes[player.lane];

    // Salto y gravedad
    player.velocityY += player.gravity;
    player.y += player.velocityY;

    // Colisión con el suelo
    if (player.y > canvas.height) {
        player.y = canvas.height;
        player.velocityY = 0;
        player.isJumping = false;
    }

    // Movimiento de la meta hacia abajo
    goal.y += goalSpeed;
    if (goal.y > canvas.height + goal.height) {
        goal.y = -200; // Resetear la posición de la meta
        goal.x = lanes[Math.floor(Math.random() * lanes.length)]; // Cambiar de carril aleatoriamente
    }

    drawGoal();
    drawPlayer();

    // Detección de colisión con la meta
    if (collisionDetection(player, goal)) {
        messageContainer.style.display = 'block';
        whatsappButton.addEventListener('click', () => {
            const phoneNumber = '52906464923'; // Reemplaza con tu número
            const message = encodeURIComponent('¡Te alcancé! Te extraño mucho y quiero que todo esté bien pronto. ❤️');
            window.location.href = `https://wa.me/${phoneNumber}?text=${message}`;
        });
        return; // Detener el juego
    }

    requestAnimationFrame(update);
}

// Iniciar el juego cuando la imagen del dinosaurio esté cargada
dinosaurImg.onload = update;
if (goalImg.src) {
    goalImg.onload = update;
} else {
    update();
}
