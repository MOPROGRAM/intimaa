function setLang(lang){
  const body = document.body;
  if(lang === 'ar'){
    body.classList.remove('lang-en');
    body.classList.add('lang-ar');
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
    document.getElementById('btn-ar').setAttribute('aria-pressed','true');
    document.getElementById('btn-en').setAttribute('aria-pressed','false');
  } else {
    body.classList.remove('lang-ar');
    body.classList.add('lang-en');
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
    document.getElementById('btn-en').setAttribute('aria-pressed','true');
    document.getElementById('btn-ar').setAttribute('aria-pressed','false');
  }
  localStorage.setItem('site-lang', lang);
}

document.addEventListener('DOMContentLoaded', ()=>{
  const btnEn = document.getElementById('btn-en');
  const btnAr = document.getElementById('btn-ar');
  const stored = localStorage.getItem('site-lang') || 'en';
  setLang(stored);

  btnEn.addEventListener('click', ()=> setLang('en'));
  btnAr.addEventListener('click', ()=> setLang('ar'));
  
  // Contact form: open user's email client with composed message
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const info = document.getElementById('contact-info').value.trim();
      const message = document.getElementById('contact-message').value.trim();
      const subject = encodeURIComponent('Website inquiry from ' + (name || info || 'Website'));
      const body = encodeURIComponent((name?('Name: '+name+'\n'):'') + (info?('Contact: '+info+'\n\n'):'') + message);
      window.location.href = `mailto:info@example.com?subject=${subject}&body=${body}`;
    });
  }

  // Sticky header shadow on scroll
  const header = document.querySelector('header.site-header');
  const onScroll = ()=>{
    if(window.scrollY > 12) header.classList.add('scrolled'); else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll);

  // Simple reveal on scroll using IntersectionObserver
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add('in-view');
    });
  },{threshold:0.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
});
