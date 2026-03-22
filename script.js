// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observerOptions = {
  root: null,
  rootMargin: '-40% 0px -40% 0px',
  threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--accent)';
        }
      });
    }
  });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

// ===== HAMBURGER MOBILE MENU =====
const hamburger = document.getElementById('hamburger');

// Create mobile menu dynamically
const mobileMenu = document.createElement('div');
mobileMenu.classList.add('mobile-menu');

const navLinksData = [
  { href: '#about',          label: 'About' },
  { href: '#education',      label: 'Education' },
  { href: '#experience',     label: 'Experience' },
  { href: '#skills',         label: 'Skills' },
  { href: '#projects',       label: 'Projects' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#achievements',   label: 'Achievements' },
];

navLinksData.forEach(item => {
  const a = document.createElement('a');
  a.href = item.href;
  a.textContent = item.label;
  a.addEventListener('click', closeMobileMenu);
  mobileMenu.appendChild(a);
});

document.body.appendChild(mobileMenu);

function closeMobileMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// ===== REVEAL ON SCROLL =====
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger sibling reveals
      const siblings = Array.from(entry.target.parentNode.querySelectorAll('.reveal'));
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ===== SMOOTH HERO ENTRANCE =====
document.addEventListener('DOMContentLoaded', () => {
  const heroText = document.querySelector('.hero-text');
  const heroImage = document.querySelector('.hero-image-wrap');

  if (heroText) {
    heroText.style.opacity = '0';
    heroText.style.transform = 'translateY(30px)';
    heroText.style.transition = 'opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s';
    requestAnimationFrame(() => {
      heroText.style.opacity = '1';
      heroText.style.transform = 'translateY(0)';
    });
  }

  if (heroImage) {
    heroImage.style.opacity = '0';
    heroImage.style.transform = 'scale(0.92)';
    heroImage.style.transition = 'opacity 0.9s ease 0.45s, transform 0.9s ease 0.45s';
    requestAnimationFrame(() => {
      heroImage.style.opacity = '1';
      heroImage.style.transform = 'scale(1)';
    });
  }
});

// ===== SKILL TAG HOVER RIPPLE =====
document.querySelectorAll('.skill-tags span').forEach(tag => {
  tag.addEventListener('click', function () {
    this.style.transform = 'scale(0.93)';
    setTimeout(() => { this.style.transform = ''; }, 150);
  });
});

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, duration = 1200) {
  let start = 0;
  const increment = target / (duration / 16);

  const counter = setInterval(() => {
    start += increment;

    if (start >= target) {
      el.textContent = target + '+';
      clearInterval(counter);
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
}

// ===== OBSERVER =====
document.addEventListener("DOMContentLoaded", () => {
  const stat = document.querySelector('.achievement-stat');

  if (stat) {
    let triggered = false;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !triggered) {
          triggered = true;

          const target = parseInt(stat.getAttribute("data-target"));
          stat.textContent = "0";

          animateCounter(stat, target);

          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(stat);
  }
});