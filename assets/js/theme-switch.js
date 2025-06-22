/**
 * Theme switching functionality
 * Uses user preference directly without flashing system preference
 * Priority: User Preference > System Preference > Default Light
 */

// Theme initialization is now handled inline in the head to prevent flash

// Apply theme variables immediately
(function() {
    'use strict';
    
    const STORAGE_KEY = 'theme';
    const DARK_THEME = 'dark';
    const LIGHT_THEME = 'light';
    
    // CSS variables for each theme
    const cssVars = {
        light: {
            '--theme-bg': '#fff',
            '--theme-color': '#444',
            '--theme-border': '#ddd',
            '--theme-secondary-bg': '#f9f9f9',
            '--theme-code-bg': '#f5f5f5',
            '--theme-link-color': '#2c3e50',
            '--theme-link-hover': '#e74c3c',
            '--theme-muted-color': '#6E7173',
            '--theme-header-border': '#ddd',
            '--theme-nav-current': '#333',
            '--theme-blockquote-color': '#555',
            '--theme-shadow': 'rgba(0, 0, 0, 0.1)'
        },
        dark: {
            '--theme-bg': '#1d1d1d',
            '--theme-color': '#ffffff',
            '--theme-border': '#404040',
            '--theme-secondary-bg': '#2a2a2a',
            '--theme-code-bg': '#2d2d2d',
            '--theme-link-color': '#bdc3c7',
            '--theme-link-hover': '#5dade2',
            '--theme-muted-color': '#aaa',
            '--theme-header-border': '#404040',
            '--theme-nav-current': '#ffffff',
            '--theme-blockquote-color': '#bbb',
            '--theme-shadow': 'rgba(255, 255, 255, 0.1)'
        }
    };
    
    // Apply theme variables immediately
    try {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme && cssVars[currentTheme]) {
            const root = document.documentElement;
            const vars = cssVars[currentTheme];
            Object.keys(vars).forEach(key => {
                root.style.setProperty(key, vars[key]);
            });
        }
    } catch (e) {
        console.warn('Immediate theme application failed:', e);
    }
})();

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    const STORAGE_KEY = 'theme';
    const DARK_THEME = 'dark';
    const LIGHT_THEME = 'light';

    // CSS variables for each theme
    const cssVars = {
        light: {
            '--theme-bg': '#fff',
            '--theme-color': '#444',
            '--theme-border': '#ddd',
            '--theme-secondary-bg': '#f9f9f9',
            '--theme-code-bg': '#f5f5f5',
            '--theme-link-color': '#2c3e50',
            '--theme-link-hover': '#e74c3c',
            '--theme-muted-color': '#6E7173',
            '--theme-header-border': '#ddd',
            '--theme-nav-current': '#333',
            '--theme-blockquote-color': '#555',
            '--theme-shadow': 'rgba(0, 0, 0, 0.1)'
        },
        dark: {
            '--theme-bg': '#1d1d1d',
            '--theme-color': '#ffffff',
            '--theme-border': '#404040',
            '--theme-secondary-bg': '#2a2a2a',
            '--theme-code-bg': '#2d2d2d',
            '--theme-link-color': '#bdc3c7',
            '--theme-link-hover': '#5dade2',
            '--theme-muted-color': '#aaa',
            '--theme-header-border': '#404040',
            '--theme-nav-current': '#ffffff',
            '--theme-blockquote-color': '#bbb',
            '--theme-shadow': 'rgba(255, 255, 255, 0.1)'
        }
    };

    // Apply theme to document
    function applyTheme(theme) {
        try {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem(STORAGE_KEY, theme);
            
            // Apply CSS variables immediately
            const root = document.documentElement;
            const vars = cssVars[theme];
            Object.keys(vars).forEach(key => {
                root.style.setProperty(key, vars[key]);
            });
        } catch (e) {
            console.warn('Theme application failed:', e);
            // Fallback to setting just the data attribute
            document.documentElement.setAttribute('data-theme', theme);
        }
    }

    // Toggle between dark and light theme
    function toggleTheme() {
        try {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
            applyTheme(newTheme);
        } catch (e) {
            console.warn('Theme toggle failed:', e);
        }
    }

    // Listen for browser theme preference changes
    function setupMediaQueryListener() {
        try {
            if (window.matchMedia) {
                const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                if (mediaQuery.addEventListener) {
                    mediaQuery.addEventListener('change', function(e) {
                        // Only auto-switch if user hasn't manually set a preference
                        if (!localStorage.getItem(STORAGE_KEY)) {
                            applyTheme(e.matches ? DARK_THEME : LIGHT_THEME);
                        }
                    });
                }
            }
        } catch (e) {
            console.warn('Media query listener setup failed:', e);
        }
    }

    // Create theme toggle button
    function createToggleButton() {
        try {
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
        } catch (e) {
            console.warn('Theme toggle button creation failed:', e);
        }
    }

    // Initialize
    createToggleButton();
    setupMediaQueryListener();
}); 