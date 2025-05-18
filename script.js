const startDate = new Date('2022/04/29 00:00:00');
const yearsSpan = document.getElementById('years');
const monthsSpan = document.getElementById('months');
const daysSpan = document.getElementById('days');
const hoursSpan = document.getElementById('hours');
const minutesSpan = document.getElementById('minutes');
const secondsSpan = document.getElementById('seconds');
const fallingHeartsContainer = document.getElementById('falling-hearts');
const yesButton = document.getElementById('yes-button');
const noButton = document.getElementById('no-button');
const responseText = document.getElementById('response');

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
    const heart = document.createElement('div');
    heart.classList.add('falling-heart');
    heart.innerHTML = '💖';
    const randomX = Math.random() * 100;
    heart.style.setProperty('--random-x', `${randomX}vw`);
    heart.style.left = `${randomX}vw`;
    heart.style.animationDuration = `${Math.random() * 3 + 2}s`;
    heart.style.animationDelay = `${Math.random() * 2}s`;
    fallingHeartsContainer.appendChild(heart);

    heart.addEventListener('animationiteration', () => {
        heart.remove();
    });
}

function moveYesButton() {
    const maxX = window.innerWidth - yesButton.offsetWidth;
    const maxY = window.innerHeight - yesButton.offsetHeight;
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    yesButton.style.position = 'absolute';
    yesButton.style.left = `${newX}px`;
    yesButton.style.top = `${newY}px`;
}

yesButton.addEventListener('mouseover', moveYesButton); // Para PC
yesButton.addEventListener('touchstart', moveYesButton); // Para táctil

yesButton.addEventListener('click', () => {
    const phoneNumber = '51906464923'; // Reemplaza con tu número
    const message = encodeURIComponent('¡Sí! Quiero que todo esté bien cuanto antes. Te extraño mucho. ❤️');
    window.location.href = `https://wa.me/${phoneNumber}?text=${message}`;
});

noButton.addEventListener('click', () => {
    responseText.textContent = '😔';
    responseText.style.display = 'block';
});

setInterval(updateTimer, 1000);
setInterval(createFallingHeart, 200); // Más corazones cayendo
updateTimer(); // Llamada inicial
