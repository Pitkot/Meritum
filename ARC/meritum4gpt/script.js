(() => {
  document.documentElement.classList.add('js-enabled');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('.site-header');
  const navLinks = Array.from(document.querySelectorAll('.main-nav a'));
  const yearEl = document.getElementById('year');

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const setHeaderState = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 14);
  };

  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  const revealElements = Array.from(document.querySelectorAll('.reveal'));

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: '0px 0px -7% 0px',
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  const navSections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (navSections.length && navLinks.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible?.target?.id) return;

        navLinks.forEach((link) => {
          const active = link.getAttribute('href') === `#${visible.target.id}`;
          link.classList.toggle('is-active', active);
        });
      },
      {
        threshold: [0.2, 0.4, 0.65],
        rootMargin: '-38% 0px -42% 0px',
      }
    );

    navSections.forEach((section) => navObserver.observe(section));
  }

  let lenis = null;
  if (!prefersReducedMotion && window.Lenis) {
    lenis = new window.Lenis({
      lerp: 0.09,
      duration: 1.05,
      wheelMultiplier: 0.95,
      smoothWheel: true,
    });

    const raf = (time) => {
      lenis.raf(time);
      window.requestAnimationFrame(raf);
    };

    window.requestAnimationFrame(raf);
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();

      const offset = header ? header.offsetHeight + 14 : 0;
      const targetY = target.getBoundingClientRect().top + window.scrollY - offset;

      if (lenis) {
        lenis.scrollTo(targetY, {
          duration: 1.08,
          easing: (t) => 1 - Math.pow(1 - t, 3),
        });
      } else {
        window.scrollTo({
          top: targetY,
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      }
    });
  });

  const counters = document.querySelectorAll('.counter[data-count]');
  const animateCounter = (el) => {
    if (el.dataset.done === '1') return;

    const target = Number(el.dataset.count);
    if (!Number.isFinite(target)) return;

    el.dataset.done = '1';

    const duration = 1350;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.textContent = String(value);

      if (progress < 1) {
        window.requestAnimationFrame(tick);
      }
    };

    window.requestAnimationFrame(tick);
  };

  if (counters.length) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.6,
      }
    );

    counters.forEach((counter) => counterObserver.observe(counter));
  }

  document.querySelectorAll('.magnetic').forEach((el) => {
    let rect = null;

    const reset = () => {
      el.style.transform = '';
    };

    el.addEventListener('pointerenter', () => {
      rect = el.getBoundingClientRect();
    });

    el.addEventListener('pointermove', (event) => {
      if (prefersReducedMotion) return;
      rect = rect || el.getBoundingClientRect();

      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      const moveX = x / 7;
      const moveY = y / 7;

      el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });

    el.addEventListener('pointerleave', reset);
    el.addEventListener('blur', reset);
  });

  if (!prefersReducedMotion && window.VanillaTilt) {
    window.VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
      max: 5,
      speed: 420,
      scale: 1.012,
      perspective: 1200,
      glare: true,
      'max-glare': 0.12,
    });
  }

  const timeline = document.querySelector('.timeline');
  const setTimelineProgress = () => {
    if (!timeline) return;

    const rect = timeline.getBoundingClientRect();
    const viewport = window.innerHeight;
    const start = viewport * 0.78;
    const end = -rect.height * 0.3;

    const raw = (start - rect.top) / (start - end);
    const progress = Math.max(0, Math.min(1, raw));

    timeline.style.setProperty('--progress', `${(progress * 100).toFixed(2)}%`);
  };

  setTimelineProgress();
  window.addEventListener('scroll', setTimelineProgress, { passive: true });
  window.addEventListener('resize', setTimelineProgress);

  if (!prefersReducedMotion && window.gsap && window.ScrollTrigger) {
    const { gsap, ScrollTrigger } = window;
    gsap.registerPlugin(ScrollTrigger);

    const heroSequence = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.95 } });
    heroSequence
      .from('.hero .badge', { autoAlpha: 0, y: 24 })
      .from('.hero .hero__title', { autoAlpha: 0, y: 34 }, '-=0.62')
      .from('.hero .hero__lead', { autoAlpha: 0, y: 26 }, '-=0.64')
      .from('.hero .hero__actions', { autoAlpha: 0, y: 24 }, '-=0.72')
      .from('.hero .hero__tags li', { autoAlpha: 0, y: 18, stagger: 0.09 }, '-=0.64')
      .from('.hero .hero__visual', { autoAlpha: 0, scale: 0.95, rotateY: -8 }, '-=0.88');

    gsap.to('.ambient--one', {
      x: 70,
      y: 34,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      },
    });

    gsap.to('.ambient--two', {
      x: -55,
      y: 48,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.35,
      },
    });

    if (timeline) {
      ScrollTrigger.create({
        trigger: timeline,
        start: 'top 78%',
        end: 'bottom 32%',
        scrub: 0.8,
        onUpdate: (self) => {
          timeline.style.setProperty('--progress', `${(self.progress * 100).toFixed(2)}%`);
        },
      });
    }

    ScrollTrigger.refresh();
  }
})();