// SkyPulse home v2 behaviour: solid header after the hero, crisp reveals,
// film pause, fleet rail arrows, and the review switch (type and hero media).
// URL params: ?type=sans|serif  ?media=film|photo  ?still (freeze for screenshots)  ?noreview
(() => {
  const params = new URLSearchParams(location.search);
  const still = params.has('still');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hero = document.getElementById('hero');
  const film = document.getElementById('film');

  const state = { type: params.get('type') || 'serif', media: params.get('media') || 'film' };
  const apply = () => {
    document.body.classList.toggle('type-sans', state.type === 'sans');
    hero.dataset.media = state.media;
    if (state.media === 'film' && !still && !reduce) film.play().catch(() => {}); else film.pause();
    document.querySelectorAll('.seg').forEach((seg) => seg.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(state[seg.dataset.key] === b.dataset.v))));
  };
  document.querySelectorAll('.seg button').forEach((b) => b.addEventListener('click', () => { state[b.parentElement.dataset.key] = b.dataset.v; apply(); }));
  if (params.has('noreview')) document.getElementById('review').remove();
  apply();

  const pause = document.getElementById('pause');
  const setPaused = (p) => { pause.classList.toggle('paused', p); pause.lastElementChild.textContent = p ? 'Play' : 'Pause'; };
  pause.addEventListener('click', () => { if (film.paused) { film.play(); setPaused(false); } else { film.pause(); setPaused(true); } });
  setPaused(reduce || still);

  const hdr = document.getElementById('hdr');
  const onScroll = () => hdr.classList.toggle('solid', scrollY > innerHeight * 0.7);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const rail = document.getElementById('rail');
  document.querySelectorAll('.arrows button').forEach((b) => b.addEventListener('click', () => {
    rail.scrollBy({ left: Number(b.dataset.dir) * rail.clientWidth * 0.8, behavior: reduce ? 'auto' : 'smooth' });
  }));

  const rv = document.querySelectorAll('.rv');
  if (still || reduce || !('IntersectionObserver' in window)) rv.forEach((el) => el.classList.add('in'));
  else {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    rv.forEach((el) => io.observe(el));
  }
})();
