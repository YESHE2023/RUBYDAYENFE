const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const messageContainer = document.getElementById('message-container');
const whatsappButton = document.getElementById('whatsapp-button');

// Carga las imágenes
const dinosaurImg = new Image();
dinosaurImg.src = 'dinosaur.png'; // Asegúrate de tener esta imagen en el mismo directorio

const goalImg = new Image();
goalImg.src = 'goal.png'; // Opcional: si quieres una imagen para la meta

// Configuración del jugador (dinosaurio)
const player = {
    x: 50,
    y: canvas.height - 50,
    width: 40,
    height: 40,
    speed: 5,
    velocityY: 0,
    gravity: 0.5,
    jumping: false
};

// Configuración de la meta
const goal = {
    x: canvas.width - 100,
    y: canvas.height - 50,
    width: 50,
    height: 50
};

// Variables para el movimiento
let rightPressed = false;
let leftPressed = false;

// Event listeners para las teclas
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    } else if (e.key === ' ' || e.key === 'Spacebar') {
        if (!player.jumping) {
            player.velocityY = -10;
            player.jumping = true;
        }
    }
}

function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
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
    ctx.drawImage(dinosaurImg, player.x, player.y - player.height, player.width, player.height);
}

function drawGoal() {
    ctx.fillStyle = 'green';
    ctx.fillRect(goal.x, goal.y - goal.height, goal.width, goal.height);
    // Opcional: si tienes una imagen para la meta
    // ctx.drawImage(goalImg, goal.x, goal.y - goal.height, goal.width, goal.height);
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Movimiento horizontal
    if (rightPressed) {
        player.x += player.speed;
        if (player.x + player.width > canvas.width) {
            player.x = canvas.width - player.width;
        }
    } else if (leftPressed) {
        player.x -= player.speed;
        if (player.x < 0) {
            player.x = 0;
        }
    }

    // Salto y gravedad
    player.velocityY += player.gravity;
    player.y += player.velocityY;

    // Colisión con el suelo
    if (player.y > canvas.height) {
        player.y = canvas.height;
        player.velocityY = 0;
        player.jumping = false;
    }

    drawGoal();
    drawPlayer();

    // Detección de colisión con la meta
    if (collisionDetection(player, goal)) {
        messageContainer.style.display = 'block';
        whatsappButton.addEventListener('click', () => {
            const phoneNumber = 'TU_NUMERO_DE_TELEFONO'; // Reemplaza con tu número
            const message = encodeURIComponent('¡Llegué a la meta! Te extraño mucho y quiero que todo esté bien pronto. ❤️');
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
    update(); // Si no hay imagen de meta, iniciar directamente
}
