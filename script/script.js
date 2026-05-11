
/* ══════════ DATA ══════════ */
const CARS = [
  {
    id:1,
    brand:"Ferrari",
    name:"Ferrari F8 Tributo",
    model:"F8 Tributo",
    year:2024,
    price:1800000,
    status:"available",
    hp:720,
    speed:"340 km/h",
    accel:"2.9s",
    image:"Images/Ferrari f8.jpg"
  },
        {
          id: 9,
          brand: "Porsche",
          name: "Porsche 911 GT2 RS",
          model: "911 GT2 RS",
          year: 2019,
          price: 1300000,
          status: "sold",
          hp: 700,
          speed: "340 km/h",
          accel: "2.8s",
          image: "Images/Porsche911.jpg",
        },
  {
    id:3,brand:"McLaren",name:"McLaren 720S",model:"720S Spider",year:2023,
    price:1700000,status:"available",hp:720,speed:"341 km/h",accel:"2.9s",
    image:"Images/Maclaren720s.jpg"
  },
  {
    id:4,brand:"Porsche",name:"Porsche 911 GT3 RS",model:"911 GT3 RS",year:2024,
    price:1500000,status:"sold",hp:525,speed:"296 km/h",accel:"3.2s",
    image:"Images/Porsche911gt3.jpg"
  },
  {
    id:5,brand:"Mercedes",name:"Mercedes AMG GT Black",model:"AMG GT Black Series",year:2024,
    price:1200000,status:"available",hp:730,speed:"325 km/h",accel:"3.2s",
    image:"Images/Marcedes GT.jpg"
  },
  {
    id:6,brand:"BMW",name:"BMW M8 Competition",model:"M8 Competition",year:2024,
    price:850000,status:"available",hp:617,speed:"305 km/h",accel:"3.2s",
    image:"Images/Bmw m8.jpg"
  },
];

/* ══ RENDER CARS ══ */
const grid = document.getElementById('carsGrid');
let activeFilter = 'all';

function renderCars(filter) {
  grid.innerHTML = '';
  const list = filter === 'all' ? CARS : CARS.filter(c => c.status === filter);
  list.forEach((car, i) => {
    const avail = car.status === 'available';
    const price = car.price.toLocaleString('ar-EG');
    const div = document.createElement('div');
    div.className = 'car-card';
    div.innerHTML = `
      <div class="car-img-wrap" id="wrap${car.id}">
        <img src="${car.image}" alt="${car.name}" loading="lazy" onload="markLoaded(${car.id})" onerror="handleImgErr(${car.id})"/>
        <span class="car-badge ${avail ? 'badge-av' : 'badge-sold'}">${avail ? 'متاحة' : 'مباعة'}</span>
        <div class="car-overlay">
          <span class="overlay-btn">عرض التفاصيل</span>
        </div>
      </div>
      <div class="car-info">
        <div class="car-brand-tag">${car.brand}</div>
        <div class="car-name">${car.name}</div>
        <div class="car-sub">${car.model} · ${car.year}</div>
        <div class="car-specs">
          <div class="spec"><span class="spec-v">${car.accel} HP</span><span class="spec-l">0-100</span></div>
          <div class="spec"><span class="spec-v">${car.speed}</span><span class="spec-l">السرعة</span></div>
          <div class="spec"><span class="spec-v">${car.hp}</span><span class="spec-l">قوة</span></div>
        </div>
        <div class="car-footer">
          <div class="car-price">${price}<small>جنيه مصري</small></div>
          <span class="more-link">التفاصيل
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </span>
        </div>
      </div>`;
    div.addEventListener('click', () => openModal(car));
    grid.appendChild(div);
  });
  // Re-observe new cards
  document.querySelectorAll('.car-card').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.07) + 's';
    revObs.observe(el);
  });
}

function markLoaded(id) {
  const w = document.getElementById('wrap'+id);
  if(w) w.classList.add('loaded');
}
function handleImgErr(id) {
  const w = document.getElementById('wrap'+id);
  if(!w) return;
  w.classList.add('loaded');
  const img = w.querySelector('img');
  if(img) {
    img.style.display='none';
    w.style.background='linear-gradient(135deg,#1a1a1a 0%,#0f0f0f 100%)';
  }
}

/* ══ FILTER ══ */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    renderCars(activeFilter);
  });
});

/* ══ MODAL ══ */
function openModal(car) {
  document.getElementById('modalImg').src = car.image;
  document.getElementById('modalBrand').textContent = car.brand;
  document.getElementById('modalName').textContent = car.name;
  document.getElementById('modalYear').textContent = car.model + ' · ' + car.year;
  document.getElementById('mHp').textContent = car.hp + ' HP';
  document.getElementById('mSpd').textContent = car.speed;
  document.getElementById('mAcc').textContent = car.accel;
  document.getElementById('mPrice').innerHTML = car.price.toLocaleString('ar-EG') + ' <small>جنيه</small>';
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(e) {
  if(e && e.target !== document.getElementById('modal') && !e.target.classList.contains('modal-close')) return;
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if(e.key==='Escape') { closeModal({target:document.getElementById('modal')}); closeMenu(); }});

/* ══ LOADER ══ */
let pct = 0;
const loaderPct = document.getElementById('loaderPct');
const pctInterval = setInterval(() => {
  pct = Math.min(pct + Math.random() * 15, 99);
  loaderPct.textContent = Math.floor(pct) + '%';
}, 80);

window.addEventListener('load', () => {
  clearInterval(pctInterval);
  loaderPct.textContent = '100%';
  setTimeout(() => {
    document.getElementById('loader').classList.add('done');
    document.getElementById('heroContent').classList.add('vis');
    document.getElementById('heroBg').classList.add('vis');
  }, 400);
});

/* ══ NAV SCROLL ══ */
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const sy = window.scrollY;
  document.getElementById('mainNav').classList.toggle('scrolled', sy > 50);
  document.getElementById('btt').classList.toggle('show', sy > 400);
  lastScroll = sy;
}, { passive: true });

/* ══ HAMBURGER ══ */
const hbtn = document.getElementById('hamburger');
const drawer = document.getElementById('navDrawer');
let menuOpen = false;

function openMenu() {
  menuOpen = true;
  hbtn.classList.add('open');
  drawer.classList.add('open');
  hbtn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  if(!menuOpen) return;
  menuOpen = false;
  hbtn.classList.remove('open');
  drawer.classList.remove('open');
  hbtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}
hbtn.addEventListener('click', e => { e.stopPropagation(); menuOpen ? closeMenu() : openMenu(); });
drawer.addEventListener('click', e => { if(e.target === drawer) closeMenu(); });
window.addEventListener('resize', () => { if(window.innerWidth >= 768) closeMenu(); });

/* ══ CURSOR (desktop only) ══ */
if(window.matchMedia('(pointer:fine)').matches) {
  const cur = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove', e => {
    mx=e.clientX; my=e.clientY;
    cur.style.left=mx+'px'; cur.style.top=my+'px';
  }, { passive: true });
  (function tick() {
    rx += (mx-rx) * .12; ry += (my-ry) * .12;
    ring.style.left=rx+'px'; ring.style.top=ry+'px';
    requestAnimationFrame(tick);
  })();
  document.querySelectorAll('a,button,.car-card,.feat-item,.process-step,.filter-btn').forEach(el => {
    el.addEventListener('mouseenter', () => { cur.classList.add('hovered'); ring.classList.add('hovered'); });
    el.addEventListener('mouseleave', () => { cur.classList.remove('hovered'); ring.classList.remove('hovered'); });
  });
}

/* ══ SCROLL REVEAL ══ */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('vis'); } });
}, { threshold: 0.08 });
document.querySelectorAll('.rv,.rv-l,.rv-r').forEach(el => revObs.observe(el));

/* ══ RENDER CARS (after revObs is ready) ══ */
renderCars('all');

/* ══ COUNT UP ══ */
const cntObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(!e.isIntersecting) return;
    const el = e.target;
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    let n = 0;
    const dur = 1400;
    const start = performance.now();
    function step(ts) {
      const p = Math.min((ts-start)/dur,1);
      const ease = 1-Math.pow(1-p,3);
      n = Math.round(ease*target);
      el.textContent = n + suffix;
      if(p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
    cntObs.unobserve(el);
  });
}, { threshold: 0.6 });
document.querySelectorAll('.stat-num[data-target]').forEach(el => cntObs.observe(el));

/* ══ WHATSAPP ══ */
function sendWhatsApp() {
  const name = document.getElementById('fName').value.trim() || 'عميل';
  const phone = document.getElementById('fPhone').value.trim();
  const car = document.getElementById('fCar').value || 'سيارة فاخرة';
  const msg = document.getElementById('fMsg').value.trim() || 'أود الاستفسار';
  const text = `مرحباً Elite Motors،\nأنا ${name}${phone ? ' — ' + phone : ''}\nأريد الاستفسار عن: ${car}\n\n${msg}`;
  window.open('https://wa.me/201000000000?text='+encodeURIComponent(text), '_blank');
  showToast('جاري فتح واتساب...');
}

/* ══ TOAST ══ */
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}