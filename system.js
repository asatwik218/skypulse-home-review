// SkyPulse home prototypes: shared behaviour.
// - The search field's placeholder types out one example per visitor group.
// - Typing or focusing opens live matches (aircraft, missions, partnership).
// - Sections below the hero reveal crisply on scroll.
// - The fleet register swaps its photo when a row is chosen.
// ?still freezes everything for screenshots; ?open opens the matches panel.

(() => {
  const params = new URLSearchParams(location.search);
  const still = params.has('still');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const EXAMPLES = [
    'H130 for EMS · Dehradun · 12 months',
    '25 trainers for a new flying school',
    'Partner on a lease through GIFT City',
    'Twin-engine AW109 for a state government',
    'Access to an aircraft for our family office',
  ];

  document.querySelectorAll('[data-typer]').forEach((el) => {
    if (still || reduce) { el.textContent = EXAMPLES[0]; return; }
    let i = 0, n = 0, del = false;
    const tick = () => {
      const s = EXAMPLES[i];
      n += del ? -1 : 1;
      el.textContent = s.slice(0, n);
      let wait = del ? 22 : 48;
      if (!del && n === s.length) { del = true; wait = 2200; }
      else if (del && n === 0) { del = false; i = (i + 1) % EXAMPLES.length; wait = 380; }
      setTimeout(tick, wait);
    };
    tick();
  });

  document.querySelectorAll('.search').forEach((form) => {
    const input = form.querySelector('input');
    const panel = form.querySelector('.results');
    form.addEventListener('submit', (e) => e.preventDefault());
    if (!panel) return;
    const open = (v) => { panel.hidden = !v; };
    open(params.has('open'));
    input.addEventListener('focus', () => open(true));
    input.addEventListener('input', () => open(true));
    document.addEventListener('click', (e) => { if (!form.contains(e.target)) open(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') open(false); });
    form.querySelectorAll('.chip').forEach((c) => c.addEventListener('click', () => {
      input.value = c.dataset.q || c.textContent.trim();
      input.focus();
      open(true);
    }));
  });

  const reg = document.querySelector('.register');
  if (reg) {
    const img = reg.querySelector('.register-photo img');
    const big = reg.querySelector('.reg-big');
    const lead = reg.querySelector('.register-photo .leader');
    reg.querySelectorAll('.rows li[data-img]').forEach((li) => li.addEventListener('click', () => {
      reg.querySelectorAll('.rows li').forEach((x) => x.classList.remove('is-active'));
      li.classList.add('is-active');
      img.src = li.dataset.img;
      big.textContent = li.querySelector('.r').textContent;
      lead.innerHTML = `<div><b>${li.querySelector('.t').firstChild.textContent.trim()}</b><span>${li.querySelector('.t small').textContent}</span></div>`;
    }));
  }

  const rv = document.querySelectorAll('.rv');
  if (still || reduce || !('IntersectionObserver' in window)) {
    rv.forEach((el) => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -10% 0px' });
    rv.forEach((el) => io.observe(el));
  }

  if (still) document.querySelectorAll('video').forEach((v) => { v.removeAttribute('autoplay'); v.pause(); });
})();
