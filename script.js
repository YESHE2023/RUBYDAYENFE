const startDate = new Date('2022-04-29T00:00:00');
const yearsSpan = document.getElementById('years');
const monthsSpan = document.getElementById('months');
const daysSpan = document.getElementById('days');
const hoursSpan = document.getElementById('hours');
const minutesSpan = document.getElementById('minutes');
const secondsSpan = document.getElementById('seconds');
const heartContainer = document.getElementById('heart-container');
const heartCylinder = document.getElementById('heart-cylinder');
const whatsappButton = document.getElementById('whatsapp-button');

let heartCount = 0;
const maxHearts = 50; // Ajusta la cantidad para "llenar" el cilindro

function updateTimer() {
    const now = new Date();
    const difference = now.getTime() - startDate.getTime();

    const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25));
    const months = Math.floor((difference % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
    const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    yearsSpan.textContent = years;
    monthsSpan.textContent = months;
    daysSpan.textContent = days;
    hoursSpan.textContent = hours;
    minutesSpan.textContent = minutes;
    secondsSpan.textContent = seconds;
}

function createFallingHeart() {
    if (heartCount < maxHearts) {
        const heart = document.createElement('div');
        heart.classList.add('falling-heart');
        heart.innerHTML = '💖'; // Un corazón brillante
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${Math.random() * 3 + 2}s`; // Duración aleatoria
        heart.style.animationDelay = `${Math.random() * 2}s`; // Retraso aleatorio
        heartContainer.appendChild(heart);
        heartCount++;

        if (heartCount >= maxHearts) {
            whatsappButton.style.display = 'block';
            whatsappButton.addEventListener('click', () => {
                const phoneNumber = '51906464923'; // Reemplaza con tu número
                const message = encodeURIComponent('¡Nuestro amor ha llenado mi corazón! Te extraño mucho y quiero que todo esté bien pronto. ❤️');
                window.location.href = `https://wa.me/${phoneNumber}?text=${message}`;
            });
        }
    }
}

setInterval(updateTimer, 1000); // Actualizar el contador cada segundo
setInterval(createFallingHeart, 500); // Crear un corazón cayendo cada medio segundo
