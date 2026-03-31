/**
 * Lightweight, GPU-accelerated animation system optimized for mobile.
 * Uses IntersectionObserver for scroll reveals, requestAnimationFrame for
 * smooth parallax, and passive event listeners throughout.
 */

const isMobile = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  || (window.innerWidth < 768);
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initScrollReveal() {
  const revealSelectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale, .fade-up, .text-reveal, .icon-bounce-in, .line-grow';
  const reveals = document.querySelectorAll(revealSelectors);
  if (!reveals.length) return;

  function revealElement(el) {
    el.classList.add('visible');
    const staggerItems = el.querySelectorAll('.stagger-item');
    const delay = isMobile ? 60 : 100;
    staggerItems.forEach((item, i) => {
      item.style.transitionDelay = `${i * delay}ms`;
      requestAnimationFrame(() => { item.classList.add('visible'); });
    });
  }

  if (prefersReduced) {
    reveals.forEach(el => revealElement(el));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        revealElement(entry.target);
      }
    });
  }, {
    threshold: isMobile ? 0.05 : 0.1,
    rootMargin: isMobile ? '0px 0px -20px 0px' : '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));

  function checkInitialVisibility() {
    reveals.forEach(el => {
      if (!el.classList.contains('visible')) {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          revealElement(el);
        }
      }
    });
  }

  requestAnimationFrame(() => {
    setTimeout(checkInitialVisibility, 80);
    setTimeout(checkInitialVisibility, 400);
  });
  window.addEventListener('load', checkInitialVisibility);
}

/**
 * Lightweight scroll-based parallax for mobile and mousemove for desktop.
 * On mobile: elements shift slightly on scroll (via rAF, no jank).
 * On desktop: original mousemove parallax.
 */
export function initParallax() {
  const hero = document.querySelector('[data-parallax]');
  if (!hero || prefersReduced) return;

  if (isMobile) {
    initScrollParallax(hero);
  } else {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const bgs = hero.querySelectorAll('[data-parallax-layer]');
      bgs.forEach(bg => {
        const speed = parseFloat(bg.dataset.parallaxLayer || '20');
        bg.style.transform = `translate3d(${x * speed}px, ${y * speed}px, 0)`;
      });
    }, { passive: true });
  }
}

function initScrollParallax(hero) {
  const layers = hero.querySelectorAll('[data-parallax-layer]');
  if (!layers.length) return;

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      const heroH = hero.offsetHeight;
      if (scrollY < heroH * 1.5) {
        const progress = scrollY / heroH;
        layers.forEach(layer => {
          const speed = parseFloat(layer.dataset.parallaxLayer || '20') * 0.3;
          layer.style.transform = `translate3d(0, ${progress * speed}px, 0)`;
        });
      }
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
}

/**
 * Tilt: Desktop = 3D mouse tilt. Mobile = subtle tap/touch feedback.
 */
export function initTiltCards() {
  const cards = document.querySelectorAll('.tilt-card');
  if (!cards.length || prefersReduced) return;

  if (isMobile) {
    cards.forEach(card => {
      card.addEventListener('touchstart', () => {
        card.style.transform = 'scale(0.98) translateZ(0)';
        card.style.transition = 'transform 0.2s ease-out';
      }, { passive: true });
      card.addEventListener('touchend', () => {
        card.style.transform = '';
      }, { passive: true });
    });
    return;
  }

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (y - 0.5) * -6;
      const rotateY = (x - 0.5) * 6;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/**
 * Mobile scroll-based section animations: adds gentle vertical parallax
 * to section backgrounds and decorative elements as user scrolls.
 */
export function initMobileScrollEffects() {
  if (!isMobile || prefersReduced) return;

  const sections = document.querySelectorAll('section');
  const decorated = [];

  sections.forEach(section => {
    const decorBgs = section.querySelectorAll('.animate-blob, .bg-grid-pattern, .bg-dot-pattern');
    if (decorBgs.length) {
      decorated.push({ section, decorBgs });
    }
  });

  if (!decorated.length) return;

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const viewH = window.innerHeight;
      decorated.forEach(({ section, decorBgs }) => {
        const rect = section.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < viewH) {
          const progress = (viewH - rect.top) / (viewH + rect.height);
          const shift = (progress - 0.5) * 15;
          decorBgs.forEach(bg => {
            bg.style.transform = `translate3d(0, ${shift}px, 0)`;
          });
        }
      });
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
}

/**
 * Animate page header elements on load with staggered fade-up.
 */
export function initPageHeaderAnimation() {
  const headers = document.querySelectorAll('section:first-of-type .relative > span, section:first-of-type .relative > h1, section:first-of-type .relative > h2, section:first-of-type .relative > p');
  if (!headers.length || prefersReduced) return;

  headers.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px) translateZ(0)';
    el.style.transition = `opacity 0.6s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)`;
    el.style.transitionDelay = `${i * 120 + 100}ms`;
  });

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      headers.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0) translateZ(0)';
      });
    });
  });
}
