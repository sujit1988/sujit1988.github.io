// ============================================
// PORTFOLIO WEBSITE - script.js
// Sai Sujit Tokala - Cloud Engineer to Systems Leader
// ============================================

// ---- DOM Ready ----
document.addEventListener('DOMContentLoaded', function() {
  initNavigation();
  initCounters();
  initScrollAnimations();
  initProjectFilters();
  initSkillBars();
  initMobileMenu();
  initSmoothScroll();
  initThemeToggle();
});

// ---- Navigation ----
function initNavigation() {
  const nav = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Sticky nav on scroll
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Active link highlighting
  navLinks.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add('active');
    }
  });
}

// ---- Animated Counters ----
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  const speed = 200;

  const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const suffix = counter.getAttribute('data-suffix') || '';
    let current = 0;
    const increment = target / speed;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.ceil(current) + suffix;
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + suffix;
      }
    };
    updateCounter();
  };

  // Use IntersectionObserver to trigger when visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

// ---- Scroll Animations (Fade In) ----
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => observer.observe(el));
}

// ---- Project Tag Filters ----
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');

      projectCards.forEach(card => {
        const tags = card.getAttribute('data-tags') || '';
        if (filter === 'all' || tags.includes(filter)) {
          card.style.display = '';
          card.classList.add('fade-in', 'visible');
        } else {
          card.style.display = 'none';
          card.classList.remove('visible');
        }
      });
    });
  });
}

// ---- Skill Bar Animation ----
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width');
        entry.target.style.width = width + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skillBars.forEach(bar => observer.observe(bar));
}

// ---- Mobile Hamburger Menu ----
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (!hamburger) return;

  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu.classList.toggle('open');
  });

  // Close menu on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('open');
    });
  });
}

// ---- Smooth Scroll for Anchor Links ----
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ---- Theme Toggle (Light/Dark) ----
function initThemeToggle() {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  // Check saved preference
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.setAttribute('data-theme', savedTheme);
  toggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

  toggle.addEventListener('click', function() {
    const current = document.body.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    this.textContent = next === 'dark' ? '☀️' : '🌙';
  });
}

// ---- Career Flow Timeline Animation ----
function initCareerFlow() {
  const phases = document.querySelectorAll('.phase-node');
  phases.forEach((phase, index) => {
    phase.style.animationDelay = (index * 0.15) + 's';
    phase.classList.add('slide-up');
  });
}

// ---- Typing Effect for Hero ----
function initTypingEffect() {
  const el = document.querySelector('.typing-text');
  if (!el) return;

  const texts = [
    'Cloud Engineer → Systems Leader',
    'DARPA · SAFe · SDM · AI',
    'Designing Operating Models',
    'Psychology + Technology'
  ];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const current = texts[textIndex];
    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === current.length) {
      setTimeout(() => { isDeleting = true; type(); }, 2000);
      return;
    }
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }
    setTimeout(type, isDeleting ? 50 : 100);
  }
  type();
}

// ---- Parallax Effect for Hero Background ----
function initParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  window.addEventListener('scroll', function() {
    const scrolled = window.scrollY;
    hero.style.backgroundPositionY = (scrolled * 0.4) + 'px';
  });
}

// ---- Back to Top Button ----
function initBackToTop() {
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.innerHTML = '↑';
  btn.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(btn);

  window.addEventListener('scroll', function() {
    btn.classList.toggle('visible', window.scrollY > 500);
  });

  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Initialize additional effects
document.addEventListener('DOMContentLoaded', function() {
  initCareerFlow();
  initTypingEffect();
  initParallax();
  initBackToTop();
});
