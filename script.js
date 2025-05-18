const heartContainer = document.getElementById('heart-container');
const numberOfHearts = 50; // Ajusta la cantidad de corazones que quieras

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️'; // El emoji de corazón
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.top = `${Math.random() * 100}%`;
    heart.style.fontSize = `${Math.random() * 2 + 1}em`; // Tamaños variados
    heart.style.animationDelay = `${Math.random() * 5}s`; // Retrasos variados para la animación
    heartContainer.appendChild(heart);
}

for (let i = 0; i < numberOfHearts; i++) {
    createHeart();
}
