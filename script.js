// ============================================
// Efeito de Digitação (Typewriter)
// ============================================
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

// ============================================
// Menu Mobile
// ============================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-content') && !e.target.closest('.mobile-menu-toggle')) {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ============================================
// Navbar Scroll Effect
// ============================================
const navbar = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// Scroll Reveal Animations
// ============================================
// Nota: O ScrollReveal cuidará de esconder os elementos inicialmente
ScrollReveal().reveal('.reveal', {
    delay: 200,
    distance: '60px',
    origin: 'bottom',
    duration: 1000,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    interval: 150,
    reset: false
});

// Animações específicas para elementos
ScrollReveal().reveal('.hero-content', {
    delay: 300,
    distance: '100px',
    origin: 'bottom',
    duration: 1200,
    easing: 'ease-out'
});

ScrollReveal().reveal('.profile-container', {
    delay: 100,
    scale: 0.8,
    duration: 1000
});

ScrollReveal().reveal('.social-btn', {
    delay: 400,
    distance: '50px',
    origin: 'bottom',
    interval: 100,
    duration: 800
});

ScrollReveal().reveal('.stat-item', {
    delay: 200,
    distance: '40px',
    origin: 'bottom',
    interval: 100,
    duration: 800
});

ScrollReveal().reveal('.skill-card', {
    delay: 100,
    distance: '50px',
    origin: 'bottom',
    interval: 100,
    duration: 900
});

ScrollReveal().reveal('.timeline-item', {
    delay: 200,
    distance: '60px',
    origin: 'left',
    interval: 150,
    duration: 1000
});

ScrollReveal().reveal('.contact-item-card', {
    delay: 100,
    distance: '50px',
    origin: 'bottom',
    interval: 100,
    duration: 800
});

// ============================================
// Smooth Scroll para links internos
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Offset para a navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Highlight da seção ativa no menu
// ============================================
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ============================================
// Animação de contadores nos stats
// ============================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        let count = 0;
        const increment = target / speed;
        
        const updateCount = () => {
            if (count < target) {
                count += increment;
                counter.textContent = Math.ceil(count) + '+';
                requestAnimationFrame(updateCount);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        // Observer para iniciar animação quando visível
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCount();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// ============================================
// Animação das barras de progresso
// ============================================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fillBar 1.5s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// ============================================
// Partículas animadas de fundo
// ============================================
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(56, 189, 248, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float-particle ${Math.random() * 20 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }
    
    // Adicionar animação CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-particle {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// Cursor personalizado (opcional para desktop)
// ============================================
function initCustomCursor() {
    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid var(--primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.2s ease, opacity 0.2s ease;
            opacity: 0;
        `;
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
            cursor.style.opacity = '1';
        });
        
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });
        
        // Efeito hover em links e botões
        const interactiveElements = document.querySelectorAll('a, button, .skill-card, .timeline-content');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.borderColor = 'var(--secondary)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.borderColor = 'var(--primary)';
            });
        });
    }
}

// ============================================
// Easter Egg - Konami Code
// ============================================
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    konamiCode.splice(-konamiSequence.length - 1, konamiCode.length - konamiSequence.length);
    
    if (konamiCode.toString() === konamiSequence.toString()) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s infinite';
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
}

// ============================================
// Copiar email ao clicar
// ============================================
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const email = link.href.replace('mailto:', '');
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(email).then(() => {
                showNotification('Email copiado para a área de transferência!');
            });
        }
    });
});

// ============================================
// Sistema de notificações
// ============================================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, var(--primary), var(--secondary));
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// Inicializar todas as funcionalidades
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    type();
    animateCounters();
    animateSkillBars();
    createParticles();
    initCustomCursor();
    
    // Preloader (opcional)
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});

// ============================================
// Performance: Lazy loading de imagens
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('%c👋 Olá! Bem-vindo ao meu portfólio!', 'color: #38bdf8; font-size: 20px; font-weight: bold;');
console.log('%c🚀 Desenvolvido com JavaScript, HTML5 e CSS3', 'color: #94a3b8; font-size: 14px;');
console.log('%c💡 Tente o Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A', 'color: #818cf8; font-size: 12px;');
