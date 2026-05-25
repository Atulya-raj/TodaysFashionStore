document.addEventListener('DOMContentLoaded', () => {
  // Shop page specific logic
  
  const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
  const sizeBtns = document.querySelectorAll('.size-btn');
  const colorSwatches = document.querySelectorAll('.color-swatch');
  const productCards = document.querySelectorAll('.shop-grid .product-card');
  const countDisplay = document.querySelector('.product-count');
  const rangeSlider = document.querySelector('.price-range-slider');
  const priceDisplay = document.querySelector('.price-display');

  function updateGrid() {
    // Collect active filters
    const activeCategories = Array.from(filterCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);
      
    const activeSizes = Array.from(sizeBtns)
      .filter(btn => btn.classList.contains('active'))
      .map(btn => btn.getAttribute('data-size'));
      
    const activeColors = Array.from(colorSwatches)
      .filter(swatch => swatch.classList.contains('active'))
      .map(swatch => swatch.getAttribute('data-color'));

    const maxPrice = rangeSlider ? parseInt(rangeSlider.value) : Infinity;

    let visibleCount = 0;

    productCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const cardSizes = card.getAttribute('data-sizes')?.split(',') || [];
      const cardColors = card.getAttribute('data-colors')?.split(',') || [];
      const cardPrice = parseInt(card.getAttribute('data-price') || 0);

      const matchCategory = activeCategories.length === 0 || activeCategories.includes(cardCategory);
      const matchSize = activeSizes.length === 0 || activeSizes.some(s => cardSizes.includes(s));
      const matchColor = activeColors.length === 0 || activeColors.some(c => cardColors.includes(c));
      const matchPrice = cardPrice <= maxPrice;

      if (matchCategory && matchSize && matchColor && matchPrice) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (countDisplay) {
      countDisplay.textContent = `Showing ${visibleCount} product${visibleCount !== 1 ? 's' : ''}`;
    }
  }

  // Bind Event Listeners
  if (filterCheckboxes.length > 0) {
    filterCheckboxes.forEach(cb => cb.addEventListener('change', updateGrid));
  }

  if (sizeBtns.length > 0) {
    sizeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        updateGrid();
      });
    });
  }

  if (colorSwatches.length > 0) {
    colorSwatches.forEach(swatch => {
      swatch.addEventListener('click', () => {
        swatch.classList.toggle('active');
        updateGrid();
      });
    });
  }

  if (rangeSlider && priceDisplay) {
    rangeSlider.addEventListener('input', () => {
      priceDisplay.textContent = `$0 - $${rangeSlider.value}`;
      updateGrid();
    });
  }
});
