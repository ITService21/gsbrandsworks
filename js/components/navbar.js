/**
 * Navbar — fixed top bar with mega-menu dropdowns on desktop/tablet, accordion on mobile.
 * Hovering a nav item with children reveals a wide dropdown that shows an
 * illustration on the left and categorised link columns on the right.
 */

const NAV_LINKS = [
  { name: 'Home', link: '/' },
  {
    name: 'Company',
    megaMenu: true,
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    imageTitle: 'About GSBrand Works',
    imageDesc: 'We empower brands with cutting-edge digital solutions.',
    imageIcon: 'fa-landmark',
    ctaLink: '/about.html',
    columns: [
      {
        heading: 'Know Us',
        links: [
          { name: 'About Us', link: '/about.html', icon: 'fa-circle-info', desc: 'Our story & mission' },
          { name: 'Our Team', link: '/about.html#team', icon: 'fa-people-group', desc: 'Meet the founders' },
          { name: 'Our Values', link: '/about.html#values', icon: 'fa-heart-pulse', desc: 'What drives us' },
        ]
      },
      {
        heading: 'Explore',
        links: [
          { name: 'Our Process', link: '/about.html#process', icon: 'fa-diagram-successor', desc: 'How we deliver' },
          { name: 'Case Studies', link: '/portfolio.html', icon: 'fa-folder-open', desc: 'Real project results' },
          { name: 'Clients', link: '/clients.html', icon: 'fa-handshake-angle', desc: '220+ happy clients' },
        ]
      }
    ]
  },
  {
    name: 'Services',
    megaMenu: true,
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=400',
    imageTitle: 'Our Services',
    imageDesc: 'Complete 360° digital solutions for your business growth.',
    imageIcon: 'fa-cubes-stacked',
    ctaLink: '/portfolio.html',
    columns: [
      {
        heading: 'Development',
        links: [
          { name: 'Web Development', link: '/services/web-development.html', icon: 'fa-laptop-code', desc: 'Modern web apps' },
          { name: 'App Development', link: '/services/app-development.html', icon: 'fa-tablet-screen-button', desc: 'iOS & Android apps' },
          { name: 'E-commerce', link: '/services/ecommerce.html', icon: 'fa-bag-shopping', desc: 'Online stores' },
          { name: 'WordPress', link: '/services/wordpress.html', icon: 'fab fa-wordpress-simple', desc: 'CMS solutions' },
        ]
      },
      {
        heading: 'Design',
        links: [
          { name: 'Web Design', link: '/services/web-design.html', icon: 'fa-pen-nib', desc: 'Stunning UI/UX' },
          { name: 'UI/UX Design', link: '/services/web-design.html#uiux', icon: 'fa-bezier-curve', desc: 'User-first design' },
          { name: 'Branding', link: '/services/branding.html', icon: 'fa-swatchbook', desc: 'Brand identity' },
        ]
      },
      {
        heading: 'Marketing',
        links: [
          { name: 'Digital Marketing', link: '/services/digital-marketing.html', icon: 'fa-chart-pie', desc: 'Growth campaigns' },
          { name: 'SEO', link: '/services/seo.html', icon: 'fa-magnifying-glass-chart', desc: 'Rank higher on Google' },
          { name: 'Social Media', link: '/services/social-media.html', icon: 'fa-hashtag', desc: 'Engage audiences' },
        ]
      }
    ]
  },
  { name: 'Portfolio', link: '/portfolio.html' },
  { name: 'Clients', link: '/clients.html' },
  { name: 'Contact', link: '/contact.html' },
];

/** Builds mega-menu dropdown HTML for a nav item */
function buildMegaPanel(item) {
  return `
    <div class="mega-dropdown">
      <div class="max-w-6xl mx-auto px-4">
          <div class="rounded-2xl shadow-2xl border border-white/10 overflow-hidden" style="background:rgba(10,8,30,0.99);backdrop-filter:blur(24px) saturate(180%);-webkit-backdrop-filter:blur(24px) saturate(180%)">
          <div class="flex min-h-[280px]">
            <!-- Left: Image Card -->
            <div class="w-72 flex-shrink-0 relative overflow-hidden hidden md:block">
              <img src="${item.image}" alt="${item.imageTitle}" class="absolute inset-0 w-full h-full object-cover" loading="lazy">
              <div class="absolute inset-0 bg-gradient-to-t from-surface-950/95 via-brand-900/50 to-brand-900/20"></div>
              <div class="relative h-full flex flex-col justify-end p-6">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center mb-3 shadow-lg">
                  <i class="fas ${item.imageIcon} text-white text-sm"></i>
                </div>
                <h4 class="text-white font-bold font-montserrat text-lg leading-tight">${item.imageTitle}</h4>
                <p class="text-gray-300 text-xs mt-2 leading-relaxed">${item.imageDesc}</p>
                <a href="${item.ctaLink}" class="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-400 hover:text-brand-300 transition-colors">
                  Learn More <i class="fas fa-arrow-right text-[9px]"></i>
                </a>
              </div>
            </div>
            <!-- Right: Link Columns -->
            <div class="flex-1 p-6 lg:p-8">
              <div class="grid grid-cols-${item.columns.length} gap-6 lg:gap-8">
                ${item.columns.map(col => `
                  <div>
                    <h5 class="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-400 mb-4 pb-2 border-b border-white/5">${col.heading}</h5>
                    <ul class="space-y-0.5">
                      ${col.links.map(sub => `
                        <li>
                          <a href="${sub.link}" class="mega-link flex items-start gap-3 px-3 py-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200 group/link">
                            <div class="w-8 h-8 rounded-lg bg-white/5 group-hover/link:bg-brand-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-200">
                              <i class="fas ${sub.icon} text-brand-400 group-hover/link:text-brand-300 text-xs transition-colors"></i>
                            </div>
                            <div>
                              <span class="text-sm font-medium block leading-tight">${sub.name}</span>
                              <span class="text-[11px] text-gray-500 group-hover/link:text-gray-400 leading-tight block mt-0.5">${sub.desc}</span>
                            </div>
                          </a>
                        </li>
                      `).join('')}
                    </ul>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

export function renderNavbar() {
  const container = document.getElementById('navbar');
  if (!container) return;

  container.innerHTML = `
    <nav class="fixed top-0 left-0 w-full z-[9990] transition-all duration-500" id="main-nav">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 md:h-20">

          <!-- Logo -->
          <a href="/" class="flex items-center group flex-shrink-0 gap-3" aria-label="GSBrand Works Home">
            <img src="/public/gsbrand_logo.jpg" alt="GSBrand Works" class="h-9 md:h-11 w-auto rounded-lg object-contain shadow-lg group-hover:scale-105 transition-transform duration-300" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
            <div class="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 items-center justify-center text-white font-bold text-xl shadow-lg border-2 border-white/20 group-hover:scale-105 transition-transform duration-300 hidden">G</div>
          </a>

          <!-- Desktop Nav -->
          <div class="hidden lg:flex items-center gap-0 h-16 md:h-20">
            ${NAV_LINKS.map(item => {
              if (item.megaMenu) {
                return `
                  <div class="nav-mega-item relative flex items-center h-full">
                    <button class="nav-mega-btn px-4 h-full text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-1.5">
                      ${item.name}
                      <i class="fas fa-chevron-down text-[10px] transition-transform duration-300"></i>
                    </button>
                    ${buildMegaPanel(item)}
                  </div>
                `;
              }
              return `<a href="${item.link}" class="px-4 h-full flex items-center text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200">${item.name}</a>`;
            }).join('')}
          </div>

          <!-- CTA Button (Desktop) -->
          <div class="hidden lg:block">
            <button id="nav-cta-btn" class="btn-gradient inline-flex items-center px-6 py-2.5 text-sm font-semibold rounded-full text-white shadow-lg hover:shadow-xl active:scale-95">
              <i class="fas fa-paper-plane mr-2 text-xs"></i> Get Started
            </button>
          </div>

          <!-- Mobile Hamburger -->
          <button class="lg:hidden hamburger relative w-10 h-10 flex flex-col items-center justify-center gap-[6px]" id="hamburger-btn" aria-label="Toggle menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div class="mobile-menu lg:hidden bg-surface-900/98 backdrop-blur-xl border-t border-white/10" id="mobile-menu">
        <div class="px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
          ${NAV_LINKS.map((item, idx) => {
            if (item.megaMenu) {
              const allLinks = item.columns.flatMap(c => c.links);
              return `
                <div class="border-b border-white/5 pb-1">
                  <button class="mobile-menu-toggle w-full flex items-center justify-between px-3 py-3 text-sm font-medium text-gray-300 hover:text-white" data-target="mobile-sub-${idx}">
                    ${item.name}
                    <i class="fas fa-chevron-down text-xs transition-transform duration-200"></i>
                  </button>
                  <div class="mobile-submenu pl-4" id="mobile-sub-${idx}">
                    ${allLinks.map(sub => `
                      <a href="${sub.link}" class="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-400 hover:text-white transition-colors">
                        <i class="fas ${sub.icon} text-brand-400 w-4 text-center text-xs"></i>
                        ${sub.name}
                      </a>
                    `).join('')}
                  </div>
                </div>
              `;
            }
            return `<a href="${item.link}" class="block px-3 py-3 text-sm font-medium text-gray-300 hover:text-white border-b border-white/5">${item.name}</a>`;
          }).join('')}
          <button id="mobile-cta-btn" class="w-full mt-3 px-6 py-3 text-sm font-semibold rounded-full text-white btn-gradient shadow-lg">
            <i class="fas fa-paper-plane mr-2"></i> Get Started
          </button>
        </div>
      </div>
    </nav>
    <div class="h-16 md:h-20"></div>
  `;

  initNavbarEvents();
}

function initNavbarEvents() {
  const nav = document.getElementById('main-nav');
  const hamburger = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  // Scroll: solid bg + shadow — uses inline style for reliable opaque bg
  function updateNavBg() {
    if (window.scrollY > 50) {
      nav.style.background = 'rgba(7,6,25,0.97)';
      nav.style.backdropFilter = 'blur(20px) saturate(180%)';
      nav.style.webkitBackdropFilter = 'blur(20px) saturate(180%)';
      nav.classList.add('shadow-2xl', 'border-b', 'border-white/5');
    } else {
      nav.style.background = '';
      nav.style.backdropFilter = '';
      nav.style.webkitBackdropFilter = '';
      nav.classList.remove('shadow-2xl', 'border-b', 'border-white/5');
    }
  }
  window.addEventListener('scroll', updateNavBg, { passive: true });
  updateNavBg();

  // Desktop mega-menu: CSS :hover shows dropdown, JS handles chevron + click toggle
  const megaItems = document.querySelectorAll('.nav-mega-item');

  megaItems.forEach(item => {
    const dropdown = item.querySelector('.mega-dropdown');
    const chevron = item.querySelector('.fa-chevron-down');
    const btn = item.querySelector('.nav-mega-btn');

    item.addEventListener('mouseenter', () => {
      if (dropdown) dropdown.classList.add('open');
      if (chevron) chevron.style.transform = 'rotate(180deg)';
      btn?.classList.add('text-white');
    });
    item.addEventListener('mouseleave', () => {
      if (dropdown) dropdown.classList.remove('open');
      if (chevron) chevron.style.transform = '';
      btn?.classList.remove('text-white');
    });

    // Click toggle for accessibility + touch devices
    btn?.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown?.classList.contains('open');
      // Close all others first
      megaItems.forEach(other => {
        other.querySelector('.mega-dropdown')?.classList.remove('open');
        const otherChevron = other.querySelector('.fa-chevron-down');
        if (otherChevron) otherChevron.style.transform = '';
        other.querySelector('.nav-mega-btn')?.classList.remove('text-white');
      });
      if (!isOpen && dropdown) {
        dropdown.classList.add('open');
        if (chevron) chevron.style.transform = 'rotate(180deg)';
        btn.classList.add('text-white');
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-mega-item')) {
      megaItems.forEach(item => {
        item.querySelector('.mega-dropdown')?.classList.remove('open');
        const ch = item.querySelector('.fa-chevron-down');
        if (ch) ch.style.transform = '';
        item.querySelector('.nav-mega-btn')?.classList.remove('text-white');
      });
    }
  });

  // Mobile menu
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });

  document.querySelectorAll('.mobile-menu-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const submenu = document.getElementById(targetId);
      const icon = btn.querySelector('i');
      submenu.classList.toggle('open');
      icon.style.transform = submenu.classList.contains('open') ? 'rotate(180deg)' : '';
    });
  });

  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
    });
  });

  document.getElementById('nav-cta-btn')?.addEventListener('click', () => {
    window.gsb?.openModal();
  });
  document.getElementById('mobile-cta-btn')?.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    window.gsb?.openModal();
  });

  // Close mega-menu on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.nav-mega-item').forEach(item => {
        item.querySelector('.fa-chevron-down')?.style.setProperty('transform', '');
        item.querySelector('.nav-mega-btn')?.classList.remove('text-white');
      });
    }
  });
}
