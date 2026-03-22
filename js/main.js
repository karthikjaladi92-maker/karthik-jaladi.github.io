(function () {
  'use strict';

  // ----- Smooth scroll for nav links -----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      e.preventDefault();
      var target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile menu if open
        var navCollapse = document.querySelector('.navbar-collapse');
        if (navCollapse && navCollapse.classList.contains('show')) {
          var bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
          if (bsCollapse) bsCollapse.hide();
        }
      }
    });
  });

  // ----- Active nav link on scroll -----
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  function setActiveNav() {
    var scrollY = window.pageYOffset;
    sections.forEach(function (section) {
      var id = section.getAttribute('id');
      var top = section.offsetTop - 100;
      var height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) link.classList.add('active');
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveNav);
  setActiveNav();

  // ----- Intersection Observer: sections, work items & service cards -----
  var observerOptions = { root: null, rootMargin: '0px 0px -80px 0px', threshold: 0.1 };
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, observerOptions);

  document.querySelectorAll('.work-item, .service-card').forEach(function (el) {
    observer.observe(el);
  });

  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { root: null, rootMargin: '0px 0px -100px 0px', threshold: 0.1 });

  document.querySelectorAll('.section').forEach(function (el) {
    sectionObserver.observe(el);
  });

  // ----- Navbar background on scroll -----
  var mainNav = document.getElementById('mainNav');
  function updateNavbar() {
    if (window.pageYOffset > 50) {
      mainNav.classList.add('scrolled');
    } else {
      mainNav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateNavbar);
  updateNavbar();

  // ----- See all: show remaining content on mobile -----
  var seeAllBtn = document.getElementById('seeAllBtn');
  var graphicDesignWrap = document.querySelector('.graphic-design-wrap');
  if (seeAllBtn && graphicDesignWrap) {
    seeAllBtn.addEventListener('click', function () {
      graphicDesignWrap.classList.add('show-all');
      seeAllBtn.setAttribute('aria-expanded', 'true');
    });
  }

  var seeAllPhotographyBtn = document.getElementById('seeAllPhotographyBtn');
  var photographyWrap = document.querySelector('.photography-wrap');
  if (seeAllPhotographyBtn && photographyWrap) {
    seeAllPhotographyBtn.addEventListener('click', function () {
      photographyWrap.classList.add('show-all');
      seeAllPhotographyBtn.setAttribute('aria-expanded', 'true');
    });
  }

  var seeAllReelsBtn = document.getElementById('seeAllReelsBtn');
  var reelsWrap = document.querySelector('.reels-wrap');
  if (seeAllReelsBtn && reelsWrap) {
    seeAllReelsBtn.addEventListener('click', function () {
      reelsWrap.classList.add('show-all');
      seeAllReelsBtn.setAttribute('aria-expanded', 'true');
    });
  }

  // ----- Reels: play on hover, click for sound -----
  document.querySelectorAll('.reel').forEach(function (reel) {
    var video = reel.querySelector('video');
    var soundBtn = reel.querySelector('.reel-sound');
    var icon = reel.querySelector('.reel-sound-icon');
    if (!video || !soundBtn) return;

    reel.addEventListener('mouseenter', function () { video.play().catch(function() {}); });
    reel.addEventListener('mouseleave', function () { video.pause(); });

    soundBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      video.muted = !video.muted;
      icon.textContent = video.muted ? '🔇' : '🔊';
      soundBtn.setAttribute('aria-label', video.muted ? 'Unmute' : 'Mute');
      if (!video.muted) video.play().catch(function() {});
    });
  });

  // ----- Footer year -----
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
