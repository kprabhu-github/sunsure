(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var html = document.documentElement;
  var RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };

  /* ---------- Curtain loader ---------- */
  var loader = $('#loader');
  function ready() {
    if (html.classList.contains('ready')) return;
    html.classList.add('ready');
    if (loader) {
      loader.classList.add('open');
      setTimeout(function () { if (loader.parentNode) loader.parentNode.removeChild(loader); }, 1600);
    }
  }
  if (RM) { ready(); }
  else {
    var started = false;
    var go = function () { if (started) return; started = true; setTimeout(ready, 1500); };
    if (document.readyState === 'complete') go(); else window.addEventListener('load', go);
    setTimeout(ready, 3800);
  }

  /* ---------- Scroll progress, header, parallax, badge ---------- */
  var prog = $('#prog'), nav = $('#nav'), heroImg = $('#heroImg'), opsBg = $('#opsBg'), badge = $('#badge');
  var ticking = false;
  function onScroll() {
    var y = window.pageYOffset, h = document.documentElement.scrollHeight - window.innerHeight;
    if (prog) prog.style.setProperty('--p', h > 0 ? (y / h).toFixed(4) : 0);
    if (nav) nav.classList.toggle('stuck', y > 40);
    if (!RM) {
      if (heroImg) heroImg.style.setProperty('--py', (y * 0.08).toFixed(1) + 'px');
      if (badge) badge.style.setProperty('--rot', (y * 0.18).toFixed(1) + 'deg');
      if (opsBg) {
        var r = opsBg.parentNode.getBoundingClientRect();
        if (r.bottom > 0 && r.top < window.innerHeight) opsBg.style.setProperty('--py', ((r.top + r.height / 2 - window.innerHeight / 2) * -0.12).toFixed(1) + 'px');
      }
    }
    fillWords();
    mbarState();
    sectionState();
    ticking = false;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener('resize', onScroll);

  /* ---------- Manifesto: words fill as you read ---------- */
  var mf = $('[data-fill]'), words = [];
  if (mf) {
    var txt = mf.textContent.trim().split(/\s+/);
    mf.textContent = '';
    txt.forEach(function (t, i) {
      var s = document.createElement('span'); s.className = 'w'; s.textContent = t; mf.appendChild(s);
      if (i < txt.length - 1) mf.appendChild(document.createTextNode(' '));
      words.push(s);
    });
  }
  function fillWords() {
    if (!words.length) return;
    if (RM) { words.forEach(function (w) { w.classList.add('on'); }); return; }
    var r = mf.getBoundingClientRect(), vh = window.innerHeight;
    var p = clamp((vh * 0.92 - r.top) / (r.height + vh * 0.28), 0, 1);
    var n = Math.round(p * words.length);
    words.forEach(function (w, i) { w.classList.toggle('on', i < n); });
  }

  /* ---------- Reveals ---------- */
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); if (e.target.dataset.count !== undefined) count(e.target); }
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' }) : null;
  $$('.rv, .time, .ledger, .dialwrap, .kicker').forEach(function (el) {
    if (io) io.observe(el); else el.classList.add('in');
  });
  $$('.ledger tbody tr').forEach(function (tr, i) { tr.style.setProperty('--n', i); tr.querySelector('.bar i') && tr.querySelector('.bar i').style.setProperty('--w', tr.style.getPropertyValue('--w')); });

  /* ---------- Count-up ---------- */
  var cio = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { run(e.target); cio.unobserve(e.target); } });
  }, { threshold: 0.6 }) : null;
  function count() {}
  function run(el) {
    if (RM) return;
    var to = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0), pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
    var t0 = null, dur = 1700;
    function step(t) {
      if (t0 === null) t0 = t;
      var k = clamp((t - t0) / dur, 0, 1), e = 1 - Math.pow(1 - k, 3);
      el.textContent = pre + (to * e).toFixed(dec) + suf;
      if (k < 1) requestAnimationFrame(step); else el.textContent = pre + to.toFixed(dec) + suf;
    }
    requestAnimationFrame(step);
  }
  $$('[data-count]').forEach(function (el) { if (cio) cio.observe(el); });

  /* ---------- Logo replay on masthead ---------- */
  var navMark = $('.nav .brand .mark');
  if (navMark && !RM) {
    setInterval(function () {
      navMark.classList.add('logo-play');
      setTimeout(function () { navMark.classList.remove('logo-play'); }, 1300);
    }, 8000);
  }

  /* ---------- Mobile menu ---------- */
  var burger = $('#burger'), menu = $('#menu');
  function setMenu(open) {
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) { var f = $('a', menu); f && f.focus(); }
  }
  burger.addEventListener('click', function () { setMenu(burger.getAttribute('aria-expanded') !== 'true'); });
  $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { if (burger.getAttribute('aria-expanded') === 'true') setMenu(false); }); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') { setMenu(false); burger.focus(); }
  });
  window.matchMedia('(min-width:821px)').addEventListener('change', function (m) { if (m.matches) setMenu(false); });

  /* ---------- Current section in nav ---------- */
  var secs = ['advantage', 'solutions', 'plan', 'projects', 'voices', 'hub'].map(function (id) { return document.getElementById(id); }).filter(Boolean);
  function sectionState() {
    var cur = null, mid = window.innerHeight * 0.4;
    secs.forEach(function (s) { var r = s.getBoundingClientRect(); if (r.top < mid && r.bottom > mid) cur = s.id; });
    $$('.menu a:not(.btn)').forEach(function (a) {
      if (a.getAttribute('href') === '#' + cur) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
  }

  /* ---------- Marquee pause ---------- */
  var mqBtn = $('#mqBtn'), mq = $('.marquee');
  mqBtn.addEventListener('click', function () {
    var p = mqBtn.getAttribute('aria-pressed') !== 'true';
    mqBtn.setAttribute('aria-pressed', p);
    mqBtn.setAttribute('aria-label', p ? 'Play customer scroll' : 'Pause customer scroll');
    mqBtn.textContent = p ? '▶' : '❚❚';
    mq.classList.toggle('paused', p);
  });

  /* ---------- 24-hour dial ---------- */
  var svg = $('#dialSvg'), NS = 'http://www.w3.org/2000/svg';
  var CX = 300, CY = 300, R0 = 128, R1 = 262;
  function mix(h) {
    h = ((h % 24) + 24) % 24;
    var s = Math.round(100 * Math.exp(-Math.pow((h - 12.5) / 3.4, 2)));
    if (s < 3) s = 0;
    var wf = 0.62 + 0.25 * Math.cos(2 * Math.PI * (h - 3) / 24);
    var w = Math.round((100 - s) * wf);
    return { s: s, w: w, b: 100 - s - w };
  }
  function theta(h) { return ((h - 12) / 24) * 2 * Math.PI - Math.PI / 2; }
  function pt(r, a) { return [CX + r * Math.cos(a), CY + r * Math.sin(a)]; }
  function sector(r0, r1, a0, a1) {
    var p1 = pt(r1, a0), p2 = pt(r1, a1), p3 = pt(r0, a1), p4 = pt(r0, a0);
    return 'M' + p1 + 'A' + r1 + ',' + r1 + ' 0 0 1 ' + p2 + 'L' + p3 + 'A' + r0 + ',' + r0 + ' 0 0 0 ' + p4 + 'Z';
  }
  function el(n, a, p) { var e = document.createElementNS(NS, n); for (var k in a) e.setAttribute(k, a[k]); (p || svg).appendChild(e); return e; }
  var bars = [], hand, sun;
  if (svg) {
    [R0 - 14, R1 + 14].forEach(function (r) { el('circle', { cx: CX, cy: CY, r: r, 'class': 'hr' }); });
    for (var i = 0; i < 24; i++) {
      var g = el('g', { 'class': 'bar' }), m = mix(i + 0.5), a0 = theta(i) + 0.012, a1 = theta(i + 1) - 0.012, L = R1 - R0;
      var rs = R0, parts = [[m.b, 'var(--store)'], [m.w, 'var(--wind)'], [m.s, 'var(--solar)']];
      parts.forEach(function (p) {
        if (p[0] <= 0) return;
        var len = L * p[0] / 100;
        el('path', { d: sector(rs, rs + len - 0.8, a0, a1), fill: p[1] }, g);
        rs += len;
      });
      bars.push(g);
    }
    [0, 6, 12, 18].forEach(function (h) {
      var p = pt(R1 + 40, theta(h)), t = el('text', { x: p[0], y: p[1] + 5, 'text-anchor': 'middle', 'class': 'lbl' });
      t.textContent = (h < 10 ? '0' : '') + h + ':00';
    });
    hand = el('line', { 'class': 'hand', x1: CX, y1: CY, x2: CX, y2: CY });
    sun = el('circle', { 'class': 'sun', r: 11, cx: CX, cy: CY });
  }
  var range = $('#rtcRange'), playBtn = $('#rtcPlay');
  var phases = [[5, 'Night'], [8, 'Dawn'], [11, 'Morning'], [14, 'Midday'], [17, 'Afternoon'], [20, 'Dusk'], [24, 'Evening']];
  function phase(h) { for (var i = 0; i < phases.length; i++) if (h < phases[i][0]) return phases[i][1]; return 'Night'; }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function setHour(h, fromUser) {
    h = clamp(h, 0, 24);
    var m = mix(h), hh = Math.floor(h) % 24, mm = Math.floor((h - Math.floor(h)) * 60);
    $('#rtcTime').textContent = pad(hh) + ':' + pad(mm);
    $('#rtcPhase').textContent = phase(h % 24);
    $('#mSolar').textContent = m.s + '%'; $('#mWind').textContent = m.w + '%'; $('#mStore').textContent = m.b + '%';
    if (svg) {
      var a = theta(h), p = pt(R1 + 14, a), q = pt(R0 - 14, a);
      hand.setAttribute('x1', q[0]); hand.setAttribute('y1', q[1]); hand.setAttribute('x2', p[0]); hand.setAttribute('y2', p[1]);
      sun.setAttribute('cx', p[0]); sun.setAttribute('cy', p[1]);
      bars.forEach(function (b, i) { b.classList.toggle('dim', i !== Math.floor(h) % 24); });
    }
    range.value = h;
    range.setAttribute('aria-valuetext', pad(hh) + ':' + pad(mm) + ', ' + phase(h % 24) + '. Solar ' + m.s + ' percent, wind ' + m.w + ' percent, storage ' + m.b + ' percent');
  }
  var playing = false, raf = null, last = 0;
  function tick(t) {
    if (!playing) return;
    if (!last) last = t;
    var dt = (t - last) / 1000; last = t;
    var h = parseFloat(range.value) + dt * 1.8;
    if (h >= 24) h = 0;
    setHour(h);
    raf = requestAnimationFrame(tick);
  }
  function setPlay(p) {
    playing = p; last = 0;
    playBtn.textContent = p ? '❚❚' : '▶';
    playBtn.setAttribute('aria-label', p ? 'Pause day cycle' : 'Play day cycle');
    if (p) raf = requestAnimationFrame(tick); else cancelAnimationFrame(raf);
  }
  if (svg) {
    setHour(12.5);
    range.addEventListener('input', function () { setPlay(false); setHour(parseFloat(range.value)); });
    playBtn.addEventListener('click', function () { setPlay(!playing); });
    var dw = $('.dialwrap');
    if (!RM && 'IntersectionObserver' in window) {
      var dio = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) { dio.disconnect(); setTimeout(function () { setHour(0); setPlay(true); }, 900); }
        });
      }, { threshold: 0.5 });
      dio.observe(dw);
    }
  }

  /* ---------- Solutions tabs (vertical) ---------- */
  var tabs = $$('.sol-list [role=tab]');
  function pickTab(t, focus) {
    tabs.forEach(function (x) {
      var on = x === t;
      x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1;
      var p = document.getElementById(x.getAttribute('aria-controls')); if (p) p.hidden = !on;
    });
    if (focus) t.focus();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { pickTab(t); });
    t.addEventListener('keydown', function (e) {
      var n = null;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
      else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
      else if (e.key === 'Home') n = tabs[0];
      else if (e.key === 'End') n = tabs[tabs.length - 1];
      if (n) { e.preventDefault(); pickTab(n, true); }
    });
  });
  // "Ask about ..." links prefill the enquiry
  $$('[data-pick]').forEach(function (a) {
    a.addEventListener('click', function () {
      var sel = $('#f-interest'), v = a.getAttribute('data-pick'), tmp = document.createElement('textarea');
      tmp.innerHTML = v; v = tmp.value;
      if (sel) sel.value = v;
    });
  });

  /* ---------- Plan your switch ---------- */
  var NEEDS = {
    'RTC Power': ['RTC Power', 'Solar, wind and storage combined with energy trading for a steady 24x7 renewable supply.'],
    'Open access PPA': ['Green Energy Open Access', 'Hybrid, solar or wind power purchase agreements under long-term contracts, with solar able to cover up to 100% of your consumption.'],
    'Energy Storage': ['Energy Storage', 'Battery systems that deliver power during non-generation hours.'],
    'RECs & Carbon Credits': ['RECs & Carbon Credits', 'Renewable Energy Certificates and carbon credits to meet RE100 and ESG goals.'],
    'Not sure yet': ['Not sure yet', 'Tell us about your site and load, and the team will recommend the right mix.']
  };
  var SECTORS = {
    'Pharma & healthcare': ['Emcure', 'Sandoz India', 'Lupin'],
    'FMCG & food': ['Dabur', "Haldiram's", 'Bisleri'],
    'Steel & metals': ['Jindal Stainless', 'APL Apollo'],
    'Building materials': ['Kajaria Ceramics', 'Merino Group'],
    'IT & data': ['Sify'],
    'Industrial gases & chemicals': ['Inox Air Products', 'Deepak Fertilizers'],
    'Other': []
  };
  var plan = { need: '', sector: '' };
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function renderPlan() {
    var out = $('#planOut'), h = '';
    if (!plan.need && !plan.sector) { out.innerHTML = '<p class="plan-empty">Choose an option above and a short summary appears here.</p>'; return; }
    if (plan.need) { var n = NEEDS[plan.need]; h += '<h3>' + esc(n[0]) + '</h3><p>' + esc(n[1]) + '</p>'; }
    if (plan.sector) {
      var c = SECTORS[plan.sector];
      h += '<p>' + (c.length ? 'In <b>' + esc(plan.sector) + '</b>, Sunsure already powers ' + esc(c.join(', ')) + '.' : 'Tell us about your industry in the form and the team will tailor the proposal.') + '</p>';
    }
    out.innerHTML = h;
  }
  $$('input[name=need],input[name=sector]').forEach(function (r) {
    r.addEventListener('change', function () { plan[r.name] = r.value; renderPlan(); });
  });
  function inr(n) {
    if (n >= 1e7) return '₹' + (n / 1e7).toFixed(2).replace(/\.?0+$/, '') + ' crore';
    if (n >= 1e5) return '₹' + (n / 1e5).toFixed(1).replace(/\.0$/, '') + ' lakh';
    return '₹' + Math.round(n).toLocaleString('en-IN');
  }
  var E = { load: $('#e-load'), grid: $('#e-grid'), green: $('#e-green'), share: $('#e-share') };
  function bad(inp, msg) {
    var f = inp.parentNode, e = $('.err', f);
    if (msg) { f.setAttribute('data-bad', ''); inp.setAttribute('aria-invalid', 'true'); e.textContent = msg; }
    else { f.removeAttribute('data-bad'); inp.removeAttribute('aria-invalid'); e.textContent = ''; }
  }
  var est = { ok: true, yr: 0 };
  function calc() {
    var load = parseFloat(E.load.value.replace(/,/g, '')), g = parseFloat(E.grid.value), gr = parseFloat(E.green.value), sh = +E.share.value / 100;
    $('#e-share-out').textContent = E.share.value + '%';
    var ok = true;
    if (!(load > 0)) { bad(E.load, 'Enter a number above zero.'); ok = false; } else bad(E.load, '');
    if (!(g > 0)) { bad(E.grid, 'Enter your current tariff.'); ok = false; } else bad(E.grid, '');
    if (!(gr > 0)) { bad(E.green, 'Enter the green tariff you expect.'); ok = false; } else bad(E.green, '');
    est.ok = ok;
    if (!ok) { $('#estYear').textContent = '—'; $('#estMonth').textContent = 'Fix the highlighted fields.'; return; }
    var mo = load * sh * (g - gr);
    if (mo <= 0) { est.yr = 0; $('#estYear').textContent = 'No saving'; $('#estMonth').textContent = 'The green tariff is not lower than your current tariff.'; return; }
    est.yr = mo * 12;
    $('#estYear').textContent = inr(mo * 12);
    $('#estMonth').textContent = 'about ' + inr(mo) + ' a month';
  }
  Object.keys(E).forEach(function (k) { E[k].addEventListener('input', calc); });
  calc();
  $('#planGo').addEventListener('click', function () {
    var parts = [];
    if (plan.need) { $('#f-interest').value = plan.need; parts.push(plan.need); }
    if (plan.sector) { $('#f-sector').value = plan.sector; parts.push(plan.sector); }
    if (est.ok && est.yr > 0) { $('#f-load').value = Number(E.load.value.replace(/,/g, '')).toLocaleString('en-IN') + ' kWh a month'; parts.push('consumption'); }
    $('#prefillNote').textContent = parts.length ? 'Filled in for you: ' + parts.join(', ') + '. Everything is editable.' : '';
    $('#contact').scrollIntoView({ behavior: RM ? 'auto' : 'smooth' });
    setTimeout(function () { $('#f-name').focus({ preventScroll: true }); }, RM ? 0 : 700);
  });

  /* ---------- Voices ---------- */
  var qs = $$('#voices-box blockquote'), qi = 0;
  function showQ(n) {
    qi = (n + qs.length) % qs.length;
    qs.forEach(function (q, i) { q.hidden = i !== qi; });
    $('#vCount').textContent = (qi + 1) + ' / ' + qs.length;
  }
  $('#vPrev').addEventListener('click', function () { showQ(qi - 1); });
  $('#vNext').addEventListener('click', function () { showQ(qi + 1); });

  /* ---------- Mobile bar ---------- */
  var mbar = $('#mbar'), contact = $('#contact'), inForm = false;
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { inForm = es[0].isIntersecting; mbarState(); }, { threshold: 0.12 }).observe(contact);
  function mbarState() {
    var show = window.pageYOffset > window.innerHeight * 0.8 && !inForm;
    mbar.classList.toggle('show', show);
  }

  /* ---------- Contact form ---------- */
  var form = $('#form'), note = $('#formNote');
  function fieldBad(inp, msg) {
    var f = inp.parentNode, e = $('.err', f);
    if (msg) { f.setAttribute('data-bad', ''); inp.setAttribute('aria-invalid', 'true'); e.textContent = msg; }
    else { f.removeAttribute('data-bad'); inp.removeAttribute('aria-invalid'); e.textContent = ''; }
    return !msg;
  }
  function validate() {
    var n = $('#f-name'), m = $('#f-email'), first = null;
    if (!fieldBad(n, n.value.trim() ? '' : 'Please enter your name.')) first = first || n;
    if (!fieldBad(m, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m.value.trim()) ? '' : 'Please enter a valid work email, for example name@company.com.')) first = first || m;
    return first;
  }
  ['f-name', 'f-email'].forEach(function (id) { $('#' + id).addEventListener('input', function () { if (this.getAttribute('aria-invalid')) validate(); }); });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var bad1 = validate();
    if (bad1) { note.textContent = 'Please fix the highlighted field.'; bad1.focus(); return; }
    var b = $('#submit'); b.setAttribute('aria-busy', 'true');
    var body = [
      'Name: ' + $('#f-name').value, 'Company: ' + $('#f-company').value, 'Email: ' + $('#f-email').value,
      'Monthly consumption: ' + $('#f-load').value, 'Interested in: ' + $('#f-interest').value, 'Industry: ' + $('#f-sector').value,
      est.ok && est.yr > 0 ? 'Self-estimate (illustrative): ' + inr(est.yr) + ' a year' : ''
    ].filter(Boolean).join('\n');
    setTimeout(function () {
      b.removeAttribute('aria-busy');
      note.textContent = 'Opening your email app with the enquiry. If nothing opens, write to marketing@sunsure.in.';
      window.location.href = 'mailto:marketing@sunsure.in?subject=' + encodeURIComponent('Enquiry from sunsure website') + '&body=' + encodeURIComponent(body);
    }, 600);
  });

  onScroll();
})();
