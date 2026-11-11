/* ==========================================================================
   ORDENA · interacciones (sin librerías externas)
   Cada función comprueba si su elemento existe, así el mismo archivo sirve
   en todas las páginas. Se reinicia cuando editas una sección en Shopify.
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Entradas al hacer scroll (un solo observador) ---------- */
  var revealObserver = null;
  function initReveal(root) {
    var items = (root || document).querySelectorAll('.or-reveal:not(.or-visible)');
    if (!items.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('or-visible'); });
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('or-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    }
    items.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- Cifras que cuentan ---------- */
  function initCifras(root) {
    var nums = (root || document).querySelectorAll('[data-or-contar]');
    if (!nums.length) return;
    function animate(el) {
      var final = parseFloat(el.getAttribute('data-or-contar')) || 0;
      var target = el.querySelector('.or-cifra__valor') || el;
      if (reduceMotion || final === 0) { target.textContent = formatNum(final); return; }
      var dur = parseInt(el.getAttribute('data-or-duracion'), 10) || 1600;
      var start = null;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 4);
        target.textContent = formatNum(Math.round(final * eased));
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    function formatNum(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
    if (!('IntersectionObserver' in window)) { nums.forEach(animate); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    nums.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Comparador antes / después ---------- */
  function initComparador(root) {
    (root || document).querySelectorAll('.or-comp').forEach(function (comp) {
      var range = comp.querySelector('.or-comp__rango');
      if (!range || range.dataset.orListo) return;
      range.dataset.orListo = '1';
      function update() { comp.style.setProperty('--pos', range.value + '%'); }
      range.addEventListener('input', update);
      update();
    });
  }

  /* ---------- Cómo funciona: el especiero gira con cada paso ---------- */
  function initPasos(root) {
    (root || document).querySelectorAll('[data-or-pasos]').forEach(function (wrap) {
      if (wrap.dataset.orListo) return;
      wrap.dataset.orListo = '1';
      var pasos = wrap.querySelectorAll('.or-paso');
      var ilu = wrap.querySelector('.or-ilu--cenital');
      var grados = parseFloat(wrap.getAttribute('data-or-grados')) || 120;
      if (!pasos.length) return;
      function activar(i) {
        pasos.forEach(function (p, j) { p.classList.toggle('is-activo', j === i); });
        if (ilu) ilu.style.setProperty('--or-giro', (-grados * i) + 'deg');
      }
      activar(0);
      if (!('IntersectionObserver' in window)) return;
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) activar(Array.prototype.indexOf.call(pasos, e.target));
        });
      }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
      pasos.forEach(function (p) { io.observe(p); });
    });
  }

  /* ---------- Parallax suave del hero ---------- */
  var parallaxEls = [];
  var ticking = false;
  function initParallax(root) {
    if (reduceMotion) return;
    (root || document).querySelectorAll('[data-or-parallax]').forEach(function (el) {
      if (parallaxEls.indexOf(el) === -1) parallaxEls.push(el);
    });
    if (!parallaxEls.length || initParallax.bound) return;
    initParallax.bound = true;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        parallaxEls.forEach(function (el) {
          if (!el.isConnected) return;
          var k = parseFloat(el.getAttribute('data-or-parallax')) || 0;
          var r = el.getBoundingClientRect();
          var center = r.top + r.height / 2 - window.innerHeight / 2;
          el.style.setProperty('--or-py', (center * -k / 100).toFixed(1) + 'px');
        });
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Galería de producto ---------- */
  function initGaleria(root) {
    (root || document).querySelectorAll('[data-or-galeria]').forEach(function (gal) {
      if (gal.dataset.orListo) return;
      gal.dataset.orListo = '1';
      var slides = gal.querySelectorAll('.or-galeria__slide');
      var minis = gal.querySelectorAll('.or-galeria__mini');
      function mostrar(id) {
        slides.forEach(function (s) { s.classList.toggle('is-activa', s.getAttribute('data-media-id') === id); });
        minis.forEach(function (m) {
          var on = m.getAttribute('data-media-id') === id;
          m.classList.toggle('is-activa', on);
          m.setAttribute('aria-current', on ? 'true' : 'false');
        });
      }
      minis.forEach(function (m) {
        m.addEventListener('click', function () { mostrar(m.getAttribute('data-media-id')); });
      });
      gal.addEventListener('or:media', function (e) { if (e.detail) mostrar(String(e.detail)); });
    });
  }

  /* ---------- Variantes de producto ---------- */
  function initVariantes(root) {
    (root || document).querySelectorAll('[data-or-producto]').forEach(function (box) {
      if (box.dataset.orListo) return;
      box.dataset.orListo = '1';
      var dataEl = box.querySelector('script[data-or-variantes]');
      if (!dataEl) return;
      var variantes;
      try { variantes = JSON.parse(dataEl.textContent); } catch (err) { return; }
      var inputs = box.querySelectorAll('.or-opcion input[type="radio"]');
      var idInputs = box.querySelectorAll('input[name="id"]');
      var precio = box.querySelector('[data-or-precio]');
      var tachado = box.querySelector('[data-or-tachado]');
      var ahorro = box.querySelector('[data-or-ahorro]');
      var botones = box.querySelectorAll('[data-or-boton-compra]');
      var textoAgotado = box.getAttribute('data-or-agotado') || 'Agotado';
      var textoComprar = box.getAttribute('data-or-comprar') || 'Añadir al carrito';
      var galeria = document.querySelector('[data-or-galeria]');

      function seleccion() {
        var sel = [];
        box.querySelectorAll('.or-opcion').forEach(function (fs) {
          var c = fs.querySelector('input:checked');
          sel.push(c ? c.value : null);
          var lbl = fs.querySelector('legend span');
          if (lbl && c) lbl.textContent = c.value;
        });
        return sel;
      }
      function update() {
        var sel = seleccion();
        var v = variantes.filter(function (x) {
          return x.options.every(function (o, i) { return o === sel[i]; });
        })[0];
        botones.forEach(function (b) {
          var t = b.querySelector('span') || b;
          if (!v || !v.available) {
            b.setAttribute('disabled', 'disabled');
            t.textContent = v ? textoAgotado : 'No disponible';
          } else {
            b.removeAttribute('disabled');
            t.textContent = textoComprar;
          }
        });
        if (!v) return;
        idInputs.forEach(function (i) { i.value = v.id; });
        if (precio) precio.textContent = v.price;
        if (tachado) { tachado.textContent = v.compare || ''; tachado.hidden = !v.compare; }
        if (ahorro) { ahorro.textContent = v.saving || ''; ahorro.hidden = !v.saving; }
        if (v.media && galeria) galeria.dispatchEvent(new CustomEvent('or:media', { detail: v.media }));
        if (window.history && window.history.replaceState) {
          var url = new URL(window.location.href);
          url.searchParams.set('variant', v.id);
          window.history.replaceState({}, '', url.toString());
        }
      }
      inputs.forEach(function (i) { i.addEventListener('change', update); });
    });
  }

  /* ---------- Selector de cantidad ---------- */
  function initCantidad(root) {
    (root || document).querySelectorAll('.or-cantidad').forEach(function (q) {
      if (q.dataset.orListo) return;
      q.dataset.orListo = '1';
      var input = q.querySelector('input');
      q.querySelectorAll('button[data-paso]').forEach(function (b) {
        b.addEventListener('click', function () {
          var v = (parseInt(input.value, 10) || 1) + parseInt(b.getAttribute('data-paso'), 10);
          input.value = Math.max(1, v);
          input.dispatchEvent(new Event('change', { bubbles: true }));
        });
      });
    });
  }

  function initAll(root) {
    initReveal(root);
    initCifras(root);
    initComparador(root);
    initPasos(root);
    initParallax(root);
    initGaleria(root);
    initVariantes(root);
    initCantidad(root);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { initAll(document); });
  } else {
    initAll(document);
  }
  document.addEventListener('shopify:section:load', function (e) { initAll(e.target); });
})();
