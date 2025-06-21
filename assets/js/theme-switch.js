/**
 * Theme switching functionality
 * Uses user preference directly without flashing system preference
 * Priority: User Preference > System Preference > Default Light
 */

// Theme initialization is now handled inline in the head to prevent flash

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    const STORAGE_KEY = 'theme';
    const DARK_THEME = 'dark';
    const LIGHT_THEME = 'light';

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
            if (mediaQuery.addEventListener) {
                mediaQuery.addEventListener('change', function(e) {
                    // Only auto-switch if user hasn't manually set a preference
                    if (!localStorage.getItem(STORAGE_KEY)) {
                        applyTheme(e.matches ? DARK_THEME : LIGHT_THEME);
                    }
                });
            }
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

    // Initialize
    createToggleButton();
    setupMediaQueryListener();
}); 