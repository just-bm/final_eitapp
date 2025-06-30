document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Form submission handler
    document.getElementById('contact-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your interest! We will contact you soon.');
    });

    // Button hover effects
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 10px 25px rgba(20, 22, 107, 0.3)';
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });

    // Competitive cards hover effects
    document.querySelectorAll('.competitive-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and feature elements
    document.querySelectorAll('.card, .feature-card, .competitive-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });

    // Initialize animations after page load
    window.addEventListener('load', () => {
        // Start floating animation
        document.querySelectorAll('.animate-float').forEach(element => {
            element.style.animation = 'float 3s ease-in-out infinite';
        });

        // Start pulse animation with delay
        document.querySelectorAll('.animate-pulse').forEach((element, index) => {
            element.style.animation = `pulse 2s infinite`;
            element.style.animationDelay = `${index * 1}s`;
        });
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
    form?.addEventListener('submit', function(e) {
        // You can add submission handling here if needed
    });
    
    // File input display
    const fileInput = document.querySelector('input[type="file"]');
    const attachButton = document.querySelector('.attach-button span');
    
    if (fileInput && attachButton) {
        fileInput.addEventListener('change', function() {
            if (this.files && this.files.length > 0) {
                attachButton.textContent = this.files[0].name;
            } else {
                attachButton.textContent = 'Attach File';
            }
        });
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const chatTrigger = document.getElementById('chatTrigger');
    const contactForm = document.getElementById('contactForm');
    const formContainer = document.querySelector('.form-container'); // Get the inner form container

    // Function to show the form
    function showForm() {
        contactForm.style.display = 'block';
    }

    // Function to hide the form
    function hideForm() {
        contactForm.style.display = 'none';
    }

    // Toggle form visibility when chat icon is clicked
    chatTrigger.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default link behavior if chatTrigger were an <a> tag
        e.stopPropagation(); // Prevent this click from bubbling up to the document and immediately closing the form
        if (contactForm.style.display === 'block') {
            hideForm();
        } else {
            showForm();
        }
    });

    // Close the form when clicking anywhere on the document OUTSIDE the form or the trigger
    document.addEventListener('click', function(event) {
        // Check if the clicked element is NOT the chat trigger
        // AND NOT inside the contact form itself
        if (!chatTrigger.contains(event.target) && !contactForm.contains(event.target)) {
            hideForm();
        }
    });

    // Prevent clicks INSIDE the form from closing it
    // We apply stopPropagation to the 'form-container' to be specific
    formContainer.addEventListener('click', function(event) {
        event.stopPropagation();
    });


    // Form submission (existing logic)
    const form = document.querySelector('.form-container form');
    form.addEventListener('submit', function(e) {
        // You can add submission handling here if needed
        // For formsubmit.co, it handles the actual submission.
        // You might want to close the form after successful submission:
        // hideForm();
    });

    // File input display (existing logic)
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