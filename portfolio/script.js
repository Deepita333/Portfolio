// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Create floating planets
function createFloatingElements() {
    const mainContent = document.querySelector('.main-content');
    const numberOfPlanets = window.innerWidth > 768 ? 5 : 2;

    for (let i = 0; i < numberOfPlanets; i++) {
        const element = document.createElement('div');
        element.className = 'floating-planet';
        element.style.top = Math.random() * 100 + '%';
        element.style.left = Math.random() * 100 + '%';
        element.style.width = (Math.random() * 50 + 20) + 'px';
        element.style.height = element.style.width;
        element.style.animationDelay = (Math.random() * 5) + 's';
        mainContent.appendChild(element);
    }
}

// Create shooting stars
function createShootingStars() {
    const container = document.getElementById('shooting-stars-container');
    const numberOfStars = 3;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.animationDelay = (Math.random() * 3) + 's';
        container.appendChild(star);
    }
}

// Initialize elements
createFloatingElements();
createShootingStars();

// Recreate shooting stars periodically
setInterval(() => {
    const container = document.getElementById('shooting-stars-container');
    container.innerHTML = '';
    createShootingStars();
}, 6000);

// Reveal sections on scroll
const sections = document.querySelectorAll('.section');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.5s ease forwards';
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const mainContent = document.querySelector('.main-content');
        const planets = document.querySelectorAll('.floating-planet');
        planets.forEach(planet => planet.remove());
        createFloatingElements();
    }, 250);
});