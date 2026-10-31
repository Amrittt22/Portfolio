/**
 * AMRITANSHU SINGH — PORTFOLIO INTERACTIONS
 * Rebuilt to match the reference demo exactly.
 */
document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================
     01 · PROJECT DATABASE
     ========================================================== */
  const PROJECTS = {
    dayflow: {
      title: "DayFlow",
      type: "/Full-Stack HRMS",
      badge: "LIVE PLATFORM",
      tags: ["Full Stack", "HRMS"],
      desc: "A modern Human Resource Management System that brings employees, HR teams, attendance, leave, payroll, announcements, real-time chat, and Google Meet collaboration into one unified workspace. Built on a custom 'Paper Motion' design system with TypeScript and React.js (tRPC) on the frontend, and Node.js, Express, and TypeScript on the backend with role-based access for Employee and HR/Admin views.",
      service: "Full-Stack Development, UI/UX",
      tools: "TypeScript · React.js · tRPC · Tailwind CSS · Node.js · Express · PostgreSQL",
      shots: ["assets/dayflow-workspace.png", "assets/dayflow-bulletin.png", "assets/dayflow-actions.png"],
      action: { label: "Live Preview", url: "https://dayflowhrm-eq7f4z79.manus.space/app" }
    },
    devflow: {
      title: "DevFlow",
      type: "/Collaboration Platform",
      badge: "IN DEVELOPMENT",
      tags: ["Collaboration", "GitHub Integration"],
      desc: "A full-stack collaboration platform for software teams to create workspaces, manage projects, organize tasks, and track progress — Kanban boards with drag-and-drop status changes, list and calendar views, labels, member assignments, email invitations with expiry validation, and workspace-scoped roles (Owner / Admin / Member). Express REST API with server-side Supabase bearer-token verification and a Prisma-backed PostgreSQL database. Kanban planning, GitHub integration, and sprint analytics on the roadmap.",
      service: "Full-Stack Development, Team Collaboration",
      tools: "TypeScript · React · Express · Supabase · Prisma 7 · Tailwind CSS",
      shots: ["assets/devflow-dashboard.png", "assets/devflow-board.png", "assets/devflow-sprints.png"],
      action: { label: "View on GitHub", url: "https://github.com/Amrittt22/DevFlow" }
    },
    "redis-leaderboard": {
      title: "Redis Leaderboard",
      type: "/Open Source API",
      badge: "OPEN SOURCE",
      tags: ["Redis", "Docker"],
      desc: "A live leaderboard app with a browser frontend and JSON API served from the same Node.js + Express server. It displays the top 10 users with scores and ranks, refreshes automatically every five seconds, increments post-view counters, and looks up individual ranks. Redis Sorted Sets (ZSET) power the atomic score updates and rank lookups, and Docker Compose starts the app and Redis together so a clone runs anywhere without installing Redis.",
      service: "Backend & Data Systems",
      tools: "Node.js · Express · Redis Sorted Sets · Docker Compose · REST API",
      shots: ["assets/redis-leaderboard.svg"],
      action: { label: "View on GitHub", url: "https://github.com/Amrittt22/live-leaderboard-using-redis" }
    },
    zonify: {
      title: "Zonify",
      type: "/Browser Extension",
      badge: "CHROME EXTENSION",
      tags: ["Chrome MV3", "React"],
      desc: "A Pomodoro focus timer and site blocker for Chrome built on Manifest V3 with TypeScript, React 18, Vite, and @crxjs/vite-plugin — no accounts, no remote code. The live timer survives closing the popup, declarativeNetRequest blocking runs only during focus sessions with a blocked-page countdown, and an options page manages the blocklist, timer settings, and stats. An optional opt-in weekly insights service (with a mock-mode backend on Render) delivers AI summaries of aggregate weekly numbers without ever seeing raw browsing data. Ships with CI, tests, and tagged releases.",
      service: "Developer Tools & Extensions",
      tools: "TypeScript · React 18 · Vite · CRXJS · declarativeNetRequest · Node.js API",
      shots: ["assets/zonify-extension.svg"],
      action: { label: "View on GitHub", url: "https://github.com/Amrittt22/Zonify-Extension" }
    }
  };

  const esc = (str) =>
    String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ==========================================================
     02 · WORK FILTERS
     ========================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workCards = document.querySelectorAll('.work-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => {
        b.classList.toggle('is-active', b === btn);
        b.setAttribute('aria-selected', String(b === btn));
      });

      const filter = btn.dataset.filter;
      workCards.forEach((card) => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('is-hidden-by-filter', !show);
      });
    });
  });

  /* ==========================================================
     03 · PROJECT DETAIL PAGE
     ========================================================== */
  const projectPage = document.getElementById('projectPage');
  const projectBackBtn = document.getElementById('projectBackBtn');
  const projectTags = document.getElementById('projectTags');
  const projectService = document.getElementById('projectService');
  const projectTools = document.getElementById('projectTools');
  const projectTitle = document.getElementById('projectTitle');
  const projectType = document.getElementById('projectType');
  const projectDesc = document.getElementById('projectDesc');
  const projectActions = document.getElementById('projectActions');
  const projectShots = document.getElementById('projectShots');

  let scrollYLock = 0;
  let currentPageKey = null;

  function fillProjectAndPrecomputeShots(pageEl) {
    projectPage.querySelectorAll('.project-shot img').forEach((img) => {
      if (pageEl instanceof Element && pageEl.contains(img)) {
        /* noop — placeholder for future preload hooks */
      }
    });
  }

  function openProject(key) {
    const p = PROJECTS[key];
    if (!p) return;

    currentPageKey = key;
    projectTitle.textContent = p.title;
    projectType.textContent = p.type;
    projectDesc.textContent = p.desc;
    projectService.textContent = p.service;
    projectTools.textContent = p.tools;

    projectTags.innerHTML = p.tags.map((t) => `<span class="tag-pill">${esc(t)}</span>`).join('');

    projectActions.innerHTML = p.action
      ? `<a class="btn-dark" href="${esc(p.action.url)}" target="_blank" rel="noopener noreferrer">
           <span>${esc(p.action.label)}</span>
           <span class="btn-arrow" aria-hidden="true">↗</span>
         </a>
         <a class="btn-light" href="mailto:amritanshusingh2205@gmail.com">
           <span>Contact Me</span>
         </a>`
      : `<span class="tag-pill" style="display:inline-flex;align-items:center;padding:12px 20px;font-size:.85rem;">Coming Soon</span>
         <a class="btn-light" href="mailto:amritanshusingh2205@gmail.com">
           <span>Contact Me</span>
         </a>`;

    projectShots.innerHTML = p.shots
      .map((src) => `<figure class="project-shot"><img src="${esc(src)}" alt="${esc(p.title)} preview" loading="lazy" decoding="async" /></figure>`)
      .join('');

    const badge = projectPage.querySelector('.nav-status-pill');
    if (badge) {
      badge.setAttribute('data-badge', p.badge);
    }

    scrollYLock = window.scrollY;
    document.body.style.overflow = 'hidden';
    projectPage.classList.add('is-open');
    projectPage.setAttribute('aria-hidden', 'false');
    projectPage.querySelector('.project-page-scroll').scrollTop = 0;
    projectBackBtn.focus({ preventScroll: true });
  }

  function closeProject() {
    projectPage.classList.remove('is-open');
    projectPage.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    window.scrollTo({ top: scrollYLock, behavior: 'instant' in window ? 'auto' : 'auto' });
  }

  projectBackBtn.addEventListener('click', closeProject);
  projectPage.addEventListener('click', (e) => {
    if (e.target === projectPage) closeProject();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectPage.classList.contains('is-open')) closeProject();
  });

  workCards.forEach((card) => {
    card.addEventListener('click', () => openProject(card.dataset.project));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openProject(card.dataset.project);
      }
    });
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'link');
    card.setAttribute('aria-label', `Open project details`);
  });

  /* ==========================================================
     04 · SERVICE ROWS (hover-open like the demo)
     ========================================================== */
  const serviceRows = document.querySelectorAll('.service-row');

  function openServiceRow(row) {
    serviceRows.forEach((other) => {
      if (other !== row) {
        other.classList.remove('is-open');
        other.querySelector('.service-row-head').setAttribute('aria-expanded', 'false');
        other.querySelector('.service-arrow').textContent = '↗';
      }
    });
    row.classList.add('is-open');
    row.querySelector('.service-row-head').setAttribute('aria-expanded', 'true');
    row.querySelector('.service-arrow').textContent = '✕';
  }

  function closeServiceRow(row) {
    row.classList.remove('is-open');
    row.querySelector('.service-row-head').setAttribute('aria-expanded', 'false');
    row.querySelector('.service-arrow').textContent = '↗';
  }

  serviceRows.forEach((row) => {
    row.addEventListener('mouseenter', () => openServiceRow(row));
    row.addEventListener('mouseleave', () => closeServiceRow(row));

    const head = row.querySelector('.service-row-head');
    head.addEventListener('click', () => {
      row.classList.contains('is-open') ? closeServiceRow(row) : openServiceRow(row);
    });
  });

  /* ==========================================================
     05 · LIVE DSA HOVER PANEL
     Fetches your real LeetCode numbers live the first time the
     "Core Programming & DSA" row is hovered, and renders them in
     an animated card on top of the static preview. Uses:
       · alfa-leetcode-api  — live profile / solved / contest data
       · CountUp.js (CDN)   — animated number counters
     GfG removed its public stats API, so its line shows the real
     avatar + handle and keeps a static fallback everywhere else.
     ========================================================== */
  const dsaLive = document.getElementById('dsaLive');
  const dsaCard = document.getElementById('dsaLiveCard');
  const dsaGfgCard = document.getElementById('dsaLiveGfgCard');

  if (dsaLive && dsaCard && dsaGfgCard) {
    const card = dsaCard;
    const gfgCard = dsaGfgCard;
    const LC_USER = 'amrittt_22';
    const LC_API = 'https://alfa-leetcode-api.onrender.com/' + LC_USER;
    const GFG_USER = 'amritansh35xf';
    const GFG_PAGE = 'https://www.geeksforgeeks.org/user/' + GFG_USER + '/';
    const GFG_PROXY = 'https://r.jina.ai/' + GFG_PAGE;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let dsaLoaded = false;

    async function dsaFetch(url) {
      const res = await fetch(url);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    }

    function gfgHours(ms) { return ms / 36e5; }

    /* GfG has no public stats API — their user page server-renders a JSON
       blob with the real numbers (coding score, solved count, institute
       rank). r.jina.ai proxies it with permissive CORS. Cached in
       localStorage for 3 h so we stay well under the proxy's rate limits. */
    function gfgCacheGet() {
      try {
        const raw = JSON.parse(localStorage.getItem('amritanshu-gfg-live') || 'null');
        if (raw && gfgHours(Date.now() - raw.t) < 3 && raw.d && raw.d.score != null) return raw.d;
      } catch (cacheErr) { /* private mode etc. — fetch live instead */ }
      return null;
    }

    function gfgCacheSet(data) {
      try {
        localStorage.setItem('amritanshu-gfg-live', JSON.stringify({ t: Date.now(), d: data }));
      } catch (cacheErr) { /* storage unavailable — non-fatal */ }
    }

    function parseGfg(html) {
      const flat = html.replace(/\\/g, '');
      const grab = (re) => {
        const m = flat.match(re);
        return m ? parseInt(m[1], 10) : null;
      };
      const data = {
        score: grab(/"score":(\d+),"monthly_score/),
        solved: grab(/"total_problems_solved":(\d+)/),
        rank: grab(/"institute_rank":(\d+)/),
      };
      if (data.score == null && data.solved == null) throw new Error('no stats in page');
      return data;
    }

    async function fetchGfgLive() {
      const cached = gfgCacheGet();
      if (cached) return cached;
      const res = await fetch(GFG_PROXY, { headers: { 'X-Return-Format': 'html' } });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = parseGfg(await res.text());
      gfgCacheSet(data);
      return data;
    }

    function dsaCount(el, value) {
      if (!el) return;
      const final = value.toLocaleString('en-US');
      if (window.countUp && window.countUp.CountUp && value > 0 && !reduceMotion) {
        // Animated count, with a safety run just in case the tab never
        // paints frames (minimized/hidden window).
        new window.countUp.CountUp(el, value, { duration: 1.2 }).start();
        setTimeout(() => {
          if (!el.textContent || el.textContent === '0') el.textContent = final;
        }, 1700);
      } else {
        el.textContent = final;
      }
    }

    async function loadDsaLive() {
      if (dsaLoaded) return;
      dsaLoaded = true;

      try {
        const results = await Promise.all([
          dsaFetch(LC_API),
          dsaFetch(LC_API + '/solved'),
          dsaFetch(LC_API + '/contest').catch(() => null),
          fetchGfgLive().catch(() => null),
        ]);
        const [profile, solved, contest, gfgLive] = results;

        const total = solved.solvedProblem ?? solved.acSubmissionNum?.[0]?.count ?? 0;
        const easy = solved.easySolved ?? 0;
        const medium = solved.mediumSolved ?? 0;
        const hard = solved.hardSolved ?? 0;
        const rating = contest?.contestRating ? Math.round(contest.contestRating) : null;
        const rank = contest?.contestGlobalRanking ?? profile.ranking ?? null;
        const max = Math.max(easy, medium, hard, 1);

        const lcLogoPath = 'M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z';
        const gfgLogoPath = 'M21.45 14.315c-.143.28-.334.532-.565.745a3.691 3.691 0 0 1-1.104.695 4.51 4.51 0 0 1-3.116-.016 3.79 3.79 0 0 1-2.135-2.078 3.571 3.571 0 0 1-.13-.353h7.418a4.26 4.26 0 0 1-.368 1.008zm-11.99-.654a3.793 3.793 0 0 1-2.134 2.078 4.51 4.51 0 0 1-3.117.016 3.7 3.7 0 0 1-1.104-.695 2.652 2.652 0 0 1-.564-.745 4.221 4.221 0 0 1-.368-1.006H9.59c-.038.12-.08.238-.13.352zm14.501-1.758a3.849 3.849 0 0 0-.082-.475l-9.634-.008a3.932 3.932 0 0 1 1.143-2.348c.363-.35.79-.625 1.26-.809a3.97 3.97 0 0 1 4.484.957l1.521-1.49a5.7 5.7 0 0 0-1.922-1.357 6.283 6.283 0 0 0-2.544-.49 6.35 6.35 0 0 0-2.405.457 6.007 6.007 0 0 0-1.963 1.276 6.142 6.142 0 0 0-1.325 1.94 5.862 5.862 0 0 0-.466 1.864h-.063a5.857 5.857 0 0 0-.467-1.865 6.13 6.13 0 0 0-1.325-1.939A6 6 0 0 0 8.21 6.34a6.698 6.698 0 0 0-4.949.031A5.708 5.708 0 0 0 1.34 7.73l1.52 1.49a4.166 4.166 0 0 1 4.484-.958c.47.184.898.46 1.26.81.368.36.66.792.859 1.268.146.344.242.708.285 1.08l-9.635.008A4.714 4.714 0 0 0 0 12.457a6.493 6.493 0 0 0 .345 2.127 4.927 4.927 0 0 0 1.08 1.783c.528.56 1.17 1 1.88 1.293a6.454 6.454 0 0 0 2.504.457c.824.005 1.64-.15 2.404-.457a5.986 5.986 0 0 0 1.964-1.277 6.116 6.116 0 0 0 1.686-3.076h.273a6.13 6.13 0 0 0 1.686 3.077 5.99 5.99 0 0 0 1.964 1.276 6.345 6.345 0 0 0 2.405.457 6.45 6.45 0 0 0 2.502-.457 5.42 5.42 0 0 0 1.882-1.293 4.928 4.928 0 0 0 1.08-1.783A6.52 6.52 0 0 0 24 12.457a4.757 4.757 0 0 0-.039-.554z';

        card.innerHTML = `
          <div class="dsa-live-head">
            <img class="dsa-live-avatar" src="assets/leetcode-avatar.png" alt="" />
            <div class="dsa-live-id">
              <span class="dsa-live-name">LeetCode</span>
              <span class="dsa-live-handle">@${profile.username ?? LC_USER}</span>
            </div>
            <svg class="dsa-live-glyph" viewBox="0 0 24 24" fill="#FFA116"><path d="${lcLogoPath}"/></svg>
            <span class="dsa-live-badge"><span class="live-dot"></span>LIVE</span>
          </div>
          <div class="dsa-live-total">
            <span class="dsa-live-big" id="dsaLiveTotal">0</span>
            <span class="dsa-live-big-label">problems solved</span>
          </div>
          <div class="dsa-live-bars">
            <div class="dsa-live-bar">
              <span class="dsa-bar-label">Easy</span>
              <span class="dsa-bar-track"><span class="dsa-bar-fill" data-difficulty="easy" data-count="${easy}"></span></span>
              <span class="dsa-bar-value" id="dsaLiveEasy">0</span>
            </div>
            <div class="dsa-live-bar">
              <span class="dsa-bar-label">Medium</span>
              <span class="dsa-bar-track"><span class="dsa-bar-fill" data-difficulty="medium" data-count="${medium}"></span></span>
              <span class="dsa-bar-value" id="dsaLiveMedium">0</span>
            </div>
            <div class="dsa-live-bar">
              <span class="dsa-bar-label">Hard</span>
              <span class="dsa-bar-track"><span class="dsa-bar-fill" data-difficulty="hard" data-count="${hard}"></span></span>
              <span class="dsa-bar-value" id="dsaLiveHard">0</span>
            </div>
          </div>
          <div class="dsa-live-meta">
            ${rating ? `<span>Rating <b>${rating}</b></span>` : ''}
            ${rank ? `<span>Rank <b>#${rank.toLocaleString('en-US')}</b></span>` : ''}
          </div>`;

        const gfgLine = gfgLive && (gfgLive.score != null || gfgLive.solved != null)
          ? `<div class="dsa-live-total">
              <span class="dsa-live-big" id="dsaGfgScore">0</span>
              <span class="dsa-live-big-label">coding score</span>
            </div>
            <div class="dsa-live-stats">
              <div class="dsa-live-stat"><span>Solved</span><b id="dsaGfgSolved">0</b></div>
              ${gfgLive.rank != null ? `<div class="dsa-live-stat"><span>Institute rank</span><b>#${gfgLive.rank}</b></div>` : ''}
            </div>`
          : null;

        if (gfgLine) {
          gfgCard.innerHTML = `
            <div class="dsa-live-head">
              <img class="dsa-live-avatar" src="assets/gfg-avatar.png" alt="" />
              <div class="dsa-live-id">
                <span class="dsa-live-name">GeeksforGeeks</span>
                <span class="dsa-live-handle">@${GFG_USER}</span>
              </div>
              <svg class="dsa-live-glyph" viewBox="0 0 24 24" fill="#2f8d46"><path d="${gfgLogoPath}"/></svg>
              <span class="dsa-live-badge"><span class="live-dot"></span>LIVE</span>
            </div>
            ${gfgLine}`;
        } else {
          gfgCard.style.display = 'none';
        }

        dsaCard.hidden = false;
        gfgCard.hidden = false;
        dsaLive.dataset.state = 'live';
        card.classList.add('is-ready');
        gfgCard.classList.add('is-ready');

        const fillBars = () => {
          card.querySelectorAll('.dsa-bar-fill').forEach((bar) => {
            const count = parseInt(bar.dataset.count, 10);
            bar.style.width = Math.max((count / max) * 100, count > 0 ? 8 : 0) + '%';
          });
        };

        // Animate bars on the next frames, with a timeout fallback so the
        // card still fills even if the tab never paints (minimized window).
        requestAnimationFrame(() => requestAnimationFrame(fillBars));
        setTimeout(fillBars, 80);

        dsaCount(card.querySelector('#dsaLiveTotal'), total);
        dsaCount(card.querySelector('#dsaLiveEasy'), easy);
        dsaCount(card.querySelector('#dsaLiveMedium'), medium);
        dsaCount(card.querySelector('#dsaLiveHard'), hard);
        if (gfgLine) dsaCount(gfgCard.querySelector('#dsaGfgScore'), gfgLive.score ?? 0);
        if (gfgLine) dsaCount(gfgCard.querySelector('#dsaGfgSolved'), gfgLive.solved ?? 0);
      } catch (err) {
        // API down or offline — keep the polished static SVG preview
        dsaLive.dataset.state = 'error';
        dsaLoaded = false; // allow a retry on the next hover
      }
    }

    const dsaRow = dsaLive.closest('.service-row');
    if (dsaRow && !reduceMotion) {
      dsaRow.addEventListener('mouseenter', loadDsaLive);
      dsaRow.addEventListener('click', loadDsaLive);
    }
  }

  /* ==========================================================
     06 · EXPERIENCE FLOATING CURSOR PREVIEW
     ========================================================== */
  const expFloat = document.getElementById('experienceFloat');
  const expFloatImg = document.getElementById('experienceFloatImg');
  const expRows = document.querySelectorAll('.experience-row');

  let floatRAF = null;
  let floatX = 0;
  let floatY = 0;

  function floatLoop() {
    expFloat.style.transform = 'translate(' + floatX + 'px, ' + floatY + 'px)';
    floatRAF = null;
  }

  function scheduleFloat() {
    if (!floatRAF) floatRAF = requestAnimationFrame(floatLoop);
  }

  expRows.forEach((row) => {
    row.addEventListener('mouseenter', () => {
      expFloatImg.src = row.dataset.preview;
      expFloat.style.left = '0px';
      expFloat.style.top = '0px';
      expFloat.style.marginLeft = '-135px'; // center horizontally under cursor
      expFloat.style.marginTop = '-190px'; // lift above cursor
      expFloat.classList.add('is-visible');
    });

    row.addEventListener('mousemove', (e) => {
      floatX = e.clientX;
      floatY = e.clientY;
      scheduleFloat();
    });

    row.addEventListener('mouseleave', () => {
      expFloat.classList.remove('is-visible');
    });
  });

  /* ==========================================================
     06 · SUBTLE REVEAL-ON-SCROLL
     ========================================================== */
  const revealTargets = document.querySelectorAll(
    '.work-heading, .work-toolbar, .work-card, .service-heading, .service-row, .experience-head-row, .experience-row, .contact-main, .site-footer'
  );

  revealTargets.forEach((el) => el.classList.add('reveal'));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-inview');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  revealTargets.forEach((el) => io.observe(el));

  /* ==========================================================
     07 · PROJECT PAGE FOCUS SANITY
     ========================================================== */
  document.querySelectorAll('.project-shot img').forEach((img) => {
    img.addEventListener('load', () => img.classList.add('is-loaded'));
  });
});
