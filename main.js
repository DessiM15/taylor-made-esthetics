/* ============================================
   TAYLOR MADE ESTHETICS — Main JavaScript
   Full Luxury Animation Suite
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loading');

  // ========== PRELOADER ==========
  const preloader = document.getElementById('preloader');
  const preloaderFill = document.querySelector('.preloader-bar-fill');
  let progress = 0;

  const preloaderInterval = setInterval(() => {
    progress += Math.random() * 12 + 4;
    if (progress >= 100) {
      progress = 100;
      clearInterval(preloaderInterval);
      setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.classList.remove('loading');
        initEverything();
      }, 500);
    }
    preloaderFill.style.width = progress + '%';
  }, 180);

  function initEverything() {
    initLenis();
    initNavbar();
    initMobileMenu();
    initSmoothAnchors();
    initServiceTabs();
    initTestimonials();
    initRevealUp();
    initGSAPAnimations();
    initActiveNav();
  }

  // ========== LENIS SMOOTH SCROLL ==========
  let lenis;
  function initLenis() {
    lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  // ========== NAVBAR ==========
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    const mobileBookBar = document.querySelector('.mobile-book-bar');

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      if (mobileBookBar && scrollY > window.innerHeight * 0.8) {
        mobileBookBar.classList.add('visible');
      } else if (mobileBookBar) {
        mobileBookBar.classList.remove('visible');
      }
    }, { passive: true });
  }

  // ========== MOBILE MENU ==========
  function initMobileMenu() {
    const hamburger = document.querySelector('.nav-hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-links a');

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ========== SMOOTH ANCHORS ==========
  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target && lenis) {
          lenis.scrollTo(target, { offset: -80, duration: 1.6 });
        }
      });
    });
  }

  // ========== SERVICE TABS ==========
  function initServiceTabs() {
    document.querySelectorAll('.services-section').forEach(section => {
      const tabs = section.querySelectorAll('.service-tab');
      const categories = section.querySelectorAll('.service-category');

      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const target = tab.dataset.target;

          tabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');

          categories.forEach(cat => {
            cat.classList.remove('active');
            if (cat.id === target) {
              cat.classList.add('active');
              const cards = cat.querySelectorAll('.service-card');
              gsap.fromTo(cards, {
                y: 60,
                opacity: 0,
                scale: 0.95
              }, {
                y: 0,
                opacity: 1,
                scale: 1,
                stagger: 0.08,
                duration: 0.7,
                ease: 'power3.out'
              });
            }
          });
        });
      });
    });
  }

  // ========== TESTIMONIALS ==========
  function initTestimonials() {
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.t-dot');
    let current = 0;
    let autoplay;

    function show(index) {
      cards.forEach(c => c.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));
      cards[index].classList.add('active');
      dots[index].classList.add('active');
      current = index;
    }

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        show(parseInt(dot.dataset.index));
        clearInterval(autoplay);
        startAutoplay();
      });
    });

    function startAutoplay() {
      autoplay = setInterval(() => {
        show((current + 1) % cards.length);
      }, 5000);
    }
    startAutoplay();
  }

  // ========== REVEAL-UP SCROLL HANDLER ==========
  function initRevealUp() {
    function isInViewport(el) {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.88;
    }

    function revealElements() {
      document.querySelectorAll('.reveal-up:not(.revealed)').forEach(el => {
        if (isInViewport(el)) {
          el.classList.add('revealed');
        }
      });
    }

    // Initial check
    setTimeout(revealElements, 100);

    // On scroll
    window.addEventListener('scroll', revealElements, { passive: true });
  }

  // ========== GSAP SCROLL ANIMATIONS ==========
  function initGSAPAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // --- HERO ENTRANCE ---
    const heroTl = gsap.timeline({ delay: 0.3 });
    heroTl
      .fromTo('.hero-subtitle', { opacity: 0, y: 30, letterSpacing: '2px' },
        { opacity: 1, y: 0, letterSpacing: '5px', duration: 1.2, ease: 'power3.out' })
      .fromTo('.hero-title span', { opacity: 0, y: 80, rotateX: 40 },
        { opacity: 1, y: 0, rotateX: 0, stagger: 0.25, duration: 1.4, ease: 'power4.out' }, '-=0.7')
      .fromTo('.hero-desc', { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.6')
      .fromTo('.hero-ctas', { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power2.out' }, '-=0.5')
      .fromTo('.hero-scroll-indicator', { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'power2.out' }, '-=0.3');

    // --- HERO PARALLAX (video zooms slightly on scroll) ---
    gsap.to('.hero-video', {
      scale: 1.15,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    // Hero content fades out as you scroll away
    gsap.to('.hero-content', {
      y: -100,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: '60% top',
        end: 'bottom top',
        scrub: true
      }
    });

    // --- ABOUT: IMAGE CLIP REVEAL (once, not scrub) ---
    gsap.fromTo('.about-image-wrapper', {
      clipPath: 'inset(15% 15% 15% 15%)',
      scale: 1.15
    }, {
      clipPath: 'inset(0% 0% 0% 0%)',
      scale: 1,
      duration: 1.4,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#about',
        start: 'top 75%',
        once: true
      }
    });

    // About image parallax depth
    gsap.to('.about-image-wrapper img', {
      yPercent: -12,
      ease: 'none',
      scrollTrigger: {
        trigger: '#about',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });

    // About gold border offset animation
    gsap.fromTo('.about-image-border', {
      top: '40px', left: '40px', right: '-40px', bottom: '-40px', opacity: 0
    }, {
      top: '20px', left: '20px', right: '-20px', bottom: '-20px', opacity: 1,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#about',
        start: 'top 65%',
        once: true
      }
    });

    // --- TEXT SPLIT ANIMATIONS (section titles) ---
    document.querySelectorAll('.section-title').forEach(title => {
      const words = title.innerHTML.split(/(\s+)/);
      title.innerHTML = words.map(word => {
        if (word.trim() === '') return word;
        return '<span class="split-word">' + word + '</span>';
      }).join('');

      gsap.fromTo(title.querySelectorAll('.split-word'), {
        opacity: 0,
        y: 50,
        rotateX: 30
      }, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.06,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 82%',
          once: true
        }
      });
    });

    // --- SECTION LABELS slide in from left ---
    gsap.utils.toArray('.section-label').forEach(label => {
      gsap.fromTo(label, {
        opacity: 0,
        x: -40
      }, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: label,
          start: 'top 85%',
          once: true
        }
      });
    });

    // --- SECTION SUBTITLES fade up ---
    gsap.utils.toArray('.section-subtitle').forEach(sub => {
      gsap.fromTo(sub, {
        opacity: 0,
        y: 30
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sub,
          start: 'top 85%',
          once: true
        }
      });
    });

    // --- ABOUT TEXT paragraphs slide from right ---
    gsap.utils.toArray('.about-text').forEach((text, i) => {
      gsap.fromTo(text, {
        opacity: 0,
        x: 60
      }, {
        opacity: 1,
        x: 0,
        duration: 0.9,
        delay: i * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: text,
          start: 'top 85%',
          once: true
        }
      });
    });

    // --- ABOUT DETAILS stagger up ---
    gsap.fromTo('.about-detail', {
      opacity: 0,
      y: 40
    }, {
      opacity: 1,
      y: 0,
      stagger: 0.12,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.about-details',
        start: 'top 85%',
        once: true
      }
    });

    // --- DIVIDERS grow ---
    gsap.utils.toArray('.about-divider, .contact-divider, .membership-divider').forEach(div => {
      gsap.fromTo(div, { width: 0 }, {
        width: 60,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: div, start: 'top 85%', once: true }
      });
    });

    // --- ABOUT BUTTON ---
    gsap.utils.toArray('#about .btn').forEach(btn => {
      gsap.fromTo(btn, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: btn, start: 'top 90%', once: true }
      });
    });

    // --- SERVICE TABS fade in ---
    gsap.utils.toArray('.service-tabs').forEach(tabs => {
      gsap.fromTo(tabs, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: tabs, start: 'top 85%', once: true }
      });
    });

    // --- SERVICE CARDS: stagger with scale ---
    document.querySelectorAll('.service-category.active').forEach(cat => {
      const cards = cat.querySelectorAll('.service-card');
      gsap.fromTo(cards, {
        y: 80,
        opacity: 0,
        scale: 0.92
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cat,
          start: 'top 80%',
          once: true
        }
      });
    });

    // --- EXPERIENCE CARDS: stagger with 3D rotation ---
    const expCards = document.querySelectorAll('.experience-card');
    gsap.fromTo(expCards, {
      y: 100,
      opacity: 0,
      rotateY: 15,
      scale: 0.88
    }, {
      y: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.experience-grid',
        start: 'top 78%',
        once: true
      }
    });

    // --- MEMBERSHIP: card reveal with scale ---
    gsap.fromTo('.membership-card-display', {
      scale: 0.8,
      opacity: 0,
      rotateY: -10
    }, {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#membership',
        start: 'top 65%',
        once: true
      }
    });

    // Membership card parallax
    gsap.to('.membership-card-display', {
      yPercent: -15,
      ease: 'none',
      scrollTrigger: {
        trigger: '#membership',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });

    // Membership perks stagger
    gsap.fromTo('.membership-perks li', {
      opacity: 0,
      x: -30
    }, {
      opacity: 1,
      x: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.membership-perks',
        start: 'top 85%',
        once: true
      }
    });

    // --- TESTIMONIALS: scale in ---
    gsap.fromTo('.testimonials-carousel', {
      opacity: 0,
      scale: 0.9
    }, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#testimonials',
        start: 'top 70%',
        once: true
      }
    });

    // --- CONTACT: split reveal ---
    gsap.fromTo('.contact-info', {
      opacity: 0,
      x: -60
    }, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 70%',
        once: true
      }
    });

    gsap.fromTo('.contact-map', {
      opacity: 0,
      x: 60,
      scale: 0.95
    }, {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 70%',
        once: true
      }
    });

    // --- CONTACT ITEMS stagger ---
    gsap.fromTo('.contact-item', {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      stagger: 0.12,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.contact-details',
        start: 'top 85%',
        once: true
      }
    });

    // --- FOOTER stagger ---
    gsap.fromTo('.footer-grid > div', {
      opacity: 0,
      y: 40
    }, {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#footer',
        start: 'top 85%',
        once: true
      }
    });

    // --- ADDONS NOTE ---
    gsap.utils.toArray('.addons-note').forEach(note => {
      gsap.fromTo(note, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: note, start: 'top 90%', once: true }
      });
    });
  }

  // ========== ACTIVE NAV HIGHLIGHT ==========
  function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
      });
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    }, { passive: true });
  }
});
