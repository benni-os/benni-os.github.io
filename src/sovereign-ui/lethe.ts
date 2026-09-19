export class LetheTypography {
  init(): void {
    const headings = document.querySelectorAll<HTMLElement>('[data-lethe], .monument-title, .hero-chapter-title');
    headings.forEach((el) => {
      el.classList.add('lethe-active');
      el.addEventListener('pointerenter', () => {
        el.style.filter = 'blur(1.5px)';
        el.style.letterSpacing = '0.04em';
        setTimeout(() => {
          el.style.filter = 'none';
          el.style.letterSpacing = '';
        }, 320);
      });
    });
  }
}
