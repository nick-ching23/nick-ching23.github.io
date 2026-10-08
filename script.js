// Dynamic copyright year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Hairline under the top bar once the page scrolls
const topbar = document.querySelector('.topbar');
const onScroll = () => topbar.classList.toggle('scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

const sections = document.querySelectorAll('.sec');
const navLinks = document.querySelectorAll('.topbar nav a');

if ('IntersectionObserver' in window) {
  // Ease each section in the first time it enters the viewport
  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        reveal.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('.reveal').forEach((el) => reveal.observe(el));

  // Underline the nav link for the section currently in view
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((a) => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => spy.observe(s));
} else {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
}

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
