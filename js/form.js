(() => {
  const toast = document.querySelector('.toast');
  let toastTimer;

  const showToast = message => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
  };

  document.querySelectorAll('[data-plan]').forEach(link => {
    link.addEventListener('click', event => {
      const plan = link.dataset.plan || 'Website project';
      const subject = encodeURIComponent(`CODERAID enquiry — ${plan} package`);
      const body = encodeURIComponent(
        `Hello CODERAID,\\n\\nI am interested in the ${plan} package.\\n\\nBusiness name:\\nProject requirements:\\nPreferred timeline:\\n`
      );
      link.href = `mailto:hello@example.com?subject=${subject}&body=${body}`;
      // Keep the mailto link explicit and functional; browser opens the user's configured email app.
    });
  });

  const newsletter = document.querySelector('#newsletter-form');
  if (newsletter) {
    newsletter.addEventListener('submit', event => {
      event.preventDefault();
      const email = document.querySelector('#newsletter-email');
      const message = document.querySelector('#newsletter-message');
      if (!email || !email.checkValidity()) {
        email?.reportValidity();
        return;
      }
      if (message) {
        message.textContent = 'This demo form does not subscribe you yet. Connect an email platform before launch.';
      }
      showToast('Newsletter is not connected yet.');
    });
  }

  document.querySelectorAll('a[data-policy]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      showToast(`Add your published ${link.dataset.policy} page URL before launch.`);
    });
  });
})();