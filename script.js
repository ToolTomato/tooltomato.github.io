/* ===== ToolTomato shared script ===== */
(function () {

  /* Order below is deliberate — it's the site's tool priority ranking. */
  var tools = [
    { name: "Age Calculator", desc: "Find your exact age in years, months, days.", icon: "i-calendar", tint: "o", popular: true, trending: true },
    { name: "EMI Calculator", desc: "Calculate your monthly loan EMI with amortization chart.", icon: "i-wallet", tint: "p", popular: true },
    { name: "GST Calculator", desc: "Compute GST inclusive/exclusive amounts instantly.", icon: "i-rupee", tint: "o", popular: true },
    { name: "Percentage Calculator", desc: "Percentage of, increase/decrease, and reverse calc.", icon: "i-percent", tint: "p", popular: true },
    { name: "BMI Calculator", desc: "Check your Body Mass Index and health category.", icon: "i-heart", tint: "o" },
    { name: "Discount Calculator", desc: "Sale price after discount % or flat off.", icon: "i-percentoff", tint: "p" },
    { name: "SIP Calculator", desc: "Estimate mutual fund SIP returns over time.", icon: "i-trending", tint: "o" },
    { name: "Loan Calculator", desc: "Total interest, payment schedule for any loan.", icon: "i-bank", tint: "p" },
    { name: "JPG to PDF", desc: "Convert your images into PDF documents easily.", icon: "i-pdf", tint: "o" },
    { name: "PDF Compressor", desc: "Shrink PDF file size without losing quality.", icon: "i-compress", tint: "p" },
    { name: "Merge PDF", desc: "Combine multiple PDF files into one document.", icon: "i-merge", tint: "o" },
    { name: "Image Compressor", desc: "Reduce image file size while keeping good quality.", icon: "i-image", tint: "p" },
    { name: "Image Resizer", desc: "Resize images to your exact required dimensions.", icon: "i-ruler", tint: "o" },
    { name: "Word Counter", desc: "Count words, characters, and reading time instantly.", icon: "i-word", tint: "p" },
    { name: "QR Code Generator", desc: "Turn any link or text into a scannable QR code.", icon: "i-qr", tint: "o" }
  ];

  var categories = [
    { name: "Calculators", desc: "Numbers made simple", icon: "i-calc", tint: "o", count: "8 tools" },
    { name: "PDF Tools", desc: "Convert, compress, merge", icon: "i-pdf", tint: "p", count: "3 tools" },
    { name: "Image Tools", desc: "Compress and resize", icon: "i-image", tint: "o", count: "2 tools" },
    { name: "Utilities", desc: "Word count, QR codes", icon: "i-qr", tint: "p", count: "2 tools" }
  ];

  function cardHTML(t) {
    return '<a href="#" class="tool-card' + (t.trending ? ' trending' : '') + '" data-name="' + t.name.toLowerCase() + ' ' + t.desc.toLowerCase() + '">' +
      '<div class="tool-top">' +
        '<div class="tool-icon ' + t.tint + '"><svg class="icon"><use href="#' + t.icon + '"/></svg></div>' +
        '<svg class="icon go-arrow"><use href="#i-arrow"/></svg>' +
      '</div>' +
      '<h3>' + t.name + '</h3>' +
      '<p>' + t.desc + '</p>' +
    '</a>';
  }

  function categoryHTML(c) {
    return '<a href="index.html#tools" class="category">' +
      '<div class="tool-icon ' + c.tint + '"><svg class="icon"><use href="#' + c.icon + '"/></svg></div>' +
      '<div class="category-body">' +
        '<div class="category-title"><strong>' + c.name + '</strong></div>' +
        '<p>' + c.desc + '</p>' +
      '</div>' +
      (c.count ? '<span class="category-count">' + c.count + '</span>' : '') +
    '</a>';
  }

  var popularGrid = document.getElementById('popularGrid');
  var allGrid = document.getElementById('allGrid');
  var categoryList = document.getElementById('categoryList');

  if (popularGrid) popularGrid.innerHTML = tools.filter(function (t) { return t.popular; }).map(cardHTML).join('');
  if (allGrid) allGrid.innerHTML = tools.map(cardHTML).join('');
  if (categoryList) categoryList.innerHTML = categories.map(categoryHTML).join('');

  var input = document.getElementById('toolSearch');
  var empty = document.getElementById('emptyState');
  var toolsSection = document.getElementById('tools');

  if (input && allGrid) {
    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      var cards = allGrid.querySelectorAll('.tool-card');
      var visible = 0;
      cards.forEach(function (card) {
        var show = card.getAttribute('data-name').indexOf(q) !== -1;
        card.classList.toggle('hidden', !show);
        if (show) visible++;
      });
      if (empty) empty.classList.toggle('show', visible === 0);
      if (toolsSection) toolsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  /* ===== Footer year ===== */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ===== Cookie consent banner ===== */
  var COOKIE_NAME = 'tb_cookie_consent';

  function getCookie(name) {
    var match = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return match ? decodeURIComponent(match.pop()) : '';
  }

  function setCookie(name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + d.toUTCString() + ';path=/;SameSite=Lax';
  }

  var banner = document.getElementById('cookieBanner');
  if (banner) {
    if (!getCookie(COOKIE_NAME)) {
      window.setTimeout(function () { banner.classList.add('show'); }, 400);
    }
    var acceptBtn = document.getElementById('cookieAccept');
    var declineBtn = document.getElementById('cookieDecline');
    if (acceptBtn) acceptBtn.addEventListener('click', function () {
      setCookie(COOKIE_NAME, 'accepted', 180);
      banner.classList.remove('show');
    });
    if (declineBtn) declineBtn.addEventListener('click', function () {
      setCookie(COOKIE_NAME, 'declined', 180);
      banner.classList.remove('show');
    });
  }

})();
