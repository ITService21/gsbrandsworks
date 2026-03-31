/**
 * Homepage-specific JS: hero slider, client marquee, FAQ accordion, contact form.
 */
import { API_ENDPOINTS } from '../utils/api.js';
import { showToast } from '../components/toast.js';

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initClientMarquee();
  initFAQ();
  initContactForm();
});

/* ===== Hero Slider ===== */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dotsContainer = document.getElementById('hero-dots');
  if (!slides.length || !dotsContainer) return;

  let current = 0;
  const total = slides.length;
  let interval;

  for (let i = 0; i < total; i++) {
    const dot = document.createElement('button');
    dot.className = `h-2.5 rounded-full transition-all duration-300 ${i === 0 ? 'bg-brand-500 w-8' : 'bg-white/30 w-2.5'}`;
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }

  function goToSlide(index) {
    slides[current].classList.remove('active');
    current = index;
    slides[current].classList.add('active');
    updateDots();
    resetAutoplay();
  }

  function updateDots() {
    const dots = dotsContainer.children;
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = `h-2.5 rounded-full transition-all duration-300 ${i === current ? 'bg-brand-500 w-8' : 'bg-white/30 w-2.5'}`;
    }
  }

  function next() { goToSlide((current + 1) % total); }
  function prev() { goToSlide((current - 1 + total) % total); }

  function resetAutoplay() {
    clearInterval(interval);
    interval = setInterval(next, 6000);
  }

  document.getElementById('hero-next')?.addEventListener('click', next);
  document.getElementById('hero-prev')?.addEventListener('click', prev);

  // Swipe support for mobile
  let touchStartX = 0;
  const slider = document.getElementById('hero-slider');
  slider?.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  slider?.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); }
  }, { passive: true });

  resetAutoplay();
}

/* ===== Client Logo Marquee ===== */
function initClientMarquee() {
  const clients = [
    'TechVista', 'StyleBazaar', 'GreenLeaf', 'FastTrack', 'CloudNine', 'BrightStar',
    'DataFlow', 'UrbanNest', 'FreshBite', 'SmartEdge', 'BlueOcean', 'GoldPath',
    'NetPrime', 'EcoVibe', 'PixelWave', 'SwiftTech', 'NovaDigital', 'ZenCraft',
  ];

  const logoHTML = clients.map(name =>
    `<div class="flex-shrink-0 px-6 py-3 glass rounded-lg hover:bg-white/5 transition-colors duration-300 cursor-pointer">
       <span class="text-gray-400 hover:text-white font-semibold text-sm whitespace-nowrap transition-colors">${name}</span>
     </div>`
  ).join('');

  const el1 = document.getElementById('marquee-logos-1');
  const el2 = document.getElementById('marquee-logos-2');
  if (el1) el1.innerHTML = logoHTML + logoHTML;
  if (el2) el2.innerHTML = logoHTML + logoHTML;
}

/* ===== FAQ Accordion ===== */
function initFAQ() {
  const container = document.getElementById('faq-container');
  if (!container) return;

  const faqs = [
    {
      q: 'What services does GSBrand Works offer?',
      a: 'We offer a complete 360° range of digital services including web design, web development, mobile app development, digital marketing, SEO, branding, e-commerce solutions, WordPress development, and IT consulting.'
    },
    {
      q: 'How long does it take to build a website?',
      a: 'A standard business website typically takes 2-4 weeks. Complex web applications or e-commerce platforms may take 4-8 weeks depending on requirements. We provide a detailed timeline during the discovery phase.'
    },
    {
      q: 'Do you provide post-launch support?',
      a: 'Absolutely! We offer comprehensive post-launch support including bug fixes, security updates, performance monitoring, and feature enhancements. Our support packages are flexible and tailored to your needs.'
    },
    {
      q: 'What technologies do you use?',
      a: 'We work with modern technologies including React, Node.js, Laravel, Flutter, WordPress, Angular, AWS, MongoDB, MySQL, Python, and more. We choose the best tech stack based on your project requirements.'
    },
    {
      q: 'How much does a project cost?',
      a: 'Project costs vary based on scope, complexity, and timeline. We offer flexible pricing models and provide detailed quotes after understanding your requirements. Contact us for a free consultation and estimate.'
    },
    {
      q: 'Can I see your previous work?',
      a: 'Yes! Visit our Portfolio page to see detailed case studies and examples of projects we\'ve delivered for clients across various industries. We\'re proud of every project we undertake.'
    },
  ];

  container.innerHTML = faqs.map((faq, i) => `
    <div class="glass rounded-2xl overflow-hidden stagger-item group">
      <button class="faq-toggle w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-white/5 transition-colors" data-faq="${i}">
        <span class="text-white font-semibold text-sm md:text-base pr-4">${faq.q}</span>
        <i class="fas fa-plus text-brand-400 text-sm flex-shrink-0 transition-transform duration-300"></i>
      </button>
      <div class="accordion-content" id="faq-answer-${i}">
        <div class="px-5 md:px-6 pb-5 md:pb-6">
          <p class="text-gray-400 text-sm leading-relaxed">${faq.a}</p>
        </div>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.faq-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = btn.dataset.faq;
      const content = document.getElementById(`faq-answer-${idx}`);
      const icon = btn.querySelector('i');
      const wasOpen = content.classList.contains('open');

      // Close all
      container.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('open'));
      container.querySelectorAll('.faq-toggle i').forEach(ic => {
        ic.classList.remove('fa-minus', 'rotate-180');
        ic.classList.add('fa-plus');
      });

      if (!wasOpen) {
        content.classList.add('open');
        icon.classList.remove('fa-plus');
        icon.classList.add('fa-minus');
      }
    });
  });
}

/* ===== Contact Form ===== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const phone = form.querySelector('.contact-phone');
  phone?.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const phoneVal = fd.get('phone');
    if (phoneVal.length !== 10) {
      showToast('Phone number must be exactly 10 digits', 'error');
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
    btn.disabled = true;

    try {
      const res = await fetch(API_ENDPOINTS.SEND_FORM_MAIL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'info@growstartup.in',
          subject: `Contact Form - ${fd.get('subject') || 'General Inquiry'}`,
          fields: {
            Name: fd.get('name'),
            Email: fd.get('email'),
            Phone: phoneVal,
            Subject: fd.get('subject'),
            Message: fd.get('message'),
          }
        })
      });
      if (res.ok) {
        showToast('Message sent! We will get back to you soon.', 'success');
        form.reset();
      } else {
        showToast('Failed to send. Please try again.', 'error');
      }
    } catch {
      showToast('Failed to send. Please try again.', 'error');
    }
    btn.innerHTML = originalHTML;
    btn.disabled = false;
  });
}
