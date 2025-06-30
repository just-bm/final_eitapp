document.addEventListener("DOMContentLoaded", () => {
  // Animate hero title and subtitle on load
  const heroTitle = document.querySelector(".hero-title");
  const heroSubtitle = document.querySelector(".hero-subtitle");
  const featureItems = document.querySelectorAll(".feature-item");
  const loginBox = document.querySelector(".login-box");
  const navLinks = document.querySelectorAll(".nav-link");
  const languageOptions = document.querySelectorAll(".language-option");

  // Initial states for animations
  heroTitle.style.opacity = 0;
  heroTitle.style.transform = "translateX(-50px)";
  heroSubtitle.style.opacity = 0;
  heroSubtitle.style.transform = "translateX(50px)";

  // Animate titles on load for benefits section
  const benefitsTitle = document.querySelector(".benefits-section .section-title");
  const benefitsSubtitle = document.querySelector(".benefits-section .section-subtitle");
  const benefitsCards = document.querySelectorAll(".benefits-card");

  if (benefitsTitle && benefitsSubtitle && benefitsCards.length > 0) {
    benefitsTitle.style.opacity = 0;
    benefitsSubtitle.style.opacity = 0;
    benefitsTitle.style.transform = "translateY(30px)";
    benefitsSubtitle.style.transform = "translateY(30px)";

    setTimeout(() => {
      benefitsTitle.style.transition = "all 0.6s ease";
      benefitsSubtitle.style.transition = "all 0.6s ease";
      benefitsTitle.style.opacity = 1;
      benefitsSubtitle.style.opacity = 1;
      benefitsTitle.style.transform = "translateY(0)";
      benefitsSubtitle.style.transform = "translateY(0)";
    }, 200);

    // Intersection Observer for card animation
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
          entry.target.style.transition = "all 0.6s ease";
          observer.unobserve(entry.target); // Animate once
        }
      });
    }, {
      threshold: 0.2,
    });

    benefitsCards.forEach(card => {
      card.style.opacity = 0;
      card.style.transform = "translateY(40px)";
      observer.observe(card);
    });
  }

  loginBox.style.opacity = 0;
  loginBox.style.transform = "scale(0.8)";

  featureItems.forEach(item => {
    item.style.opacity = 0;
    item.style.transform = "translateY(20px)";
  });

  navLinks.forEach(link => {
    link.style.opacity = 0;
    link.style.transform = "translateY(-20px)";
  });

  // Animate nav links on load with stagger
  navLinks.forEach((link, i) => {
    setTimeout(() => {
      link.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      link.style.opacity = 1;
      link.style.transform = "translateY(0)";
    }, 150 * i);
  });

  // Animate hero title and subtitle
  setTimeout(() => {
    heroTitle.style.transition = "opacity 0.7s ease, transform 0.7s ease";
    heroTitle.style.opacity = 1;
    heroTitle.style.transform = "translateX(0)";
  }, 300);

  setTimeout(() => {
    heroSubtitle.style.transition = "opacity 0.7s ease, transform 0.7s ease";
    heroSubtitle.style.opacity = 1;
    heroSubtitle.style.transform = "translateX(0)";
  }, 800);

  // Animate login box
  setTimeout(() => {
    loginBox.style.transition = "opacity 0.7s ease, transform 0.7s ease";
    loginBox.style.opacity = 1;
    loginBox.style.transform = "scale(1)";
  }, 1000);

  // Intersection Observer for features fading up
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const item = entry.target;
        item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        item.style.opacity = 1;
        item.style.transform = "translateY(0)";
        observer.unobserve(item);
      }
    });
  }, observerOptions);

  featureItems.forEach((item, index) => {
    observer.observe(item);
    item.style.transitionDelay = `${index * 0.15}s`;
  });

  // Language switcher toggle active class
  languageOptions.forEach(option => {
    option.addEventListener("click", () => {
      languageOptions.forEach(opt => opt.classList.remove("active"));
      option.classList.add("active");
    });
  });
});



  const slider = document.getElementById("slider");
  const buttons = document.querySelectorAll(".feature-buttons button");
  const slides = document.querySelectorAll(".slide");
  const sliderWrapper = document.querySelector(".slider-wrapper");
  
  let currentIndex = 0;
  let autoSlideInterval;
  let hoverTimeout;
  const slideCount = slides.length;
  const hoverAdvanceDelay = 2000; // 2 seconds to advance on hover
  const autoSlideDelay = 5000; // 5 seconds for auto-advance

  function showSlide(index) {
    // Validate index
    if (index < 0) index = slideCount - 1;
    else if (index >= slideCount) index = 0;
    
    currentIndex = index;
    
    // Update slider position
    slider.style.transform = `translateX(-${currentIndex * 16.6666}%)`;
    
    // Update active button
    buttons.forEach(btn => btn.classList.remove("active"));
    buttons[currentIndex].classList.add("active");
    
    // Update active slide
    slides.forEach(slide => {
      slide.classList.remove("active-slide");
      // Reset progress bar
      slide.style.setProperty('--progress', '0%');
    });
    slides[currentIndex].classList.add("active-slide");
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function startAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, autoSlideDelay);
  }

  function handleHoverAdvance() {
    // Only set timeout if hovering the current active slide
    const activeSlide = document.querySelector(".slide.active-slide");
    if (!activeSlide) return;
    
    // Start progress bar animation
    activeSlide.style.setProperty('--progress', '100%');
    
    // Set timeout to advance slide
    hoverTimeout = setTimeout(() => {
      nextSlide();
      startAutoSlide(); // Restart auto-slide after hover advance
    }, hoverAdvanceDelay);
  }

  function cancelHoverAdvance() {
    clearTimeout(hoverTimeout);
    
    // Reset progress bar
    const activeSlide = document.querySelector(".slide.active-slide");
    if (activeSlide) {
      activeSlide.style.setProperty('--progress', '0%');
    }
  }

  // Initialize slider
  function initSlider() {
    showSlide(0);
    startAutoSlide();
    setupEventListeners();
  }

  function setupEventListeners() {
    // Button click handlers
    buttons.forEach((button, index) => {
      button.addEventListener("click", () => {
        cancelHoverAdvance();
        showSlide(index);
        startAutoSlide();
      });
    });

    // Slide hover handlers
    slides.forEach(slide => {
      slide.addEventListener('mouseenter', () => {
        if (slide.classList.contains("active-slide")) {
          handleHoverAdvance();
        }
      });
      
      slide.addEventListener('mouseleave', cancelHoverAdvance);
    });

    // Pause on wrapper hover
    sliderWrapper.addEventListener("mouseenter", () => {
      clearInterval(autoSlideInterval);
      cancelHoverAdvance();
    });

    sliderWrapper.addEventListener("mouseleave", startAutoSlide);

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    sliderWrapper.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
      clearInterval(autoSlideInterval);
      cancelHoverAdvance();
    }, { passive: true });

    sliderWrapper.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      startAutoSlide();
    }, { passive: true });

    function handleSwipe() {
      const threshold = 50;
      const difference = touchStartX - touchEndX;
      
      if (difference > threshold) {
        nextSlide();
      } else if (difference < -threshold) {
        prevSlide();
      }
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    });
  }

  // Initialize the slider
  initSlider();







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


//login box//


document.addEventListener('DOMContentLoaded', function() {
  const mobileCtaButton = document.querySelector('.mobile-cta-button');
  const loginBox = document.querySelector('.login-box');
  
  // Create mobile popup container
  const mobilePopup = document.createElement('div');
  mobilePopup.className = 'mobile-login-popup';
  
  // Create mobile login container
  const mobileLoginContainer = document.createElement('div');
  mobileLoginContainer.className = 'mobile-login-container';
  
  // Clone the login box content
  const loginContent = loginBox.cloneNode(true);
  mobileLoginContainer.appendChild(loginContent);
  
  // Add close button
  const closeButton = document.createElement('button');
  closeButton.className = 'mobile-login-close';
  closeButton.innerHTML = '&times;';
  mobileLoginContainer.appendChild(closeButton);
  
  mobilePopup.appendChild(mobileLoginContainer);
  document.body.appendChild(mobilePopup);
  
  // Toggle popup visibility
  mobileCtaButton.addEventListener('click', function() {
    mobilePopup.style.display = 'flex';
  });
  
  closeButton.addEventListener('click', function() {
    mobilePopup.style.display = 'none';
  });
  
  // Close when clicking outside
  mobilePopup.addEventListener('click', function(e) {
    if (e.target === mobilePopup) {
      mobilePopup.style.display = 'none';
    }
  });
});

