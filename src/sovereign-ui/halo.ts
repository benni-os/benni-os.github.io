export class HaloEngine {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private width: number = 0;
  private height: number = 0;
  private breathPhase: number = 0;
  private scrollVelocity: number = 0;
  private lastScrollY: number = 0;
  private isRunning: boolean = false;

  init(): void {
    let existing = document.getElementById('benni-halo-canvas') as HTMLCanvasElement;
    if (!existing) {
      existing = document.createElement('canvas');
      existing.id = 'benni-halo-canvas';
      existing.setAttribute('aria-hidden', 'true');
      existing.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:1;mix-blend-mode:screen;opacity:0.65;';
      document.body.prepend(existing);
    }
    this.canvas = existing;
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('scroll', () => this.onScroll(), { passive: true });
    this.isRunning = true;
    this.render();
  }

  private resize(): void {
    if (!this.canvas) return;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = Math.floor(this.width / 2); // Downscaled for ultra-performance
    this.canvas.height = Math.floor(this.height / 2);
  }

  private onScroll(): void {
    const currentY = window.scrollY;
    this.scrollVelocity = Math.min(Math.abs(currentY - this.lastScrollY) * 0.05, 1.5);
    this.lastScrollY = currentY;
  }

  private render = (): void => {
    if (!this.isRunning || !this.ctx || !this.canvas) return;

    this.breathPhase += 0.015;
    this.scrollVelocity *= 0.92;

    const w = this.canvas.width;
    const h = this.canvas.height;
    this.ctx.clearRect(0, 0, w, h);

    const cx = w * 0.5;
    const cy = h * 0.35 + Math.sin(this.breathPhase * 0.7) * 20;
    const baseRadius = Math.min(w, h) * (0.35 + Math.sin(this.breathPhase) * 0.05 + this.scrollVelocity * 0.1);

    const grad = this.ctx.createRadialGradient(cx, cy, 0, cx, cy, baseRadius);
    grad.addColorStop(0, 'rgba(212, 175, 55, 0.22)');
    grad.addColorStop(0.35, 'rgba(212, 175, 55, 0.08)');
    grad.addColorStop(0.7, 'rgba(120, 95, 25, 0.02)');
    grad.addColorStop(1, 'rgba(5, 5, 7, 0)');

    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, w, h);

    requestAnimationFrame(this.render);
  };
}
