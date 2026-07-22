// Scroll reveal for elements marked ".reveal"
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el) => observer.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
}

// Contact form -> mailto
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const nom = form.nom.value.trim();
    const date = form.date.value;
    const message = form.message.value.trim();

    const subject = `Demande de prestation - ${nom || 'Nouveau contact'}`;
    const lines = [];
    if (date) lines.push(`Date de l'événement : ${date}`);
    lines.push('');
    lines.push(message);
    const body = lines.join('\n');

    const mailto = `mailto:carolineperneder@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  });
}

// Lightbox for gallery photos
const lightboxTriggers = Array.from(document.querySelectorAll('.lightbox-trigger'));
if (lightboxTriggers.length) {
  const items = lightboxTriggers.map((el) => ({
    src: el.dataset.full,
    caption: el.dataset.caption || '',
  }));

  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = `
    <button type="button" class="lightbox-nav prev" aria-label="Photo précédente"><span class="icon-caret" aria-hidden="true"></span></button>
    <figure class="lightbox-figure">
      <button type="button" class="lightbox-close" aria-label="Fermer"><span class="icon-x" aria-hidden="true"></span></button>
      <img class="lightbox-img" src="" alt="">
      <figcaption class="lightbox-caption"></figcaption>
    </figure>
    <button type="button" class="lightbox-nav next" aria-label="Photo suivante"><span class="icon-caret" aria-hidden="true"></span></button>
  `;
  document.body.appendChild(overlay);

  const imgEl = overlay.querySelector('.lightbox-img');
  const captionEl = overlay.querySelector('.lightbox-caption');
  const closeBtn = overlay.querySelector('.lightbox-close');
  const prevBtn = overlay.querySelector('.lightbox-nav.prev');
  const nextBtn = overlay.querySelector('.lightbox-nav.next');

  let currentIndex = 0;
  let lastFocused = null;

  function show(index) {
    currentIndex = (index + items.length) % items.length;
    const item = items[currentIndex];
    imgEl.src = item.src;
    imgEl.alt = item.caption;
    captionEl.textContent = item.caption;
  }

  function open(index) {
    lastFocused = document.activeElement;
    show(index);
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function close() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  lightboxTriggers.forEach((trigger, index) => {
    trigger.addEventListener('click', () => open(index));
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', () => show(currentIndex - 1));
  nextBtn.addEventListener('click', () => show(currentIndex + 1));

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) close();
  });

  document.addEventListener('keydown', (event) => {
    if (!overlay.classList.contains('is-open')) return;
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowLeft') show(currentIndex - 1);
    if (event.key === 'ArrowRight') show(currentIndex + 1);
  });
}
