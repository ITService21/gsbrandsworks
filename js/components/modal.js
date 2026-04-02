/**
 * Form Modal — "Book a Consultant" modal with premium indigo/violet theme.
 */
import { API_ENDPOINTS } from '../utils/api.js';
import { showToast } from './toast.js';

let isOpen = false;

export function renderModal() {
  let root = document.getElementById('modal-root');
  if (!root) {
    root = document.createElement('div');
    root.id = 'modal-root';
    document.body.appendChild(root);
  }

  root.innerHTML = `
    <div class="mt-[150px] h-[60%] md:h-auto md:mt-0 fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm modal-overlay" id="form-modal-overlay">
      <div class="modal-content glass-strong rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 relative max-h-[90vh] overflow-y-auto" style="background: linear-gradient(135deg, rgba(17,14,43,0.97), rgba(12,10,31,0.97));">
        <button id="modal-close-btn" class="absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center text-gray-400 hover:text-red-400 transition-colors" aria-label="Close">
          <i class="fas fa-times text-sm"></i>
        </button>
        <button id="modal-dismiss-btn" class="absolute top-3 left-3 text-xs text-gray-500 hover:text-brand-400 underline hidden" aria-label="Don't show again">
          Don't show again
        </button>

        <div class="text-center mb-5">
          <div class="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center shadow-lg">
            <i class="fas fa-comments text-white text-xl"></i>
          </div>
          <h2 class="text-2xl font-bold text-white font-montserrat">Book a Consultant</h2>
          <p class="text-xs text-gray-400 mt-1">Fill the form or call us directly for instant support.</p>
        </div>

        <div class="flex items-center justify-center mb-5">
          <a href="tel:+917383930301" class="flex items-center gap-2 px-5 py-2.5 btn-gradient text-white rounded-full font-semibold text-sm shadow hover:scale-105 transition-transform">
            <i class="fas fa-phone-volume"></i> Call Now: +91 7383930301
          </a>
        </div>

        <form id="modal-form" class="space-y-3.5">
          <div>
            <label class="block text-xs font-semibold text-gray-300 mb-1">Name <span class="text-red-400">*</span></label>
            <input type="text" name="name" required class="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:border-brand-500 focus:outline-none transition-colors" placeholder="Your Name">
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-300 mb-1">Email <span class="text-red-400">*</span></label>
            <input type="email" name="email" required class="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:border-brand-500 focus:outline-none transition-colors" placeholder="Your Email">
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-300 mb-1">Phone <span class="text-red-400">*</span></label>
            <input type="tel" name="phone" required maxlength="10" class="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:border-brand-500 focus:outline-none transition-colors" placeholder="10 digit mobile number" id="modal-phone">
            <p class="text-red-400 text-xs mt-1 hidden" id="phone-error">Phone number must be exactly 10 digits</p>
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-300 mb-1">Project Type <span class="text-gray-500">(optional)</span></label>
            <div class="flex flex-wrap gap-2" id="scheme-buttons">
              ${['Website','App','Branding','Marketing','SEO','Other'].map(s => `
                <button type="button" class="scheme-btn px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 glass text-gray-300 hover:text-white hover:border-brand-500/50" data-scheme="${s}">${s}</button>
              `).join('')}
            </div>
            <input type="hidden" name="serviceScheme" id="selected-scheme">
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-300 mb-1">Message <span class="text-red-400">*</span></label>
            <textarea name="message" required rows="3" class="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:border-brand-500 focus:outline-none resize-none transition-colors" placeholder="Tell us about your project"></textarea>
          </div>
          <button type="submit" class="w-full py-3 btn-gradient text-white font-bold rounded-lg shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 text-sm" id="modal-submit-btn">
            Send Request <i class="fas fa-paper-plane ml-2"></i>
          </button>
        </form>
      </div>
    </div>
  `;

  initModalEvents();
}

function initModalEvents() {
  const overlay = document.getElementById('form-modal-overlay');
  const closeBtn = document.getElementById('modal-close-btn');
  const dismissBtn = document.getElementById('modal-dismiss-btn');
  const form = document.getElementById('modal-form');
  const phoneInput = document.getElementById('modal-phone');
  const phoneError = document.getElementById('phone-error');

  closeBtn?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });

  dismissBtn?.addEventListener('click', () => {
    localStorage.setItem('popupDismissed', 'true');
    closeModal();
  });

  phoneInput?.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
    const len = e.target.value.length;
    if (len > 0 && len !== 10) {
      phoneError.classList.remove('hidden');
      phoneInput.classList.add('border-red-500/50');
      phoneInput.classList.remove('border-white/10');
    } else {
      phoneError.classList.add('hidden');
      phoneInput.classList.remove('border-red-500/50');
      phoneInput.classList.add('border-white/10');
    }
  });

  document.querySelectorAll('.scheme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.scheme-btn').forEach(b => {
        b.classList.remove('bg-brand-600', 'text-white', 'border-brand-500');
        b.classList.add('text-gray-300');
      });
      btn.classList.add('bg-brand-600', 'text-white', 'border-brand-500');
      btn.classList.remove('text-gray-300');
      document.getElementById('selected-scheme').value = btn.dataset.scheme;
    });
  });

  form?.addEventListener('submit', handleSubmit);
}

async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const phone = form.phone.value;
  if (phone.length !== 10) {
    showToast('Phone number must be exactly 10 digits', 'error');
    return;
  }
  if (!form.name.value.trim() || !form.email.value.trim() || !form.message.value.trim()) {
    showToast('Please fill all required fields.', 'error');
    return;
  }

  const btn = document.getElementById('modal-submit-btn');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
  btn.disabled = true;

  try {
    const res = await fetch(API_ENDPOINTS.SEND_FORM_MAIL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: 'info@growstartup.in',
        subject: 'Consultant Booking Request',
        fields: {
          Name: form.name.value,
          Phone: form.phone.value,
          Email: form.email.value,
          'Project Type': document.getElementById('selected-scheme').value,
          Message: form.message.value
        }
      })
    });
    if (res.ok) {
      showToast('Request sent! We will contact you soon.', 'success');
      form.reset();
      document.querySelectorAll('.scheme-btn').forEach(b => {
        b.classList.remove('bg-brand-600', 'text-white', 'border-brand-500');
        b.classList.add('text-gray-300');
      });
      setTimeout(closeModal, 2000);
    } else {
      showToast('Failed to send request. Please try again.', 'error');
    }
  } catch {
    showToast('Failed to send request. Please try again.', 'error');
  }
  btn.innerHTML = 'Send Request <i class="fas fa-paper-plane ml-2"></i>';
  btn.disabled = false;
}

export function openModal(showDismiss = false) {
  if (isOpen) return;
  isOpen = true;
  const overlay = document.getElementById('form-modal-overlay');
  const dismissBtn = document.getElementById('modal-dismiss-btn');
  if (overlay) overlay.classList.add('open');
  if (showDismiss && dismissBtn) dismissBtn.classList.remove('hidden');
  else if (dismissBtn) dismissBtn.classList.add('hidden');
  document.body.style.overflow = 'hidden';
}

export function closeModal() {
  isOpen = false;
  const overlay = document.getElementById('form-modal-overlay');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

export function isModalOpen() { return isOpen; }

export function initAutoPopup() {
  if (localStorage.getItem('popupDismissed') === 'true') return;
  setTimeout(() => { if (!isOpen) openModal(true); }, 8000);
  setInterval(() => {
    if (!isOpen && localStorage.getItem('popupDismissed') !== 'true') openModal(true);
  }, 120000);
}
