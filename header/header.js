document.addEventListener('DOMContentLoaded', function() {
            // Hamburger menu toggle
            const hamburger = document.querySelector('.nav_trigger');
            const mobileMenu = document.getElementById('navy');
            
            if (hamburger) {
                hamburger.addEventListener('click', function(e) {
                    e.preventDefault();
                    this.classList.toggle('active');
                    mobileMenu.classList.toggle('active');
                });
            }
            
            // Mobile submenu toggle
            const toggleButtons = document.querySelectorAll('.dropdown-toggle');
            
            toggleButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.stopPropagation();
                    
                    // Toggle icon text
                    this.textContent = this.textContent === '+' ? '−' : '+';
                    
                    // Handle Services and Who We Are menus
                    if (this.closest('.has_mega_menu')) {
                        const megaMenu = this.nextElementSibling;
                        if (megaMenu && megaMenu.classList.contains('mega_menu')) {
                            megaMenu.classList.toggle('expanded');
                        }
                    }
                    
                    // Handle AI submenu
                    if (this.closest('.has_sub_sub_menu')) {
                        const submenu = this.nextElementSibling;
                        if (submenu && submenu.tagName === 'UL') {
                            submenu.classList.toggle('expanded');
                        }
                    }
                });
            });
            
            // Close mobile menu when clicking a link
            const navLinks = document.querySelectorAll('#navy a');
            
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    // Close the mobile menu
                    if (mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                        hamburger.classList.remove('active');
                    }
                });
            });
            
            // Close submenus when clicking outside on mobile
            document.addEventListener('click', function(e) {
                if (window.innerWidth <= 991) {
                    // Reset all toggle buttons
                    toggleButtons.forEach(button => {
                        if (!button.contains(e.target)) {
                            button.textContent = '+';
                        }
                    });
                    
                    // Close mega menus
                    const megaMenus = document.querySelectorAll('.mega_menu');
                    megaMenus.forEach(menu => {
                        if (!menu.contains(e.target) && 
                            !menu.previousElementSibling.contains(e.target)) {
                            menu.classList.remove('expanded');
                        }
                    });
                    
                    // Close AI submenus
                    const aiSubmenus = document.querySelectorAll('.has_sub_sub_menu > ul');
                    aiSubmenus.forEach(menu => {
                        if (!menu.contains(e.target) && 
                            !menu.previousElementSibling.contains(e.target)) {
                            menu.classList.remove('expanded');
                        }
                    });
                }
            });
        });
