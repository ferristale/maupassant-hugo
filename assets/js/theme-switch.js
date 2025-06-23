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
                <span class="icon-sun" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                  </svg>
                </span>
                <span class="icon-moon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                </span>
            `;
            button.addEventListener('click', toggleTheme);
            const container = document.getElementById('theme-toggle-container');
            if (container) {
                container.appendChild(button);
            } else {
                document.body.appendChild(button);
            }
            return button;
        } catch (e) {
            console.warn('Theme toggle button creation failed:', e);
        }
    }

    // Initialize
    createToggleButton();
    setupMediaQueryListener();
}); 