/**
 * @license
 * Sidepiece ATX — Custom Cake Practice
 * Vanilla JavaScript interactions & accessible controls
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ------------------------------------------------------------------------
     1. Dynamic Copyright Year
     ------------------------------------------------------------------------ */
  const yearElement = document.getElementById('copyright-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear().toString();
  }

  /* ------------------------------------------------------------------------
     2. Mobile Navigation Toggle & Accessibility
     ------------------------------------------------------------------------ */
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const navDrawer = document.getElementById('mobile-nav-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta-wrap a');

  function openMobileMenu() {
    if (!menuToggle || !navDrawer) return;
    menuToggle.classList.add('is-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Close mobile navigation menu');
    navDrawer.classList.add('is-open');
    navDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!menuToggle || !navDrawer) return;
    menuToggle.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open mobile navigation menu');
    navDrawer.classList.remove('is-open');
    navDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (menuToggle && navDrawer) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close when mobile navigation links are selected
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        closeMobileMenu();
        menuToggle.focus();
      }
    });
  }

  /* ------------------------------------------------------------------------
     3. Smooth Scrolling for Internal Navigation Links
     ------------------------------------------------------------------------ */
  const internalNavLinks = document.querySelectorAll('a[href^="#"]');

  internalNavLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });

          // Update active link state in desktop nav
          document.querySelectorAll('.nav-link').forEach((nl) => nl.classList.remove('active'));
          if (link.classList.contains('nav-link')) {
            link.classList.add('active');
          }

          // Move focus for screen readers
          targetElement.setAttribute('tabindex', '-1');
          targetElement.focus({preventScroll: true});
        }
      }
    });
  });

  /* ------------------------------------------------------------------------
     4. Interactive Cake Gallery Lightbox Modal
     ------------------------------------------------------------------------ */
  const cakeDetails = {
    1: {
      number: 'CONCEPT 01',
      title: 'Romantic Vintage Piping with Cherries',
      desc: 'Inspired by traditional Victorian Lambeth decorative methods, reimagined with organic modern buttercreams. Delicate sugar garlands, shell borders, and glossy maraschino cherries atop tender vanilla sponge layered with slow-simmered cherry compote.',
      swatches: ['#8F1838', '#FFF7ED', '#F4A7B9'],
    },
    2: {
      number: 'CONCEPT 02',
      title: 'Playful Pink & Red Celebration Cake',
      desc: 'High-contrast celebration energy colored entirely with house-extracted raspberry and beet dyes. Bold piping loops, vibrant ruby ribbons, and real strawberry reduction folded into velvety swiss meringue buttercream.',
      swatches: ['#F4A7B9', '#8F1838', '#FFF7ED'],
    },
    3: {
      number: 'CONCEPT 03',
      title: 'Fresh Botanical & Pressed Blossom Cake',
      desc: 'A gentle salute to the Texas Hill Country flora. Edible pansies, violas, and garden thyme gently pressed into soft ivory buttercream kissed with elderflower syrup and real pistachio extract.',
      swatches: ['#C9D6A3', '#FFF7ED', '#644B44'],
    },
    4: {
      number: 'CONCEPT 04',
      title: 'Whimsical Sculptural Cake',
      desc: 'Architectural buttercream sculpted using custom artist palette knives. Organic folds, gentle textural ridges, and earth-toned natural hues reminiscent of modern clay ceramics.',
      swatches: ['#F4D66D', '#FFF7ED', '#38241F'],
    },
    5: {
      number: 'CONCEPT 05',
      title: 'Elegant Buttercream with Delicate Details',
      desc: 'Understated, timeless, and delicate. Flawless ivory satin finish, micro-pearl bead piping along scalloped tiers, and a deckled edge celebrating the raw beauty of cake craft.',
      swatches: ['#FFF7ED', '#FCF4E8', '#C9D6A3'],
    },
    6: {
      number: 'CONCEPT 06',
      title: 'Colorful, Unconventional Artistic Cake',
      desc: 'Bold painterly swatches, candied blood orange wheels, and artistic color splashes. Built with citrus marmalade filling and a light cardamom soak for adventurous flavor lovers.',
      swatches: ['#F4D66D', '#F4A7B9', '#8F1838'],
    },
  };

  const modal = document.getElementById('cake-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalImg = document.getElementById('modal-img');
  const modalNumber = document.getElementById('modal-cake-number');
  const modalTitle = document.getElementById('modal-cake-title');
  const modalDesc = document.getElementById('modal-cake-desc');
  const modalSwatches = document.getElementById('modal-swatches');
  const galleryCards = document.querySelectorAll('.gallery-card');
  let lastActiveElement = null;

  function openCakeModal(card) {
    if (!modal) return;
    const cakeId = card.getAttribute('data-cake');
    const data = cakeDetails[cakeId];
    const cardImg = card.querySelector('.gallery-img');

    if (data && cardImg) {
      lastActiveElement = card;
      modalImg.src = cardImg.src;
      modalImg.alt = cardImg.alt;
      modalNumber.textContent = data.number;
      modalTitle.textContent = data.title;
      modalDesc.textContent = data.desc;

      // Populate swatches
      modalSwatches.innerHTML = '';
      data.swatches.forEach((hex) => {
        const swatch = document.createElement('span');
        swatch.className = 'swatch-circle';
        swatch.style.backgroundColor = hex;
        swatch.setAttribute('title', hex);
        modalSwatches.appendChild(swatch);
      });

      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      // Set focus inside modal
      setTimeout(() => {
        if (modalCloseBtn) modalCloseBtn.focus();
      }, 50);
    }
  }

  function closeCakeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastActiveElement) {
      lastActiveElement.focus();
    }
  }

  galleryCards.forEach((card) => {
    // Make cards keyboard accessible
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `View details for ${card.querySelector('.cake-title')?.textContent || 'cake concept'}`);

    card.addEventListener('click', () => openCakeModal(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCakeModal(card);
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeCakeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeCakeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeCakeModal();
      }
    });
  }

  /* ------------------------------------------------------------------------
     5. Scroll-Triggered Reveal Animations
     ------------------------------------------------------------------------ */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const animElements = document.querySelectorAll(
      '.gallery-card, .principle-card, .step-card, .artist-grid, .instagram-card'
    );

    animElements.forEach((el) => el.classList.add('reveal-on-scroll'));

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    animElements.forEach((el) => observer.observe(el));
  }

  /* ------------------------------------------------------------------------
     6. Safe External Links Verification
     ------------------------------------------------------------------------ */
  const externalLinks = document.querySelectorAll('a[target="_blank"]');
  externalLinks.forEach((link) => {
    link.setAttribute('rel', 'noopener noreferrer');
  });

  /* ------------------------------------------------------------------------
     7. Robust Image Fallback Handler (Zero Broken Images)
     ------------------------------------------------------------------------ */
  const allImages = document.querySelectorAll('img');
  allImages.forEach((img) => {
    img.addEventListener('error', () => {
      img.style.display = 'none';
      const parent = img.parentElement;
      if (parent) {
        parent.style.backgroundColor = '#FCF4E8';
        parent.style.display = 'flex';
        parent.style.alignItems = 'center';
        parent.style.justifyContent = 'center';
        parent.style.minHeight = '240px';

        const fallbackMsg = document.createElement('div');
        fallbackMsg.style.padding = '1.5rem';
        fallbackMsg.style.textAlign = 'center';
        fallbackMsg.style.fontFamily = "'Fraunces', Georgia, serif";
        fallbackMsg.style.color = '#8F1838';
        fallbackMsg.style.fontSize = '0.9375rem';
        fallbackMsg.innerHTML = '✦ Custom Cake Artwork Inspiration ✦<br><small style="color:#644B44;font-family:\'Plus Jakarta Sans\',sans-serif;">Austin, TX · Sidepiece ATX</small>';
        parent.appendChild(fallbackMsg);
      }
    });
  });
});
