const observerOptions = {
  root: null, 
  rootMargin: '0px 0px 100px 0px',
  threshold: 0.1 
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
// Configuration
const PHONE_NUMBER = "243000000000"; // Ton numéro WhatsApp (format international sans +)

let currentProduct = {
  title: "",
  unitPrice: 0,
  qty: 1
};

document.addEventListener('DOMContentLoaded', () => {

  // 1. Récupération des éléments du DOM après chargement complet
  const orderDrawer = document.getElementById('order-drawer');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');
  const drawerProductTitle = document.getElementById('drawer-product-title');
  const drawerQty = document.getElementById('drawer-qty');
  const drawerTotalPrice = document.getElementById('drawer-total-price');
  const btnMinus = document.getElementById('btn-minus');
  const btnPlus = document.getElementById('btn-plus');
  const whatsappFinalBtn = document.getElementById('whatsapp-final-btn');

  // 2. Gestion de l'IntersectionObserver pour les animations au scroll
  const revealElements = document.querySelectorAll('.reveal, .reveal-left');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0 });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // 3. Mise à jour du tiroir et du lien WhatsApp
  function updateOrderSummary() {
    if (!drawerQty || !drawerTotalPrice || !whatsappFinalBtn) return;

    drawerQty.textContent = currentProduct.qty;
    const total = currentProduct.qty * currentProduct.unitPrice;
    drawerTotalPrice.textContent = `${total.toLocaleString('fr-FR')} FC`;

    const message = `Bonjour Tifruit ! \n` +
                  `Je souhaite passer une commande :\n` +
                  `• Produit : ${currentProduct.title}\n` +
                  `• Quantité : ${currentProduct.qty}\n` +
                  `• Prix unitaire : ${currentProduct.unitPrice.toLocaleString('fr-FR')} FC\n\n` +
                  `Total estimé : ${total.toLocaleString('fr-FR')} FC\n\n` +
                  `Merci de me confirmer la disponibilité et les détails de livraison !`;

    whatsappFinalBtn.href = `https://wa.me/${+243830591259}?text=${encodeURIComponent(message)}`;
  }

  // 4. Ouverture du tiroir
  function openDrawer(title, price) {
    if (!orderDrawer || !drawerOverlay) return;

    currentProduct.title = title;
    currentProduct.unitPrice = parseInt(price, 10);
    currentProduct.qty = 1;

    if (drawerProductTitle) drawerProductTitle.textContent = currentProduct.title;
    updateOrderSummary();

    drawerOverlay.classList.remove('opacity-0', 'pointer-events-none');
    orderDrawer.classList.remove('translate-y-full');
  }

  // 5. Fermeture du tiroir
  function closeDrawer() {
    if (!orderDrawer || !drawerOverlay) return;
    drawerOverlay.classList.add('opacity-0', 'pointer-events-none');
    orderDrawer.classList.add('translate-y-full');
  }

  // 6. Événements des boutons + et -
  if (btnPlus) {
    btnPlus.addEventListener('click', () => {
      currentProduct.qty++;
      updateOrderSummary();
    });
  }

  if (btnMinus) {
    btnMinus.addEventListener('click', () => {
      if (currentProduct.qty > 1) {
        currentProduct.qty--;
        updateOrderSummary();
      }
    });
  }

  // 7. Événements de fermeture
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  // 8. Écoute du clic sur TOUS les boutons "Commander"
  const addButtons = document.querySelectorAll('.add-to-cart-btn');
  addButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      
      const title = button.getAttribute('data-title') || "Jus Tifruit";
      const price = button.getAttribute('data-price') || "3000";

      openDrawer(title, price);
    });
  });

});