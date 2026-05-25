document.addEventListener('DOMContentLoaded', () => {
  // Sticky Navigation Background
  const mainNav = document.querySelector('.main-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      mainNav.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
      mainNav.style.backdropFilter = 'blur(10px)';
    } else {
      mainNav.style.backgroundColor = 'var(--color-black)';
      mainNav.style.backdropFilter = 'none';
    }
  });

  // Mobile Menu Drawer
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const closeDrawerBtn = document.querySelector('.close-drawer');

  if(mobileMenuBtn && mobileDrawer && closeDrawerBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
      document.body.style.overflow = 'hidden'; // Prevent body scroll
    });

    closeDrawerBtn.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Newsletter Validation
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  
  newsletterForms.forEach(form => {
    const input = form.querySelector('.newsletter-input');
    const msg = form.nextElementSibling; // Assumes msg div is right after form
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = input.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (emailRegex.test(email)) {
        msg.textContent = 'THANKS FOR SUBSCRIBING. JOIN US.';
        msg.className = 'newsletter-msg success';
        input.value = '';
      } else {
        msg.textContent = 'PLEASE ENTER A VALID EMAIL ADDRESS.';
        msg.className = 'newsletter-msg error';
      }
    });
  });

  // Init cart count from localStorage
  const cartBadges = document.querySelectorAll('.cart-count');
  let currentCount = parseInt(localStorage.getItem('todaysfashion_cart_count')) || 0;
  cartBadges.forEach(badge => badge.textContent = currentCount);

  // Tab Filtering (Homepage)
  const tabBtns = document.querySelectorAll('.tab-btn');
  const productCards = document.querySelectorAll('.product-grid-filter .product-card');

  if(tabBtns.length > 0 && productCards.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class
        tabBtns.forEach(t => t.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');

        productCards.forEach(card => {
          if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.pointerEvents = 'auto';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.pointerEvents = 'none';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300); // Wait for transition
          }
        });
      });
    });
  }

  // Hero Carousel / Most Selling Products Carousel
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const carouselContainer = document.querySelector('.carousel-container');

  if (prevBtn && nextBtn && carouselContainer) {
    prevBtn.addEventListener('click', () => {
      const cardWidth = carouselContainer.querySelector('.carousel-item').offsetWidth + 24; // width + gap
      carouselContainer.scrollBy({ left: -(cardWidth * 2), behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      const cardWidth = carouselContainer.querySelector('.carousel-item').offsetWidth + 24;
      carouselContainer.scrollBy({ left: cardWidth * 2, behavior: 'smooth' });
    });
  }
});
