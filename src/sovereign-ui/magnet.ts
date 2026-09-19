export class MagnetField {
  private elements: HTMLElement[] = [];

  init(): void {
    this.refresh();
    window.addEventListener('pointermove', (e) => this.onMove(e));
  }

  refresh(): void {
    this.elements = Array.from(document.querySelectorAll<HTMLElement>('[data-magnet], .btn-monumental, .btn-primary, .adam-action-pill'));
  }

  private onMove(e: PointerEvent): void {
    const radius = 80;
    for (const el of this.elements) {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.hypot(distX, distY);

      if (distance < radius) {
        const pull = 1 - distance / radius;
        const moveX = distX * pull * 0.32;
        const moveY = distY * pull * 0.32;
        el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      } else {
        el.style.transform = '';
      }
    }
  }
}
