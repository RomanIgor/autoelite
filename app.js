/* ═══════════════════════════════════════
   AUTOELITE — app.js
   Theme · Cars · Filter · Modal · Forms · EmailJS
═══════════════════════════════════════ */

// ── EMAILJS CONFIG ──────────────────────────────────────────
// 1. Mergi pe https://www.emailjs.com si creaza cont gratuit
// 2. Adauga serviciul Gmail (Settings > Email Services)
// 3. Creaza 2 templates (unul pentru contact, unul pentru B2B)
// 4. Inlocuieste valorile de mai jos cu ale tale
const EMAILJS_CONFIG = {
  publicKey:        'YOUR_PUBLIC_KEY',      // Account > API Keys
  serviceId:        'YOUR_SERVICE_ID',      // Email Services > Service ID
  templateContact:  'template_contact',     // Email Templates > Template ID
  templateB2B:      'template_b2b',         // Email Templates > Template ID
};

// ── CAR DATA ────────────────────────────────────────────────
let all = [
  {
    id: 1, marke: 'BMW', modell: '5er 530d M Sport', jahr: 2022, km: 28000,
    kraft: 'Diesel', getriebe: 'Automatik', ps: 286, preis: 52900,
    status: 'Verfügbar', badge: 'TOP',
    desc: 'Volles M Sport Paket, Panoramadach, Head-up Display, belüftete Sportsitze. Vollständige BMW-Servicehistorie, unfallfrei, Scheckheft lückenlos.',
    img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=960&q=85&fit=crop'
  },
  {
    id: 2, marke: 'Mercedes', modell: 'GLE 400d 4MATIC', jahr: 2021, km: 41000,
    kraft: 'Diesel', getriebe: 'Automatik', ps: 330, preis: 79500,
    status: 'Verfügbar', badge: 'NEU',
    desc: 'AMG Line Exterieur & Interieur, Luftfederung, Hinterachslenkung, MBUX Widescreen-Cockpit. Night-Paket, Panoramadach, 21 Zoll AMG-Felgen.',
    img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=960&q=85&fit=crop'
  },
  {
    id: 3, marke: 'Audi', modell: 'A6 Allroad 55 TDI', jahr: 2023, km: 12000,
    kraft: 'Diesel', getriebe: 'Automatik', ps: 349, preis: 88000,
    status: 'Reserviert', badge: null,
    desc: 'S-Line Paket, Bang & Olufsen 3D Sound, Matrix-LED, Luftfederung, Virtual Cockpit Pro. Nur 12.000 km, nahezu neuwertig.',
    img: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=960&q=85&fit=crop'
  },
  {
    id: 4, marke: 'Porsche', modell: 'Macan GTS', jahr: 2023, km: 8500,
    kraft: 'Benzin', getriebe: 'Automatik', ps: 440, preis: 115000,
    status: 'Verfügbar', badge: 'PREMIUM',
    desc: 'Sport Design Paket, Bose Surround Sound, PDLS+ Matrix-LED, Porsche Surface Coated Bremsen. 8.500 km — wie aus dem Showroom.',
    img: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=960&q=85&fit=crop'
  },
  {
    id: 5, marke: 'Volkswagen', modell: 'Golf R 2.0 TSI', jahr: 2022, km: 19000,
    kraft: 'Benzin', getriebe: 'Automatik', ps: 320, preis: 42500,
    status: 'Verfügbar', badge: null,
    desc: '4MOTION Allradantrieb, Akrapovič Sportauspuff, Harman Kardon Soundsystem, IQ.LIGHT LED-Matrix. Garantie noch aktiv.',
    img: 'https://images.unsplash.com/photo-1471444928139-48c5bf5173f8?w=960&q=85&fit=crop'
  },
  {
    id: 6, marke: 'BMW', modell: 'X5 M50d', jahr: 2021, km: 55000,
    kraft: 'Diesel', getriebe: 'Automatik', ps: 400, preis: 74900,
    status: 'Verfügbar', badge: null,
    desc: 'M Sport Pro Paket, BMW Laserlight, Bowers & Wilkins Diamond Surround, Sky Lounge LED-Panoramadach. Vollausstattung.',
    img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=960&q=85&fit=crop'
  },
];

let shown = [...all];

// ── THEME ────────────────────────────────────────────────────
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  const next = isDark ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('ae-theme', next);
}

function initTheme() {
  const saved = localStorage.getItem('ae-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
}

// ── RENDER GRID ──────────────────────────────────────────────
function renderGrid(list) {
  document.getElementById('carCountNum').textContent = list.length;
  const grid = document.getElementById('carsGrid');

  if (!list.length) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:80px 20px;color:var(--text2)">
        <div style="font-family:var(--font-h);font-size:32px;margin-bottom:10px;color:var(--text)">Keine Fahrzeuge gefunden</div>
        <div style="font-size:15px">Bitte passen Sie die Suchfilter an.</div>
      </div>`;
    return;
  }

  grid.innerHTML = list.map(c => {
    const dotCls = c.status === 'Verfügbar' ? 'dot-green'
                 : c.status === 'Reserviert' ? 'dot-amber' : 'dot-red';
    return `
    <div class="car-card" onclick="openModal(${c.id})">
      <div class="car-img-wrap">
        <img src="${c.img}" alt="${c.marke} ${c.modell}" loading="lazy"
          onerror="this.outerHTML='<div class=car-img-skeleton style=height:100%;min-height:220px>🚗</div>'">
        <div class="car-img-overlay"></div>
        <div class="car-badge-wrap">
          ${c.badge ? `<span class="badge badge-gold">${c.badge}</span>` : ''}
          <span class="badge badge-gray">${c.kraft}</span>
        </div>
        <div class="car-status-dot">
          <div class="dot ${dotCls}"></div>${c.status}
        </div>
      </div>
      <div class="car-body">
        <div class="car-header">
          <div>
            <div class="car-make">${c.marke}</div>
            <div class="car-model">${c.modell}</div>
            <div class="car-year">${c.jahr}</div>
          </div>
          <div class="car-price-wrap">
            <div class="car-price">${c.preis.toLocaleString('de-DE')} €</div>
            <div class="car-price-vat">inkl. MwSt.</div>
          </div>
        </div>
        <div class="car-specs-row">
          <div class="spec-item"><div class="spec-val">${c.km.toLocaleString('de-DE')}</div><div class="spec-key">km</div></div>
          <div class="spec-item"><div class="spec-val">${c.ps} PS</div><div class="spec-key">Leistung</div></div>
          <div class="spec-item"><div class="spec-val">${c.getriebe === 'Automatik' ? 'Auto' : 'Schalter'}</div><div class="spec-key">Getriebe</div></div>
          <div class="spec-item"><div class="spec-val">${c.jahr}</div><div class="spec-key">Baujahr</div></div>
        </div>
        <div class="car-footer-row">
          <div class="car-features">
            <span class="feature-tag">✓ Geprüft</span>
            <span class="feature-tag">✓ 12M Garantie</span>
          </div>
          <button class="btn-card">Details →</button>
        </div>
      </div>
    </div>`;
  }).join('');

  // Populate contact form dropdown with available cars
  const sel = document.getElementById('formVehicle');
  if (sel) {
    sel.innerHTML = '<option value="">— Fahrzeug auswählen —</option>' +
      all.filter(c => c.status === 'Verfügbar')
         .map(c => `<option>${c.marke} ${c.modell} (${c.jahr}) · ${c.preis.toLocaleString('de-DE')} €</option>`)
         .join('');
  }
}

// ── ADMIN TABLE ──────────────────────────────────────────────
function renderAdmin() {
  document.getElementById('adminBody').innerHTML = all.map(c => {
    const pillCls = c.status === 'Verfügbar' ? 'pill-green'
                  : c.status === 'Reserviert' ? 'pill-amber' : 'pill-red';
    return `
    <tr>
      <td><strong style="color:var(--text)">${c.marke} ${c.modell}</strong></td>
      <td>${c.jahr}</td>
      <td>${c.km.toLocaleString('de-DE')} km</td>
      <td>${c.kraft}</td>
      <td style="color:var(--gold);font-weight:600">${c.preis.toLocaleString('de-DE')} €</td>
      <td><span class="status-pill ${pillCls}">${c.status}</span></td>
      <td>
        <button class="tbl-btn" onclick="cycleStatus(${c.id})">Status</button>
        <button class="tbl-btn del" onclick="deleteCar(${c.id})">Löschen</button>
      </td>
    </tr>`;
  }).join('');
}

// ── FILTER ───────────────────────────────────────────────────
function doFilter() {
  const m = document.getElementById('fMarke').value;
  const j = parseInt(document.getElementById('fJahr').value) || 0;
  const p = parseInt(document.getElementById('fPreis').value) || Infinity;
  const k = document.getElementById('fKraft').value;
  const g = document.getElementById('fGetriebe').value;

  shown = all.filter(c =>
    (!m || c.marke === m) &&
    (!j || c.jahr >= j) &&
    (c.preis <= p) &&
    (!k || c.kraft === k) &&
    (!g || c.getriebe === g)
  );
  renderGrid(shown);
}

// ── MODAL ────────────────────────────────────────────────────
function openModal(id) {
  const c = all.find(x => x.id === id);
  if (!c) return;

  document.getElementById('modalImg').src = c.img;
  document.getElementById('modalImg').alt = `${c.marke} ${c.modell}`;
  document.getElementById('mMarke').textContent = c.marke;
  document.getElementById('mModell').textContent = c.modell;
  document.getElementById('mPreis').textContent = c.preis.toLocaleString('de-DE') + ' €';
  document.getElementById('mDesc').textContent = c.desc;

  const specs = [
    { k: 'Baujahr',      v: c.jahr },
    { k: 'Laufleistung', v: c.km.toLocaleString('de-DE') + ' km' },
    { k: 'Leistung',     v: c.ps + ' PS' },
    { k: 'Kraftstoff',   v: c.kraft },
    { k: 'Getriebe',     v: c.getriebe },
    { k: 'Status',       v: c.status },
  ];
  document.getElementById('mSpecs').innerHTML = specs
    .map(s => `<div class="modal-spec"><div class="modal-spec-val">${s.v}</div><div class="modal-spec-key">${s.k}</div></div>`)
    .join('');

  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function closeModalOuter(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
}

// ── CONTACT FORM + EMAILJS ───────────────────────────────────
function submitContact(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-submit');
  btn.textContent = 'Wird gesendet...';
  btn.disabled = true;

  const params = {
    from_name:  (document.getElementById('cVorname').value + ' ' + document.getElementById('cNachname').value).trim(),
    from_email: document.getElementById('cEmail').value,
    phone:      document.getElementById('cTel').value,
    vehicle:    document.getElementById('formVehicle').value || 'Nicht angegeben',
    message:    document.getElementById('cNachricht').value || '—',
    to_email:   'info@autoelite-berlin.de',
  };

  if (EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY') {
    // Demo mode — no real sending
    setTimeout(() => {
      showToast('✓ Anfrage gesendet! Wir melden uns innerhalb von 24h.');
      e.target.reset();
      btn.textContent = 'Anfrage kostenlos absenden';
      btn.disabled = false;
    }, 1000);
    return;
  }

  emailjs.init(EMAILJS_CONFIG.publicKey);
  emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateContact, params)
    .then(() => {
      showToast('✓ Anfrage gesendet! Wir melden uns innerhalb von 24h.');
      e.target.reset();
    })
    .catch(err => {
      console.error('EmailJS error:', err);
      showToast('⚠ Fehler beim Senden. Bitte rufen Sie uns an.');
    })
    .finally(() => {
      btn.innerHTML = 'Anfrage kostenlos absenden <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
      btn.disabled = false;
    });
}

// ── B2B FORM + EMAILJS ───────────────────────────────────────
function submitB2B(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-submit');
  btn.textContent = 'Wird gesendet...';
  btn.disabled = true;

  const params = {
    company:    document.getElementById('b2bFirma').value,
    from_name:  document.getElementById('b2bName').value,
    from_email: document.getElementById('b2bEmail').value,
    phone:      document.getElementById('b2bTel').value,
    quantity:   document.getElementById('b2bAnzahl').value,
    type:       document.getElementById('b2bTyp').value,
    message:    document.getElementById('b2bNachricht').value || '—',
    to_email:   'info@autoelite-berlin.de',
  };

  if (EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY') {
    setTimeout(() => {
      showToast('✓ Bewertungsanfrage gesendet! Wir melden uns innerhalb von 24h.');
      e.target.reset();
      btn.textContent = 'Kostenlose Bewertung anfordern';
      btn.disabled = false;
    }, 1000);
    return;
  }

  emailjs.init(EMAILJS_CONFIG.publicKey);
  emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateB2B, params)
    .then(() => {
      showToast('✓ Bewertungsanfrage gesendet! Wir melden uns innerhalb von 24h.');
      e.target.reset();
    })
    .catch(err => {
      console.error('EmailJS error:', err);
      showToast('⚠ Fehler beim Senden. Bitte rufen Sie uns an.');
    })
    .finally(() => {
      btn.innerHTML = 'Kostenlose Bewertung anfordern <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
      btn.disabled = false;
    });
}

// ── ADMIN ACTIONS ────────────────────────────────────────────
function toggleAddForm() {
  document.getElementById('addForm').classList.toggle('open');
}

function addCar() {
  const marke  = document.getElementById('aMarke').value.trim();
  const modell = document.getElementById('aModell').value.trim();
  const jahr   = parseInt(document.getElementById('aJahr').value);
  const preis  = parseInt(document.getElementById('aPreis').value);

  if (!marke || !modell || !jahr || !preis) {
    showToast('⚠ Bitte alle Pflichtfelder ausfüllen.');
    return;
  }

  all.push({
    id:       Date.now(),
    marke, modell, jahr,
    km:       parseInt(document.getElementById('aKm').value)  || 0,
    ps:       parseInt(document.getElementById('aPS').value)  || 0,
    kraft:    document.getElementById('aKraft').value,
    getriebe: document.getElementById('aGetriebe').value,
    preis, badge: null,
    status:   document.getElementById('aStatus').value,
    desc:     document.getElementById('aDesc').value || 'Details auf Anfrage.',
    img:      document.getElementById('aImg').value  || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=960&q=85&fit=crop',
  });

  shown = [...all];
  renderGrid(shown);
  renderAdmin();
  toggleAddForm();
  showToast('✓ Fahrzeug erfolgreich hinzugefügt!');
  ['aMarke','aModell','aJahr','aKm','aPS','aPreis','aDesc','aImg'].forEach(id => {
    document.getElementById(id).value = '';
  });
}

function deleteCar(id) {
  if (!confirm('Fahrzeug wirklich löschen?')) return;
  all   = all.filter(c => c.id !== id);
  shown = shown.filter(c => c.id !== id);
  renderGrid(shown);
  renderAdmin();
  showToast('Fahrzeug entfernt.');
}

function cycleStatus(id) {
  const c = all.find(x => x.id === id);
  const s = ['Verfügbar', 'Reserviert', 'Verkauft'];
  c.status = s[(s.indexOf(c.status) + 1) % 3];
  renderGrid(shown);
  renderAdmin();
  showToast('Status aktualisiert: ' + c.status);
}

// ── MOBILE MENU ──────────────────────────────────────────────
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const btn  = document.getElementById('hamburger');
  menu.classList.toggle('open');
  btn.classList.toggle('open');
  document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
}

function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
  document.body.style.overflow = '';
}

// ── SCROLL HELPERS ───────────────────────────────────────────
function scrollToKontakt() {
  document.getElementById('kontakt').scrollIntoView({ behavior: 'smooth' });
}

// ── TOAST ────────────────────────────────────────────────────
function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

// ── NAV SCROLL ───────────────────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
});

// ── INIT ─────────────────────────────────────────────────────
window.addEventListener('load', () => {
  initTheme();
  renderGrid(shown);
  renderAdmin();
});

// ── CALCULATOR LOGIC ─────────────────────────────────────────
let calcData = { marke: null, jahr: 0, km: 0, kraft: 1.0, condition: 1.0, service: 1.0 };

function calcStep2() {
  const marke = document.getElementById('calcMarke');
  const jahr  = document.getElementById('calcJahr');
  const km    = document.getElementById('calcKm');
  const kraft = document.getElementById('calcKraft');

  if (!marke.value || !jahr.value || !km.value || !kraft.value) {
    showToast('⚠ Bitte alle Felder ausfüllen.');
    return;
  }

  calcData.marke = marke.options[marke.selectedIndex].value;
  calcData.jahr  = parseInt(jahr.value)  || 2;
  calcData.km    = parseInt(km.value)    || 3;
  calcData.kraft = parseFloat(kraft.value) || 1.0;

  document.getElementById('calcStep1').style.display = 'none';
  document.getElementById('calcStep2').style.display = 'block';
  document.getElementById('calcProgressBar').style.width = '66%';
}

function calcBack() {
  document.getElementById('calcStep2').style.display = 'none';
  document.getElementById('calcStep1').style.display = 'block';
  document.getElementById('calcProgressBar').style.width = '33%';
}

function selectCondition(el, val) {
  document.querySelectorAll('.cond-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  calcData.condition = parseFloat(val);
}

function calcStep3() {
  const serviceVal = document.querySelector('input[name="service"]:checked');
  calcData.service = serviceVal ? parseFloat(serviceVal.value) : 1.0;
  if (!calcData.condition) { showToast('⚠ Bitte Fahrzeugzustand auswählen.'); return; }

  // Base prices by brand tier
  const base = calcData.marke === 'premium' ? 28000 : 14000;

  // Year multiplier: newer = higher
  const yearMult = 0.7 + (calcData.jahr * 0.1);

  // Km multiplier
  const kmMult = 0.6 + (calcData.km * 0.08);

  const raw = base * yearMult * kmMult * calcData.kraft * calcData.condition * calcData.service;
  const low  = Math.round(raw * 0.92 / 500) * 500;
  const high = Math.round(raw * 1.08 / 500) * 500;

  document.getElementById('priceRange').textContent =
    low.toLocaleString('de-DE') + ' € – ' + high.toLocaleString('de-DE') + ' €';

  document.getElementById('calcStep2').style.display = 'none';
  document.getElementById('calcStep3').style.display = 'block';
  document.getElementById('calcProgressBar').style.width = '100%';
}

function submitCalc() {
  const name = document.getElementById('calcVorname').value.trim();
  const tel  = document.getElementById('calcTel').value.trim();
  if (!name || !tel) { showToast('⚠ Bitte Name und Telefon angeben.'); return; }
  showToast('✓ Anfrage gesendet! Wir rufen Sie innerhalb von 24h an.');
  restartCalc();
}

function restartCalc() {
  calcData = { marke: null, jahr: 0, km: 0, kraft: 1.0, condition: 1.0, service: 1.0 };
  document.getElementById('calcStep3').style.display = 'none';
  document.getElementById('calcStep1').style.display = 'block';
  document.getElementById('calcProgressBar').style.width = '33%';
  document.getElementById('calcVorname').value = '';
  document.getElementById('calcTel').value = '';
  document.querySelectorAll('.cond-btn').forEach(b => b.classList.remove('selected'));
  document.querySelectorAll('input[name="service"]')[1].checked = true;
  ['calcMarke','calcJahr','calcKm','calcKraft'].forEach(id => {
    document.getElementById(id).selectedIndex = 0;
  });
}

// ── LIVE COUNTER ─────────────────────────────────────────────
function animateLiveCounter() {
  const el = document.getElementById('liveCounter');
  if (!el) return;
  const base = 3;
  setInterval(() => {
    const rand = base + Math.floor(Math.random() * 3);
    el.textContent = rand;
  }, 8000);
}

// Override init to also start live counter
const _origLoad = window.onload;
window.addEventListener('load', () => {
  animateLiveCounter();
});
