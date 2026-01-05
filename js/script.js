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
});
