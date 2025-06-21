// Vanilla JS implementation of back-to-top functionality
(function() {
    'use strict';
    
    const rocket = document.getElementById('rocket');
    if (!rocket) return;
    
    // Show/hide rocket based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            rocket.classList.add('show');
        } else {
            rocket.classList.remove('show');
        }
    });
    
    // Scroll to top with animation when rocket is clicked
    rocket.addEventListener('click', function(e) {
        e.preventDefault();
        rocket.classList.add('launch');
        
        const scrollToTop = function() {
            const c = document.documentElement.scrollTop || document.body.scrollTop;
            if (c > 0) {
                window.requestAnimationFrame(scrollToTop);
                window.scrollTo(0, c - c / 8);
            } else {
                rocket.classList.remove('show');
                rocket.classList.remove('launch');
            }
        };
        
        scrollToTop();
        return false;
    });
})();
