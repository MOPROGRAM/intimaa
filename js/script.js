document.addEventListener('DOMContentLoaded', () => {
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
    } else {
      body.classList.remove('lang-ar');
      body.classList.add('lang-en');
      body.setAttribute('dir', 'ltr');
      btnEn.setAttribute('aria-pressed', 'true');
      btnAr.setAttribute('aria-pressed', 'false');
    }
    localStorage.setItem('preferred-lang', lang);
  };

  btnEn.addEventListener('click', () => setLanguage('en'));
  btnAr.addEventListener('click', () => setLanguage('ar'));

  // Initialize Language
  const savedLang = localStorage.getItem('preferred-lang') || 'en';
  setLanguage(savedLang);

  // Sticky Header Effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight - 100;
      if (isVisible) {
        el.classList.add('in-view');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check

  // Smooth Scroll for Navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Simple Form Submission (Demo)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button');
      const originalText = btn.innerHTML;
      btn.innerHTML = 'Sending...';
      btn.disabled = true;

      setTimeout(() => {
        alert('Thank you! Your message has been sent.');
        btn.innerHTML = originalText;
        btn.disabled = false;
        contactForm.reset();
      }, 1500);
    });
  }
});
