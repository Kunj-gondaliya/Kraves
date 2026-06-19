/* ============================================
   KRAVES - Sports Turf & Café
   Pure JavaScript Interactions
   ============================================ */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all modules
  initNavbar();
  initSmoothScroll();
  initHeroParallax();
  initScrollAnimations();
  initReviewsCarousel();
  initGalleryDrag();
});

/* ============================================
   NAVBAR
   ============================================ */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  let lastScrollY = 0;

  // Scroll effect for navbar background
  function handleScroll() {
    const scrollY = window.scrollY;

    if (navbar) {
      if (scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    lastScrollY = scrollY;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // Mobile menu toggle
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', function() {
      const isOpen = mobileMenu.classList.contains('active');

      if (isOpen) {
        mobileMenu.classList.remove('active');
        mobileToggle.innerHTML = createMenuIcon();
      } else {
        mobileMenu.classList.add('active');
        mobileToggle.innerHTML = createCloseIcon();
      }
    });

    // Close mobile menu when clicking on a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        mobileToggle.innerHTML = createMenuIcon();
      });
    });
  }
}

function createMenuIcon() {
  return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>`;
}

function createCloseIcon() {
  return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>`;
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      if (href === '#' || href === '#hero') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ============================================
   HERO PARALLAX
   ============================================ */
function initHeroParallax() {
  const heroBg = document.querySelector('.hero-bg-image');
  if (!heroBg) return;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  function handleMouseMove(e) {
    const x = (e.clientX / window.innerWidth - 0.5) * 18;
    const y = (e.clientY / window.innerHeight - 0.5) * 18;
    targetX = x;
    targetY = y;
  }

  function animate() {
    // Smooth interpolation
    currentX += (targetX - currentX) * 0.1;
    currentY += (targetY - currentY) * 0.1;

    heroBg.style.transform = `translate(${currentX}px, ${currentY}px) scale(1.06)`;
    requestAnimationFrame(animate);
  }

  window.addEventListener('mousemove', handleMouseMove, { passive: true });
  animate();
}

/* ============================================
   SCROLL-TRIGGERED ANIMATIONS
   ============================================ */
function initScrollAnimations() {
  // Create intersection observer for fade-in animations
  const observerOptions = {
    root: null,
    rootMargin: '-50px',
    threshold: 0.1
  };

  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Unobserve after animation triggers once
        fadeInObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Elements to animate on scroll
  const animatedElements = [
    // About section
    '.about-heading',
    '.about-feature-card',

    // Menu section
    '.menu-header .section-label',
    '.menu-title',
    '.menu-card',

    // Turf section
    '.turf-image-wrapper',
    '.turf-content .section-label',
    '.turf-title',
    '.turf-feature-card',
    '.turf-cta',

    // Gallery section
    '.gallery-header .section-label',
    '.gallery-title',
    '.gallery-description',
    '.gallery-strip',

    // Stats section
    '.stats-header .section-label',
    '.stats-title',
    '.stat-card',

    // Reviews section
    '.reviews-tags',
    '.reviews-section .section-label',
    '.reviews-title',
    '.review-card',

    // Find Us section
    '.findus-section .section-label',
    '.findus-title',
    '.contact-card',
    '.map-wrapper',

    // CTA section
    '.cta-section .section-label',
    '.cta-title',
    '.cta-subtitle',
    '.cta-buttons'
  ];

  animatedElements.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, index) => {
      // Add staggered delay for multiple elements
      const delay = el.dataset.delay || (index * 100);
      el.style.transitionDelay = `${delay}ms`;
      fadeInObserver.observe(el);
    });
  });
}

/* ============================================
   REVIEWS CAROUSEL
   ============================================ */
function initReviewsCarousel() {
  const reviewCard = document.querySelector('.review-card');
  if (!reviewCard) return;

  const reviews = [
    {
      rating: 4,
      text: '"Perfect place to chill with friends. We come every Friday — the turf is great, the burgers are amazing, and the staff is always friendly. Honestly Surat needed a place like this."',
      name: 'KARAN MEHTA',
      meta: 'Reviewer · 14 reviews'
    },
    {
      rating: 5,
      text: '"Amazing experience overall! Booked the turf for our office team outing and everyone loved it. The food after the match was the cherry on top. Highly recommended!"',
      name: 'PRIYA SHAH',
      meta: 'Reviewer · 8 reviews'
    },
    {
      rating: 5,
      text: '"Best sports café in Surat hands down. The artificial grass is top quality, lights are great at night, and the cold coffee is a must-try after a match."',
      name: 'RAHUL DESAI',
      meta: 'Reviewer · 22 reviews'
    },
    {
      rating: 4,
      text: '"Great ambience and even better food. The loaded fries and smash burger are incredible. Came for the turf, stayed for the café. Will definitely be back!"',
      name: 'NEHA PATEL',
      meta: 'Reviewer · 31 reviews'
    },
    {
      rating: 5,
      text: '"Literally our second home. Every weekend we book a slot here and order a round of shakes. The staff knows us by name now. That\'s how good this place is."',
      name: 'ARJUN MODI',
      meta: 'Reviewer · 5 reviews'
    }
  ];

  let currentIndex = 0;

  const starsContainer = reviewCard.querySelector('.review-stars');
  const textElement = reviewCard.querySelector('.review-text');
  const authorElement = reviewCard.querySelector('.review-author');
  const metaElement = reviewCard.querySelector('.review-meta');
  const prevBtn = document.querySelector('.review-nav button:first-child');
  const nextBtn = document.querySelector('.review-nav button:last-child');
  const paginationContainer = document.querySelector('.reviews-pagination');

  if (!starsContainer || !textElement || !authorElement || !metaElement || !paginationContainer) return;

  // Create pagination dots
  function createPagination() {
    paginationContainer.innerHTML = '';
    reviews.forEach((_, i) => {
      const btn = document.createElement('button');
      btn.setAttribute('aria-label', `Go to review ${i + 1}`);
      btn.className = i === currentIndex ? 'active' : 'inactive';
      btn.addEventListener('click', () => goToReview(i));
      paginationContainer.appendChild(btn);
    });
  }

  // Create star SVG
  function createStar(filled) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '20');
    svg.setAttribute('height', '20');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', filled ? 'currentColor' : 'currentColor');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.classList.add(filled ? 'filled' : 'empty');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z');

    svg.appendChild(path);
    return svg;
  }
  // Update review display
  function updateReview() {
    const review = reviews[currentIndex];

    // Update stars
    starsContainer.innerHTML = '';
    for (let i = 0; i < 5; i++) {
      starsContainer.appendChild(createStar(i < review.rating));
    }

    // Update text with fade animation
    textElement.style.opacity = '0';
    textElement.style.transform = 'translateY(10px)';

    setTimeout(() => {
      textElement.textContent = review.text;
      authorElement.textContent = review.name;
      metaElement.textContent = review.meta;

      textElement.style.opacity = '1';
      textElement.style.transform = 'translateY(0)';
    }, 200);

    // Update pagination
    createPagination();
  }

  // Navigation functions
  function goToReview(index) {
    currentIndex = (index + reviews.length) % reviews.length;
    updateReview();
  }

  function nextReview() {
    goToReview(currentIndex + 1);
  }

  function prevReview() {
    goToReview(currentIndex - 1);
  }

  // Event listeners
  if (prevBtn) prevBtn.addEventListener('click', prevReview);
  if (nextBtn) nextBtn.addEventListener('click', nextReview);

  // Initialize
  createPagination();
  updateReview();
}

/* ============================================
   GALLERY DRAG TO SCROLL
   ============================================ */
function initGalleryDrag() {
  const galleryStrip = document.querySelector('.gallery-strip');
  if (!galleryStrip) return;

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  galleryStrip.addEventListener('mousedown', (e) => {
    isDown = true;
    galleryStrip.style.cursor = 'grabbing';
    startX = e.pageX - galleryStrip.offsetLeft;
    scrollLeft = galleryStrip.scrollLeft;
  });

  galleryStrip.addEventListener('mouseleave', () => {
    isDown = false;
    galleryStrip.style.cursor = 'grab';
  });

  galleryStrip.addEventListener('mouseup', () => {
    isDown = false;
    galleryStrip.style.cursor = 'grab';
  });

  galleryStrip.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - galleryStrip.offsetLeft;
    const walk = (x - startX) * 2;
    galleryStrip.scrollLeft = scrollLeft - walk;
  });

  // Touch events for mobile
  galleryStrip.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX - galleryStrip.offsetLeft;
    scrollLeft = galleryStrip.scrollLeft;
  });

  galleryStrip.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX - galleryStrip.offsetLeft;
    const walk = (x - startX) * 2;
    galleryStrip.scrollLeft = scrollLeft - walk;
  });
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for performance
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
