function showCustomAlert(message, isSuccess, iconClass = null) {
  const customAlert = document.getElementById('custom-alert');
  const alertIcon = customAlert.querySelector('.alert-icon i');
  const alertMessage = customAlert.querySelector('.alert-message');
  const successSound = document.getElementById('success-sound');
  const errorSound = document.getElementById('error-sound');

  alertMessage.textContent = message;

  if (iconClass) {
    alertIcon.className = iconClass;
  } else if (isSuccess) {
    alertIcon.className = 'fas fa-check-circle';
    customAlert.classList.add('success');
    if (successSound) {
      successSound.currentTime = 0;
      successSound.play().catch(e => console.error("Error playing success sound:", e));
    }
  } else {
    alertIcon.className = 'fas fa-times-circle';
    customAlert.classList.add('error');
    if (errorSound) {
      errorSound.currentTime = 0;
      errorSound.play().catch(e => console.error("Error playing error sound:", e));
    }
  }

  customAlert.classList.add('show');

  setTimeout(() => {
    customAlert.classList.remove('show', 'success', 'error');
  }, 3000);
}

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
  const characterBg = document.querySelector('.skills-character-bg');
  const windowHeight = container.clientHeight;
  
  // Handle regular fade-in elements
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    if (rect.top < containerRect.top + windowHeight - 60 && rect.bottom > containerRect.top + 40) {
      el.classList.add('visible');
    } else {
      el.classList.remove('visible');
    }
  });

  // Handle character background fade-in
  if (characterBg) {
    const skillsSection = document.getElementById('My Skills');
    if (skillsSection) {
      const rect = skillsSection.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      if (rect.top < containerRect.top + windowHeight - 60 && rect.bottom > containerRect.top + 40) {
        characterBg.classList.add('fade-in');
      } else {
        characterBg.classList.remove('fade-in');
      }
    }
  }
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

// Tech pill hover function removed

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
let lastScrollTop = 0; // Initialize lastScrollTop outside the event listener

function isMobile() {
  return window.innerWidth <= 900;
}

function handleSidebarScroll() {
  const sidebar = document.querySelector('.sidebar-fixed');
  const contentScroll = document.querySelector('.content-scroll');
  if (!sidebar) return;

  let currentScrollTop;
  if (contentScroll && isMobile()) {
    currentScrollTop = contentScroll.scrollTop;
  } else {
    currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
  }
  
  const shrinkThreshold = 40; // Pixels scrolled before the sidebar shrinks

  if (isMobile()) {
    if (currentScrollTop > shrinkThreshold) {
      // Scrolling down past the shrink threshold, apply sticky (shrunken state)
      sidebar.classList.add('sticky');
      // Ensure hide-profile is not active if it was accidentally applied before
      sidebar.classList.remove('hide-profile'); 
    } else {
      // At or near the top: remove sticky, show full profile
      sidebar.classList.remove('sticky');
      // Ensure hide-profile is not active
      sidebar.classList.remove('hide-profile');
    }
    lastScrollTop = currentScrollTop; // Update lastScrollTop
  } else {
    // Original sticky behavior for desktop
    if (window.scrollY > 40) {
      sidebar.classList.add('sticky');
      sidebar.classList.remove('hide-profile'); // Ensure profile is visible on desktop
    } else {
      sidebar.classList.remove('sticky');
      sidebar.classList.remove('hide-profile');
    }
  }
}

// Attach the scroll listener
document.addEventListener('DOMContentLoaded', function() {
  const contentScroll = document.querySelector('.content-scroll');
  if (contentScroll) {
    contentScroll.addEventListener('scroll', handleSidebarScroll);
    // Also call it once on load to set initial state if already scrolled
    handleSidebarScroll();
  } else {
    // Fallback for non-content-scroll setups or initial desktop load
    window.addEventListener('scroll', handleSidebarScroll);
    handleSidebarScroll();
  }
});

// Handle typewriter animation cursor
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    document.querySelector('.typewriter').classList.add('done');
  }, 3000); // Add 'done' class after first line finishes typing
});

// Handle typewriter cursor transition
document.addEventListener('DOMContentLoaded', () => {
  const firstLine = document.querySelector('.typewriter');
  if (firstLine) {
    setTimeout(() => {
      firstLine.classList.add('typed');
    }, 3500); // Same as the first animation duration
  }
});

// Toggle background on profile picture click
document.addEventListener('DOMContentLoaded', () => {
    const profileContainer = document.querySelector('.profile-pic-container');
    
    if (profileContainer) {
        profileContainer.addEventListener('click', () => {
            profileContainer.classList.toggle('show-background');
        });
    }
});

// Add sound effect to sidebar profile picture click
const sidebarProfilePic = document.querySelector('.sidebar-fixed .profile-pic');
if (sidebarProfilePic) {
  const clickSound = new Audio('https://cdn.pixabay.com/audio/2022/10/16/audio_12bfae6b3b.mp3');
  sidebarProfilePic.addEventListener('click', () => {
    clickSound.currentTime = 0;
    clickSound.play();
  });
}

// Speech bubble animation
const speechBubble = document.querySelector('.speech-bubble');

function showSpeechBubble() {
  if (speechBubble) {
    // Remove existing show class and animation
    speechBubble.classList.remove('show');
    
    // Force a reflow to restart animation
    void speechBubble.offsetWidth;
    
    // Add show class to start new animation
    speechBubble.classList.add('show');
  }
}

// Show initially after a short delay
setTimeout(showSpeechBubble, 1000);

// Show every 10 seconds
setInterval(showSpeechBubble, 10000);

// Custom cursor
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let cursorDotX = 0;
    let cursorDotY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animate() {
        // Smooth movement for main cursor
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        // Faster movement for cursor dot
        cursorDotX += (mouseX - cursorDotX) * 0.5;
        cursorDotY += (mouseY - cursorDotY) * 0.5;
        cursorDot.style.left = cursorDotX + 'px';
        cursorDot.style.top = cursorDotY + 'px';
        
        requestAnimationFrame(animate);
    }
    animate();
    
    // Hide cursor when mouse leaves window
    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
        cursorDot.style.display = 'none';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.display = 'block';
        cursorDot.style.display = 'block';
    });
});

// Open modal on PLVGAME image click
document.addEventListener('DOMContentLoaded', function() {
  // PLVGAME Video Modal - trigger on whole project item
  const plvgameItem = document.getElementById('open-plvgame-video');
  const plvgameModal = document.getElementById('modal-PLVGAME-VIDEO');
  const plvgameVideo = document.getElementById('plvgame-video');
  const plvgamePlay = document.getElementById('plvgame-play');
  
  // Deadlock Duel Video Modal - trigger on whole project item
  const deadlockItem = document.getElementById('open-deadlock-video');
  const deadlockModal = document.getElementById('modal-Deadlock-VIDEO');
  const deadlockVideo = document.getElementById('deadlock-video');
  const deadlockPlay = document.getElementById('deadlock-play');

  // Maharlika Game Video Modal
  const maharlikaItem = document.getElementById('open-maharlika-video');
  const maharlikaModal = document.getElementById('modal-MAHARLIKA-VIDEO');
  const maharlikaVideo = document.getElementById('maharlika-video');
  const maharlikaPlay = document.getElementById('maharlika-play');

  // PLVites Election System Video Modal
  const plvvotesItem = document.getElementById('open-plvvotes-video');
  const plvvotesModal = document.getElementById('modal-PLVVOTES-VIDEO');
  const plvvotesVideo = document.getElementById('plvvotes-video');
  const plvvotesPlay = document.getElementById('plvvotes-play');

  // Koleksyon Video Modal
  const koleksyonItem = document.getElementById('open-koleksyon-video');
  const koleksyonModal = document.getElementById('modal-KOLEKSYON-VIDEO');
  const koleksyonVideo = document.getElementById('koleksyon-video');
  const koleksyonPlay = document.getElementById('koleksyon-play');

  // GrowBrain Video Modal
  const growbrainItem = document.getElementById('open-growbrain-video');
  const growbrainModal = document.getElementById('modal-GROWBRAIN-VIDEO');
  const growbrainVideo = document.getElementById('growbrain-video');
  const growbrainPlay = document.getElementById('growbrain-play');


  // Hanapin ang main content container
  const mainContent = document.querySelector('.main-content');

  // Function to remove blur with animation
  function removeBlurWithAnimation() {
    if (mainContent) {
      mainContent.classList.add('blur-out');
      setTimeout(() => {
        mainContent.classList.remove('blur-bg', 'blur-out');
      }, 400); // dapat match sa transition duration ng CSS
    }
  }

  // Generic function to open video modal
  function openVideoModal(item, modal, video, prefix) {
    if (item && modal && video) {
      item.style.cursor = 'pointer';
      item.addEventListener('click', function(e) {
        // Check if the click was on a photo gallery button, if so, do nothing
        if (e.target.closest('.project-gallery-btn')) return;
        
        modal.classList.add('active');
        modal.style.display = 'flex'; // Ensure display is flex for animation
        video.currentTime = 0;
        video.pause();
        // The initializeVideoPlayer handles play button icon update and time update
        initializeVideoPlayer(prefix, prefix);
        if (mainContent) mainContent.classList.add('blur-bg');
      });
    }
  }

  // Generic function to close any modal
  function closeAnyModal(modal, video = null) {
    if (modal) {
      modal.classList.remove('active');
      // Delay display: none to allow for CSS transition
      setTimeout(() => {
        modal.style.display = 'none';
      }, 300); // Match CSS transition duration for modal-content
    }
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    const overlay = modal?.querySelector('.video-poster-overlay');
    if (overlay) {
      overlay.classList.remove('hidden');
    }
    // Only remove blur if no other modals are open
    const activeModals = document.querySelectorAll('.project-modal.active');
    if (activeModals.length === 0) {
        removeBlurWithAnimation();
    }
  }

  // Initialize all video modals
  openVideoModal(plvgameItem, plvgameModal, plvgameVideo, 'plvgame');
  openVideoModal(deadlockItem, deadlockModal, deadlockVideo, 'deadlock');
  openVideoModal(maharlikaItem, maharlikaModal, maharlikaVideo, 'maharlika');
  openVideoModal(plvvotesItem, plvvotesModal, plvvotesVideo, 'plvvotes');
  openVideoModal(koleksyonItem, koleksyonModal, koleksyonVideo, 'koleksyon');
  openVideoModal(growbrainItem, growbrainModal, growbrainVideo, 'growbrain');

  // Universal close button for all project modals
  document.querySelectorAll('.project-modal .close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.project-modal');
      const video = modal?.querySelector('video');
      closeAnyModal(modal, video);
    });
  });

  // Close modal when clicking outside content
  document.querySelectorAll('.project-modal').forEach(modal => {
    modal.addEventListener('click', function(e) {
      // Only close if the click is directly on the modal background, not on modal-content or its children
      if (e.target === modal) {
        const video = modal?.querySelector('video');
        closeAnyModal(modal, video);
      }
    });
  });

  // Prevent clicks inside modal-content from bubbling up to modal (so clicking controls won't close modal)
  document.querySelectorAll('.project-modal .modal-content').forEach(modalContent => {
    modalContent.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  });
});

// Video Player Functions
function initializeVideoPlayer(videoId, prefix) {
  const video = document.getElementById(`${prefix}-video`);
  const overlay = document.getElementById(`${prefix}-overlay`);
  const playBtn = document.getElementById(`${prefix}-play`);
  const backwardBtn = document.getElementById(`${prefix}-backward`);
  const forwardBtn = document.getElementById(`${prefix}-forward`);
  const timeSlider = document.getElementById(`${prefix}-slider`);
  const timeDisplay = document.getElementById(`${prefix}-time`);
  const volumeBtn = document.getElementById(`${prefix}-volume`);
  const volumeSlider = document.getElementById(`${prefix}-volume-slider`);
  
  if (!video || !playBtn || !timeSlider) return;

  // Initialize state
  let isPlaying = false;
  let isMuted = false;
  let lastVolume = 1;

  // Update play button icon
  function updatePlayButton() {
    playBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
  }

  // Format time for display
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  // Update time display and slider
  function updateTimeDisplay() {
    const currentTime = video.currentTime;
    const duration = video.duration || 0;
    timeSlider.value = (currentTime / duration) * 100 || 0;
    timeDisplay.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
  }

  // Update volume icon based on volume level
  function updateVolumeIcon() {
    const volume = video.volume;
    let icon = '';
    if (video.muted || volume === 0) {
      icon = '<i class="fas fa-volume-mute"></i>';
    } else if (volume < 0.5) {
      icon = '<i class="fas fa-volume-down"></i>';
    } else {
      icon = '<i class="fas fa-volume-up"></i>';
    }
    volumeBtn.innerHTML = icon;
  }

  // Event Listeners
  // Big play button on overlay
  overlay?.querySelector('.big-play-button')?.addEventListener('click', () => {
    video.play();
    isPlaying = true;
    updatePlayButton();
    overlay.classList.add('hidden');
  });

  // Play/Pause button
  playBtn.addEventListener('click', () => {
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
      overlay?.classList.add('hidden');
    }
    isPlaying = !isPlaying;
    updatePlayButton();
  });

  // Backward/Forward 10s
  backwardBtn?.addEventListener('click', () => {
    video.currentTime = Math.max(video.currentTime - 10, 0);
  });

  forwardBtn?.addEventListener('click', () => {
    video.currentTime = Math.min(video.currentTime + 10, video.duration);
  });

  // Time slider
  timeSlider.addEventListener('input', () => {
    const time = (video.duration * timeSlider.value) / 100;
    video.currentTime = time;
  });

  // Volume controls
  volumeBtn.addEventListener('click', () => {
    if (video.muted) {
      video.muted = false;
      video.volume = lastVolume;
      volumeSlider.value = lastVolume * 100;
    } else {
      video.muted = true;
      lastVolume = video.volume;
      video.volume = 0;
      volumeSlider.value = 0;
    }
    updateVolumeIcon();
  });

  volumeSlider.addEventListener('input', () => {
    const volume = volumeSlider.value / 100;
    video.volume = volume;
    video.muted = volume === 0;
    lastVolume = volume;
    updateVolumeIcon();
  });

  // Video state updates
  video.addEventListener('timeupdate', updateTimeDisplay);
  video.addEventListener('ended', () => {
    isPlaying = false;
    updatePlayButton();
    overlay?.classList.remove('hidden');
  });
  video.addEventListener('play', () => {
    isPlaying = true;
    updatePlayButton();
  });
  video.addEventListener('pause', () => {
    isPlaying = false;
    updatePlayButton();
  });

  // Initialize controls
  updateTimeDisplay();
  updateVolumeIcon();
}

// Initialize video players when modals are opened
// REMOVED individual click listeners and consolidated into openVideoModal/closeVideoModal

// Close modals and pause videos (universal handler now uses closeVideoModal)
document.querySelectorAll('.close-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = btn.closest('.project-modal');
    const video = modal?.querySelector('video');
    closeAnyModal(modal, video);
  });
});

// Close modals when clicking outside content (universal handler now uses closeVideoModal)
document.querySelectorAll('.project-modal').forEach(modal => {
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      const video = modal?.querySelector('video');
      closeAnyModal(modal, video);
    }
  });
});

// Prevent clicks inside modal-content from bubbling up to modal (so clicking controls won't close modal)
document.querySelectorAll('.project-modal .modal-content').forEach(modalContent => {
  modalContent.addEventListener('click', function(e) {
    e.stopPropagation();
  });
});

// Settings modal logic
const openSettingsBtn = document.getElementById('open-settings-modal');
const settingsModal = document.getElementById('settings-modal');
const closeSettingsBtn = document.getElementById('close-settings-modal');
const toggleCursorLight = document.getElementById('toggle-cursor-light');
// Use the already declared mouseLight variable
if (openSettingsBtn && settingsModal) {
  openSettingsBtn.addEventListener('click', function(e) {
    e.preventDefault();
    settingsModal.classList.add('active');
    document.body.classList.add('modal-open');
    if (mainContent) mainContent.classList.add('blur-bg'); // Apply blur for settings modal
  });
}
if (closeSettingsBtn && settingsModal) {
  closeSettingsBtn.addEventListener('click', function() {
    settingsModal.classList.remove('active');
    document.body.classList.remove('modal-open');
    const activeModals = document.querySelectorAll('.project-modal.active');
    if (activeModals.length === 0) {
      removeBlurWithAnimation(); // Only remove blur if no other modals are open
    }
  });
}
if (settingsModal) {
  settingsModal.addEventListener('mousedown', function(e) {
    if (e.target === settingsModal) {
      settingsModal.classList.remove('active');
      document.body.classList.remove('modal-open');
      const activeModals = document.querySelectorAll('.project-modal.active');
      if (activeModals.length === 0) {
        removeBlurWithAnimation(); // Only remove blur if no other modals are open
      }
    }
  });
}
if (toggleCursorLight && mouseLight) {
  toggleCursorLight.addEventListener('change', function() {
    mouseLight.style.display = this.checked ? '' : 'none';
  });
}

// Unique view counter using hits.sh and localStorage
const viewCountBadge = document.getElementById('view-count-badge');
const HITS_SH_URL = 'https://hits.sh/mikazujzportfolio.netlify.app.svg?style=for-the-badge&label=VIEW&color=dacfda&labelColor=2a2a2a';
const VISIT_COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

if (viewCountBadge) {
    const lastVisitTime = localStorage.getItem('last_visit_timestamp');
    const currentTime = new Date().getTime();

    if (lastVisitTime === null || (currentTime - parseInt(lastVisitTime)) > VISIT_COOLDOWN_MS) {
        // First visit or cooldown period has passed, trigger a new hit
        viewCountBadge.src = HITS_SH_URL;
        localStorage.setItem('last_visit_timestamp', currentTime.toString());
    } else {
        // Within cooldown period, load the image without incrementing (if already loaded once)
        // To avoid flickering, we still set the src, but only after checking the timestamp
        // This ensures the image loads if it wasn't loaded from a previous session.
        viewCountBadge.src = HITS_SH_URL; 
    }
    viewCountBadge.style.display = 'inline-block'; // Make it visible
}

// Dark/Light mode toggle
function setTheme(mode) {
  if (mode === 'light') {
    document.body.classList.add('light-mode');
    document.body.classList.remove('bg-dark', 'text-light');
    document.body.classList.add('text-dark');
  } else {
    document.body.classList.remove('light-mode');
    document.body.classList.remove('text-dark');
    document.body.classList.add('bg-dark', 'text-light');
  }
}

function saveTheme(mode) {
  localStorage.setItem('theme', mode);
}

function loadTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    setTheme('light');
    const toggle = document.getElementById('toggle-darkmode');
    if (toggle) toggle.checked = true;
  } else {
    setTheme('dark');
    const toggle = document.getElementById('toggle-darkmode');
    if (toggle) toggle.checked = false;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  loadTheme();
  const toggle = document.getElementById('toggle-darkmode');
  if (toggle) {
    toggle.addEventListener('change', function() {
      if (this.checked) {
        setTheme('light');
        saveTheme('light');
      } else {
        setTheme('dark');
        saveTheme('dark');
      }
    });
  }
});

// Skills section animation
// --- SMOOTH ANIMATION VERSION ---
document.addEventListener('DOMContentLoaded', () => {
  const skillsSection = document.querySelector('#My\\ Skills');
  const techPills = document.querySelectorAll('.tech-pill');

  function animatePillsSmoothly() {
    let start = null;
    const duration = 600; // total duration for all pills
    const stagger = 100; // ms between each pill
    const total = techPills.length;
    // Reset all pills
    techPills.forEach(pill => {
      pill.style.opacity = '0';
      pill.style.transform = 'scale(0.5) translateY(20px)';
      pill.style.transition = 'none';
    });
    function step(timestamp) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      techPills.forEach((pill, i) => {
        const pillAppear = i * stagger;
        if (elapsed > pillAppear) {
          pill.style.transition = 'opacity 0.45s cubic-bezier(0.4,0,0.2,1), transform 0.45s cubic-bezier(0.4,0,0.2,1)';
          pill.style.opacity = '1';
          pill.style.transform = 'scale(1) translateY(0)';
        }
      });
      if (elapsed < (total - 1) * stagger + 450) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animatePillsSmoothly();
      } else {
        // When section is out of view, reset pills for next animation
        techPills.forEach(pill => {
          pill.style.opacity = '0';
          pill.style.transform = 'scale(0.5) translateY(20px)';
          pill.style.transition = 'none';
        });
      }
    });
  }, {
    threshold: 0.2 // Trigger when 20% of the section is visible
  });

  if (skillsSection) {
    observer.observe(skillsSection);
  }
});

// Toggle skill icon/percent on character click
window.addEventListener('DOMContentLoaded', function() {
  const character = document.querySelector('.skills-character-bg, .character-image, .character');
  const techPills = document.querySelectorAll('.tech-pill');
  if (!character) return;
  let show = false;
  // Set initial percentages
  techPills.forEach(pill => {
    const percent = pill.getAttribute('data-skill');
    const span = pill.querySelector('.skill-percent');
    if (span && percent) span.textContent = percent + '%';
  });
  character.addEventListener('click', function() {
    show = !show;
    techPills.forEach(pill => {
      if (show) {
        pill.classList.add('show-percent');
      } else {
        pill.classList.remove('show-percent');
      }
    });
  });
});

// Animate skill percentages when section becomes visible
document.addEventListener('DOMContentLoaded', function() {
    const techPills = document.querySelectorAll('.tech-pill');
    let animations = new Map(); // Store active animations

    function animatePercentages() {
        techPills.forEach(pill => {
            // Clear any existing animation for this pill
            if (animations.has(pill)) {
                clearInterval(animations.get(pill));
            }

            const percentElement = pill.querySelector('.skill-percent');
            const targetPercent = parseInt(pill.getAttribute('data-skill'));
            let currentPercent = 0;

            // Show the percentage element
            pill.classList.add('show-percent');

            // Animate counting up
            const duration = 1500; // 1.5 seconds
            const interval = 16; // ~60fps
            const steps = duration / interval;
            const increment = targetPercent / steps;

            const counter = setInterval(() => {
                currentPercent = Math.min(currentPercent + increment, targetPercent);
                percentElement.textContent = Math.round(currentPercent) + '%';

                if (currentPercent >= targetPercent) {
                    clearInterval(counter);
                    animations.delete(pill);
                }
            }, interval);

            // Store the animation
            animations.set(pill, counter);
        });
    }

    // Use Intersection Observer to detect when skills section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animatePercentages(); // Animate every time it comes into view
            }
        });
    }, { 
        threshold: 0.2, // Trigger when 20% of the section is visible
        rootMargin: '-10% 0px' // Trigger slightly after entering viewport
    });

    // Observe the skills section
    const skillsSection = document.getElementById('My Skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
});

// Scroll-to-top button functionality
const scrollToTopBtn = document.getElementById('scroll-to-top-btn');

function handleScrollToTopButton() {
  const contentScroll = document.querySelector('.content-scroll');
  let currentScrollPos;

  if (contentScroll) {
    currentScrollPos = contentScroll.scrollTop;
  } else {
    currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;
  }

  if (currentScrollPos > 200) { // Show button after scrolling 200px down
    scrollToTopBtn.classList.add('show');
  } else {
    scrollToTopBtn.classList.remove('show');
  }
}

function scrollToTop() {
  const contentScroll = document.querySelector('.content-scroll');
  if (contentScroll) {
    contentScroll.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  } else {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

// Attach scroll event listener
document.addEventListener('DOMContentLoaded', function() {
  const contentScroll = document.querySelector('.content-scroll');
  if (contentScroll) {
    contentScroll.addEventListener('scroll', handleScrollToTopButton);
  } else {
    window.addEventListener('scroll', handleScrollToTopButton);
  }
  // Initial check on load
  handleScrollToTopButton();
});

// Attach click event listener
if (scrollToTopBtn) {
  scrollToTopBtn.addEventListener('click', scrollToTop);
}

// Disable Ctrl+scroll zoom
window.addEventListener('wheel', function(e) {
  if (e.ctrlKey) {
    e.preventDefault();
  }
}, { passive: false });

// EmailJS functionality for contact form
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const customAlert = document.getElementById('custom-alert');
    const alertMessage = customAlert ? customAlert.querySelector('.alert-message') : null;
    const alertIconContainer = customAlert ? customAlert.querySelector('.alert-icon') : null;
    const alertIcon = alertIconContainer ? alertIconContainer.querySelector('i') : null;
    const successSound = document.getElementById('success-sound');
    const errorSound = document.getElementById('error-sound');

    // Photo Gallery elements
    const photoGalleryModal = document.getElementById('photo-gallery-modal');
    const galleryMainImage = document.getElementById('gallery-main-image');
    const galleryPrevBtn = document.getElementById('gallery-prev-btn');
    const galleryNextBtn = document.getElementById('gallery-next-btn');
    const galleryThumbnailsContainer = document.getElementById('gallery-thumbnails');
    const closePhotoGalleryBtn = document.getElementById('close-photo-gallery');
    let currentGalleryImages = [];
    let currentImageIndex = 0;

    // Define project images (UPDATE THESE PATHS WITH YOUR ACTUAL IMAGE PATHS)
    const projectImages = {
        'plvgame': [
            'image/plv1.png',
            'image/plv2.png',
            'image/plv3.png'
        ],
        'deadlock': [
            'image/deadlock-gallery/1.jpg',
            'image/deadlock-gallery/2.jpg',
            'image/deadlock-gallery/3.jpg'
        ],
        'maharlika': [
            'image/maharlika-gallery/1.jpg',
            'image/maharlika-gallery/2.jpg',
            'image/maharlika-gallery/3.jpg'
        ],
        'plvvotes': [
            'image/plvvotes-gallery/1.jpg',
            'image/plvvotes-gallery/2.jpg',
            'image/plvvotes-gallery/3.jpg'
        ],
        'koleksyon': [
            'image/koleksyon-gallery/1.jpg',
            'image/koleksyon-gallery/2.jpg',
            'image/koleksyon-gallery/3.jpg'
        ],
        'growbrain': [
            'Growbrain/1.jpg',
            'Growbrain/2.jpg',
            'Growbrain/3.jpg',
            'Growbrain/4.jpg',
            'Growbrain/5.jpg',
            'Growbrain/6.jpg',
            'Growbrain/7.jpg',
            'Growbrain/8.jpg'
        ]
    };

    function showCustomAlert(message, isSuccess, iconClass = null) {
        if (customAlert && alertMessage && alertIcon) {
            alertMessage.textContent = message;
            // Reset classes on the customAlert div
            customAlert.classList.remove('show', 'error');

            // Clear all existing Font Awesome icon classes from the i tag
            alertIcon.className = ''; // Clears all classes from the i tag

            if (iconClass) {
                alertIcon.classList.add('fas', iconClass);
            } else if (isSuccess) {
                alertIcon.classList.add('fas', 'fa-check-circle');
                if (successSound) {
                    successSound.play(); // Play the sound
                }
            } else {
                customAlert.classList.add('error');
                alertIcon.classList.add('fas', 'fa-times-circle'); 
                if (errorSound) {
                    errorSound.currentTime = 0;
                    errorSound.play(); // Play the error sound
                }
            }
            
            customAlert.classList.add('show');

            // Hide after 3 seconds
            setTimeout(() => {
                customAlert.classList.remove('show');
            }, 3000);
        }
    }

    // Helper functions for managing sent emails in localStorage
    function getSentEmails() {
        const sentEmailsJson = localStorage.getItem('sent_emails');
        return sentEmailsJson ? JSON.parse(sentEmailsJson) : [];
    }

    function addSentEmail(email) {
        const sentEmails = getSentEmails();
        if (!sentEmails.includes(email)) {
            sentEmails.push(email);
            localStorage.setItem('sent_emails', JSON.stringify(sentEmails));
        }
    }

    if (contactForm) {
        let storedFormData = null; // Variable to temporarily store form data

        const ticketShopModal = document.getElementById('ticket-shop-modal');
        const buyTicketBtn = document.getElementById('buy-ticket-btn');
        const emailCoinBalance = document.getElementById('email-coin-balance');
        const closeTicketShopModalBtn = document.getElementById('close-ticket-shop-modal');
        const emailInput = document.getElementById('email'); // Get email input

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const nameInput = document.getElementById('name');
            const nameValue = nameInput ? nameInput.value.trim() : '';
            const emailValue = emailInput ? emailInput.value.trim() : ''; // Get email value

            // Regular expression for a real name (allows letters, spaces, hyphens, apostrophes)
            // Minimum 2 characters, maximum 50 characters.
            const nameRegex = /^[a-zA-Z\s'-]{2,50}$/;

            if (!nameRegex.test(nameValue)) {
                showCustomAlert('Please enter a valid name (2-50 characters, letters, spaces, hyphens, and apostrophes only).', false);
                return; // Stop form submission if validation fails
            }

            // Check if email has already been used
            const sentEmails = getSentEmails();
            if (sentEmails.includes(emailValue)) {
                showCustomAlert('This email address has already sent a message. You need a new ticket for each email.', false);
                if (emailCoinBalance) emailCoinBalance.textContent = '0';
                if (buyTicketBtn) buyTicketBtn.disabled = true; // Disable button if email used
            } else {
                if (emailCoinBalance) emailCoinBalance.textContent = '1';
                if (buyTicketBtn) buyTicketBtn.disabled = false; // Enable button if email new
            }

            // Store form data for later use
            storedFormData = new FormData(this);

            // Show ticket shop modal
            ticketShopModal.classList.add('active');
            ticketShopModal.style.display = 'flex';
            if (mainContent) mainContent.classList.add('blur-bg');
        });

        if (buyTicketBtn) {
            buyTicketBtn.addEventListener('click', function() {
                let currentCoins = parseInt(emailCoinBalance.textContent || '0'); // Get current coins from display

                if (currentCoins >= 1) {
                    // "Spend" the coin
                    currentCoins -= 1;
                    if (emailCoinBalance) {
                        emailCoinBalance.textContent = currentCoins.toString();
                    }
                    this.disabled = true; // Disable button after click

                    // Proceed to send the email using stored form data
                    emailjs.sendForm('service_4sgjzdn', 'template_5epppvn', contactForm)
                        .then(function() {
                            showCustomAlert('Your message has been sent successfully!', true);
                            addSentEmail(contactForm.elements.email.value.trim()); // Add email to sent list
                            contactForm.reset(); // Clear the form
                            closeAnyModal(ticketShopModal); // Close the shop modal
                        }, function(error) {
                            showCustomAlert('Failed to send your message. Please try again later.', false);
                            console.error('EmailJS Error:', error);
                            closeAnyModal(ticketShopModal); // Close the shop modal even on error
                        });
                } else {
                    showCustomAlert('You need 1 coin to send an email! Please try again later.', false);
                    closeAnyModal(ticketShopModal); // Close if no coins
                }
            });
        }

        // Close ticket shop modal via close button
        if (closeTicketShopModalBtn) {
            closeTicketShopModalBtn.addEventListener('click', () => {
                closeAnyModal(ticketShopModal);
            });
        }

        // Close ticket shop modal when clicking outside content
        if (ticketShopModal) {
            ticketShopModal.addEventListener('click', function(e) {
                if (e.target === ticketShopModal) {
                    closeAnyModal(ticketShopModal);
                }
            });
        }
    }

    // Generic function to open video modal
    function openVideoModal(item, modal, video, prefix) {
      if (item && modal && video) {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function(e) {
          // Check if the click was on a photo gallery button, if so, do nothing
          if (e.target.closest('.project-gallery-btn')) return;
          
          modal.classList.add('active');
          modal.style.display = 'flex'; // Ensure display is flex for animation
          video.currentTime = 0;
          video.pause();
          // The initializeVideoPlayer handles play button icon update and time update
          initializeVideoPlayer(prefix, prefix);
          if (mainContent) mainContent.classList.add('blur-bg');
        });
      }
    }
  
    // Generic function to close any modal
    function closeAnyModal(modal, video = null) {
      if (modal) {
        modal.classList.remove('active');
        // Delay display: none to allow for CSS transition
        setTimeout(() => {
          modal.style.display = 'none';
        }, 300); // Match CSS transition duration for modal-content
      }
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
      const overlay = modal?.querySelector('.video-poster-overlay');
      if (overlay) {
        overlay.classList.remove('hidden');
      }
      // Only remove blur if no other modals are open
      const activeModals = document.querySelectorAll('.project-modal.active');
      if (activeModals.length === 0) {
          removeBlurWithAnimation();
      }
    }

    // Photo Gallery Functions
    function openPhotoGallery(projectId) {
        currentGalleryImages = projectImages[projectId];
        currentImageIndex = 0;
        if (currentGalleryImages && currentGalleryImages.length > 0) {
            updateGalleryImage();
            updateThumbnails();
            photoGalleryModal.classList.add('active');
            photoGalleryModal.style.display = 'flex';
            if (mainContent) mainContent.classList.add('blur-bg');
        }
    }

    function updateGalleryImage() {
        if (galleryMainImage && currentGalleryImages.length > 0) {
            galleryMainImage.src = currentGalleryImages[currentImageIndex];
            // Update active thumbnail
            document.querySelectorAll('.gallery-thumbnail').forEach((thumb, index) => {
                if (index === currentImageIndex) {
                    thumb.classList.add('active');
                } else {
                    thumb.classList.remove('active');
                }
            });
        }
    }

    function updateThumbnails() {
        if (galleryThumbnailsContainer) {
            galleryThumbnailsContainer.innerHTML = ''; // Clear existing thumbnails
            currentGalleryImages.forEach((imagePath, index) => {
                const thumb = document.createElement('img');
                thumb.src = imagePath;
                thumb.classList.add('gallery-thumbnail');
                thumb.alt = `Thumbnail ${index + 1}`;
                thumb.addEventListener('click', () => {
                    currentImageIndex = index;
                    updateGalleryImage();
                });
                galleryThumbnailsContainer.appendChild(thumb);
            });
            updateGalleryImage(); // Highlight the current image thumbnail
        }
    }

    function navigateGallery(direction) {
        if (currentGalleryImages.length === 0) return;
        currentImageIndex += direction;
        if (currentImageIndex < 0) {
            currentImageIndex = currentGalleryImages.length - 1;
        } else if (currentImageIndex >= currentGalleryImages.length) {
            currentImageIndex = 0;
        }
        updateGalleryImage();
    }

    // Event listeners for Photo Gallery buttons
    document.querySelectorAll('.project-gallery-btn').forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.dataset.projectId;
            if (projectId && projectImages[projectId]) {
                // If it's a video button, let the video modal handle it
                if (projectId.endsWith('-video')) {
                    const videoPrefix = projectId.replace('-video', '');
                    const videoModal = document.getElementById(`modal-${videoPrefix.toUpperCase()}-VIDEO`);
                    const videoElement = document.getElementById(`${videoPrefix}-video`);
                    openVideoModal(this, videoModal, videoElement, videoPrefix);
                } else { // It's a photo gallery button
                    openPhotoGallery(projectId);
                }
            } 
        });
    });

    galleryPrevBtn?.addEventListener('click', () => navigateGallery(-1));
    galleryNextBtn?.addEventListener('click', () => navigateGallery(1));
    closePhotoGalleryBtn?.addEventListener('click', () => closeAnyModal(photoGalleryModal));

    // Existing modal initialization (adjusted to use generic functions)
    const projectItems = document.querySelectorAll('.project-item[id^="open-"]');
    projectItems.forEach(item => {
        const id = item.id;
        const videoPrefix = id.replace('open-', '').replace('-video', '');
        const modalId = `modal-${videoPrefix.toUpperCase()}-VIDEO`;
        const videoId = `${videoPrefix}-video`;

        const modal = document.getElementById(modalId);
        const video = document.getElementById(videoId);

        if (modal && video) {
            // Event listener for the project item itself (excluding clicks on gallery buttons inside)
            item.addEventListener('click', function(e) {
                if (!e.target.closest('.project-gallery-btn')) {
                    openVideoModal(item, modal, video, videoPrefix);
                }
            });
        }
    });

    // Universal close button for all project modals (now uses closeAnyModal)
    document.querySelectorAll('.project-modal .close-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = btn.closest('.project-modal');
        const video = modal?.querySelector('video');
        closeAnyModal(modal, video);
      });
    });
  
    // Close modals when clicking outside content (universal handler now uses closeAnyModal)
    document.querySelectorAll('.project-modal').forEach(modal => {
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          const video = modal?.querySelector('video');
          closeAnyModal(modal, video);
        }
      });
    });
  
    // Prevent clicks inside modal-content from bubbling up to modal (so clicking controls won't close modal)
    document.querySelectorAll('.project-modal .modal-content').forEach(modalContent => {
      modalContent.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    });
  
    // Settings modal logic (updated to use removeBlurWithAnimation)
    const openSettingsBtn = document.getElementById('open-settings-modal');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettingsBtn = document.getElementById('close-settings-modal');
    const toggleCursorLight = document.getElementById('toggle-cursor-light');
    // Use the already declared mouseLight variable
    if (openSettingsBtn && settingsModal) {
      openSettingsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        settingsModal.classList.add('active');
        document.body.classList.add('modal-open');
        if (mainContent) mainContent.classList.add('blur-bg'); // Apply blur for settings modal
      });
    }
    if (closeSettingsBtn && settingsModal) {
      closeSettingsBtn.addEventListener('click', function() {
        settingsModal.classList.remove('active');
        document.body.classList.remove('modal-open');
        const activeModals = document.querySelectorAll('.project-modal.active');
        if (activeModals.length === 0) {
          removeBlurWithAnimation(); // Only remove blur if no other modals are open
        }
      });
    }
    if (settingsModal) {
      settingsModal.addEventListener('mousedown', function(e) {
        if (e.target === settingsModal) {
          settingsModal.classList.remove('active');
          document.body.classList.remove('modal-open');
          const activeModals = document.querySelectorAll('.project-modal.active');
          if (activeModals.length === 0) {
            removeBlurWithAnimation(); // Only remove blur if no other modals are open
          }
        }
      });
    }
    if (toggleCursorLight && mouseLight) {
      toggleCursorLight.addEventListener('change', function() {
        mouseLight.style.display = this.checked ? '' : 'none';
      });
    }
});

// Resume Modal Functionality
const resumeModal = document.getElementById('resume-modal');
const openResumeModal = document.getElementById('open-resume-modal');
const closeResumeModal = document.getElementById('close-resume-modal');

openResumeModal.addEventListener('click', () => {
  resumeModal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
});

closeResumeModal.addEventListener('click', () => {
  resumeModal.style.display = 'none';
  document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
  if (e.target === resumeModal) {
    resumeModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Download Resume Button Alert
const downloadResumeBtn = document.getElementById('download-resume-btn');
if (downloadResumeBtn) {
  downloadResumeBtn.addEventListener('click', (event) => {
    // Display "Downloading..." message immediately with a spinner
    showCustomAlert('Downloading...', true, 'fa-spinner fa-spin');

    // Allow the default download behavior to proceed

    // After a short delay, show "Download Complete!" with a checkmark
    setTimeout(() => {
      showCustomAlert('Download Complete!', true);
    }, 1500); // Adjust delay as needed (1.5 seconds)
  });
}

