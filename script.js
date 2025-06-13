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

// Hide profile section when Technologies is active (MOBILE ONLY)
let lastScrollTop = 0;
const sidebar = document.querySelector('.sidebar-fixed');
const techLink = document.querySelector('a[href="#technologies"]');

function isMobile() {
  return window.innerWidth <= 900;
}

window.addEventListener('scroll', function() {
  if (!sidebar || !isMobile() || !techLink) return;
  
  // Check if Technologies section is active
  if (techLink.classList.contains('active')) {
    // In Technologies section or below, hide profile
    sidebar.classList.add('hide-profile');
    sidebar.classList.remove('sticky'); // Remove sticky to prevent conflicts
  } else {
    // Above Technologies section, show full header
    sidebar.classList.remove('hide-profile');
    if (window.scrollY > 40) {
      sidebar.classList.add('sticky');
    }
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

// Speech bubble animation
const speechBubble = document.querySelector('.speech-bubble');

function showSpeechBubble() {
    if (speechBubble) {
        speechBubble.classList.add('show');
        setTimeout(() => {
            speechBubble.classList.remove('show');
        }, 5000); // Hide after 5 seconds
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
  const plvgameBackward = document.getElementById('plvgame-backward');
  const plvgameForward = document.getElementById('plvgame-forward');
  const plvgameSlider = document.getElementById('plvgame-slider');
  const plvgameTime = document.getElementById('plvgame-time');
  const plvgameClose = document.getElementById('close-plvgame-video');

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

  if (plvgameItem && plvgameModal) {
    plvgameItem.style.cursor = 'pointer';
    plvgameItem.addEventListener('click', function(e) {
      plvgameModal.classList.add('active');
      plvgameVideo.currentTime = 0;
      plvgameVideo.pause();
      plvgamePlay.innerHTML = '<i class="fas fa-play"></i>';
      updateTime();
      // Magdagdag ng blur
      if (mainContent) mainContent.classList.add('blur-bg');
    });
  }
  if (plvgameClose) {
    plvgameClose.addEventListener('click', function() {
      plvgameModal.classList.remove('active');
      plvgameModal.style.display = 'none';
      plvgameVideo.pause();
      plvgameVideo.currentTime = 0;
      removeBlurWithAnimation();
    });
  }
  if (plvgameModal) {
    plvgameModal.addEventListener('click', function(e) {
      // Only close if the click is directly on the modal background, not on modal-content or its children
      if (e.target === plvgameModal) {
        plvgameModal.classList.remove('active');
        plvgameModal.style.display = 'none';
        plvgameVideo.pause();
        plvgameVideo.currentTime = 0;
        removeBlurWithAnimation();
      }
    });
    // Prevent clicks inside modal-content from bubbling up to modal (so clicking controls won't close modal)
    const modalContent = plvgameModal.querySelector('.modal-content');
    if (modalContent) {
      modalContent.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    }
  }
  if (plvgamePlay) {
    plvgamePlay.addEventListener('click', function() {
      if (plvgameVideo.paused) {
        plvgameVideo.play();
        plvgamePlay.innerHTML = '<i class="fas fa-pause"></i>';
      } else {
        plvgameVideo.pause();
        plvgamePlay.innerHTML = '<i class="fas fa-play"></i>';
      }
    });
  }
  if (plvgameBackward) {
    plvgameBackward.addEventListener('click', function(e) {
      e.stopPropagation();
      plvgameVideo.currentTime = Math.max(0, plvgameVideo.currentTime - 10);
      updateTime();
    });
  }
  if (plvgameForward) {
    plvgameForward.addEventListener('click', function(e) {
      e.stopPropagation();
      plvgameVideo.currentTime = Math.min(plvgameVideo.duration, plvgameVideo.currentTime + 10);
      updateTime();
    });
  }
  if (plvgameSlider) {
    plvgameSlider.addEventListener('input', function(e) {
      e.stopPropagation();
      if (plvgameVideo.duration) {
        plvgameVideo.currentTime = (plvgameSlider.value / 100) * plvgameVideo.duration;
        updateTime();
      }
    });
  }
  if (plvgameVideo) {
    plvgameVideo.addEventListener('timeupdate', updateTime);
    plvgameVideo.addEventListener('loadedmetadata', updateTime);
    plvgameVideo.addEventListener('ended', function() {
      plvgamePlay.innerHTML = '<i class="fas fa-play"></i>';
    });
  }
  function updateTime() {
    if (!plvgameVideo.duration) return;
    const current = plvgameVideo.currentTime;
    const total = plvgameVideo.duration;
    plvgameSlider.value = (current / total) * 100;
    plvgameTime.textContent = formatTime(current) + ' / ' + formatTime(total);
  }
  function formatTime(sec) {
    sec = Math.floor(sec);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }

  // Deadlock Duel Video Modal - trigger on whole project item
  const deadlockItem = document.getElementById('open-deadlock-video');
  const deadlockModal = document.getElementById('modal-Deadlock-VIDEO');
  const deadlockVideo = document.getElementById('deadlock-video');
  const deadlockPlay = document.getElementById('deadlock-play');
  const deadlockBackward = document.getElementById('deadlock-backward');
  const deadlockForward = document.getElementById('deadlock-forward');
  const deadlockSlider = document.getElementById('deadlock-slider');
  const deadlockTime = document.getElementById('deadlock-time');
  const deadlockClose = document.getElementById('close-deadlock-video');

  if (deadlockItem && deadlockModal) {
    deadlockItem.style.cursor = 'pointer';
    deadlockItem.addEventListener('click', function(e) {
      deadlockModal.classList.add('active');
      deadlockVideo.currentTime = 0;
      deadlockVideo.pause();
      deadlockPlay.innerHTML = '<i class="fas fa-play"></i>';
      updateDeadlockTime();
    });
  }
  if (deadlockClose) {
    deadlockClose.addEventListener('click', function() {
      deadlockModal.classList.remove('active');
      deadlockVideo.pause();
    });
  }
  if (deadlockModal) {
    deadlockModal.addEventListener('click', function(e) {
      if (e.target === deadlockModal) {
        deadlockModal.classList.remove('active');
        deadlockVideo.pause();
      }
    });
  }
  if (deadlockPlay) {
    deadlockPlay.addEventListener('click', function(e) {
      e.stopPropagation();
      if (deadlockVideo.paused) {
        deadlockVideo.play();
        deadlockPlay.innerHTML = '<i class="fas fa-pause"></i>';
      } else {
        deadlockVideo.pause();
        deadlockPlay.innerHTML = '<i class="fas fa-play"></i>';
      }
    });
  }
  if (deadlockBackward) {
    deadlockBackward.addEventListener('click', function(e) {
      e.stopPropagation();
      deadlockVideo.currentTime = Math.max(0, deadlockVideo.currentTime - 10);
      updateDeadlockTime();
    });
  }
  if (deadlockForward) {
    deadlockForward.addEventListener('click', function(e) {
      e.stopPropagation();
      deadlockVideo.currentTime = Math.min(deadlockVideo.duration, deadlockVideo.currentTime + 10);
      updateDeadlockTime();
    });
  }
  if (deadlockSlider) {
    deadlockSlider.addEventListener('input', function(e) {
      e.stopPropagation();
      if (deadlockVideo.duration) {
        deadlockVideo.currentTime = (deadlockSlider.value / 100) * deadlockVideo.duration;
        updateDeadlockTime();
      }
    });
  }
  if (deadlockVideo) {
    deadlockVideo.addEventListener('timeupdate', updateDeadlockTime);
    deadlockVideo.addEventListener('loadedmetadata', updateDeadlockTime);
    deadlockVideo.addEventListener('ended', function() {
      deadlockPlay.innerHTML = '<i class="fas fa-play"></i>';
    });
  }
  function updateDeadlockTime() {
    if (!deadlockVideo.duration) return;
    const current = deadlockVideo.currentTime;
    const total = deadlockVideo.duration;
    deadlockSlider.value = (current / total) * 100;
    deadlockTime.textContent = formatTime(current) + ' / ' + formatTime(total);
  }
});

// Static image preview pop-up on hover for project items
const thumbContainers = document.querySelectorAll('.project-thumb-container');
thumbContainers.forEach(container => {
  const previewImg = container.querySelector('.project-preview-image');
  if (!previewImg) return;
  container.addEventListener('mouseenter', () => {
    previewImg.style.display = 'block';
  });
  container.addEventListener('mouseleave', () => {
    previewImg.style.display = 'none';
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
document.getElementById('open-plvgame-video')?.addEventListener('click', () => {
  const modal = document.getElementById('modal-PLVGAME-VIDEO');
  if (!modal) return;
  modal.style.display = 'flex';
  initializeVideoPlayer('plvgame', 'plvgame');
});

document.getElementById('open-deadlock-video')?.addEventListener('click', () => {
  const modal = document.getElementById('modal-Deadlock-VIDEO');
  if (!modal) return;
  modal.style.display = 'flex';
  initializeVideoPlayer('deadlock', 'deadlock');
});

// Close modals and pause videos
document.querySelectorAll('.close-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = btn.closest('.project-modal');
    const video = modal?.querySelector('video');
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    const overlay = modal?.querySelector('.video-poster-overlay');
    if (overlay) {
      overlay.classList.remove('hidden');
    }
    if (modal) {
      modal.style.display = 'none';
    }
  });
});