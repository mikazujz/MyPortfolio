// Highlight nav link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

// Improved nav highlight and smooth scroll (fixed for .content-scroll)
const navLinksArr = Array.from(document.querySelectorAll('.nav-link'));
const sectionArr = Array.from(document.querySelectorAll('section'));

function updateActiveNav() {
  let scrollPos = window.scrollY || window.pageYOffset;
  let offset = 120;
  let current = '';
  sectionArr.forEach(section => {
    if (scrollPos + offset >= section.offsetTop) {
      current = section.getAttribute('id');
    }
  });
  navLinksArr.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
}
window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

navLinksArr.forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetId);
    const contentScroll = document.querySelector('.content-scroll');
    if (targetSection && contentScroll) {
      e.preventDefault();
      // Calculate offset relative to .content-scroll
      const sectionTop = targetSection.offsetTop;
      contentScroll.scrollTo({
        top: sectionTop - 20,
        behavior: 'smooth'
      });
    } else if (targetSection) {
      // fallback for mobile
      e.preventDefault();
      window.scrollTo({
        top: targetSection.offsetTop - 40,
        behavior: 'smooth'
      });
    }
  });
});

// Violet mouse light effect
const mouseLight = document.getElementById('mouse-light');
document.addEventListener('mousemove', (e) => {
  mouseLight.style.left = e.clientX + 'px';
  mouseLight.style.top = e.clientY + 'px';
});

// Fade-in on scroll animation (repeatable)
function revealOnScroll(container) {
  const fadeEls = document.querySelectorAll('.fade-in-up');
  const windowHeight = container.clientHeight;
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    // If element is in view, add visible; if not, remove visible
    if (rect.top < containerRect.top + windowHeight - 60 && rect.bottom > containerRect.top + 40) {
      el.classList.add('visible');
    } else {
      el.classList.remove('visible');
    }
  });
}

window.addEventListener('load', function() {
  const contentScroll = document.querySelector('.content-scroll');
  if (contentScroll) {
    contentScroll.addEventListener('scroll', function() {
      revealOnScroll(contentScroll);
    });
    // Also trigger on load
    revealOnScroll(contentScroll);
  } else {
    // fallback for window scroll (mobile)
    window.addEventListener('scroll', function() {
      revealOnScroll(document.documentElement);
    });
    revealOnScroll(document.documentElement);
  }
});

// Randomize skill % for each tech-pill on load
function randomizeTechPills() {
  document.querySelectorAll('.tech-pill').forEach(pill => {
    // If already has a data-skill, use it; else randomize
    let percent = pill.getAttribute('data-skill');
    if (!percent) {
      percent = Math.floor(Math.random() * 41) + 60; // 60-100%
      pill.setAttribute('data-skill', percent);
    }
    const percentSpan = pill.querySelector('.skill-percent');
    if (percentSpan) percentSpan.textContent = percent + '%';
  });
}
window.addEventListener('DOMContentLoaded', randomizeTechPills);

// Tech pill slide-out percent effect
function setupTechPillHover() {
  document.querySelectorAll('.tech-pill').forEach(pill => {
    pill.addEventListener('mouseenter', function() {
      pill.classList.add('show-percent');
    });
    pill.addEventListener('mouseleave', function() {
      pill.classList.remove('show-percent');
    });
  });
}
window.addEventListener('DOMContentLoaded', setupTechPillHover);

// Improved nav highlight for custom scroll container
function updateActiveNavCustom() {
  const contentScroll = document.querySelector('.content-scroll');
  if (!contentScroll) return;
  const navLinksArr = Array.from(document.querySelectorAll('.nav-link'));
  const sectionArr = Array.from(document.querySelectorAll('section'));
  let current = '';
  const scrollTop = contentScroll.scrollTop;
  const offset = 120;
  sectionArr.forEach(section => {
    if (scrollTop + offset >= section.offsetTop) {
      current = section.getAttribute('id');
    }
  });
  navLinksArr.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
}
window.addEventListener('DOMContentLoaded', function() {
  const contentScroll = document.querySelector('.content-scroll');
  if (contentScroll) {
    contentScroll.addEventListener('scroll', updateActiveNavCustom);
    updateActiveNavCustom();
  } else {
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
  }
});

// Sticky sidebar on scroll (mobile header shrink)
window.addEventListener('scroll', function() {
  const sidebar = document.querySelector('.sidebar-fixed');
  if (!sidebar) return;
  if (window.scrollY > 40) {
    sidebar.classList.add('sticky');
  } else {
    sidebar.classList.remove('sticky');
  }
});

// Hide header/sidebar on scroll down, show on scroll up (MOBILE ONLY)
let lastScrollTop = 0;
const sidebar = document.querySelector('.sidebar-fixed');
const techLink = document.querySelector('a[href="#technologies"]');
const aboutLink = document.querySelector('a[href="#about"]');

function isMobile() {
  return window.innerWidth <= 900;
}

window.addEventListener('scroll', function() {
  if (!sidebar || !isMobile() || !techLink || !aboutLink) return;
  let st = window.scrollY || document.documentElement.scrollTop;
  
  // Check if we're in Technologies section or below
  const isPastTech = !aboutLink.classList.contains('active');
  
  if (st > lastScrollTop && isPastTech) {
    // Scrolling down and past About section
    sidebar.classList.add('hide-on-scroll');
  } else if (st < lastScrollTop && aboutLink.classList.contains('active')) {
    // Scrolling up and reached About section
    sidebar.classList.remove('hide-on-scroll');
  } else if (st < lastScrollTop) {
    // Scrolling up, temporarily show header
    sidebar.classList.remove('hide-on-scroll');
  }
  
  lastScrollTop = st <= 0 ? 0 : st;
});