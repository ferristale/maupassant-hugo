// Vanilla JS back-to-top (rocket) functionality
(() => {
    'use strict';
    const rocket = document.getElementById('rocket');
    if (!rocket) return;

    let hideUntilTop = false;
    const toggleRocket = () => {
        if (hideUntilTop && window.scrollY > 50) return;
        rocket.classList.toggle('show', window.scrollY > 50);
        if (window.scrollY === 0) hideUntilTop = false;
    };
    window.addEventListener('scroll', toggleRocket);
    toggleRocket(); // Initial state

    rocket.addEventListener('click', e => {
        e.preventDefault();
        rocket.classList.remove('show');
        hideUntilTop = true;
        const scrollToTop = () => {
            const c = document.documentElement.scrollTop || document.body.scrollTop;
            if (c > 0) {
                window.scrollTo(0, c - c / 8);
                window.requestAnimationFrame(scrollToTop);
            }
        };
        scrollToTop();
        return false;
    });
})();
