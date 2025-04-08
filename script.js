document.addEventListener('DOMContentLoaded', function() {
    // Кастомный курсор
    const cursor = document.querySelector('.cursor');
    const links = document.querySelectorAll('a, button, .portfolio-item, .theme-option');
    
    // Эффект частиц
    function createParticles() {
        const particles = document.querySelector('.particles');
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Случайные свойства
            const size = Math.random() * 5 + 1;
            const posX = Math.random() * window.innerWidth;
            const posY = Math.random() * window.innerHeight;
            const delay = Math.random() * 5;
            const duration = Math.random() * 10 + 10;
            const opacity = Math.random() * 0.5 + 0.1;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}px`;
            particle.style.top = `${posY}px`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.opacity = opacity;
            particle.style.backgroundColor = `rgba(110, 142, 251, ${opacity})`;
            
            particles.appendChild(particle);
        }
    }
    
    // Анимация курсора
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';
    });
    
    // Эффект при наведении на ссылки
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('hovered');
        });
        
        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovered');
        });
    });
    
    // Замените handleFormSteps на этот код
    function handleFormSteps() {
        const form = document.getElementById('portfolio-form');
        const nextButtons = document.querySelectorAll('.btn-next');
        const prevButtons = document.querySelectorAll('.btn-prev');
    
        nextButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const currentStep = button.closest('.form-step');
                const nextStepNum = button.dataset.next;
                const nextStep = form.querySelector(`.form-step[data-step="${nextStepNum}"]`);
            
                currentStep.classList.remove('active');
                nextStep.classList.add('active');
            
                // Плавное появление следующего шага
                nextStep.style.opacity = 0;
                setTimeout(() => {
                    nextStep.style.opacity = 1;
                }, 10);
            });
        });
    
        prevButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const currentStep = button.closest('.form-step');
                const prevStepNum = button.dataset.prev;
                const prevStep = form.querySelector(`.form-step[data-step="${prevStepNum}"]`);
            
                currentStep.classList.remove('active');
                prevStep.classList.add('active');
            
                // Плавное появление предыдущего шага
                prevStep.style.opacity = 0;
                setTimeout(() => {
                    prevStep.style.opacity = 1;
                }, 10);
            });
        });
    }
    
    // Выбор темы
    function handleThemeSelection() {
        const themeOptions = document.querySelectorAll('.theme-option');
        const themeInput = document.getElementById('theme');
        
        themeOptions.forEach(option => {
            option.addEventListener('click', () => {
                themeOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                themeInput.value = option.dataset.theme;
            });
        });
        
        // Активировать первую тему по умолчанию
        if (themeOptions.length > 0) {
            themeOptions[0].classList.add('active');
        }
    }
    
    // Анимация карточек при скролле
    const animateOnScroll = () => {
        const cards = document.querySelectorAll('.card');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        cards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (cardPosition < screenPosition) {
                card.classList.add('animate__fadeInUp');
                card.style.animationDelay = `${index * 0.2}s`;
            }
        });
        
        portfolioItems.forEach((item, index) => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (itemPosition < screenPosition) {
                item.classList.add('animate__fadeInUp');
                item.style.animationDelay = `${index * 0.2}s`;
            }
        });
    };
    
    // Header при скролле
    function handleScrollHeader() {
        const header = document.querySelector('header');
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Обработка формы
    const portfolioForm = document.getElementById('portfolio-form');
    
    portfolioForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Собираем данные
        const portfolioData = {
            name: document.getElementById('name').value,
            job: document.getElementById('job').value,
            about: document.getElementById('about').value,
            skills: document.getElementById('skills').value.split(',').map(skill => skill.trim()),
            projects: document.getElementById('projects').value.split(',').map(project => project.trim()),
            email: document.getElementById('email').value,
            theme: document.getElementById('theme').value
        };
        
        // Сохраняем данные
        localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
        
        // Перенаправляем на страницу портфолио
        window.location.href = 'portfolio.html';
    });
    
    // Плавные якорные ссылки
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Инициализация
    createParticles();
    handleFormSteps();
    handleThemeSelection();
    
    // События
    window.addEventListener('scroll', () => {
        animateOnScroll();
        handleScrollHeader();
    });
    
    // Запустить при загрузке
    animateOnScroll();
    handleScrollHeader();
    
    // Активировать первый шаг формы
    document.querySelector('.form-step').classList.add('active');
});