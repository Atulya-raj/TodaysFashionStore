document.addEventListener('DOMContentLoaded', () => {
  // Product Gallery Swap
  const mainImage = document.querySelector('.main-product-img');
  const thumbnails = document.querySelectorAll('.thumbnail-img');

  if (mainImage && thumbnails.length > 0) {
    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', () => {
        mainImage.src = thumb.src;
        thumbnails.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      });
    });
  }

  // Quantity Selector
  const qtyInput = document.querySelector('.qty-input');
  const btnMinus = document.querySelector('.qty-minus');
  const btnPlus = document.querySelector('.qty-plus');

  if (qtyInput && btnMinus && btnPlus) {
    btnMinus.addEventListener('click', () => {
      let val = parseInt(qtyInput.value) || 1;
      if (val > 1) qtyInput.value = val - 1;
    });

    btnPlus.addEventListener('click', () => {
      let val = parseInt(qtyInput.value) || 1;
      qtyInput.value = val + 1;
    });
  }

  // Color and Size Selectors (UI only for PDP)
  const sizeBtns = document.querySelectorAll('.pdp-size-btn');
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  const colorSwatches = document.querySelectorAll('.pdp-color-swatch');
  colorSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      colorSwatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
    });
  });

  // Product Tabs
  const tabBtns = document.querySelectorAll('.pdp-tab-btn');
  const tabPanes = document.querySelectorAll('.pdp-tab-pane');

  if (tabBtns.length > 0 && tabPanes.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');
        
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        tabPanes.forEach(pane => {
          if (pane.id === target) {
            pane.style.display = 'block';
          } else {
            pane.style.display = 'none';
          }
        });
      });
    });
  }

  // Size Guide Modal
  const sizeGuideLink = document.querySelector('.size-guide-link');
  const sizeModal = document.querySelector('.size-modal');
  const closeSizeModal = document.querySelector('.close-modal');

  if (sizeGuideLink && sizeModal && closeSizeModal) {
    sizeGuideLink.addEventListener('click', (e) => {
      e.preventDefault();
      sizeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    closeSizeModal.addEventListener('click', () => {
      sizeModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    // Close on click outside
    sizeModal.addEventListener('click', (e) => {
      if (e.target === sizeModal) {
        sizeModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Add to Cart Logic
  const addToCartBtn = document.querySelector('.add-to-cart-btn');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      const qty = parseInt(qtyInput ? qtyInput.value : 1) || 1;
      let currentCount = parseInt(localStorage.getItem('todaysfashion_cart_count')) || 0;
      currentCount += qty;
      localStorage.setItem('todaysfashion_cart_count', currentCount);
      
      const cartBadges = document.querySelectorAll('.cart-count');
      cartBadges.forEach(badge => {
        badge.textContent = currentCount;
        // Simple pop animation
        badge.style.transform = 'scale(1.5)';
        setTimeout(() => badge.style.transform = 'scale(1)', 200);
      });
      
      addToCartBtn.textContent = 'ADDED TO CART!';
      setTimeout(() => addToCartBtn.textContent = 'ADD TO CART', 2000);
    });
  }
});
