/* Taylor Made Esthetics: front-end behavior.
   Everything here is progressive enhancement: every Book link is a real link
   to the Boulevard booking page and works without JavaScript. */
(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, iframe, [tabindex]:not([tabindex="-1"])';

  // ---------- generic accessible dialog ----------
  function makeDialog(root, opts) {
    opts = opts || {};
    var dialog = root.querySelector('[role="dialog"]');
    var lastFocus = null;
    var open = false;

    function trap(e) {
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key !== 'Tab') return;
      var items = Array.prototype.filter.call(dialog.querySelectorAll(FOCUSABLE), function (el) { return el.offsetParent !== null || el.tagName === 'IFRAME'; });
      if (!items.length) return;
      var first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    function show() {
      if (open) return;
      open = true;
      lastFocus = document.activeElement;
      root.hidden = false;
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', trap);
      var focusTarget = opts.initialFocus ? dialog.querySelector(opts.initialFocus) : null;
      (focusTarget || dialog.querySelector(FOCUSABLE) || dialog).focus();
      if (opts.onOpen) opts.onOpen();
    }
    function close() {
      if (!open) return;
      open = false;
      root.hidden = true;
      document.body.style.overflow = '';
      document.removeEventListener('keydown', trap);
      if (opts.onClose) opts.onClose();
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    Array.prototype.forEach.call(root.querySelectorAll(opts.closeSelector), function (el) { el.addEventListener('click', close); });
    return { open: show, close: close, isOpen: function () { return open; } };
  }

  // ---------- booking dialog ----------
  var bookingRoot = document.getElementById('booking-modal');
  var booking = null;
  if (bookingRoot) {
    var frame = document.getElementById('booking-frame');
    var loading = document.getElementById('booking-loading');
    var newTab = document.getElementById('booking-newtab');
    booking = makeDialog(bookingRoot, {
      closeSelector: '[data-bk-close]',
      initialFocus: '.bk-close',
      onClose: function () { frame.removeAttribute('src'); loading.hidden = false; }
    });
    frame.addEventListener('load', function () { if (frame.getAttribute('src')) loading.hidden = true; });

    // With JS available, Book links open an in-page dialog instead of a new tab.
    Array.prototype.forEach.call(document.querySelectorAll('a.js-book'), function (a) {
      a.removeAttribute('target');
      a.setAttribute('aria-haspopup', 'dialog');
      var sr = a.querySelector('.sr-only');
      if (sr) sr.textContent = ' (opens the booking window)';
    });

    document.addEventListener('click', function (e) {
      var link = e.target.closest('a.js-book');
      if (!link) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // let the user open a new tab on purpose
      e.preventDefault();
      var url = link.getAttribute('href');
      newTab.setAttribute('href', url);
      loading.hidden = false;
      frame.setAttribute('src', url);
      booking.open();
      if (window.gtag) gtag('event', 'begin_booking', { path: link.getAttribute('data-book-path') || '' });
    });
  }

  // ---------- promo popup ----------
  var promoRoot = document.getElementById('promo-modal');
  if (promoRoot) {
    var promoId = promoRoot.getAttribute('data-promo-id');
    var key = 'tme-promo-seen:' + promoId;
    var seen = false;
    try { seen = sessionStorage.getItem(key) === '1' || localStorage.getItem(key) === '1'; } catch (err) { seen = false; }
    var promo = makeDialog(promoRoot, {
      closeSelector: '[data-promo-close]',
      initialFocus: '.promo-close',
      onClose: function () { try { localStorage.setItem(key, '1'); } catch (err) {} }
    });
    // A Book click inside the promo closes it and hands off to the booking dialog.
    promoRoot.addEventListener('click', function (e) {
      if (e.target.closest('a.js-book')) { try { localStorage.setItem(key, '1'); } catch (err) {} promoRoot.hidden = true; document.body.style.overflow = ''; }
    });
    var onHome = document.body.classList.contains('home');
    if (!seen && onHome) {
      var fired = false;
      var fire = function () {
        if (fired || (booking && booking.isOpen())) return;
        fired = true;
        promo.open();
      };
      setTimeout(fire, 7000);
      window.addEventListener('scroll', function onScroll() {
        if (window.scrollY > window.innerHeight * 0.6) { window.removeEventListener('scroll', onScroll); setTimeout(fire, 600); }
      }, { passive: true });
    }
  }

  // ---------- header + mobile menu ----------
  var header = document.getElementById('site-header');
  var hamburger = document.querySelector('.nav-hamburger');
  var mobileMenu = document.getElementById('mobile-menu');
  if (header) {
    var onScrollHeader = function () { header.classList.toggle('scrolled', window.scrollY > 24); };
    onScrollHeader();
    window.addEventListener('scroll', onScrollHeader, { passive: true });
  }
  if (hamburger && mobileMenu) {
    var setMenu = function (openIt) {
      hamburger.setAttribute('aria-expanded', String(openIt));
      hamburger.setAttribute('aria-label', openIt ? 'Close menu' : 'Open menu');
      mobileMenu.hidden = !openIt;
    };
    hamburger.addEventListener('click', function () { setMenu(hamburger.getAttribute('aria-expanded') !== 'true'); });
    mobileMenu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !mobileMenu.hidden) { setMenu(false); hamburger.focus(); } });
  }

  // ---------- service tabs ----------
  Array.prototype.forEach.call(document.querySelectorAll('[data-tabs]'), function (tabs) {
    var list = Array.prototype.slice.call(tabs.querySelectorAll('[role="tab"]'));
    var panels = list.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });
    function activate(i, focus) {
      list.forEach(function (t, n) {
        var on = n === i;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        panels[n].hidden = !on;
      });
      if (focus) list[i].focus();
    }
    list.forEach(function (t, i) {
      t.addEventListener('click', function () { activate(i, false); });
      t.addEventListener('keydown', function (e) {
        var n = null;
        if (e.key === 'ArrowRight') n = (i + 1) % list.length;
        if (e.key === 'ArrowLeft') n = (i - 1 + list.length) % list.length;
        if (e.key === 'Home') n = 0;
        if (e.key === 'End') n = list.length - 1;
        if (n !== null) { e.preventDefault(); activate(n, true); }
      });
    });
  });

  // ---------- testimonials ----------
  var t = document.querySelector('[data-testimonials]');
  if (t) {
    var figs = Array.prototype.slice.call(t.querySelectorAll('.testimonial'));
    var idx = 0;
    var counter = t.querySelector('[data-t-index]');
    var showT = function (n) {
      idx = (n + figs.length) % figs.length;
      figs.forEach(function (f, i) { f.hidden = i !== idx; f.classList.toggle('is-active', i === idx); });
      if (counter) counter.textContent = String(idx + 1);
    };
    t.querySelector('[data-t-prev]').addEventListener('click', function () { showT(idx - 1); });
    t.querySelector('[data-t-next]').addEventListener('click', function () { showT(idx + 1); });
  }

  // ---------- background videos ----------
  Array.prototype.forEach.call(document.querySelectorAll('video[data-autoplay]'), function (video) {
    var btn = video.parentElement.querySelector('[data-video-toggle]') || video.closest('section') && video.closest('section').querySelector('[data-video-toggle]');
    var setBtn = function (paused) {
      if (!btn) return;
      btn.setAttribute('aria-pressed', String(paused));
      btn.setAttribute('aria-label', paused ? 'Play background video' : 'Pause background video');
    };
    var start = function () {
      var p = video.play();
      if (p && p.catch) p.catch(function () { setBtn(true); });
      setBtn(false);
    };
    if (reducedMotion) { setBtn(true); }
    else if (video.hasAttribute('data-lazy') && 'IntersectionObserver' in window) {
      // Off-screen loops wait until they are about to scroll into view, so they never compete with the hero.
      var userPaused = false;
      if (btn) btn.addEventListener('click', function () { userPaused = video.paused; });
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { if (!userPaused) start(); }
          else if (!video.paused) { video.pause(); }
        });
      }, { rootMargin: '200px 0px' }).observe(video);
    }
    else { start(); }
    if (btn) btn.addEventListener('click', function () {
      if (video.paused) { video.play(); setBtn(false); } else { video.pause(); setBtn(true); }
    });
  });

  // ---------- scroll reveal ----------
  if (!reducedMotion && 'IntersectionObserver' in window) {
    var targets = document.querySelectorAll('.service-card, .experience-card, .quick-book-item, .faq-item, .gallery-item, .related-card');
    Array.prototype.forEach.call(targets, function (el) { el.classList.add('reveal'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    Array.prototype.forEach.call(targets, function (el) { io.observe(el); });
    // Anything already on screen when a tab panel is revealed later.
    document.addEventListener('click', function (e) {
      if (e.target.closest('[role="tab"]')) {
        setTimeout(function () { Array.prototype.forEach.call(document.querySelectorAll('.reveal:not(.is-visible)'), function (el) { if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-visible'); }); }, 30);
      }
    });
  }

  // ---------- gallery lightbox ----------
  var lb = document.getElementById('lightbox');
  if (lb) {
    var lbImg = document.getElementById('lightbox-img');
    var lightbox = makeDialog(lb, { closeSelector: '[data-lightbox-close]', initialFocus: '.lightbox-close', onClose: function () { lbImg.src = ''; lbImg.alt = ''; } });
    Array.prototype.forEach.call(document.querySelectorAll('[data-lightbox]'), function (btn) {
      btn.addEventListener('click', function () {
        lbImg.src = btn.getAttribute('data-lightbox');
        lbImg.alt = btn.getAttribute('data-alt') || '';
        lightbox.open();
      });
    });
  }

  // ---------- collapse long menu lists ----------
  Array.prototype.forEach.call(document.querySelectorAll('[data-collapse]'), function (list) {
    var limit = parseInt(list.getAttribute('data-collapse'), 10) || 8;
    var rows = Array.prototype.slice.call(list.querySelectorAll('.menu-row'));
    if (rows.length <= limit + 2) return;
    rows.slice(limit).forEach(function (r) { r.classList.add('is-extra'); });
    list.classList.add('is-collapsed');
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-outline btn-sm menu-expand';
    btn.setAttribute('aria-expanded', 'false');
    var label = list.getAttribute('data-label') || 'services';
    btn.textContent = 'Show all ' + rows.length + ' ' + label;
    list.insertAdjacentElement('afterend', btn);
    btn.addEventListener('click', function () {
      var open = list.classList.toggle('is-collapsed') === false;
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = open ? 'Show fewer ' + label : 'Show all ' + rows.length + ' ' + label;
      if (!open) list.scrollIntoView({ block: 'start' });
    });
  });

  // ---------- open tab from a hash like /services#waxing on the home page ----------
  function openTabForHash() {
    var id = location.hash.replace('#', '');
    if (!id) return;
    var tab = document.getElementById('tab-' + id);
    if (tab) { tab.click(); }
  }
  openTabForHash();
  window.addEventListener('hashchange', openTabForHash);
})();
