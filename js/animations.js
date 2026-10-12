(() => {
  const doc = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const coarsePointer = window.matchMedia('(hover: none), (pointer: coarse)');
  const revealElements = [...document.querySelectorAll('.reveal')];
  const heroTitle = document.querySelector('.hero-copy h1');

  // Keep content visible if JS is disabled; enable hidden reveal states only after setup.
  if (!reduceMotion.matches && 'IntersectionObserver' in window) {
    doc.classList.add('js-motion');
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' });
    revealElements.forEach(element => revealObserver.observe(element));
  } else {
    revealElements.forEach(element => element.classList.add('is-visible'));
  }

  // Wrap the existing H1 lines without changing its text or semantic heading level.
  if (heroTitle && !reduceMotion.matches && !heroTitle.querySelector('.hero-line')) {
    const nodes = [...heroTitle.childNodes];
    const lines = [];
    let current = document.createElement('span');
    current.className = 'hero-line';
    let inner = document.createElement('span');
    inner.className = 'hero-line-inner';
    current.appendChild(inner);
    nodes.forEach(node => {
      if (node.nodeName === 'BR') {
        lines.push(current);
        current = document.createElement('span');
        current.className = 'hero-line';
        inner = document.createElement('span');
        inner.className = 'hero-line-inner';
        current.appendChild(inner);
      } else if (node.nodeType === Node.ELEMENT_NODE && node.nodeName === 'SPAN') {
        inner.appendChild(node.cloneNode(true));
      } else {
        inner.appendChild(node.cloneNode(true));
      }
    });
    lines.push(current);
    heroTitle.replaceChildren(...lines);
  }

  // Header state and active navigation use a single lightweight observer.
  const header = document.querySelector('.site-header');
  const navLinks = [...document.querySelectorAll('.primary-nav a[href^="#"]')].filter(a => a.hash && a.hash.length > 1);
  const sectionLinks = new Map();
  navLinks.forEach(link => {
    const section = document.querySelector(link.hash);
    if (section) sectionLinks.set(section, link);
  });
  const updateHeader = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if ('IntersectionObserver' in window && sectionLinks.size) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          link.classList.remove('is-active');
          link.removeAttribute('aria-current');
        });
        const active = sectionLinks.get(entry.target);
        if (active) {
          active.classList.add('is-active');
          active.setAttribute('aria-current', 'location');
        }
      });
    }, { rootMargin: '-22% 0px -65% 0px', threshold: 0 });
    sectionLinks.forEach((_, section) => sectionObserver.observe(section));
  }

  // Small desktop-only pointer parallax, throttled with rAF and disabled for reduced motion/coarse pointers.
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual && !reduceMotion.matches && !coarsePointer.matches && window.matchMedia('(min-width: 1000px)').matches) {
    let frame = 0;
    let targetX = 0, targetY = 0;
    const reset = () => {
      heroVisual.style.setProperty('--parallax-x', '0px');
      heroVisual.style.setProperty('--parallax-y', '0px');
    };
    heroVisual.addEventListener('pointermove', event => {
      const rect = heroVisual.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - .5) * 8;
      targetY = ((event.clientY - rect.top) / rect.height - .5) * 6;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        heroVisual.style.setProperty('--parallax-x', `${targetX.toFixed(2)}px`);
        heroVisual.style.setProperty('--parallax-y', `${targetY.toFixed(2)}px`);
        frame = 0;
      });
    }, { passive: true });
    heroVisual.addEventListener('pointerleave', reset, { passive: true });
  }

  // Process line progresses when visible; observer avoids work while off screen.
  const processSection = document.querySelector('.process-section');
  if (processSection && 'IntersectionObserver' in window && !reduceMotion.matches) {
    const processObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          processSection.classList.add('is-visible');
          processObserver.unobserve(processSection);
        }
      });
    }, { threshold: 0.18 });
    processObserver.observe(processSection);
  }
})();