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






  // script.js

// Animate fadeInUp when elements scroll into view





