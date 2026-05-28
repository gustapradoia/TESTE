/* ============================================
   UBER BLACK — SCRIPT.JS
   GSAP + ScrollTrigger Animations
============================================ */

gsap.registerPlugin(ScrollTrigger);

/* ============================================
   CUSTOM CURSOR
============================================ */
const updateCursor = (e) => {
  document.documentElement.style.setProperty('--cx', e.clientX + 'px');
  document.documentElement.style.setProperty('--cy', e.clientY + 'px');
};
window.addEventListener('mousemove', updateCursor);

/* ============================================
   NAVIGATION — scroll state
============================================ */
const nav = document.getElementById('nav');
ScrollTrigger.create({
  start: 'top -80',
  onEnter: () => nav.classList.add('scrolled'),
  onLeaveBack: () => nav.classList.remove('scrolled'),
});

/* ============================================
   HERO — iPHONE SCROLL ROTATION
   iPhone gira 180° ao rolar até a próxima seção
============================================ */
const iphone = document.getElementById('iphone3d');

gsap.to(iphone, {
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1.5,
  },
  rotateY: 180,
  rotateX: 10,
  y: -60,
  opacity: 0,
  ease: 'none',
});

// Floating cards fade out on scroll
gsap.to('.floating-card', {
  scrollTrigger: {
    trigger: '.hero',
    start: 'center top',
    end: 'bottom top',
    scrub: 1,
  },
  opacity: 0,
  y: -30,
  stagger: 0.1,
  ease: 'none',
});

// Scroll hint fade
gsap.to('#scrollHint', {
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: '20% top',
    scrub: 1,
  },
  opacity: 0,
  y: -20,
  ease: 'none',
});

/* ============================================
   TRANSITION SECTION — text reveal on scroll
============================================ */
const tLines = document.querySelectorAll('.t-line');

tLines.forEach((line, i) => {
  ScrollTrigger.create({
    trigger: line,
    start: 'top 70%',
    end: 'bottom 40%',
    onEnter: () => line.classList.add('active'),
    onLeave: () => {
      if (i < tLines.length - 1) line.classList.remove('active');
    },
    onEnterBack: () => line.classList.add('active'),
    onLeaveBack: () => line.classList.remove('active'),
  });
});

/* ============================================
   BLACK SECTION — car emerges from darkness
============================================ */
const carScene = document.getElementById('carScene');

// Car slides in with glow
gsap.to(carScene, {
  scrollTrigger: {
    trigger: '#sectionBlack',
    start: 'top 80%',
    end: 'top 20%',
    scrub: 1,
  },
  opacity: 1,
  x: 0,
  ease: 'power2.out',
});

// Car parallax movement as you scroll through the section
gsap.to('#uberCar', {
  scrollTrigger: {
    trigger: '#sectionBlack',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1,
  },
  x: -60,
  ease: 'none',
});

// Section label fade up
gsap.fromTo('#sectionBlack .section-label',
  { opacity: 0, y: 20 },
  {
    scrollTrigger: {
      trigger: '#sectionBlack',
      start: 'top 70%',
    },
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
  }
);

// Black title fade up
gsap.fromTo('.black-title',
  { opacity: 0, y: 40 },
  {
    scrollTrigger: {
      trigger: '#sectionBlack',
      start: 'top 65%',
    },
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.15,
    ease: 'power3.out',
  }
);

// Black desc
gsap.fromTo('.black-desc',
  { opacity: 0, y: 30 },
  {
    scrollTrigger: {
      trigger: '#sectionBlack',
      start: 'top 60%',
    },
    opacity: 1,
    y: 0,
    duration: 0.9,
    delay: 0.3,
    ease: 'power3.out',
  }
);

// Feature items stagger
gsap.fromTo('.feature-item',
  { opacity: 0, y: 30 },
  {
    scrollTrigger: {
      trigger: '.features-grid',
      start: 'top 80%',
    },
    opacity: 1,
    y: 0,
    duration: 0.7,
    stagger: 0.12,
    ease: 'power3.out',
  }
);

/* ============================================
   GLOW ORB — follows mouse inside black section
============================================ */
const glowOrb = document.getElementById('glowOrb');
const sectionBlack = document.getElementById('sectionBlack');

sectionBlack.addEventListener('mousemove', (e) => {
  const rect = sectionBlack.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  gsap.to(glowOrb, {
    left: x,
    top: y,
    duration: 0.8,
    ease: 'power2.out',
  });
});

/* ============================================
   STATS — animated counters
============================================ */
const statsData = [
  { id: 'stat1', end: 4.97, decimals: 2, suffix: '' },
  { id: 'stat2', end: 98, decimals: 0, suffix: '%' },
  { id: 'stat3', end: 120, decimals: 0, suffix: '+' },
  { id: 'stat4', end: 500, decimals: 0, suffix: 'k' },
];

statsData.forEach(({ id, end, decimals, suffix }) => {
  const el = document.getElementById(id);
  const obj = { val: 0 };

  ScrollTrigger.create({
    trigger: '#sectionStats',
    start: 'top 70%',
    once: true,
    onEnter: () => {
      gsap.to(obj, {
        val: end,
        duration: 1.8,
        ease: 'power2.out',
        onUpdate: () => {
          el.innerHTML = obj.val.toFixed(decimals) + `<span>${suffix}</span>`;
        },
      });
    },
  });
});

// Stats section reveal
gsap.fromTo('.stat-item',
  { opacity: 0, y: 30 },
  {
    scrollTrigger: {
      trigger: '#sectionStats',
      start: 'top 75%',
    },
    opacity: 1,
    y: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out',
  }
);

/* ============================================
   FLEET — horizontal scroll / drag
============================================ */
const fleetTrack = document.getElementById('fleetTrack');
let isDragging = false;
let startX = 0;
let scrollLeft = 0;

fleetTrack.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX - fleetTrack.offsetLeft;
  scrollLeft = fleetTrack.scrollLeft;
  fleetTrack.style.cursor = 'grabbing';
});

window.addEventListener('mouseup', () => {
  isDragging = false;
  fleetTrack.style.cursor = 'none';
});

window.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - fleetTrack.offsetLeft;
  const walk = (x - startX) * 1.5;
  fleetTrack.scrollLeft = scrollLeft - walk;
});

// Fleet cards entrance
gsap.fromTo('.fleet-card',
  { opacity: 0, x: 60 },
  {
    scrollTrigger: {
      trigger: '#sectionFleet',
      start: 'top 80%',
    },
    opacity: 1,
    x: 0,
    stagger: 0.12,
    duration: 0.8,
    ease: 'power3.out',
  }
);

// Fleet header reveal
gsap.fromTo('.fleet-header .section-label',
  { opacity: 0, y: 20 },
  {
    scrollTrigger: { trigger: '#sectionFleet', start: 'top 75%' },
    opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
  }
);

gsap.fromTo('.fleet-title',
  { opacity: 0, y: 30 },
  {
    scrollTrigger: { trigger: '#sectionFleet', start: 'top 70%' },
    opacity: 1, y: 0, duration: 0.9, delay: 0.1, ease: 'power3.out',
  }
);

/* ============================================
   MAP SECTION — scale expand + city dots
============================================ */
gsap.to('#mapBg', {
  scrollTrigger: {
    trigger: '#sectionMap',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1,
  },
  scale: 1,
  ease: 'none',
});

// City dots staggered fade in
gsap.fromTo('.city-dot',
  { opacity: 0, scale: 0 },
  {
    scrollTrigger: {
      trigger: '#sectionMap',
      start: 'top 70%',
    },
    opacity: 1,
    scale: 1,
    stagger: 0.08,
    duration: 0.4,
    ease: 'back.out(2)',
  }
);

// Map content reveal
gsap.fromTo('#sectionMap .section-label',
  { opacity: 0, y: 20 },
  {
    scrollTrigger: { trigger: '#sectionMap', start: 'top 65%' },
    opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
  }
);

gsap.fromTo('.map-title',
  { opacity: 0, y: 40 },
  {
    scrollTrigger: { trigger: '#sectionMap', start: 'top 60%' },
    opacity: 1, y: 0, duration: 1, delay: 0.1, ease: 'power3.out',
  }
);

gsap.fromTo('.map-sub',
  { opacity: 0, y: 20 },
  {
    scrollTrigger: { trigger: '#sectionMap', start: 'top 55%' },
    opacity: 1, y: 0, duration: 0.8, delay: 0.25, ease: 'power3.out',
  }
);

gsap.fromTo('#sectionMap .btn-primary',
  { opacity: 0, y: 20 },
  {
    scrollTrigger: { trigger: '#sectionMap', start: 'top 50%' },
    opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: 'power3.out',
  }
);

/* ============================================
   FOOTER reveal
============================================ */
gsap.fromTo('.footer-brand, .footer-col',
  { opacity: 0, y: 30 },
  {
    scrollTrigger: {
      trigger: '.footer',
      start: 'top 85%',
    },
    opacity: 1,
    y: 0,
    stagger: 0.1,
    duration: 0.7,
    ease: 'power3.out',
  }
);

/* ============================================
   HERO PARALLAX — subtle depth layers
============================================ */
gsap.to('.hero-bg-grid', {
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1,
  },
  y: 120,
  ease: 'none',
});

gsap.to('.hero-content', {
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1,
  },
  y: 80,
  opacity: 0,
  ease: 'none',
});

/* ============================================
   FLEET CARD HOVER — 3D tilt effect
============================================ */
document.querySelectorAll('.fleet-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotateY: cx * 10,
      rotateX: -cy * 6,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 800,
    });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: 'power3.out',
    });
  });
});

/* ============================================
   SCROLL PROGRESS BAR fallback (JS)
   (CSS animation-timeline handles modern browsers,
   this ensures compatibility)
============================================ */
if (!CSS.supports('animation-timeline', 'scroll()')) {
  const bar = document.getElementById('progressBar');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = (scrollTop / docHeight) * 100;
    bar.style.width = pct + '%';
  }, { passive: true });
}

/* ============================================
   REFRESH SCROLLTRIGGER on load
============================================ */
window.addEventListener('load', () => {
  ScrollTrigger.refresh();
});
