// Main JavaScript loader and initializer
document.addEventListener('DOMContentLoaded', function() {
    // Load critical scripts immediately
    const criticalScripts = [
        'js/jquery.js',
        'js/functions.min.js'
    ];

    // Load non-critical scripts after page load
    const deferredScripts = [
        'js/plugins.js',
        'js/isotope.pkgd.min.js',
        'js/jquery.themepunch.tools.min.js',
        'js/jquery.themepunch.revolution.min.js'
    ];

    // Function to load script asynchronously
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
    }

    // Load critical scripts
    Promise.all(criticalScripts.map(loadScript))
        .then(() => {
            // Initialize critical functionality
            if (window.jQuery) {
                jQuery(document).trigger('critical-scripts-loaded');
            }
        })
        .catch(error => console.error('Error loading critical scripts:', error));

    // Load deferred scripts after window load
    window.addEventListener('load', function() {
        Promise.all(deferredScripts.map(loadScript))
            .then(() => {
                // Initialize non-critical functionality
                if (window.jQuery) {
                    jQuery(document).trigger('deferred-scripts-loaded');
                }
            })
            .catch(error => console.error('Error loading deferred scripts:', error));
    });
}); 