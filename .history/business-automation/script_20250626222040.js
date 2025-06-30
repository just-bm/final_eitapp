// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

// Mobile menu toggle alternative
function toggleMobileMenuAlt() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.toggle('active');
}

// Contact form handler
function handleContactForm(event) {
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
}

// Smooth scrolling for anchor links
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

// Close mobile menu when clicking on links
document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('mobileNav').classList.remove('active');
    });
});

// Chat widget functionality
document.addEventListener('DOMContentLoaded', function() {
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