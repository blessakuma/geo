document.addEventListener('DOMContentLoaded', () => {

    // --- Плавная прокрутка к якорям ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId); 
            
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Навигация (Scroll Spy) ---
    const sections = document.querySelectorAll('section[id]');
    const navLi = document.querySelectorAll('.main-nav ul li a');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // "offset" в 150px, чтобы ссылка активировалась чуть раньше
            if (pageYOffset >= (sectionTop - 150)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('current');
            if (a.getAttribute('href') === '#' + currentSectionId) {
                a.classList.add('current');
            }
        });
    });

    // --- НОВЫЙ БЛОК: Анимация появления карточек "Этапы" ---
    const serviceCards = document.querySelectorAll('.service-card.process-step');
    const servicesSection = document.getElementById('services');

    const servicesObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Если секция видна, добавляем класс reveal к карточкам с задержкой
                serviceCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('reveal');
                    }, index * 200); // Задержка в 200 мс для каждой следующей карточки
                });
                servicesObserver.disconnect(); // Отключаем observer после того, как карточки появились
            }
        });
    }, {
        threshold: 0.3 // Срабатывает, когда 30% элемента видно
    });

    if (servicesSection) {
        servicesObserver.observe(servicesSection);
    }
    // --- КОНЕЦ НОВОГО БЛОКА ---


    // --- Анимация появления карточек цен при прокрутке ---
    const pricingCards = document.querySelectorAll('.pricing-card');
    const pricingSection = document.getElementById('pricing');

    const pricingObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                pricingCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('reveal');
                    }, index * 200); 
                });
                pricingObserver.disconnect(); 
            }
        });
    }, {
        threshold: 0.3 
    });

    if (pricingSection) {
        pricingObserver.observe(pricingSection);
    }


    // --- Обработка отправки формы (заглушка) ---
    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Здесь будет ваш код для отправки данных (например, через fetch)
            
            alert('Спасибо за вашу заявку! Мы скоро свяжемся с вами.');
            
            this.reset();
        });
    }

});