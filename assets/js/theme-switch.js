/**
 * Theme switching functionality
 * Automatically detects browser dark/light preference and allows manual toggling
 */

// Immediately set a default theme to prevent flash
(function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
})();

(function() {
    'use strict';

    const STORAGE_KEY = 'theme';
    const DARK_THEME = 'dark';
    const LIGHT_THEME = 'light';

    // Get saved theme or detect browser preference
    function getInitialTheme() {
        const savedTheme = localStorage.getItem(STORAGE_KEY);
        if (savedTheme) {
            return savedTheme;
        }
        
        // Check browser preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return DARK_THEME;
        }
        
        return LIGHT_THEME;
    }

    // Apply theme to document
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
    }

    // Toggle between dark and light theme
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
        applyTheme(newTheme);
    }

    // Listen for browser theme preference changes
    function setupMediaQueryListener() {
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', function(e) {
                // Only auto-switch if user hasn't manually set a preference
                if (!localStorage.getItem(STORAGE_KEY)) {
                    applyTheme(e.matches ? DARK_THEME : LIGHT_THEME);
                }
            });
        }
    }

    // Create theme toggle button
    function createToggleButton() {
        const button = document.createElement('button');
        button.className = 'theme-toggle';
        button.setAttribute('aria-label', 'Toggle theme');
        button.innerHTML = `
            <span class="icon-sun">☀️</span>
            <span class="icon-moon">🌙</span>
        `;
        button.addEventListener('click', toggleTheme);
        document.body.appendChild(button);
        return button;
    }

    // Initialize theme system
    function init() {
        // Apply initial theme immediately to prevent flash
        const initialTheme = getInitialTheme();
        applyTheme(initialTheme);

        // Setup after DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                createToggleButton();
                setupMediaQueryListener();
            });
        } else {
            createToggleButton();
            setupMediaQueryListener();
        }
    }

    // Initialize after the immediate theme setting
    document.addEventListener('DOMContentLoaded', function() {
        createToggleButton();
        setupMediaQueryListener();
    });

})(); 