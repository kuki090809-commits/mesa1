/* MAISON DUVAL · interacciones (sin librerías). Cada función comprueba si su elemento existe. */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Aparición suave al hacer scroll ---------- */
  var io = null;
  function initReveal(root) {
    var els = (root || document).querySelectorAll('.md-reveal:not(.md-visible)');
    if (!els.length) return;
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('md-visible'); });
      return;
    }
    if (!io) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('md-visible'); io.unobserve(e.target); }
        });
      }, { rootMargin: '0px 0px -6% 0px', threshold: 0.1 });
    }
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Cookies: API de privacidad de Shopify ---------- */
  function conApi(cb) {
    if (window.Shopify && window.Shopify.customerPrivacy) { cb(window.Shopify.customerPrivacy); return; }
    if (window.Shopify && typeof window.Shopify.loadFeatures === 'function') {
      window.Shopify.loadFeatures([{ name: 'consent-tracking-api', version: '0.1' }], function (err) {
        if (!err && window.Shopify.customerPrivacy) cb(window.Shopify.customerPrivacy);
      });
    }
  }
  function initCookies() {
    var box = document.querySelector('[data-md-cookies]');
    if (!box || box.dataset.mdListo) return;
    box.dataset.mdListo = '1';
    var inicio = box.querySelector('[data-md-cookies-inicio]');
    var form = box.querySelector('[data-md-cookies-form]');
    var btnConfig = box.querySelector('[data-md-cookies-configurar]');

    function abrir(config) {
      box.hidden = false;
      if (config) mostrarConfig();
      var foco = box.querySelector(config ? 'input[name="preferences"]' : '[data-md-cookies-aceptar]');
      if (foco) foco.focus({ preventScroll: true });
    }
    function cerrar() { box.hidden = true; }
    function mostrarConfig() {
      form.hidden = false;
      inicio.hidden = true;
      if (btnConfig) btnConfig.setAttribute('aria-expanded', 'true');
    }
    function guardar(c) {
      conApi(function (cp) {
        cp.setTrackingConsent({
          analytics: c.analytics,
          marketing: c.marketing,
          preferences: c.preferences,
          sale_of_data: c.marketing
        }, function () {});
      });
      cerrar();
    }
    box.querySelectorAll('[data-md-cookies-aceptar]').forEach(function (b) {
      b.addEventListener('click', function () { guardar({ analytics: true, marketing: true, preferences: true }); });
    });
    box.querySelectorAll('[data-md-cookies-rechazar]').forEach(function (b) {
      b.addEventListener('click', function () { guardar({ analytics: false, marketing: false, preferences: false }); });
    });
    if (btnConfig) btnConfig.addEventListener('click', mostrarConfig);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      guardar({
        analytics: form.elements.analytics.checked,
        marketing: form.elements.marketing.checked,
        preferences: form.elements.preferences.checked
      });
    });
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('[data-md-cookies-abrir]');
      if (!a) return;
      e.preventDefault();
      conApi(function (cp) { rellenar(cp); });
      abrir(true);
    });
    function rellenar(cp) {
      var c = cp.currentVisitorConsent ? cp.currentVisitorConsent() : null;
      if (!c) return;
      form.elements.analytics.checked = c.analytics === 'yes';
      form.elements.marketing.checked = c.marketing === 'yes';
      form.elements.preferences.checked = c.preferences === 'yes';
    }
    conApi(function (cp) {
      var c = cp.currentVisitorConsent ? cp.currentVisitorConsent() : null;
      var sinDecidir = !c || (c.analytics === '' && c.marketing === '' && c.preferences === '');
      if (sinDecidir) abrir(false);
      rellenar(cp);
    });
  }

  /* ---------- Recomendaciones en la página del carrito ---------- */
  function initRecomendaciones(root) {
    (root || document).querySelectorAll('[data-md-recos]').forEach(function (el) {
      if (el.dataset.mdListo) return;
      el.dataset.mdListo = '1';
      var url = el.getAttribute('data-url');
      if (!url) return;
      fetch(url)
        .then(function (r) { return r.text(); })
        .then(function (html) {
          var tmp = document.createElement('div');
          tmp.innerHTML = html;
          var nuevo = tmp.querySelector('[data-md-recos]');
          if (nuevo && nuevo.querySelector('.grid__item')) {
            el.innerHTML = nuevo.innerHTML;
            el.hidden = false;
          }
        })
        .catch(function () {});
    });
  }

  function initAll(root) {
    initReveal(root);
    initCookies();
    initRecomendaciones(root);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { initAll(document); });
  } else {
    initAll(document);
  }
  document.addEventListener('shopify:section:load', function (e) { initAll(e.target); });
})();
