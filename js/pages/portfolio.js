/**
 * Portfolio page — filter functionality for project cards.
 * Clicking a category button shows only matching cards (or all).
 */
document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.portfolio-filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  const grid = document.getElementById('portfolio-grid');

  if (!filterButtons.length || !portfolioCards.length || !grid) return;

  function setActiveFilter(activeBtn) {
    filterButtons.forEach((btn) => {
      if (btn === activeBtn) {
        btn.classList.remove('text-gray-300');
        btn.classList.add('bg-brand-500', 'text-white');
        btn.style.borderColor = 'transparent';
      } else {
        btn.classList.remove('bg-brand-500', 'text-white');
        btn.classList.add('text-gray-300');
      }
    });
  }

  function filterPortfolio(category) {
    portfolioCards.forEach((card) => {
      const cardCategory = card.getAttribute('data-category');
      const matches = category === 'all' || cardCategory === category;
      if (matches) {
        card.classList.remove('filter-hidden');
        card.style.position = '';
      } else {
        card.classList.add('filter-hidden');
        setTimeout(() => { card.style.position = 'absolute'; }, 400);
      }
    });
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');
      setActiveFilter(btn);
      filterPortfolio(category);
    });
  });
});
