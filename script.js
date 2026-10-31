/**
 * AMRITANSHU SINGH — PORTFOLIO CLIENT INTERACTIONS
 * Minimalist, high-performance interactions matching reference video.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 01. PROJECT DATABASE (Strict adherence to user specifications)
  // --------------------------------------------------------------------------
  const projectsData = {
    'dayflow': {
      id: 'dayflow',
      title: 'DayFlow',
      tagline: 'An HR management platform designed to streamline employee management and HR workflows.',
      badge: 'LIVE / AVAILABLE',
      badgeClass: 'status-live',
      category: 'fullstack',
      image: 'assets/dayflow-workspace.png',
      domain: 'Full-Stack Web Development & Enterprise HRMS',
      timeline: '2026 · Production',
      techStack: 'React · Node.js · Express · PostgreSQL · Supabase',
      tags: ['Full Stack', 'HRMS', 'Live Platform'],
      narrative: `
        <p><strong>DayFlow</strong> is an enterprise-grade HR management solution built to eliminate operational friction across growing teams. The platform centralizes employee record keeping, leave management workflows, attendance tracking, bulletin announcements, and collaborative communication into a unified digital workspace.</p>
        <p>Engineered with a clean modern stack utilizing React for componentized interfaces, Node.js and Express for backend REST endpoints, and PostgreSQL with Supabase for secure data isolation, role-based access control, and reliable schema migrations.</p>
      `,
      primaryAction: {
        label: 'View Project',
        url: 'https://dayflowhrm-eq7f4z79.manus.space/app',
        isExternal: true
      }
    },
    'devflow': {
      id: 'devflow',
      title: 'DevFlow',
      tagline: 'An AI-powered project management platform with GitHub integration, designed to improve team collaboration and development workflows.',
      badge: 'COMING SOON',
      badgeClass: 'status-upcoming',
      category: 'fullstack',
      image: 'assets/devflow-dashboard.png',
      domain: 'AI Developer Productivity & Collaboration',
      timeline: '2026 · In Active Development',
      techStack: 'TypeScript · React.js · PostgreSQL · Prisma · Redis',
      tags: ['Collaboration', 'AI Features', 'GitHub Workflows'],
      narrative: `
        <p><strong>DevFlow</strong> bridges task management and GitHub repository activity into one cohesive view for software teams. By syncing branch activity, pull request lifecycle states, and issue trackers, teams gain effortless visibility into sprint progress.</p>
        <p>Integrated with contextual AI features to automate sprint retrospectives, identify development bottlenecks, and generate intelligent release summaries directly from commit histories.</p>
      `,
      primaryAction: {
        label: 'Coming Soon',
        url: null,
        isExternal: false
      }
    },
    'redis-leaderboard': {
      id: 'redis-leaderboard',
      title: 'Live Leaderboard Using Redis',
      tagline: 'A live leaderboard API powered by Redis that tracks post views, updates user scores, retrieves top-ranked users, and looks up individual rankings.',
      badge: 'OPEN SOURCE',
      badgeClass: 'status-opensource',
      category: 'systems',
      image: 'assets/redis-leaderboard.svg',
      domain: 'High-Throughput In-Memory Data Systems',
      timeline: '2026 · Open Source',
      techStack: 'Redis (Sorted Sets) · Node.js · Express · REST API',
      tags: ['Redis', 'Backend API', 'In-Memory Cache'],
      narrative: `
        <p>A specialized, ultra-fast real-time leaderboard service built on <strong>Redis Sorted Sets (ZSET)</strong>. Designed to process high-throughput concurrent post view increments and dynamic ranking lookups with sub-millisecond response latency.</p>
        <p>Features atomic score updates via <code>ZINCRBY</code>, real-time top-tier ranking extraction with <code>ZREVRANGEBYSCORE</code>, and individual user standing queries via <code>ZREVRANK</code>. Demonstrates clean memory optimization, low CPU footprint, and production-ready Redis clustering principles.</p>
      `,
      primaryAction: {
        label: 'View on GitHub',
        url: 'https://github.com/Amrittt22/live-leaderboard-using-redis',
        isExternal: true
      }
    },
    'zonify': {
      id: 'zonify',
      title: 'Zonify Extension',
      tagline: 'A Chrome productivity extension featuring a Pomodoro focus timer and distraction-blocking functionality.',
      badge: 'CHROME EXTENSION',
      badgeClass: 'status-extension',
      category: 'systems',
      image: 'assets/zonify-extension.svg',
      domain: 'Browser Extension & Focus Architecture',
      timeline: '2026 · Open Source',
      techStack: 'JavaScript · Chrome Extension Manifest V3 · Storage API',
      tags: ['Productivity', 'Manifest V3', 'Chrome API'],
      narrative: `
        <p><strong>Zonify</strong> is an intentional focus companion built for modern web browsers. Designed strictly around Chrome Manifest V3 specifications, it combines customizable Pomodoro deep-work intervals with background domain-blocking algorithms.</p>
        <p>Engineered using lightweight background service workers and the Chrome Storage API to maintain zero memory leak overhead while active, protecting developers and students from browsing distractions during high-leverage focus sessions.</p>
      `,
      primaryAction: {
        label: 'View on GitHub',
        url: 'https://github.com/Amrittt22/Zonify-Extension',
        isExternal: true
      }
    }
  };

  // --------------------------------------------------------------------------
  // 02. MOBILE DRAWER NAVIGATION
  // --------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn && mobileMenu) {
    const toggleMenu = (isOpen) => {
      mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
      mobileMenu.setAttribute('aria-hidden', String(!isOpen));
      mobileMenu.classList.toggle('is-active', isOpen);
    };

    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      toggleMenu(!isExpanded);
    });

    // Close when clicking any nav link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        toggleMenu(false);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 03. SERVICES / SKILLS ACCORDION
  // --------------------------------------------------------------------------
  const accordionRows = document.querySelectorAll('.service-row-item[data-accordion]');
  accordionRows.forEach((row) => {
    const headerBtn = row.querySelector('.service-row-header');
    if (headerBtn) {
      headerBtn.addEventListener('click', () => {
        const isOpen = row.classList.contains('is-open');
        // Close other accordions for clean editorial aesthetic
        accordionRows.forEach((otherRow) => {
          if (otherRow !== row) {
            otherRow.classList.remove('is-open');
            const otherBtn = otherRow.querySelector('.service-row-header');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        row.classList.toggle('is-open', !isOpen);
        headerBtn.setAttribute('aria-expanded', String(!isOpen));
      });
    }
  });

  // --------------------------------------------------------------------------
  // 04. PROJECTS FILTER TABS
  // --------------------------------------------------------------------------
  const filterTabs = document.querySelectorAll('.filter-tab-btn');
  const projectCards = document.querySelectorAll('.project-editorial-card');

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach((t) => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      const filterVal = tab.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const cardCat = card.getAttribute('data-category');
        if (filterVal === 'all' || cardCat === filterVal) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.35s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 05. INTERACTIVE PROJECT DETAIL MODAL (Matching Reference Video)
  // --------------------------------------------------------------------------
  const modalBackdrop = document.getElementById('projectModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalBadge = document.getElementById('modalBadge');
  const modalTags = document.getElementById('modalTags');
  const modalTitle = document.getElementById('modalProjectTitle');
  const modalTagline = document.getElementById('modalProjectTagline');
  const modalImg = document.getElementById('modalProjectImg');
  const modalDomain = document.getElementById('modalDomain');
  const modalTimeline = document.getElementById('modalTimeline');
  const modalTechStack = document.getElementById('modalTechStack');
  const modalNarrative = document.getElementById('modalNarrative');
  const modalActions = document.getElementById('modalActions');
  const modalMoreWorkStrip = document.getElementById('modalMoreWorkStrip');

  function openProjectModal(projectId) {
    const data = projectsData[projectId];
    if (!data) return;

    // Set Header & Badges
    modalBadge.textContent = data.badge;
    modalBadge.className = `modal-status-badge ${data.badgeClass}`;

    // Set Tags
    modalTags.innerHTML = data.tags.map((t) => `<span class="tag-pill">${t}</span>`).join('');

    // Set Text & Media
    modalTitle.textContent = data.title;
    modalTagline.textContent = data.tagline;
    modalImg.src = data.image;
    modalImg.alt = data.title;

    // Set Specs
    modalDomain.textContent = data.domain;
    modalTimeline.textContent = data.timeline;
    modalTechStack.textContent = data.techStack;

    // Narrative
    modalNarrative.innerHTML = data.narrative;

    // CTA Actions
    let actionButtonsHTML = '';
    if (data.primaryAction.url) {
      actionButtonsHTML += `
        <a href="${data.primaryAction.url}" target="_blank" rel="noopener noreferrer" class="btn-pill-dark btn-project-action">
          <span>${data.primaryAction.label}</span>
          <span class="btn-arrow" aria-hidden="true">↗</span>
        </a>
      `;
    } else {
      actionButtonsHTML += `
        <span class="badge-status-pill upcoming-pill">
          <span>${data.primaryAction.label}</span>
        </span>
      `;
    }

    actionButtonsHTML += `
      <a href="#contact" class="btn-pill-outline" id="modalContactBtn">
        <span>Get in Touch</span>
      </a>
    `;
    modalActions.innerHTML = actionButtonsHTML;

    const modalContact = document.getElementById('modalContactBtn');
    if (modalContact) {
      modalContact.addEventListener('click', () => closeProjectModal());
    }

    // Populate (MORE WORK) Strip
    const otherProjects = Object.values(projectsData).filter((p) => p.id !== projectId);
    modalMoreWorkStrip.innerHTML = otherProjects.map((p) => `
      <div class="more-work-thumb-card" data-open-project="${p.id}">
        <div class="more-work-thumb-media">
          <img src="${p.image}" alt="${p.title}" loading="lazy" />
        </div>
        <strong>${p.title}</strong>
        <span>${p.badge}</span>
      </div>
    `).join('');

    // Attach click listeners to more work items
    modalMoreWorkStrip.querySelectorAll('.more-work-thumb-card').forEach((card) => {
      card.addEventListener('click', () => {
        const nextId = card.getAttribute('data-open-project');
        openProjectModal(nextId);
        document.getElementById('modalSheet').scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    // Show Modal
    modalBackdrop.classList.add('is-active');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    modalBackdrop.classList.remove('is-active');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Attach Open Triggers
  document.querySelectorAll('[data-open-project]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = trigger.getAttribute('data-open-project');
      openProjectModal(projId);
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeProjectModal);
  }

  // Close on Backdrop Click or ESC Key
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeProjectModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('is-active')) {
        closeProjectModal();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 06. EXPERIENCE TIMELINE FLOATING PREVIEW (Matching Reference Video)
  // --------------------------------------------------------------------------
  const expRows = document.querySelectorAll('.experience-row');
  const expFloatingPreview = document.getElementById('expFloatingPreview');
  const expPreviewImg = document.getElementById('expPreviewImg');
  const expPreviewTitle = document.getElementById('expPreviewTitle');
  const expPreviewDesc = document.getElementById('expPreviewDesc');

  if (expFloatingPreview && expRows.length > 0) {
    expRows.forEach((row) => {
      row.addEventListener('mouseenter', (e) => {
        const imgSrc = row.getAttribute('data-preview-img');
        const title = row.getAttribute('data-preview-title');
        const desc = row.getAttribute('data-preview-desc');

        if (imgSrc) expPreviewImg.src = imgSrc;
        if (title) expPreviewTitle.textContent = title;
        if (desc) expPreviewDesc.textContent = desc;

        expFloatingPreview.classList.add('is-visible');
        updatePreviewPosition(e);
      });

      row.addEventListener('mousemove', (e) => {
        updatePreviewPosition(e);
      });

      row.addEventListener('mouseleave', () => {
        expFloatingPreview.classList.remove('is-visible');
      });
    });

    function updatePreviewPosition(e) {
      expFloatingPreview.style.left = `${e.clientX}px`;
      expFloatingPreview.style.top = `${e.clientY}px`;
    }
  }

  // --------------------------------------------------------------------------
  // 07. LIVE BENGALURU IST CLOCK
  // --------------------------------------------------------------------------
  const timeStringEl = document.getElementById('timeString');
  function updateISTClock() {
    if (!timeStringEl) return;
    const now = new Date();
    // Format to Asia/Kolkata (IST)
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    try {
      const formatted = new Intl.DateTimeFormat('en-US', options).format(now);
      timeStringEl.textContent = formatted;
    } catch {
      // fallback
    }
  }
  updateISTClock();
  setInterval(updateISTClock, 30000);

  // --------------------------------------------------------------------------
  // 08. SMOOTH ANCHOR LINK NAVIGATION
  // --------------------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#top') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --------------------------------------------------------------------------
  // 09. 3D PERSPECTIVE ANGLE MODE (Matching Video Showcase Angle)
  // --------------------------------------------------------------------------
  const perspectiveToggle = document.getElementById('perspectiveToggle');
  if (perspectiveToggle) {
    perspectiveToggle.addEventListener('click', () => {
      const isActive = document.body.classList.toggle('mode-3d');
      perspectiveToggle.classList.toggle('is-active', isActive);
      const textSpan = perspectiveToggle.querySelector('.perspective-text');
      if (textSpan) {
        textSpan.textContent = isActive ? 'Flat View' : '3D Angle';
      }
    });
  }

  // --------------------------------------------------------------------------
  // 10. SCROLL REVEAL OBSERVER (Intersection Observer)
  // --------------------------------------------------------------------------
  const revealTargets = document.querySelectorAll(`
    .about-lead-heading,
    .about-bio-text,
    .about-bio-secondary,
    .pillar-item,
    .service-row-item,
    .project-editorial-card,
    .experience-row,
    .strip-card,
    .contact-huge-headline,
    .contact-lead-desc,
    .contact-social-card
  `);

  revealTargets.forEach((el) => el.classList.add('reveal-item'));

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealTargets.forEach((el) => revealObserver.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }

  // --------------------------------------------------------------------------
  // 11. SUBTLE HERO MOUSE PARALLAX INTERACTION
  // --------------------------------------------------------------------------
  const heroStage = document.querySelector('.hero-stage');
  const heroPortrait = document.querySelector('.hero-portrait-img');
  const heroTitle = document.querySelector('.hero-title-row');

  if (heroStage && heroPortrait && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    heroStage.addEventListener('mousemove', (e) => {
      const rect = heroStage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 18;
      mouseY = y * 18;
    });

    heroStage.addEventListener('mouseleave', () => {
      mouseX = 0;
      mouseY = 0;
    });

    function animateParallax() {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;

      if (heroPortrait) {
        heroPortrait.style.transform = `perspective(1000px) rotateY(${currentX * 0.6}deg) rotateX(${-currentY * 0.6}deg) translateX(${currentX * 0.4}px)`;
      }
      if (heroTitle) {
        heroTitle.style.transform = `translateX(${-currentX * 0.3}px)`;
      }

      requestAnimationFrame(animateParallax);
    }
    animateParallax();
  }

  // --------------------------------------------------------------------------
  // 12. WATERMARK PARALLAX ON SCROLL
  // --------------------------------------------------------------------------
  const watermarks = document.querySelectorAll('.watermark-bg');
  if (watermarks.length > 0 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      watermarks.forEach((wm) => {
        const rect = wm.parentElement.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const offset = (window.innerHeight - rect.top) * 0.05;
          wm.style.transform = `translate(-50%, ${offset}px)`;
        }
      });
    }, { passive: true });
  }
});
