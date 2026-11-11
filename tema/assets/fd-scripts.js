/* ==========================================================================
   FLEXIDESK · interacciones (sin librerías externas)
   Cada función comprueba si su elemento existe, así el mismo archivo sirve
   en todas las páginas. Se reinicia cuando editas una sección en Shopify.
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Entradas al hacer scroll (un solo observador) ---------- */
  var revealObserver = null;
  function initReveal(root) {
    var items = (root || document).querySelectorAll('.fd-reveal:not(.fd-visible)');
    if (!items.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('fd-visible'); });
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('fd-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    }
    items.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- Cifras que cuentan ---------- */
  function initCifras(root) {
    var nums = (root || document).querySelectorAll('[data-fd-contar]');
    if (!nums.length) return;
    function animate(el) {
      var final = parseFloat(el.getAttribute('data-fd-contar')) || 0;
      var target = el.querySelector('.fd-cifra__valor') || el;
      if (reduceMotion || final === 0) { target.textContent = formatNum(final); return; }
      var dur = parseInt(el.getAttribute('data-fd-duracion'), 10) || 1600;
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
    (root || document).querySelectorAll('.fd-comp').forEach(function (comp) {
      var range = comp.querySelector('.fd-comp__rango');
      if (!range || range.dataset.fdListo) return;
      range.dataset.fdListo = '1';
      function update() { comp.style.setProperty('--pos', range.value + '%'); }
      range.addEventListener('input', update);
      update();
    });
  }

  /* ---------- Altura: la mesa sube y baja con el deslizador ---------- */
  function initAltura(root) {
    (root || document).querySelectorAll('[data-fd-altura]').forEach(function (box) {
      if (box.dataset.fdListo) return;
      box.dataset.fdListo = '1';
      var range = box.querySelector('.fd-altura__rango');
      var sube = box.querySelector('.fd-altura__sube');
      if (!range) return;
      var min = parseFloat(box.getAttribute('data-min')) || 60;
      var max = parseFloat(box.getAttribute('data-max')) || 90;
      var u1 = parseFloat(box.getAttribute('data-umbral1')) || 70;
      var u2 = parseFloat(box.getAttribute('data-umbral2')) || 80;
      var lectura = box.querySelectorAll('[data-fd-cm]');
      var etiqueta = box.querySelector('[data-fd-cm-svg]');
      var pistas = box.querySelectorAll('[data-fd-pista]');
      function update() {
        var v = parseFloat(range.value);
        var pct = (v - min) / (max - min);
        range.style.setProperty('--fd-pct', (pct * 100).toFixed(1) + '%');
        if (sube) sube.style.setProperty('--fd-dy', (-135 * pct).toFixed(1) + 'px');
        lectura.forEach(function (el) { el.textContent = Math.round(v); });
        if (etiqueta) etiqueta.textContent = Math.round(v) + ' cm';
        var nivel = v < u1 ? '1' : (v < u2 ? '2' : '3');
        pistas.forEach(function (p) { p.hidden = p.getAttribute('data-fd-pista') !== nivel; });
      }
      range.addEventListener('input', update);
      update();
    });
  }

  /* ---------- Barra de compra fija ---------- */
  var barraBound = false;
  function initBarra() {
    var barra = document.querySelector('[data-fd-barra]');
    if (!barra || barraBound) return;
    barraBound = true;
    var ancla = document.querySelector('[data-fd-ancla-barra]');
    var pie = document.querySelector('footer, .fd-footer');
    var pasadoAncla = false;
    var enPie = false;
    function pintar() {
      var ver = pasadoAncla && !enPie;
      barra.classList.toggle('is-visible', ver);
      if (ver) barra.removeAttribute('inert'); else barra.setAttribute('inert', '');
    }
    if (!('IntersectionObserver' in window)) { pasadoAncla = true; pintar(); return; }
    if (ancla) {
      new IntersectionObserver(function (e) {
        pasadoAncla = !e[0].isIntersecting && e[0].boundingClientRect.top < 0;
        pintar();
      }, { threshold: 0 }).observe(ancla);
    } else {
      window.addEventListener('scroll', function () { pasadoAncla = window.scrollY > 600; pintar(); }, { passive: true });
    }
    if (pie) {
      new IntersectionObserver(function (e) { enPie = e[0].isIntersecting; pintar(); }, { threshold: 0 }).observe(pie);
    }
  }

  /* ---------- Parallax suave del hero ---------- */
  var parallaxEls = [];
  var ticking = false;
  function initParallax(root) {
    if (reduceMotion) return;
    (root || document).querySelectorAll('[data-fd-parallax]').forEach(function (el) {
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
          var k = parseFloat(el.getAttribute('data-fd-parallax')) || 0;
          var r = el.getBoundingClientRect();
          var center = r.top + r.height / 2 - window.innerHeight / 2;
          el.style.setProperty('--fd-py', (center * -k / 100).toFixed(1) + 'px');
        });
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Galería de producto ---------- */
  function initGaleria(root) {
    (root || document).querySelectorAll('[data-fd-galeria]').forEach(function (gal) {
      if (gal.dataset.fdListo) return;
      gal.dataset.fdListo = '1';
      var slides = gal.querySelectorAll('.fd-galeria__slide');
      var minis = gal.querySelectorAll('.fd-galeria__mini');
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
      gal.addEventListener('fd:media', function (e) { if (e.detail) mostrar(String(e.detail)); });
    });
  }

  /* ---------- Variantes de producto ---------- */
  function initVariantes(root) {
    (root || document).querySelectorAll('[data-fd-producto]').forEach(function (box) {
      if (box.dataset.fdListo) return;
      box.dataset.fdListo = '1';
      var dataEl = box.querySelector('script[data-fd-variantes]');
      if (!dataEl) return;
      var variantes;
      try { variantes = JSON.parse(dataEl.textContent); } catch (err) { return; }
      var inputs = box.querySelectorAll('.fd-opcion input[type="radio"]');
      var idInputs = box.querySelectorAll('input[name="id"]');
      var precio = box.querySelector('[data-fd-precio]');
      var tachado = box.querySelector('[data-fd-tachado]');
      var ahorro = box.querySelector('[data-fd-ahorro]');
      var botones = box.querySelectorAll('[data-fd-boton-compra]');
      var textoAgotado = box.getAttribute('data-fd-agotado') || 'Agotado';
      var textoComprar = box.getAttribute('data-fd-comprar') || 'Añadir al carrito';
      var galeria = document.querySelector('[data-fd-galeria]');

      function seleccion() {
        var sel = [];
        box.querySelectorAll('.fd-opcion').forEach(function (fs) {
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
        if (v.media && galeria) galeria.dispatchEvent(new CustomEvent('fd:media', { detail: v.media }));
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
    (root || document).querySelectorAll('.fd-cantidad').forEach(function (q) {
      if (q.dataset.fdListo) return;
      q.dataset.fdListo = '1';
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
    initAltura(root);
    initBarra();
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

  /* ---------- Enlace «Preferencias de cookies» (panel de Shopify) ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-fd-cookies]');
    if (!a) return;
    if (window.privacyBanner && typeof window.privacyBanner.showPreferences === 'function') {
      e.preventDefault();
      window.privacyBanner.showPreferences();
    }
  });
})();
