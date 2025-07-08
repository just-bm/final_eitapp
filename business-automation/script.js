document.addEventListener('DOMContentLoaded', function() {
    // --- Mobile Menu Functionality (unchanged, just included for completeness) ---
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNav = document.getElementById('mobileNav');

    if (mobileMenu) {
        window.toggleMobileMenu = function() {
            mobileMenu.classList.toggle('active');
        };
    }

    if (mobileNav) {
        window.toggleMobileMenuAlt = function() {
            mobileNav.classList.toggle('active');
        };

        document.querySelectorAll('.mobile-nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
            });
        });
    }

    // --- Contact Form Handler (for general contact forms, unchanged) ---
    const generalContactForm = document.getElementById('yourGeneralContactFormId');
    if (generalContactForm) {
        generalContactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(event.target);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                description: formData.get('description')
            };

            console.log('Contact form submitted:', data);
            alert('Thank you for your interest! We will contact you soon.');
            event.target.reset();
        });
    }

    // --- Smooth scrolling for anchor links (unchanged) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });



});