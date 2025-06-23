// Vanilla JS back-to-top (rocket) functionality
(() => {
    'use strict';
    const rocket = document.getElementById('rocket');
    if (!rocket) return;

    const toggleRocket = () => rocket.classList.toggle('show', window.scrollY > 10);
    window.addEventListener('scroll', toggleRocket);
    toggleRocket(); // Initial state

    rocket.addEventListener('click', e => {
        e.preventDefault();
        rocket.classList.add('launch');
        const scrollToTop = () => {
            const c = document.documentElement.scrollTop || document.body.scrollTop;
            if (c > 0) {
                window.scrollTo(0, c - c / 8);
                window.requestAnimationFrame(scrollToTop);
            } else {
                rocket.classList.remove('show', 'launch');
            }
        };
        scrollToTop();
        return false;
    });
})();
