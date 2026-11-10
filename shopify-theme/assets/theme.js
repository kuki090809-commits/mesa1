(function () {
  'use strict';

  // Mobile nav toggle
  document.querySelectorAll('[data-mobile-nav-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var nav = document.getElementById(btn.getAttribute('aria-controls'));
      if (!nav) return;
      var isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isOpen));
      nav.hidden = isOpen;
    });
  });

  // Gallery thumbnail swap
  document.querySelectorAll('.product-gallery__thumb').forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      var main = document.getElementById('ProductMainImage');
      var src = thumb.getAttribute('data-full-src');
      if (main && src) main.src = src;
    });
  });

  // Quantity steppers
  document.querySelectorAll('.quantity-stepper').forEach(function (stepper) {
    var input = stepper.querySelector('[data-quantity-input]');
    var dec = stepper.querySelector('[data-quantity-decrease]');
    var inc = stepper.querySelector('[data-quantity-increase]');
    if (!input) return;
    dec && dec.addEventListener('click', function () {
      input.value = Math.max(1, (parseInt(input.value, 10) || 1) - 1);
    });
    inc && inc.addEventListener('click', function () {
      input.value = (parseInt(input.value, 10) || 1) + 1;
    });
  });

  // Variant picker: pills -> hidden id input, price, availability
  document.querySelectorAll('.product-form').forEach(function (form) {
    var dataScript = form.closest('section') && form.closest('section').querySelector('[data-variant-data]');
    if (!dataScript) return;

    var variants;
    try {
      variants = JSON.parse(dataScript.textContent);
    } catch (e) {
      return;
    }

    var idInput = form.querySelector('[data-variant-id-input]');
    var priceWrapper = form.closest('.product-info') && form.closest('.product-info').querySelector('[data-price-wrapper]');
    var savingsText = form.closest('.product-info') && form.closest('.product-info').querySelector('[data-savings-text]');
    var availabilityDot = form.querySelector('[data-availability-dot]');
    var availabilityText = form.querySelector('[data-availability-text]');
    var addButton = form.querySelector('[data-add-to-cart]');
    var addButtonText = form.querySelector('[data-add-to-cart-text]');

    var selected = {};
    form.querySelectorAll('.product-form__option').forEach(function (fieldset) {
      var index = fieldset.getAttribute('data-option-index');
      var current = fieldset.querySelector('.pill-option.is-selected');
      if (current) selected[index] = current.getAttribute('data-option-value');
    });

    function findVariant() {
      var values = Object.keys(selected).sort().map(function (k) { return selected[k]; });
      return variants.find(function (v) {
        return v.options.length === values.length && v.options.every(function (opt, i) {
          return opt === values[i];
        });
      });
    }

    function render() {
      var variant = findVariant();
      if (!variant) return;

      if (idInput) idInput.value = variant.id;

      if (priceWrapper) {
        var current = priceWrapper.querySelector('.price__current');
        var compareAt = priceWrapper.querySelector('.price__compare-at');
        var badge = priceWrapper.querySelector('.price__badge');
        if (current) current.textContent = variant.price;
        if (variant.compare_at) {
          if (!compareAt) {
            compareAt = document.createElement('span');
            compareAt.className = 'price__compare-at';
            priceWrapper.querySelector('.price').appendChild(compareAt);
          }
          compareAt.textContent = variant.compare_at;
        } else if (compareAt) {
          compareAt.remove();
        }
        if (badge) badge.remove();
      }

      if (savingsText) savingsText.hidden = !variant.compare_at;

      if (availabilityDot) availabilityDot.classList.toggle('is-unavailable', !variant.available);
      if (availabilityText) availabilityText.textContent = variant.available ? availabilityText.getAttribute('data-in-stock-label') || availabilityText.textContent : 'Agotado';
      if (addButton) addButton.disabled = !variant.available;
      if (addButtonText) addButtonText.textContent = variant.available ? addButtonText.getAttribute('data-add-label') || addButtonText.textContent : 'Agotado';
    }

    form.querySelectorAll('.pill-option').forEach(function (pill) {
      pill.addEventListener('click', function () {
        var fieldset = pill.closest('.product-form__option');
        var index = fieldset.getAttribute('data-option-index');
        fieldset.querySelectorAll('.pill-option').forEach(function (p) { p.classList.remove('is-selected'); });
        pill.classList.add('is-selected');
        selected[index] = pill.getAttribute('data-option-value');
        render();
      });
    });
  });
})();
