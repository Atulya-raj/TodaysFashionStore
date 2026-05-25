document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for scroll animations (fade-up, slide-in)
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optional: unobserve after reveal
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll('.reveal, .reveal-left');
  revealElements.forEach(el => revealObserver.observe(el));

  // Count-up Animation for Stats
  const statNumbers = document.querySelectorAll('.count-up');
  
  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const endValue = parseInt(target.getAttribute('data-count'), 10);
        const duration = 2000; // 2 seconds
        let startTime = null;

        const step = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          // Ease out cubic
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(easeOut * endValue);
          
          // Format with 'K' or '+' if needed, simple implementation:
          let displayVal = current;
          if (endValue >= 1000) {
            displayVal = (current / 1000).toFixed(1) + 'K';
            if(displayVal.endsWith('.0K')) displayVal = displayVal.replace('.0', '');
          }
          
          target.textContent = displayVal + (target.hasAttribute('data-plus') ? '+' : '');

          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else {
            // Ensure exact final value
            let finalVal = endValue;
            if (endValue >= 1000) {
              finalVal = (endValue / 1000).toFixed(1) + 'K';
              if(finalVal.endsWith('.0K')) finalVal = finalVal.replace('.0', '');
            }
            target.textContent = finalVal + (target.hasAttribute('data-plus') ? '+' : '');
          }
        };
        
        window.requestAnimationFrame(step);
        observer.unobserve(target); // Only animate once
      }
    });
  }, observerOptions);

  statNumbers.forEach(stat => statsObserver.observe(stat));

  // Hero H1 Staggered Animation
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const words = heroTitle.innerHTML.split('<br>');
    heroTitle.innerHTML = '';
    words.forEach((wordText, index) => {
      const span = document.createElement('span');
      span.innerHTML = wordText + (index < words.length -1 ? '<br>' : '');
      span.style.opacity = '0';
      span.style.transform = 'translateY(40px)';
      span.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
      span.style.transitionDelay = `${0.15 * index}s`;
      span.style.display = 'inline-block';
      heroTitle.appendChild(span);
      
      // Trigger reflow then animate
      requestAnimationFrame(() => {
        span.style.opacity = '1';
        span.style.transform = 'translateY(0)';
      });
    });
  }
});
