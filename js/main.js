(() => {
  const preloader = document.querySelector('.preloader');
  const hideLoader = () => { if (preloader) preloader.classList.add('done'); };
  window.addEventListener('load', hideLoader, { once: true });
  if (document.readyState === 'complete') hideLoader();
  else document.addEventListener('DOMContentLoaded', () => setTimeout(hideLoader, 120), { once: true });
  setTimeout(hideLoader, 1400);

  const progress = document.querySelector('.scroll-progress');
  const backToTop = document.querySelector('.back-to-top');
  let ticking = false;
  const updateScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = `${max > 0 ? (scrollTop / max) * 100 : 0}%`;
    if (backToTop) backToTop.classList.toggle('visible', scrollTop > 500);
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { window.requestAnimationFrame(updateScroll); ticking = true; }
  }, { passive: true });
  updateScroll();
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  document.querySelectorAll('.faq-item button').forEach(button => {
    button.addEventListener('click', () => {
      const wasOpen = button.getAttribute('aria-expanded') === 'true';
      const answer = document.getElementById(button.getAttribute('aria-controls'));
      button.setAttribute('aria-expanded', String(!wasOpen));
      if (answer) {
        if (wasOpen) {
          answer.classList.remove('is-open');
          answer.hidden = true;
        } else {
          answer.hidden = false;
          requestAnimationFrame(() => answer.classList.add('is-open'));
        }
      }
    });
  });

  const pricingButtons = [...document.querySelectorAll('[data-pricing]')];
  const priceCards = [...document.querySelectorAll('.price-card')];
  priceCards.forEach(card => {
    const price = card.querySelector('.price');
    const cta = card.querySelector('[data-plan]');
    if (price) price.dataset.originalText = price.textContent.trim();
    if (cta) cta.dataset.originalText = cta.textContent.trim();
  });
  pricingButtons.forEach(button => {
    button.setAttribute('aria-pressed', String(button.classList.contains('active')));
    button.addEventListener('click', () => {
      const customMode = button.dataset.pricing === 'custom';
      pricingButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      priceCards.forEach(card => {
        const price = card.querySelector('.price');
        const cta = card.querySelector('[data-plan]');
        if (price && price.dataset.originalText) {
          if (customMode && !card.classList.contains('custom-price-card')) {
            price.textContent = 'Request a quote';
            price.classList.add('price-quote-mode');
          } else {
            price.textContent = price.dataset.originalText;
            price.classList.remove('price-quote-mode');
          }
        }
        if (cta) {
          cta.textContent = customMode ? 'Request a Quote →' : cta.dataset.originalText;
          cta.setAttribute('aria-label', `${customMode ? 'Request a quote for' : 'Get started with'} ${cta.dataset.plan}`);
        }
      });
    });
  });

  const projectGrid = document.querySelector('#project-grid');
  document.querySelectorAll('[data-scroll]').forEach(button => button.addEventListener('click', () => {
    if (!projectGrid) return;
    const direction = button.dataset.scroll === 'right' ? 1 : -1;
    projectGrid.scrollBy({ left: direction * Math.max(projectGrid.clientWidth * .65, 250), behavior: 'smooth' });
  }));
})();