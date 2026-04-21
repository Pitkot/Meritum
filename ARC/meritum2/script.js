const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* =========================
   Nawigacja mobilna
========================= */
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 760) {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

/* =========================
   Hero slideshow premium
========================= */
const heroSlideshow = document.querySelector('[data-hero-slideshow]');
if (heroSlideshow) {
  const slides = Array.from(heroSlideshow.querySelectorAll('.hero-slide'));
  const dots = Array.from(document.querySelectorAll('[data-hero-dot]'));
  const prevBtn = heroSlideshow.querySelector('.hero-control.prev');
  const nextBtn = heroSlideshow.querySelector('.hero-control.next');
  let activeIndex = 0;
  let heroTimer;

  const setHeroSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === activeIndex;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
    dots.forEach((dot, i) => {
      const active = i === activeIndex;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-selected', String(active));
    });
  };

  const nextHeroSlide = () => setHeroSlide(activeIndex + 1);
  const prevHeroSlide = () => setHeroSlide(activeIndex - 1);

  const startHeroAuto = () => {
    if (prefersReducedMotion) return;
    clearInterval(heroTimer);
    heroTimer = setInterval(nextHeroSlide, 4800);
  };

  const stopHeroAuto = () => clearInterval(heroTimer);

  prevBtn?.addEventListener('click', () => {
    prevHeroSlide();
    startHeroAuto();
  });
  nextBtn?.addEventListener('click', () => {
    nextHeroSlide();
    startHeroAuto();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      setHeroSlide(i);
      startHeroAuto();
    });
  });

  heroSlideshow.addEventListener('mouseenter', stopHeroAuto);
  heroSlideshow.addEventListener('mouseleave', startHeroAuto);
  heroSlideshow.addEventListener('focusin', stopHeroAuto);
  heroSlideshow.addEventListener('focusout', startHeroAuto);

  heroSlideshow.tabIndex = 0;
  heroSlideshow.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      nextHeroSlide();
      startHeroAuto();
    } else if (e.key === 'ArrowLeft') {
      prevHeroSlide();
      startHeroAuto();
    }
  });

  setHeroSlide(0);
  startHeroAuto();
}

/* =========================
   Reveal + liczniki
========================= */
const animateCounter = (el) => {
  const target = Number(el.dataset.target || 0);
  if (prefersReducedMotion) {
    el.textContent = new Intl.NumberFormat('pl-PL').format(target);
    return;
  }

  const duration = 1300;
  const start = performance.now();

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.floor(progress * target);
    el.textContent = new Intl.NumberFormat('pl-PL').format(value);
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
};

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('in-view');
      if (entry.target.classList.contains('stat')) {
        const countEl = entry.target.querySelector('.count');
        if (countEl && !countEl.dataset.done) {
          animateCounter(countEl);
          countEl.dataset.done = '1';
        }
      }
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.16 }
);
revealElements.forEach((el) => revealObserver.observe(el));

/* =========================
   Slider aktualności + swipe
========================= */
const newsSlider = document.querySelector('[data-news-slider]');
if (newsSlider) {
  const track = newsSlider.querySelector('.news-track');
  const slides = Array.from(newsSlider.querySelectorAll('.news-slide'));
  const prev = newsSlider.querySelector('.news-control.prev');
  const next = newsSlider.querySelector('.news-control.next');
  const dotsWrap = newsSlider.querySelector('.news-dots');
  let index = 0;
  let newsTimer;
  let touchStartX = 0;

  const dots = slides.map((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'news-dot';
    dot.setAttribute('aria-label', `Przejdź do aktualności ${i + 1}`);
    dot.addEventListener('click', () => {
      goTo(i);
      startAuto();
    });
    dotsWrap?.append(dot);
    return dot;
  });

  const goTo = (i) => {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, dotIndex) => dot.classList.toggle('is-active', dotIndex === index));
  };

  const nextSlide = () => goTo(index + 1);
  const prevSlide = () => goTo(index - 1);

  const startAuto = () => {
    if (prefersReducedMotion) return;
    clearInterval(newsTimer);
    newsTimer = setInterval(nextSlide, 5200);
  };
  const stopAuto = () => clearInterval(newsTimer);

  prev?.addEventListener('click', () => {
    prevSlide();
    startAuto();
  });
  next?.addEventListener('click', () => {
    nextSlide();
    startAuto();
  });

  newsSlider.addEventListener('mouseenter', stopAuto);
  newsSlider.addEventListener('mouseleave', startAuto);
  newsSlider.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  });
  newsSlider.addEventListener('touchend', (e) => {
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) < 40) return;
    if (delta < 0) nextSlide();
    else prevSlide();
    startAuto();
  });

  goTo(0);
  startAuto();
}

/* =========================
   Parallax (scroll)
========================= */
const parallaxNodes = Array.from(document.querySelectorAll('[data-parallax]'));
if (parallaxNodes.length && !prefersReducedMotion) {
  let ticking = false;

  const applyParallax = () => {
    const scrollY = window.scrollY;
    parallaxNodes.forEach((node) => {
      const depth = Number(node.dataset.depth || 0.04);
      node.style.transform = `translate3d(0, ${scrollY * depth}px, 0)`;
    });
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(applyParallax);
  });
}

/* =========================
   Magnetic hover (karty/CTA)
========================= */
const magneticTargets = document.querySelectorAll(
  '.card, .project-card, .offer-card, .doc-card, .mini-card, .btn'
);

if (!prefersReducedMotion) {
  magneticTargets.forEach((el) => {
    el.classList.add('magnetic');
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const tx = ((x / rect.width) - 0.5) * 8;
      const ty = ((y / rect.height) - 0.5) * 8;
      el.style.transform = `translate(${tx}px, ${ty}px)`;
      el.style.setProperty('--mx', `${(x / rect.width) * 100}%`);
      el.style.setProperty('--my', `${(y / rect.height) * 100}%`);
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
}

/* =========================
   Formularz premium + walidacja inline
========================= */
const form = document.querySelector('.contact-form');
if (form) {
  const statusNode = form.querySelector('.form-status');
  const fields = Array.from(form.querySelectorAll('.field'));

  const validateField = (field) => {
    const input = field.querySelector('input, textarea, select');
    const error = field.querySelector('.field-error');
    if (!input || !error) return true;

    const isEmpty = !input.value.trim();
    const isEmail = input.type === 'email';
    const invalidEmail = isEmail && input.value && !input.validity.valid;

    let message = '';
    if (isEmpty) message = 'To pole jest wymagane.';
    else if (invalidEmail) message = 'Podaj poprawny adres e-mail.';

    field.classList.toggle('invalid', !!message);
    field.classList.toggle('has-value', !isEmpty);
    error.textContent = message;
    return !message;
  };

  fields.forEach((field) => {
    const input = field.querySelector('input, textarea, select');
    if (!input) return;
    ['input', 'change', 'blur'].forEach((eventName) => {
      input.addEventListener(eventName, () => validateField(field));
    });
    validateField(field);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const allValid = fields.every((field) => validateField(field));

    if (!allValid) {
      statusNode.textContent = 'Uzupełnij poprawnie wymagane pola.';
      return;
    }

    const button = form.querySelector('button[type="submit"]');
    if (button) {
      button.textContent = 'Dziękujemy! Odezwiemy się wkrótce';
      button.disabled = true;
    }
    statusNode.textContent = 'Formularz został wysłany.';
  });
}

/* =========================
   Stopka
========================= */
const yearNode = document.getElementById('year');
if (yearNode) yearNode.textContent = new Date().getFullYear();