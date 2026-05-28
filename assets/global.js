document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('ziyu-loaded');

  const reveals = document.querySelectorAll(
    '.ziyu-card, .ziyu-project, .ziyu-manifesto, .ziyu-timeline-item'
  );

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('ziyu-reveal-active');
        }
      });
    },
    {
      threshold: 0.12,
    }
  );

  reveals.forEach(el => {
    el.classList.add('ziyu-reveal');
    observer.observe(el);
  });

  const links = document.querySelectorAll('a[href]');

  links.forEach(link => {
    const href = link.getAttribute('href');

    const shouldSkip =
      !href ||
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('javascript:') ||
      link.hasAttribute('target') ||
      link.closest('.shopify-section')?.classList.contains('shopify-section-group-header-group') === false && href.includes('/admin') ||
      href.includes('preview_theme_id') ||
      href.includes('shopify');

    if (shouldSkip) return;

    link.addEventListener('click', e => {
      const url = new URL(link.href, window.location.origin);

      if (url.origin !== window.location.origin) return;

      e.preventDefault();
      document.body.classList.add('ziyu-page-transition');

      setTimeout(() => {
        window.location.href = link.href;
      }, 300);
    });
  });
});