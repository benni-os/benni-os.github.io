export class SpectralAberration {
  init(): void {
    const triggers = document.querySelectorAll<HTMLElement>('[data-spectral], .badge, .status-pill');
    triggers.forEach(el => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.08;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.08;
        el.style.textShadow = `${dx.toFixed(1)}px ${dy.toFixed(1)}px 0 rgba(255,0,60,0.4), ${(-dx).toFixed(1)}px ${(-dy).toFixed(1)}px 0 rgba(0,220,255,0.4)`;
      });
      el.addEventListener('pointerleave', () => {
        el.style.textShadow = '';
      });
    });
  }
}
