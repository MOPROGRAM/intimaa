document.addEventListener('DOMContentLoaded', () => {
  // Theme Switching Logic
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
  }

  // Language Switching Logic
  const body = document.body;
  const btnEn = document.getElementById('btn-en');
  const btnAr = document.getElementById('btn-ar');

  const setLanguage = (lang) => {
    if (lang === 'ar') {
      body.classList.remove('lang-en');
      body.classList.add('lang-ar');
      body.setAttribute('dir', 'rtl');
      btnAr.setAttribute('aria-pressed', 'true');
      btnEn.setAttribute('aria-pressed', 'false');
      document.querySelectorAll('.lang[data-lang="en"]').forEach(el => el.style.display = 'none');
      document.querySelectorAll('.lang[data-lang="ar"]').forEach(el => el.style.display = 'block');
    } else {
      body.classList.remove('lang-ar');
      body.classList.add('lang-en');
      body.setAttribute('dir', 'ltr');
      btnEn.setAttribute('aria-pressed', 'true');
      btnAr.setAttribute('aria-pressed', 'false');
      document.querySelectorAll('.lang[data-lang="ar"]').forEach(el => el.style.display = 'none');
      document.querySelectorAll('.lang[data-lang="en"]').forEach(el => el.style.display = 'block');
    }
    localStorage.setItem('preferred-lang', lang);
  };

  btnEn.addEventListener('click', () => setLanguage('en'));
  btnAr.addEventListener('click', () => setLanguage('ar'));

  const savedLang = localStorage.getItem('preferred-lang') || 'en';
  setLanguage(savedLang);

  // Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight - 100;
      if (isVisible) {
        el.classList.add('in-view');
      } else {
        // Optionally remove in-view when out of view to re-trigger on scroll up
        // el.classList.remove('in-view'); 
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });
});
