/**
 * Footer — elegant multi-column footer with wide logo, social icons,
 * extensive nav links, contact info, and newsletter signup.
 */
export function renderFooter() {
  const container = document.getElementById('footer');
  if (!container) return;

  container.innerHTML = `
    <footer class="relative overflow-hidden">

      <!-- Top CTA Strip -->
      <div class="relative py-16 md:py-20 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-brand-600 via-purple-600 to-brand-700"></div>
        <div class="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div class="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-20 -left-20 w-72 h-72 bg-accent-400/10 rounded-full blur-3xl"></div>
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 class="text-2xl md:text-3xl lg:text-4xl font-bold font-montserrat text-white">Ready to Grow Your Brand?</h3>
            <p class="text-white/70 mt-2 text-sm md:text-base max-w-lg">Let's build something extraordinary together. Speak to our experts today.</p>
          </div>
          <button onclick="window.gsb?.openModal()" class="group px-8 py-4 bg-white text-brand-600 font-bold rounded-full hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 text-sm md:text-base flex items-center gap-2">
            Get Free Consultation
            <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </button>
        </div> 
      </div>

      <!-- Main Footer -->
      <div class="bg-surface-950 relative">
        <div class="absolute inset-0 bg-dot-pattern opacity-30"></div>
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">

          <!-- Top: Logo + Socials -->
          <div class="flex flex-col md:flex-row items-center justify-between gap-6 pb-10 border-b border-white/10">
            <a href="/" class="flex items-center gap-3 group">
              <img src="/public/gsbrand_logo.jpg" alt="GSBrand Works" class="h-11 w-auto rounded-lg object-contain shadow-lg" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
 
            </a>
            <div class="flex gap-3">
              ${[
                { icon: 'fa-facebook-f', label: 'Facebook', color: 'hover:bg-blue-600' },
                { icon: 'fa-instagram', label: 'Instagram', color: 'hover:bg-pink-600' },
                { icon: 'fa-twitter', label: 'Twitter', color: 'hover:bg-sky-500' },
                { icon: 'fa-linkedin-in', label: 'LinkedIn', color: 'hover:bg-blue-700' },
                { icon: 'fa-youtube', label: 'YouTube', color: 'hover:bg-red-600' },
              ].map(s => `
                <a href="#" class="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white ${s.color} hover:border-transparent transition-all duration-300" aria-label="${s.label}">
                  <i class="fab ${s.icon} text-sm"></i>
                </a>
              `).join('')}
            </div>
          </div>

          <!-- Links Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10 pt-10">

            <!-- Company -->
            <div>
              <h5 class="text-xs font-bold uppercase tracking-widest text-brand-400 mb-5">Company</h5>
              <ul class="space-y-3">
                ${[
                  ['About Us', '/about.html'],
                  ['Our Team', '/about.html#team'],
                  ['Our Process', '/about.html#process'],
                  ['Our Values', '/about.html#values'],
                  ['Careers', '/contact.html'],
                ].map(([n, l]) => `<li><a href="${l}" class="text-gray-400 hover:text-white text-sm transition-colors duration-200 hover:pl-1">${n}</a></li>`).join('')}
              </ul>
            </div>

            <!-- Services -->
            <div>
              <h5 class="text-xs font-bold uppercase tracking-widest text-brand-400 mb-5">Services</h5>
              <ul class="space-y-3">
                ${[
                  ['Web Development', '/services/web-development.html'],
                  ['Web Design', '/services/web-design.html'],
                  ['App Development', '/services/app-development.html'],
                  ['Digital Marketing', '/services/digital-marketing.html'],
                  ['SEO', '/services/seo.html'],
                  ['E-commerce', '/services/ecommerce.html'],
                  ['Branding', '/services/branding.html'],
                ].map(([n, l]) => `<li><a href="${l}" class="text-gray-400 hover:text-white text-sm transition-colors duration-200 hover:pl-1">${n}</a></li>`).join('')}
              </ul>
            </div>

            <!-- Resources -->
            <div>
              <h5 class="text-xs font-bold uppercase tracking-widest text-brand-400 mb-5">Resources</h5>
              <ul class="space-y-3">
                ${[
                  ['Portfolio', '/portfolio.html'],
                  ['Clients', '/clients.html'],
                  ['Case Studies', '/portfolio.html'],
                  ['Blog', '#'],
                  ['FAQs', '/contact.html#faq'],
                ].map(([n, l]) => `<li><a href="${l}" class="text-gray-400 hover:text-white text-sm transition-colors duration-200 hover:pl-1">${n}</a></li>`).join('')}
              </ul>
            </div>

            <!-- Contact -->
            <div>
              <h5 class="text-xs font-bold uppercase tracking-widest text-brand-400 mb-5">Get In Touch</h5>
              <ul class="space-y-3">
                <li class="flex items-start gap-3">
                  <i class="fas fa-location-dot text-brand-400 mt-1 w-4 text-center text-xs"></i>
                  <span class="text-gray-400 text-sm leading-relaxed">B1/606, The Landmark, Kudasan, Gandhinagar, Gujarat – 382419</span>
                </li>
                <li class="flex items-center gap-3">
                  <i class="fas fa-phone-volume text-brand-400 w-4 text-center text-xs"></i>
                  <a href="tel:+917383930301" class="text-gray-400 hover:text-white text-sm transition-colors">+91 7383930301</a>
                </li>
                <li class="flex items-center gap-3">
                  <i class="fas fa-at text-brand-400 w-4 text-center text-xs"></i>
                  <a href="mailto:info@growstartup.in" class="text-gray-400 hover:text-white text-sm transition-colors">info@growstartup.in</a>
                </li>
                <li class="flex items-center gap-3">
                  <i class="fas fa-business-time text-brand-400 w-4 text-center text-xs"></i>
                  <span class="text-gray-400 text-sm">Mon – Sat: 10 AM – 7 PM</span>
                </li>
              </ul>
            </div>

            <!-- Newsletter -->
            <div class="col-span-2 sm:col-span-3 lg:col-span-1">
              <h5 class="text-xs font-bold uppercase tracking-widest text-brand-400 mb-5">Stay Updated</h5>
              <p class="text-gray-400 text-sm mb-4 leading-relaxed">Subscribe for the latest in tech, design & marketing.</p>
              <form onsubmit="event.preventDefault();window.showToast?.('Subscribed successfully!','success');this.reset();" class="flex gap-2">
                <input type="email" required placeholder="Your email" class="flex-1 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:border-brand-500 focus:outline-none transition-colors">
                <button type="submit" class="px-4 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white transition-colors" aria-label="Subscribe">
                  <i class="fas fa-paper-plane text-sm"></i>
                </button>
              </form>
            </div>
          </div>

          <!-- Bottom Bar -->
          <div class="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p class="text-gray-500 text-xs text-center md:text-left">
              &copy; ${new Date().getFullYear()} Grow Startup Advisors Pvt. Ltd. All Rights Reserved.
            </p>
            <div class="flex items-center gap-4 text-xs text-gray-500">
              <a href="#" class="hover:text-brand-400 transition-colors">Privacy Policy</a>
              <span class="text-white/10">|</span>
              <a href="#" class="hover:text-brand-400 transition-colors">Terms of Service</a>
              <span class="text-white/10">|</span>
              <a href="#" class="hover:text-brand-400 transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `;
}
