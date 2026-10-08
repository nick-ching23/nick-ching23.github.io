// Dynamic copyright year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Viewer order follows the on-screen order, which differs on phones
const shots = Array.from(document.querySelectorAll('.shot'))
  .map((el, i) => ({ el, i }))
  .sort((a, b) => (parseInt(getComputedStyle(a.el).order, 10) || 0) - (parseInt(getComputedStyle(b.el).order, 10) || 0) || a.i - b.i)
  .map((x) => x.el);
const viewer = document.querySelector('.viewer');
const viewerImg = viewer.querySelector('img');
const count = viewer.querySelector('.viewer-count');
let current = 0;

function show(i) {
  current = (i + shots.length) % shots.length;
  const img = shots[current].querySelector('img');
  viewerImg.src = img.src;
  viewerImg.alt = img.alt;
  count.textContent = `${current + 1} / ${shots.length}`;
}

function open(i) {
  show(i);
  if (typeof viewer.showModal === 'function') {
    viewer.showModal();
  } else {
    // No <dialog> support: fall back to opening the image directly
    window.open(viewerImg.src, '_blank');
  }
}

shots.forEach((shot, i) => shot.addEventListener('click', () => open(i)));
viewer.querySelector('.viewer-close').addEventListener('click', () => viewer.close());
viewer.querySelector('.viewer-prev').addEventListener('click', () => show(current - 1));
viewer.querySelector('.viewer-next').addEventListener('click', () => show(current + 1));

// Clicking the dark area around the photo closes the viewer
viewer.addEventListener('click', (e) => {
  if (e.target === viewer) viewer.close();
});

document.addEventListener('keydown', (e) => {
  if (!viewer.open) return;
  if (e.key === 'ArrowLeft') show(current - 1);
  if (e.key === 'ArrowRight') show(current + 1);
});

// Swipe left or right on touch screens
let touchX = null;
viewer.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
viewer.addEventListener('touchend', (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
  touchX = null;
});

// Email links copy the address as well as opening the mail app, since many visitors have no mail app set up
document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
  link.addEventListener('click', () => {
    const address = link.getAttribute('href').replace('mailto:', '');
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(address).then(() => {
      const label = link.querySelector('span') || link;
      const original = label.textContent;
      label.textContent = 'Copied';
      link.classList.add('copied');
      setTimeout(() => {
        label.textContent = original;
        link.classList.remove('copied');
      }, 1600);
    }).catch(() => {});
  });
});
