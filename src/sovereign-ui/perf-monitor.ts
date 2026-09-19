export class PerformanceWatchdog {
  private lastTime: number = performance.now();
  private frames: number = 0;
  private fps: number = 60;

  init(): void {
    const loop = (now: number) => {
      this.frames++;
      if (now >= this.lastTime + 1000) {
        this.fps = Math.round((this.frames * 1000) / (now - this.lastTime));
        this.frames = 0;
        this.lastTime = now;

        if (this.fps < 30) {
          document.body.classList.add('low-power-mode');
        }
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  get currentFps(): number {
    return this.fps;
  }
}
