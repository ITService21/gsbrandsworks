/**
 * Lightweight toast notification system.
 * Usage: showToast('message', 'success') or showToast('message', 'error')
 */
let container = null;

function ensureContainer() {
  if (container) return;
  container = document.createElement('div');
  container.className = 'toast-container';
  document.body.appendChild(container);
}

export function showToast(message, type = 'success') {
  ensureContainer();
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// Expose globally for inline handlers
window.showToast = showToast;
