/**
 * Contact page form handling.
 */
import { API_ENDPOINTS } from '../utils/api.js';
import { showToast } from '../components/toast.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-page-form');
  if (!form) return;

  form.querySelector('input[name="phone"]')?.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const phoneVal = fd.get('phone') || '';
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
});
