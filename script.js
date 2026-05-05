const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const THEME_STORAGE_KEY = 'meritum-theme';
const themeButtons = document.querySelectorAll('.theme-btn');
const allowedThemes = ['royal-sapphire', 'wcag-22'];

const setTheme = (theme) => {
  if (!allowedThemes.includes(theme)) return;
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);

  themeButtons.forEach((button) => {
    const isActive = button.dataset.theme === theme;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
};

const initialTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'royal-sapphire';
setTheme(initialTheme);

themeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setTheme(button.dataset.theme);
  });
});