// Efeito de Digitação (Typewriter)
const textElement = document.getElementById('typewriter');
const phrases = [
    'Analista de Dados Júnior',
    'Desenvolvedor Python',
    'Especialista em Dashboards',
    'Focado em Automação'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    const speed = isDeleting ? 50 : 100;
    setTimeout(type, speed);
}

// Configuração do Scroll Reveal (Animações ao rolar a página)
ScrollReveal().reveal('.reveal', {
    delay: 200,
    distance: '50px',
    origin: 'bottom',
    duration: 1000,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    interval: 100
});

// Iniciar funções
document.addEventListener('DOMContentLoaded', () => {
    type();
});