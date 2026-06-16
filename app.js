/* ============================================
   WEBXAI — Premium Agency JavaScript
   ============================================ */

(function () {
  'use strict';

  // ---- State ----
  let currentPage = 'home';
  const selectedScopes = new Set();

  // ---- DOM References ----
  const nav = document.getElementById('main-nav');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const pages = document.querySelectorAll('.page');
  const allNavLinks = document.querySelectorAll('[data-page]');
  const particlesContainer = document.getElementById('particles');
  const loader = document.getElementById('loader');
  const loaderProgress = document.getElementById('loader-progress');
  const loaderStatus = document.getElementById('loader-status');
  const loaderPercent = document.getElementById('loader-percent');
  const heroSection = document.getElementById('hero-section');
  const customCursor = document.getElementById('cursor-w');

  const WHATSAPP_NUMBER = '916360334274';
  const WHATSAPP_MESSAGE_DEFAULT =
    'Hi WEBXAI,\n\n' +
    'I came across your website and would like to talk about a project.\n\n' +
    'When would be a good time to connect?';

  function buildWhatsAppUrl(message) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  function buildWhatsAppMessageFromForm() {
    const name = document.getElementById('contact-name')?.value?.trim() || '';
    const brief = document.getElementById('contact-brief')?.value?.trim() || '';
    const scopes = [...selectedScopes];

    if (!name && !scopes.length && !brief) {
      return WHATSAPP_MESSAGE_DEFAULT;
    }

    const lines = [
      'Hi WEBXAI,',
      '',
      "I'd like to discuss a new project with your team.",
      '',
    ];

    if (name) lines.push(`Name: ${name}`);
    if (scopes.length) lines.push(`Scope: ${scopes.join(', ')}`);

    if (brief) {
      lines.push('');
      lines.push('About the project:');
      lines.push(brief);
    }

    lines.push('');
    lines.push('Let me know the next steps. Thanks!');

    return lines.join('\n').trim();
  }

  function openWhatsAppWithForm() {
    const url = buildWhatsAppUrl(buildWhatsAppMessageFromForm());
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function updateWhatsAppLinks() {
    document.querySelectorAll('[data-whatsapp][data-whatsapp-use-form]').forEach((link) => {
      link.href = buildWhatsAppUrl(buildWhatsAppMessageFromForm());
    });
  }

  function setupWhatsAppLinks() {
    document.querySelectorAll('[data-whatsapp]').forEach((link) => {
      const useForm = link.hasAttribute('data-whatsapp-use-form');
      link.href = buildWhatsAppUrl(
        useForm ? buildWhatsAppMessageFromForm() : WHATSAPP_MESSAGE_DEFAULT
      );
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    });

    const form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('input', updateWhatsAppLinks);
    }
  }

  const caseStudies = [
    {
      title: 'NRC Group — Agri Supply Chain',
      category: 'Corporate Website · Agri-Tech',
      image: 'assets/images/portfolio-nrc-agro-manga.png',
      url: 'https://nrcagro.com/',
      challenge: 'NRC Group — an integrated agri supply and distribution group operating across wholesale markets, HoReCa, Q-commerce, and institutional supply chains in South India — needed a digital presence that communicated scale, cold-chain capability, and three distinct business verticals without overwhelming visitors.',
      solution: 'WEBXAI designed and built nrcagro.com — a premium corporate website showcasing NRC Agro, SR Agro, and NRC Fresh Cuts. The experience highlights 25+ tonnes traded daily from Koyambedu Market, 200-tonne cold storage, partner logos from Taj Group and Blinkit, and direct WhatsApp enquiry flows tailored to each vertical.',
      result: 'A polished brand platform that positions NRC Group as South India\'s fresh and frozen supply chain leader. Partner enquiries increased, vertical navigation clarified the offering, and the site serves as the anchor for all digital touchpoints including the Fresh Cuts WhatsApp storefront.'
    },
    {
      title: 'NRC Fresh Cuts — WhatsApp Commerce',
      category: 'WhatsApp API · E-Commerce',
      image: 'assets/images/portfolio-nrc-freshcuts-manga.png',
      url: 'https://www.nrcfreshcuts.in/wa/shop/4a493a19-c873-4903-a616-44175a639ea8',
      challenge: 'NRC Fresh Cuts needed a frictionless way for HoReCa clients, cloud kitchens, and Q-commerce buyers to browse fresh-cut vegetable packs, recipe packs, and raw produce — without building a separate mobile app or complex checkout flow.',
      solution: 'WEBXAI engineered a WhatsApp-native commerce experience with category browsing, cart management, and order placement directly inside WhatsApp. Customers choose from Fresh Cut Vegetable Packs, Recipe Packs, and Fresh Vegetables — building a cart and completing orders on the channel they already use daily.',
      result: 'A live order-on-WhatsApp storefront that removes app-download friction and accelerates repeat orders. The shop integrates with NRC\'s fresh-cut operations and gives customers a fast, familiar path from browse to purchase.'
    },
    {
      title: 'LogixAI — Logistics Intelligence',
      category: 'Logistics Automation',
      image: 'assets/images/portfolio-logixai-manga.png',
      challenge: 'A major supply chain company was processing shipments manually across 12 regional hubs, leading to delayed deliveries, inconsistent tracking, and mounting operational costs. Their legacy system couldn\'t handle real-time data from IoT sensors deployed across their fleet of 500+ vehicles.',
      solution: 'WEBXAI engineered a full-stack logistics intelligence platform featuring real-time GPS tracking, predictive route optimization using machine learning models, and an automated dispatch system. We built a custom WebSocket-based dashboard providing live fleet visualization and integrated with their existing ERP through a RESTful API layer.',
      result: '40% faster processing speeds achieved within the first quarter. Operational costs reduced by $2.1M annually. Real-time tracking accuracy improved to 99.7%, and average delivery times dropped from 4.2 days to 2.5 days across all regional hubs.'
    },
    {
      title: 'VELO — Premium Marketplace',
      category: 'E-Commerce Platform',
      image: 'assets/images/portfolio-velo-manga.png',
      challenge: 'A luxury watch retailer was losing premium customers to competitors with superior online experiences. Their existing e-commerce platform suffered from slow page loads, a clunky checkout process, and zero personalization — leading to cart abandonment rates exceeding 78%.',
      solution: 'We designed and developed a completely bespoke e-commerce platform with edge-cached product pages, AI-powered product recommendations, and a streamlined one-click checkout flow. The premium dark-mode interface was crafted with cinematic product photography integration and real-time inventory sync across 3 warehouses.',
      result: '2.8x conversion rate increase within 60 days of launch. Cart abandonment dropped to 31%. Average order value increased by 45% thanks to intelligent cross-selling algorithms. Page load times reduced from 6.2s to 0.8s on mobile devices.'
    },
    {
      title: 'Nexus AI — Analytics Engine',
      category: 'SaaS Platform',
      image: 'assets/images/portfolio-nexus-manga.png',
      challenge: 'An AI startup had a powerful analytics engine but struggled with user adoption. Their complex interface confused non-technical users, onboarding took 3+ hours, and churn rate hit 67% within the first month. They needed a platform that made sophisticated analytics accessible.',
      solution: 'WEBXAI redesigned the entire user experience from onboarding to advanced analytics. We implemented a guided setup wizard, drag-and-drop dashboard builder, and natural language query interface. The frontend was rebuilt with React and real-time data streaming, while the pricing page was A/B tested across 12 variants for maximum conversion.',
      result: '12,000+ active users acquired in the first 90 days post-relaunch. User onboarding time dropped from 3 hours to 8 minutes. Monthly churn reduced to 12%, and the NPS score jumped from 23 to 71. The platform now processes over 2 million queries daily.'
    },
    {
      title: 'Harvest OS — Crop Logistics',
      category: 'Agricultural Technology',
      image: 'assets/images/portfolio-harvest-manga.png',
      challenge: 'A farming cooperative managing 50,000 acres across multiple states had no centralized system for tracking crop yields, logistics scheduling, or supply chain management. Decisions were made on spreadsheets, leading to 30% food waste and missed market windows.',
      solution: 'We built an end-to-end agricultural operations platform with satellite imagery integration for crop health monitoring, automated harvest scheduling based on weather and market price data, and a logistics module for coordinating transport across regional distribution centers. IoT sensor data from field equipment was aggregated into real-time dashboards.',
      result: 'Food waste reduced by 62% in the first harvest season. Logistics coordination time cut from 2 weeks to 3 days. Revenue per acre increased 23% through optimized market timing. The platform now manages operations across 120,000 acres for 8 cooperative partners.'
    }
  ];

  // ============================================
  // INITIALIZATION
  // ============================================
  function init() {
    runTypingLoader().then(() => {
      document.body.classList.remove('is-loading');
      document.body.classList.add('loader-done');
      if (heroSection) heroSection.classList.add('hero--ready');
      createParticles();
      setupNavigation();
      setupScrollEffects();
      setupPortfolio();
      setupContactForm();
      setupWhatsAppLinks();
      setupRevealAnimations();
      setupHeroParallax();
      setupPremiumHovers();
      bindCtaGlow();
      setupStatsCounter();
      setupWorkPreview();
      setupPageTransition();
      setupHeroScroll();
      setupCustomCursor();
    });
  }

  // ============================================
  // LOADER
  // ============================================
  function runTypingLoader() {
    return new Promise((resolve) => {
      if (!loader) {
        resolve();
        return;
      }

      const loaderLetters = document.querySelectorAll('.loader__letter');
      const statuses = [
        { at: 0, text: 'Engineering experience' },
        { at: 30, text: 'Loading components' },
        { at: 65, text: 'Preparing interface' },
        { at: 90, text: 'Ready' }
      ];

      const duration = 1900;
      const start = performance.now();

      loaderLetters.forEach((letter, i) => {
        setTimeout(() => letter.classList.add('is-visible'), 100 + i * 85);
      });

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 2.2);
        const pct = Math.round(eased * 100);

        if (loaderProgress) loaderProgress.style.width = pct + '%';
        if (loaderPercent) loaderPercent.textContent = pct + '%';

        const status = statuses.filter(s => pct >= s.at).pop();
        if (status && loaderStatus) loaderStatus.textContent = status.text;

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          finishLoader(resolve);
        }
      }

      requestAnimationFrame(tick);
    });
  }

  function finishLoader(resolve) {
    setTimeout(() => {
      loader.classList.add('loader--exit');
      loader.setAttribute('aria-hidden', 'true');
      resolve();
    }, 320);
  }

  // ============================================
  // CUSTOM W CURSOR
  // ============================================
  function setupCustomCursor() {
    if (!customCursor || window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.body.classList.add('custom-cursor');

    let rafId = null;
    let moveTimer = null;

    document.addEventListener('mousemove', (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';
        customCursor.classList.add('is-moving');
        customCursor.classList.remove('is-hidden');

        clearTimeout(moveTimer);
        moveTimer = setTimeout(() => {
          customCursor.classList.remove('is-moving');
        }, 90);

        rafId = null;
      });
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      customCursor.classList.add('is-hidden');
    });

    document.addEventListener('mouseenter', () => {
      if (document.body.classList.contains('loader-done')) {
        customCursor.classList.remove('is-hidden');
      }
    });
  }

  // ============================================
  // HERO PARALLAX
  // ============================================
  function setupHeroParallax() {
    if (!heroSection) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const heroBg = heroSection.querySelector('.hero__bg');
    const heroGhost = heroSection.querySelector('.hero__ghost');
    let rafId = null;

    heroSection.addEventListener('mousemove', function (e) {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const rect = heroSection.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        if (heroBg) {
          heroBg.style.setProperty('--px', (x * 10) + 'px');
          heroBg.style.setProperty('--py', (y * 6) + 'px');
        }

        if (heroGhost) {
          heroGhost.style.setProperty('--gx', (x * 36) + 'px');
          heroGhost.style.setProperty('--gy', (y * 24) + 'px');
          heroGhost.style.setProperty('--gtx', (x * 18) + 'px');
          heroGhost.style.setProperty('--gty', (y * 12) + 'px');
        }

        rafId = null;
      });
    });

    heroSection.addEventListener('mouseleave', function () {
      if (heroBg) {
        heroBg.style.removeProperty('--px');
        heroBg.style.removeProperty('--py');
      }
      if (heroGhost) {
        heroGhost.style.removeProperty('--gx');
        heroGhost.style.removeProperty('--gy');
        heroGhost.style.removeProperty('--gtx');
        heroGhost.style.removeProperty('--gty');
      }
    });

    const heroCta = document.getElementById('hero-cta');
    if (heroCta) {
      heroCta.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const offsetX = (e.clientX - rect.left - rect.width / 2) * 0.12;
        const offsetY = (e.clientY - rect.top - rect.height / 2) * 0.12;
        this.style.setProperty('--magnet-x', offsetX + 'px');
        this.style.setProperty('--magnet-y', offsetY + 'px');
      });

      heroCta.addEventListener('mouseleave', function () {
        this.style.setProperty('--magnet-x', '0px');
        this.style.setProperty('--magnet-y', '0px');
      });
    }
  }

  // ============================================
  // PREMIUM HOVER EFFECTS
  // ============================================
  function setupPremiumHovers() {
    document.querySelectorAll('.cta-btn:not(.cta-btn--hero):not(.cta-btn--outline):not(.cta-btn--whatsapp)').forEach(btn => {
      if (!btn.querySelector('.cta-btn__shimmer')) {
        const shimmer = document.createElement('span');
        shimmer.className = 'cta-btn__shimmer';
        const text = btn.textContent;
        btn.textContent = '';
        const textSpan = document.createElement('span');
        textSpan.className = 'cta-btn__text';
        textSpan.textContent = text;
        btn.appendChild(shimmer);
        btn.appendChild(textSpan);
      }
    });
  }

  // ============================================
  // FLOATING PARTICLES (Hero)
  // ============================================
  function createParticles() {
    if (!particlesContainer) return;
    const count = 28;
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
      particle.style.animationDelay = (Math.random() * 10) + 's';
      const size = Math.random() * 2.5 + 1;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.opacity = (Math.random() * 0.5 + 0.3).toString();
      particlesContainer.appendChild(particle);
    }
  }

  // ============================================
  // NAVIGATION — SPA ROUTING
  // ============================================
  function setupNavigation() {
    // All links with data-page
    allNavLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetPage = this.dataset.page;
        if (targetPage) navigateTo(targetPage);
      });
    });

    // Hamburger menu
    if (hamburger) {
      hamburger.addEventListener('click', function () {
        this.classList.toggle('open');
        mobileNav.classList.toggle('open');
        document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
      });
    }

    // Close mobile nav on link click
    if (mobileNav) {
      mobileNav.querySelectorAll('[data-page]').forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('open');
          mobileNav.classList.remove('open');
          document.body.style.overflow = '';
        });
      });
    }

    document.querySelectorAll('.do__card[data-page]').forEach(item => {
      item.addEventListener('click', function () {
        navigateTo(this.dataset.page);
      });
    });
  }

  function navigateTo(pageName) {
    if (pageName === currentPage) return;

    if (hamburger) hamburger.classList.remove('open');
    if (mobileNav) mobileNav.classList.remove('open');
    document.body.style.overflow = '';

    const transition = document.getElementById('page-transition');
    const doNavigate = () => {
      pages.forEach(page => page.classList.remove('active'));
      const targetPage = document.getElementById('page-' + pageName);
      if (targetPage) {
        targetPage.classList.add('active');
      }

      document.querySelectorAll('.nav__link').forEach(link => {
        link.classList.toggle('active', link.dataset.page === pageName);
      });

      currentPage = pageName;
      window.scrollTo({ top: 0, behavior: 'instant' });

      setTimeout(() => {
        setupRevealAnimations();
        setupStatsCounter();
      }, 100);

      if (transition) {
        setTimeout(() => transition.classList.remove('is-active'), 200);
      }
    };

    if (transition) {
      transition.classList.add('is-active');
      setTimeout(doNavigate, 280);
    } else {
      doNavigate();
    }
  }

  // ============================================
  // STATS COUNTER
  // ============================================
  function setupStatsCounter() {
    const statValues = document.querySelectorAll('.stats__value[data-count]');
    if (!statValues.length) return;

    const animateValue = (el) => {
      if (el.dataset.animated === 'true') return;
      el.dataset.animated = 'true';

      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1400;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(target * eased);
        el.textContent = current + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateValue(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    statValues.forEach(el => {
      if (el.dataset.animated !== 'true') {
        observer.observe(el);
      }
    });
  }

  function setupWorkPreview() {
    document.querySelectorAll('.work-card[data-project]').forEach(card => {
      const open = () => {
        const index = parseInt(card.dataset.project, 10);
        if (currentPage !== 'portfolio') {
          navigateTo('portfolio');
          setTimeout(() => openCaseStudy(index), 520);
        } else {
          openCaseStudy(index);
        }
      };
      card.addEventListener('click', open);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      });
    });

    const featuredImage = document.querySelector('.featured__image[data-project]');
    if (featuredImage) {
      const openFeatured = () => {
        const index = parseInt(featuredImage.dataset.project, 10);
        if (currentPage !== 'portfolio') {
          navigateTo('portfolio');
          setTimeout(() => openCaseStudy(index), 520);
        } else {
          openCaseStudy(index);
        }
      };
      featuredImage.addEventListener('click', openFeatured);
      featuredImage.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openFeatured();
        }
      });
    }

    const featuredCta = document.getElementById('featured-cta');
    if (featuredCta) {
      featuredCta.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage !== 'portfolio') {
          navigateTo('portfolio');
          setTimeout(() => openCaseStudy(0), 520);
        } else {
          openCaseStudy(0);
        }
      });
    }
  }

  function setupPageTransition() {
    /* overlay element wired in navigateTo */
  }

  function setupHeroScroll() {
    const scrollHint = document.querySelector('.hero__scroll');
    const ticker = document.getElementById('ticker-section');
    if (!scrollHint || !ticker) return;

    scrollHint.style.cursor = 'pointer';
    scrollHint.addEventListener('click', () => {
      ticker.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ============================================
  // SCROLL EFFECTS
  // ============================================
  function setupScrollEffects() {
    // Nav background on scroll
    let ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          nav.classList.toggle('scrolled', window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ============================================
  // REVEAL ON SCROLL (Intersection Observer)
  // ============================================
  function setupRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal:not(.revealed)');

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
      );

      revealElements.forEach(el => observer.observe(el));
    } else {
      // Fallback: reveal all immediately
      revealElements.forEach(el => el.classList.add('revealed'));
    }
  }

  // ============================================
  // PORTFOLIO — FILTERS & CASE STUDY
  // ============================================
  function setupPortfolio() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const filter = this.dataset.filter;

        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        projectCards.forEach(card => {
          const categories = card.dataset.category.split(' ');
          const shouldShow = filter === 'all' || categories.includes(filter);

          if (shouldShow) {
            card.style.display = '';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              });
            });
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    projectCards.forEach(card => {
      card.addEventListener('click', function () {
        const projectIndex = parseInt(this.dataset.project, 10);
        openCaseStudy(projectIndex);
      });
    });

    const overlay = document.getElementById('case-study-overlay');
    const closeBtn = document.getElementById('case-study-close');

    if (closeBtn) {
      closeBtn.addEventListener('click', closeCaseStudy);
    }

    if (overlay) {
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeCaseStudy();
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeCaseStudy();
    });
  }

  function openCaseStudy(index) {
    const study = caseStudies[index];
    if (!study) return;

    document.getElementById('cs-title').textContent = study.title;
    document.getElementById('cs-category').textContent = study.category;
    document.getElementById('cs-challenge').textContent = study.challenge;
    document.getElementById('cs-solution').textContent = study.solution;
    document.getElementById('cs-result').textContent = study.result;

    const imageContainer = document.getElementById('cs-image');
    imageContainer.className = 'case-study__image case-study__image--manga';
    imageContainer.innerHTML = `<div class="manga-frame" aria-hidden="true"></div><img class="manga-img" src="${study.image}" alt="${study.title}" loading="lazy">`;

    const liveLink = document.getElementById('cs-live');
    if (liveLink) {
      if (study.url) {
        liveLink.href = study.url;
        liveLink.hidden = false;
      } else {
        liveLink.hidden = true;
      }
    }

    const overlay = document.getElementById('case-study-overlay');
    overlay.scrollTop = 0;
    overlay.setAttribute('aria-hidden', 'false');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      overlay.scrollTop = 0;
    });
  }

  function closeCaseStudy() {
    const overlay = document.getElementById('case-study-overlay');
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.scrollTop = 0;
    document.body.style.overflow = '';
  }

  // ============================================
  // CONTACT FORM
  // ============================================
  function setupContactForm() {
    // Scope tags
    const scopeTags = document.querySelectorAll('.scope-tag');
    scopeTags.forEach(tag => {
      tag.addEventListener('click', function () {
        const scope = this.dataset.scope;
        if (selectedScopes.has(scope)) {
          selectedScopes.delete(scope);
          this.classList.remove('selected');
        } else {
          selectedScopes.add(scope);
          this.classList.add('selected');
        }
        updateWhatsAppLinks();
      });
    });

    // Form submission → WhatsApp
    const form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        const submitBtn = document.getElementById('submit-btn');
        submitBtn.textContent = 'Opening WhatsApp...';
        submitBtn.disabled = true;

        openWhatsAppWithForm();

        setTimeout(() => {
          form.style.display = 'none';
          document.getElementById('form-success').classList.add('show');
        }, 500);
      });
    }
  }

  // ============================================
  // SMOOTH CURSOR GLOW ON CTA BUTTONS
  // ============================================
  function bindCtaGlow() {
    document.querySelectorAll('.cta-btn:not(.cta-btn--hero):not(.cta-btn--outline):not(.cta-btn--whatsapp)').forEach(btn => {
      btn.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        this.style.background = `radial-gradient(120px circle at ${x}px ${y}px, rgba(255,255,255,0.12), rgba(255,255,255,0.04))`;
      });

      btn.addEventListener('mouseleave', function () {
        this.style.background = '';
      });
    });
  }

  // ============================================
  // PROJECT CARD GLOW EFFECT
  // ============================================
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      this.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(255,255,255,0.03), var(--color-bg-card))`;
    });

    card.addEventListener('mouseleave', function () {
      this.style.background = 'var(--color-bg-card)';
    });
  });

  // ============================================
  // BOOT
  // ============================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
