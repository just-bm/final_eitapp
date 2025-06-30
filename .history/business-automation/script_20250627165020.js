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