const startDate = new Date('2022/04/29 00:00:00');
const yearsSpan = document.getElementById('years');
const monthsSpan = document.getElementById('months');
const daysSpan = document.getElementById('days');
const hoursSpan = document.getElementById('hours');
const minutesSpan = document.getElementById('minutes');
const secondsSpan = document.getElementById('seconds');
const fallingHeartsContainer = document.getElementById('falling-hearts');
const fillingHearts = document.getElementById('filling-hearts');
const whatsappButton = document.getElementById('whatsapp-button');
const heartShape = document.getElementById('heart-shape');

let heartCount = 0;
const maxHearts = 50; // Ajusta la cantidad para "llenar" el corazón
let fillPercentage = 0;

function updateTimer() {
    const now = new Date();
    const difference = now.getTime() - startDate.getTime();

    const secondsTotal = Math.floor(difference / 1000);
    const minutesTotal = Math.floor(secondsTotal / 60);
    const hoursTotal = Math.floor(minutesTotal / 60);
    const daysTotal = Math.floor(hoursTotal / 24);

    const years = Math.floor(daysTotal / 365.25);
    const remainingDays = Math.floor(daysTotal % 365.25);
    const months = Math.floor(remainingDays / 30.44);
    const days = Math.floor(remainingDays % 30.44);
    const hours = Math.floor(hoursTotal % 24);
    const minutes = Math.floor(minutesTotal % 60);
    const seconds = Math.floor(secondsTotal % 60);

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
        heart.style.animationDuration = `${Math.random() * 2 + 1}s`; // Duración aleatoria
        heart.style.animationDelay = `${Math.random() * 1}s`; // Retraso aleatorio
        fallingHeartsContainer.appendChild(heart);
        heartCount++;

        // Actualizar el porcentaje de llenado del corazón
        fillPercentage = (heartCount / maxHearts) * 100;
        fillingHearts.style.height = `${fillPercentage}%`;

        if (heartCount >= maxHearts) {
            whatsappButton.style.display = 'block';
            whatsappButton.addEventListener('click', () => {
                const phoneNumber = '51906464923'; // Reemplaza con tu número
                const message = encodeURIComponent('¡Mi corazón está completamente lleno de nuestro amor! Te extraño mucho y quiero que todo esté bien pronto. ❤️');
                window.location.href = `https://wa.me/${phoneNumber}?text=${message}`;
            });
        }
    }
}

setInterval(updateTimer, 1000); // Actualizar el contador cada segundo
setInterval(createFallingHeart, 300); // Crear corazones cayendo más rápido para llenar el corazón

// Llama a updateTimer una vez al inicio
updateTimer();
