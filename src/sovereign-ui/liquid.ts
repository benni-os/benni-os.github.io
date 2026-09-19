export class LiquidSurface {
  init(): void {
    const cards = document.querySelectorAll<HTMLElement>('[data-liquid], .hero-card, .stack-card, .product-card');
    cards.forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--liquid-x', `${x}%`);
        card.style.setProperty('--liquid-y', `${y}%`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--liquid-x', '50%');
        card.style.setProperty('--liquid-y', '50%');
      });
    });
  }
}
