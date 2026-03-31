/**
 * Floating action buttons — WhatsApp chat + scroll-to-top + Book Consultant.
 * Mobile-optimized with smaller sizes and glow animations.
 */
export function renderFloating() {
  let root = document.getElementById('floating-root');
  if (!root) {
    root = document.createElement('div');
    root.id = 'floating-root';
    document.body.appendChild(root);
  }

  root.innerHTML = `
    <!-- WhatsApp -->
    <a href="https://wa.me/917383930301" target="_blank" rel="noopener noreferrer"
       class="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-50 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-green-500 text-white rounded-full shadow-2xl hover:scale-110 active:scale-90 transition-transform duration-300 glow-pulse-green"
       aria-label="Chat on WhatsApp" style="color: currentColor;">
      <i class="fab fa-whatsapp text-xl sm:text-2xl"></i>
    </a>

    <!-- Book Consultant -->
    <button onclick="window.gsb?.openModal()"
       class="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 btn-gradient text-white font-bold text-xs sm:text-sm rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-transform duration-300 glow-pulse-brand">
      <i class="fas fa-phone-alt"></i>
      <span class="hidden sm:inline">Book Consultant</span>
      <span class="sm:hidden">Book Now</span>
    </button>

    <!-- Scroll to Top -->
    <button id="scroll-top-btn"
       class="fixed bottom-[4.5rem] sm:bottom-24 right-4 sm:right-6 z-50 w-10 h-10 sm:w-11 sm:h-11 rounded-full glass text-white/60 hover:text-white hover:bg-brand-600 transition-all duration-300 items-center justify-center shadow-lg"
       aria-label="Scroll to top" style="display:none;">
      <i class="fas fa-chevron-up text-xs sm:text-sm"></i>
    </button>
  `;

  const scrollBtn = document.getElementById('scroll-top-btn');
  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
      scrollBtn.style.display = window.scrollY > 600 ? 'flex' : 'none';
      scrollTicking = false;
    });
  }, { passive: true });

  scrollBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
