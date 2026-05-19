
// ── Tour Detail v2 ──
function td2Tab(btn, secId) {
  document.querySelectorAll('.td2-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  const sec = document.getElementById(secId);
  if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

let td2Adult = 2, td2Child = 0;
const TD2_PRICE = 99900000;
const TD2_CHILD_PRICE = Math.round(TD2_PRICE * 0.85);
function td2Pax(type, d) {
  if (type === 'a') { td2Adult = Math.max(1, td2Adult + d); document.getElementById('td2a').textContent = td2Adult; }
  else { td2Child = Math.max(0, td2Child + d); document.getElementById('td2c').textContent = td2Child; }
  const total = (td2Adult * TD2_PRICE) + (td2Child * TD2_CHILD_PRICE);
  document.getElementById('td2-total-val').textContent = total.toLocaleString('vi-VN') + '₫';
}

// Tab highlight on scroll
(function(){
  const sections = ['sec-overview','sec-itinerary','sec-includes','sec-terms','sec-reviews'];
  window.addEventListener('scroll', () => {
    const tourDetail = document.getElementById('tour-detail');
    if (!tourDetail || tourDetail.style.display === 'none') return;
    let current = sections[0];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 160) current = id;
    });
    document.querySelectorAll('.td2-tab').forEach((t, i) => {
      t.classList.toggle('active', sections[i] === current);
    });
  }, { passive: true });
})();

// ── Mobile Menu ──
function toggleMobMenu(){
  const drawer = document.getElementById('mob-drawer');
  const overlay = document.getElementById('mob-overlay');
  const hb = document.getElementById('hamburger');
  const isOpen = drawer.classList.contains('open');
  if(isOpen){
    closeMobMenu();
  } else {
    drawer.classList.add('open');
    overlay.classList.add('show');
    hb.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeMobMenu(){
  document.getElementById('mob-drawer').classList.remove('open');
  document.getElementById('mob-overlay').classList.remove('show');
  document.getElementById('hamburger').classList.remove('active');
  document.body.style.overflow = '';
}

function toggleMobSub(itemId){
  const item = document.getElementById(itemId);
  const subId = 'mob-sub-' + itemId.replace('mob-','');
  const sub = document.getElementById(subId);
  const isExpanded = item.classList.contains('expanded');

  // Close all others
  document.querySelectorAll('.mob-nav-item.expanded').forEach(el=>{
    if(el.id !== itemId){
      el.classList.remove('expanded');
      const s = el.querySelector('.mob-submenu');
      if(s) s.classList.remove('open');
    }
  });

  if(isExpanded){
    item.classList.remove('expanded');
    sub.classList.remove('open');
  } else {
    item.classList.add('expanded');
    sub.classList.add('open');
  }
}

// Close drawer on Escape key
document.addEventListener('keydown', e=>{
  if(e.key==='Escape') closeMobMenu();
});

(function(){
  if (document.querySelector('header[data-nav-react]')) return;

  let backdrop = document.getElementById('mega-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'mega-backdrop';
    backdrop.id = 'mega-backdrop';
    document.body.appendChild(backdrop);
  }

  const megaItems = document.querySelectorAll('.has-mega');

  // Set nav bottom position for fixed mega panel
  function setNavBottom(){
    const h = document.querySelector('header');
    if(h){
      const bottom = h.getBoundingClientRect().bottom;
      document.documentElement.style.setProperty('--nav-bottom', bottom + 'px');
    }
  }
  setNavBottom();
  window.addEventListener('resize', setNavBottom);
  window.addEventListener('scroll', setNavBottom);

  function openMega(item){
    closeMega();
    item.classList.add('open');
    backdrop.classList.add('show');
    setNavBottom();
  }
  function closeMega(){
    megaItems.forEach(i => i.classList.remove('open'));
    backdrop.classList.remove('show');
  }

  megaItems.forEach(item => {
    const trigger = item.querySelector(':scope > a');
    trigger.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      item.classList.contains('open') ? closeMega() : openMega(item);
    });
    // Keep open on hover inside mega panel
    item.querySelector('.mega-menu')?.addEventListener('click', e => e.stopPropagation());
  });

  backdrop.addEventListener('click', closeMega);
  document.addEventListener('click', e => {
    if(!e.target.closest('.has-mega')) closeMega();
  });
  document.addEventListener('keydown', e => {
    if(e.key === 'Escape') closeMega();
  });
})();

// ── Contact form ──
function submitContactForm(e) {
  e.preventDefault();
  document.getElementById('contact-form').style.display = 'none';
  document.getElementById('form-success').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleChip(el) {
  el.classList.toggle('sel');
}

function toggleFaq(el) {
  const item = el.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ── Gallery lightbox ──
(function(){
  const items = document.querySelectorAll('.gal-item');
  let current = 0;
  const data = [];
  items.forEach((el,i)=>{
    const img = el.querySelector('img');
    data.push({
      src: img ? img.src : '',
      loc: el.dataset.loc || '',
      name: el.dataset.name || ''
    });
  });

  // Build lightbox
  const lb = document.createElement('div');
  lb.className = 'gal-lightbox';
  lb.innerHTML = `
    <button class="gal-lb-nav prev" id="lb-prev"><svg class="ic"><use href="#i-cl"/></svg></button>
    <div class="gal-lb-inner">
      <img class="gal-lb-img" id="lb-img" src="" alt="">
      <div class="gal-lb-caption">
        <div class="lb-loc"><svg class="ic"><use href="#i-map"/></svg> <span id="lb-loc"></span></div>
        <div class="lb-name" id="lb-name"></div>
      </div>
    </div>
    <button class="gal-lb-nav next" id="lb-next"><svg class="ic"><use href="#i-cr"/></svg></button>
    <button class="gal-lb-close" id="lb-close"><svg class="ic"><use href="#i-x"/></svg></button>
  `;
  document.body.appendChild(lb);

  function openLb(idx){
    current = idx;
    const d = data[idx];
    lb.querySelector('#lb-img').src = d.src;
    lb.querySelector('#lb-loc').textContent = d.loc;
    lb.querySelector('#lb-name').textContent = d.name;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLb(){
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }
  function goNext(){ openLb((current+1) % data.length); }
  function goPrev(){ openLb((current-1+data.length) % data.length); }

  items.forEach((el,i)=> el.addEventListener('click',()=> openLb(i)));
  lb.querySelector('#lb-close').addEventListener('click', closeLb);
  lb.querySelector('#lb-next').addEventListener('click', goNext);
  lb.querySelector('#lb-prev').addEventListener('click', goPrev);
  lb.addEventListener('click', e=>{ if(e.target===lb) closeLb(); });
  document.addEventListener('keydown', e=>{
    if(!lb.classList.contains('open')) return;
    if(e.key==='Escape') closeLb();
    if(e.key==='ArrowRight') goNext();
    if(e.key==='ArrowLeft') goPrev();
  });
})();

// ── Page switching (shared nav) ──
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
  // Show target
  const target = document.getElementById(pageId);
  if (target) target.style.display = 'block';
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'instant' });
  // Update nav active state
  document.querySelectorAll('nav.main a[data-page]').forEach(a => {
    a.classList.toggle('on', a.dataset.page === pageId);
  });
}

function openAbout() {
  showPage('about-page');
}

function closeAbout() {
  showPage('home-page');
}

// ── Tabs ──
document.querySelectorAll('.tab').forEach(t => {
  t.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(x => x.classList.remove('on'));
    t.classList.add('on');
  });
});

// ── Heart toggle ──
document.querySelectorAll('.card-heart').forEach(h => {
  h.addEventListener('click', e => {
    e.preventDefault(); e.stopPropagation();
    const u = h.querySelector('use');
    const f = u.getAttribute('href') === '#i-heartf';
    u.setAttribute('href', f ? '#i-heart' : '#i-heartf');
    h.style.color = f ? '' : '#ef4444';
  });
});

// ── Testimonial dots ──
document.querySelectorAll('.tdot').forEach(d => {
  d.addEventListener('click', () => {
    document.querySelectorAll('.tdot').forEach(x => x.classList.remove('on'));
    d.classList.add('on');
  });
});

// Scroll reveal: TourizaRevealInit.tsx (useEffect sau hydration)

// ── Image fallback ──
document.querySelectorAll('.card-thumb img, .dest-circle img, .promo img.promo-bg').forEach(img => {
  if (img.complete && img.naturalWidth === 0) img.dispatchEvent(new Event('error'));
});

document.querySelector('.float-btn.up')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
