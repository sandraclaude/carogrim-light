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
