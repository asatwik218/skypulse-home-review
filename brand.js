// SkyPulse home: behaviour and motion.
// Motion is a progressive layer: without GSAP, with ?still, or with reduced motion, every element
// is already in its final, readable state. URL params: ?type=sans|serif ?media=film|photo ?still ?noreview ?intro
(() => {
  const html = document.documentElement;
  const q = new URLSearchParams(location.search);
  const still = q.has('still');
  const hasGsap = !!(window.gsap && window.ScrollTrigger);
  if (!hasGsap) html.classList.remove('motion', 'intro');
  const motion = html.classList.contains('motion');
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- review switch ---------- */
  const hero = $('#hero');
  const film = $('#film');
  const state = { type: q.get('type') || 'serif', media: q.get('media') || 'film' };
  const apply = () => {
    document.body.classList.toggle('type-sans', state.type === 'sans');
    hero.dataset.media = state.media;
    if (state.media === 'film' && !still && !matchMedia('(prefers-reduced-motion: reduce)').matches) film.play().catch(() => {});
    else film.pause();
    $$('.seg').forEach((seg) => $$('button', seg).forEach((b) => b.setAttribute('aria-pressed', String(state[seg.dataset.key] === b.dataset.v))));
    if (hasGsap) ScrollTrigger.refresh();
  };
  $$('.seg button').forEach((b) => b.addEventListener('click', () => { state[b.parentElement.dataset.key] = b.dataset.v; apply(); }));
  $('#replay').addEventListener('click', () => {
    try { sessionStorage.removeItem('sp-intro'); } catch (e) {}
    const p = new URLSearchParams({ type: state.type, media: state.media, intro: '' });
    location.href = location.pathname + '?' + p.toString();
  });
  if (q.has('noreview')) $('#review').remove();
  apply();

  /* ---------- film pause ---------- */
  const pause = $('#pause');
  const setPaused = (p) => { pause.classList.toggle('paused', p); pause.lastElementChild.textContent = p ? 'Play' : 'Pause'; };
  pause.addEventListener('click', () => { if (film.paused) { film.play(); setPaused(false); } else { film.pause(); setPaused(true); } });
  setPaused(film.paused || still);

  /* ---------- news filter ---------- */
  const grid = $('#newsGrid');
  const cards = $$('.nc', grid);
  $$('.tabs button').forEach((tab) => tab.addEventListener('click', () => {
    const f = tab.dataset.f;
    $$('.tabs button').forEach((t) => t.setAttribute('aria-selected', String(t === tab)));
    const flip = motion && window.Flip ? Flip.getState(cards) : null;
    cards.forEach((c) => { c.hidden = f !== 'all' && c.dataset.cat !== f; });
    grid.classList.toggle('filtered', f !== 'all');
    if (flip) {
      Flip.from(flip, {
        duration: 0.7, ease: 'power3.inOut', absolute: true, nested: true,
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.15 }),
        onLeave: (els) => gsap.to(els, { opacity: 0, duration: 0.3 }),
      });
    }
  }));

  /* ---------- header (also works without GSAP) ---------- */
  const hdr = $('#hdr');
  let lastY = scrollY;
  addEventListener('scroll', () => {
    const y = scrollY;
    hdr.classList.toggle('solid', y > innerHeight * 0.7);
    hdr.classList.toggle('away', y > lastY && y > innerHeight * 0.9);
    lastY = y;
  }, { passive: true });

  if (!motion) return;

  /* =================== motion =================== */
  gsap.registerPlugin(ScrollTrigger);
  if (window.Flip) gsap.registerPlugin(Flip);
  gsap.defaults({ ease: 'power3.out' });

  // Split text into masked words, keeping inline elements such as <em>.
  const split = (el) => {
    const walk = (node) => [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((t) => {
          if (!t) return;
          if (/^\s+$/.test(t)) { frag.appendChild(document.createTextNode(t)); return; }
          const w = document.createElement('span'); w.className = 'w';
          const wi = document.createElement('span'); wi.className = 'wi'; wi.textContent = t;
          w.appendChild(wi); frag.appendChild(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) walk(n);
    });
    walk(el);
    return $$('.wi', el);
  };

  /* intro curtain, then hero entrance */
  const heroWords = split($('#hero h1'));
  gsap.set(heroWords, { yPercent: 115 });
  gsap.set('[data-fade]', { opacity: 0 });
  const tl = gsap.timeline();
  if (html.classList.contains('intro')) {
    tl.fromTo('.curtain-in img', { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power3.inOut' })
      .from('.curtain .wm b', { letterSpacing: '0.9em', opacity: 0, duration: 1.1, ease: 'power3.out' }, '-=0.45')
      .from('.curtain .wm > span', { opacity: 0, y: 10, duration: 0.6 }, '-=0.6')
      .to('.curtain', { yPercent: -100, duration: 1.05, ease: 'power4.inOut', delay: 0.3 })
      .add(() => {
        html.classList.remove('intro');
        gsap.set('.curtain', { clearProps: 'all' });
        try { sessionStorage.setItem('sp-intro', '1'); } catch (e) {}
      });
  }
  tl.fromTo('#heroMedia', { scale: 1.18 }, { scale: 1, duration: 2.6, ease: 'power2.out' }, html.classList.contains('intro') ? '-=0.9' : 0)
    .to(heroWords, { yPercent: 0, duration: 1.2, stagger: 0.07, ease: 'power4.out' }, '<0.35')
    .to('[data-fade]', { opacity: 1, duration: 1, stagger: 0.08 }, '-=0.6');

  /* hero drifts as you leave it */
  gsap.to('#heroMedia', { yPercent: 16, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('#heroCopy', { y: -110, opacity: 0.1, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: '70% top', scrub: true } });

  /* section headings: masked word rise */
  $$('[data-split]').forEach((el) => {
    if (el.closest('#hero')) return;
    const words = split(el);
    gsap.from(words, { yPercent: 115, duration: 1.1, stagger: 0.05, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 86%' } });
  });

  /* gold dashes draw in */
  $$('[data-draw]').forEach((el) => gsap.from(el, { scaleX: 0, transformOrigin: 'left center', duration: 1.1, ease: 'power3.inOut', scrollTrigger: { trigger: el, start: 'top 90%' } }));

  /* paragraphs and labels rise */
  gsap.set('[data-up]', { y: 28, opacity: 0 });
  ScrollTrigger.batch('[data-up]', { start: 'top 90%', onEnter: (b) => gsap.to(b, { y: 0, opacity: 1, duration: 0.9, stagger: 0.08 }) });

  /* staggered groups */
  $$('[data-stagger]').forEach((g) => gsap.from(g.children, { y: 26, opacity: 0, duration: 0.85, stagger: 0.09, scrollTrigger: { trigger: g, start: 'top 88%' } }));

  /* figures count up */
  $$('[data-count]').forEach((el) => {
    const to = Number(el.dataset.count), pad = Number(el.dataset.pad || 0), o = { v: 0 };
    el.textContent = String(0).padStart(pad, '0');
    gsap.to(o, { v: to, duration: 1.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%' }, onUpdate: () => { el.textContent = String(Math.round(o.v)).padStart(pad, '0'); } });
  });

  /* mission tiles: curtain-up reveal, then image parallax */
  gsap.fromTo('.tile', { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, stagger: 0.12, ease: 'power4.inOut', scrollTrigger: { trigger: '#tiles', start: 'top 80%' } });
  $$('.tile-img img').forEach((img) => gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: img.closest('.tile'), start: 'top bottom', end: 'bottom top', scrub: true } }));

  /* image frames open from the centre */
  $$('[data-reveal]').forEach((el) => {
    const img = $('img', el);
    gsap.fromTo(el, { clipPath: 'inset(10% 10% 10% 10%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'power3.inOut', scrollTrigger: { trigger: el, start: 'top 82%' } });
    gsap.fromTo(img, { scale: 1.3 }, { scale: 1, duration: 1.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 82%' } });
  });
  gsap.fromTo('.gift .ph img', { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: '.gift', start: 'top bottom', end: 'bottom top', scrub: true } });

  /* fleet: vertical scroll drives the rail sideways (desktop) */
  const mm = gsap.matchMedia();
  mm.add('(min-width: 761px)', () => {
    const rail = $('#rail'), bar = $('#fleetBar'), now = $('#fleetNow');
    const crafts = $$('.craft', rail);
    rail.classList.add('pinned');
    const dist = () => Math.max(0, rail.scrollWidth - innerWidth);
    const tw = gsap.to(rail, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: {
        trigger: '#fleetPin', pin: true, start: 'top top', end: () => '+=' + dist(), scrub: 0.8, invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.set(bar, { scaleX: 0.09 + 0.91 * self.progress });
          now.textContent = String(Math.min(crafts.length, 1 + Math.round(self.progress * (crafts.length - 1)))).padStart(2, '0');
        },
      },
    });
    gsap.from(crafts, { y: 60, opacity: 0, duration: 1, stagger: 0.06, scrollTrigger: { trigger: '#fleetPin', start: 'top 70%' } });
    return () => { rail.classList.remove('pinned'); tw.kill(); gsap.set(rail, { clearProps: 'transform' }); };
  });

  /* quote: words light up as you read down */
  const qp = $('[data-words]');
  qp.innerHTML = qp.textContent.split(/(\s+)/).map((t) => (/^\s+$/.test(t) ? t : `<span class="qw">${t}</span>`)).join('');
  gsap.to($$('.qw', qp), { color: '#f3f5fa', stagger: 0.1, ease: 'none', scrollTrigger: { trigger: '.quote', start: 'top 65%', end: 'bottom 75%', scrub: true } });

  /* news cards */
  gsap.set('.nc', { y: 40, opacity: 0 });
  ScrollTrigger.batch('.nc', { start: 'top 90%', onEnter: (b) => gsap.to(b, { y: 0, opacity: 1, duration: 1, stagger: 0.1 }) });

  /* footer wordmark letters rise */
  const giant = $('[data-giant]');
  giant.innerHTML = giant.textContent.split('').map((c) => `<span class="gl">${c}</span>`).join('');
  gsap.from($$('.gl', giant), { yPercent: 100, opacity: 0, duration: 1.2, stagger: 0.06, ease: 'power4.out', scrollTrigger: { trigger: giant, start: 'top 95%' } });

  addEventListener('load', () => ScrollTrigger.refresh());
})();
