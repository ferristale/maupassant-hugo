{
    const STORAGE_KEY = 'theme';
    const DARK_THEME = 'dark';
    const LIGHT_THEME = 'light';
    const THEMES = new Set([DARK_THEME, LIGHT_THEME]);

    const getSystemTheme = () =>
        window.matchMedia?.('(prefers-color-scheme: dark)').matches ? DARK_THEME : LIGHT_THEME;

    const getCurrentTheme = () =>
        THEMES.has(document.documentElement.dataset.theme)
            ? document.documentElement.dataset.theme
            : LIGHT_THEME;

    const getSavedTheme = () => {
        try {
            const savedTheme = localStorage.getItem(STORAGE_KEY);
            return THEMES.has(savedTheme) ? savedTheme : null;
        } catch {
            return null;
        }
    };

    const setTheme = (theme, { persist = false } = {}) => {
        document.documentElement.dataset.theme = theme;
        document.documentElement.style.colorScheme = theme;

        if (persist) {
            try {
                localStorage.setItem(STORAGE_KEY, theme);
            } catch {}
        }

        window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
    };

    const toggleTheme = () => {
        const theme = getCurrentTheme() === DARK_THEME ? LIGHT_THEME : DARK_THEME;
        setTheme(theme, { persist: true });
    };

    const createToggleButton = () => {
        const button = document.createElement('button');
        button.className = 'theme-toggle';
        button.type = 'button';
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
        (container || document.body).appendChild(button);
    };

    const syncSystemTheme = event => {
        if (!getSavedTheme()) {
            setTheme(event.matches ? DARK_THEME : LIGHT_THEME);
        }
    };

    document.addEventListener('DOMContentLoaded', () => {
        createToggleButton();
        window.matchMedia?.('(prefers-color-scheme: dark)').addEventListener?.('change', syncSystemTheme);
        setTheme(getSavedTheme() || getSystemTheme());
    });
}
