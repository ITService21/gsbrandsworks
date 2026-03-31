/**
 * Main entry point — initializes all shared components on every page.
 * Imported as type="module" in each HTML file.
 */
import { renderNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { renderModal, openModal, closeModal, initAutoPopup } from './components/modal.js';
import { renderFloating } from './components/floating.js';
import { showToast } from './components/toast.js';
import { initScrollReveal, initParallax, initTiltCards, initMobileScrollEffects, initPageHeaderAnimation } from './utils/animations.js';
import { initCounters } from './utils/counter.js';

window.gsb = {
  openModal: (showDismiss) => openModal(showDismiss),
  closeModal,
  showToast,
};

document.addEventListener('DOMContentLoaded', () => {
  renderNavbar();
  renderFooter();
  renderModal();
  renderFloating();
  initAutoPopup();
  initScrollReveal();
  initCounters();
  initParallax();
  initTiltCards();
  initMobileScrollEffects();
  initPageHeaderAnimation();
});
