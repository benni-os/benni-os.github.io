export class RitualProgress {
  private maxProgress: number = 0;
  private progressBar: HTMLElement | null = null;

  init(): void {
    let bar = document.getElementById('benni-ritual-ruler');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'benni-ritual-ruler';
      bar.setAttribute('aria-hidden', 'true');
      bar.style.cssText = 'position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg, #D4AF37, #FFFFFF);z-index:9999;width:0%;transition:width 0.1s linear;box-shadow:0 0 8px rgba(212,175,55,0.7);';
      document.body.appendChild(bar);
    }
    this.progressBar = bar;

    window.addEventListener('scroll', () => this.update(), { passive: true });
    this.update();
  }

  private update(): void {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    const current = window.scrollY / totalHeight;
    this.maxProgress = Math.max(this.maxProgress, current);

    if (this.progressBar) {
      this.progressBar.style.width = `${(current * 100).toFixed(2)}%`;
    }
  }
}
