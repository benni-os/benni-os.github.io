export class Canvas2DUltraScrubber {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;

  attach(canvasEl: HTMLCanvasElement): void {
    this.canvas = canvasEl;
    this.ctx = canvasEl.getContext('2d', { alpha: false, desynchronized: true });
  }

  drawFrame(img: CanvasImageSource): void {
    if (!this.canvas || !this.ctx) return;
    this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
  }
}
