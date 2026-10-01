const observerOptions = {
  root: null, 
  threshold: 0.15 
};


const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal', 'reveal-left');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);
document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.unreveal,.unreveal-left');
  revealElements.forEach(el => revealObserver.observe(el));
});