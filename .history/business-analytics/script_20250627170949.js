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


    // --- Chat Widget Functionality (UPDATED with Cancel Button) ---
    const chatTrigger = document.getElementById('chatTrigger');
    const contactForm = document.getElementById('contactForm');
    const formContainer = document.querySelector('.form-container'); // The inner container for the form itself
    const closeFormButton = document.getElementById('closeFormButton'); // NEW: Get the cancel button

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
        e.preventDefault();
        e.stopPropagation(); // Prevents this click from bubbling up to the document
        if (contactForm.style.display === 'block') {
            hideForm();
        } else {
            showForm();
        }
    });

    // NEW: Close the form when the cancel button is clicked
    if (closeFormButton) { // Check if the button exists
        closeFormButton.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevents this click from bubbling up to the formContainer or document
            hideForm();
        });
    }

    // Close the form when clicking anywhere on the document OUTSIDE the form or the trigger
    document.addEventListener('click', function(event) {
        // Check if the clicked element is NOT the chat trigger
        // AND NOT inside the contact form itself
        if (!chatTrigger.contains(event.target) && !contactForm.contains(event.target)) {
            hideForm();
        }
    });

    // Prevent clicks INSIDE the form (form-container) from closing it
    formContainer.addEventListener('click', function(event) {
        event.stopPropagation();
    });


    // --- Chat Widget Form Submission (for formsubmit.co, unchanged) ---
    const chatForm = document.querySelector('#contactForm .form-container form');
    if (chatForm) {
        chatForm.addEventListener('submit', function(e) {
            // The formsubmit.co action attribute handles the actual submission.
            // You might want to add custom logic here, like a temporary message
            // or closing the form *after* submission.
        });
    }


    // --- File input display for the chat widget form (unchanged) ---
    const fileInput = document.querySelector('#contactForm input[type="file"]');
    const attachButtonSpan = document.querySelector('#contactForm .attach-button span');

    if (fileInput && attachButtonSpan) {
        fileInput.addEventListener('change', function() {
            if (this.files && this.files.length > 0) {
                attachButtonSpan.textContent = this.files[0].name;
            } else {
                attachButtonSpan.textContent = 'Attach File';
            }
        });
    }
});