const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');
const themeColor = document.querySelector('meta[name="theme-color"]');

function applyTheme(theme, save = false) {
  const isDark = theme === 'dark';
  document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
  themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
  themeToggle.title = `Switch to ${isDark ? 'light' : 'dark'} mode`;
  themeToggle.querySelector('.theme-label').textContent = isDark ? 'Light mode' : 'Dark mode';
  themeToggle.querySelector('.theme-icon').textContent = isDark ? '☼' : '◐';
  themeColor.setAttribute('content', isDark ? '#171816' : '#f6f0cf');

  if (save) {
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch {
      // The selected theme still applies for this visit when storage is unavailable.
    }
  }
}

let initialTheme = 'light';
try {
  initialTheme = localStorage.getItem('portfolio-theme') || 'light';
} catch {
  // Keep the default light theme when storage is unavailable.
}
applyTheme(initialTheme);

themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme, true);
});

menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  navLinks.classList.toggle('is-open', !expanded);
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    navLinks.classList.remove('is-open');
  });
});

document.querySelectorAll('[data-gallery]').forEach((gallery) => {
  const viewport = gallery.querySelector('.gallery-viewport');
  const slides = [...gallery.querySelectorAll('.gallery-slide')];
  const dots = [...gallery.querySelectorAll('.gallery-dot')];
  const status = gallery.querySelector('.gallery-status');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let activeIndex = 0;

  const goToSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    viewport.scrollTo({
      left: activeIndex * viewport.clientWidth,
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
    updateControls(activeIndex);
  };

  const updateControls = (index = Math.round(viewport.scrollLeft / viewport.clientWidth)) => {
    activeIndex = Math.max(0, Math.min(slides.length - 1, index));
    slides.forEach((slide, slideIndex) => {
      if (slideIndex === activeIndex) slide.removeAttribute('aria-hidden');
      else slide.setAttribute('aria-hidden', 'true');
    });
    dots.forEach((dot, index) => {
      if (index === activeIndex) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
    status.textContent = `${activeIndex + 1} / ${slides.length}`;
  };

  updateControls(0);
  gallery.querySelector('.gallery-prev').addEventListener('click', () => goToSlide(activeIndex - 1));
  gallery.querySelector('.gallery-next').addEventListener('click', () => goToSlide(activeIndex + 1));
  dots.forEach((dot, index) => dot.addEventListener('click', () => goToSlide(index)));

  viewport.addEventListener('scroll', () => window.requestAnimationFrame(() => updateControls()), { passive: true });
  viewport.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      goToSlide(activeIndex + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });

  if ('ResizeObserver' in window) {
    new ResizeObserver(() => {
      viewport.scrollLeft = activeIndex * viewport.clientWidth;
    }).observe(viewport);
  }
});

const revealItems = document.querySelectorAll(
  '.about-grid, .education-card, .section-heading, .skill-card, .project-card, .proof-content, .service-content, .contact-main, .social-grid'
);

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item, index) => {
    item.dataset.reveal = '';
    if (item.classList.contains('skill-card')) item.style.transitionDelay = `${(index % 4) * 70}ms`;
    observer.observe(item);
  });
}
