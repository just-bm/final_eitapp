// Defer loading of non-critical scripts
document.addEventListener('DOMContentLoaded', function() {
    // Load scripts after page load
    function loadScript(src, async = true) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = async;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
    }

    // Scripts to load after initial page load
    const deferredScripts = [
        'js/isotope.pkgd.min.js',
        'js/jquery.themepunch.tools.min.js',
        'js/jquery.themepunch.revolution.min.js'
    ];

    // Load scripts after 2 seconds
    setTimeout(() => {
        deferredScripts.forEach(script => loadScript(script));
    }, 2000);

    // Initialize intersection observer for lazy loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}); 