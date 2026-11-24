/* Shared behaviour for the Maison inner pages: header headroom + tone, scroll reveal. */
(function () {
  const header = document.getElementById('header');
  const themed = () => document.querySelectorAll('main [data-theme], footer[data-theme]');
  let lastY = window.scrollY;
  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 40);
    if (y < 90) header.classList.remove('nav-hidden');
    else if (y - lastY > 8) header.classList.add('nav-hidden');
    else if (lastY - y > 8) header.classList.remove('nav-hidden');
    if (Math.abs(y - lastY) > 8 || y < 90) lastY = y;
    let dark = true;
    themed().forEach(sec => {
      const r = sec.getBoundingClientRect();
      if (r.top <= 72 && r.bottom > 72) dark = sec.dataset.theme === 'dark';
    });
    header.classList.toggle('on-dark', dark);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function reveal(root = document) {
    const els = root.querySelectorAll('.rv:not(.in)');
    if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(e => io.observe(e));
  }
  window.SKY_SUB = { reveal };
})();
