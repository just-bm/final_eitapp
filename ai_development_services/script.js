document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    document.querySelector('.mobile-menu').addEventListener('click', function() {
        const nav = document.querySelector('.nav');
        if (nav.style.display === 'flex') {
            nav.style.display = 'none';
        } else {
            nav.style.display = 'flex';
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.top = '100%';
            nav.style.left = '0';
            nav.style.right = '0';
            nav.style.background = 'white';
            nav.style.padding = '1rem';
            nav.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            nav.style.zIndex = '50';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = 'white';
            header.style.backdropFilter = 'none';
        }
    });

    // Service card hover effects
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Button click animations
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
            }
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards for animation
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Chat widget functionality
    const chatTrigger = document.getElementById('chatTrigger');
    const contactForm = document.getElementById('contactForm');
    
    // Toggle form visibility when chat icon is clicked
    chatTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        if (contactForm.style.display === 'block') {
            contactForm.style.display = 'none';
        } else {
            contactForm.style.display = 'block';
        }
    });
    
    // Form submission
    const form = document.querySelector('.form-container form');
    form.addEventListener('submit', function(e) {
        // You can add submission handling here if needed
    });
    
    // File input display
    const fileInput = document.querySelector('input[type="file"]');
    const attachButton = document.querySelector('.attach-button span');
    
    fileInput.addEventListener('change', function() {
        if (this.files && this.files.length > 0) {
            attachButton.textContent = this.files[0].name;
        } else {
            attachButton.textContent = 'Attach File';
        }
    });
});