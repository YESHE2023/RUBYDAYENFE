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
    y: -200, // Aparecerá desde arriba
    speed: 2
};

// Configuración de los obstáculos
const obstacles = [];
const obstacleSpeed = 3;
const obstacleSpawnRate = 60; // Generar un obstáculo cada 60 frames (aproximadamente 1 segundo)
let frameCount = 0;

function createObstacle() {
    const obstacleWidth = 40;
    const obstacleHeight = 40;
    const randomLane = Math.floor(Math.random() * lanes.length);
    const obstacleX = lanes[randomLane];
    const obstacleY = -obstacleHeight;
    obstacles.push({ x: obstacleX, y: obstacleY, width: obstacleWidth, height: obstacleHeight });
}

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

    const sensitivity = 20; // Ajusta la sensibilidad del swipe

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Movimiento horizontal (cambio de carril)
        if (deltaX > sensitivity) {
            // Swipe derecho
            player.lane = Math.min(player.lane + 1, 2);
            touchStartX = null; // Reset para evitar movimientos continuos
        } else if (deltaX < -sensitivity) {
            // Swipe izquierdo
            player.lane = Math.max(player.lane - 1, 0);
            touchStartX = null; // Reset
        }
    } else {
        // Movimiento vertical (salto)
        if (deltaY < -sensitivity && !player.isJumping) {
            player.velocityY = player.jumpForce;
            player.isJumping = true;
            touchStartY = null; // Reset
        }
    }
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

function drawObstacle(obstacle) {
    ctx.fillStyle = 'red';
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
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
    goal.y += goal.speed;
    if (goal.y
