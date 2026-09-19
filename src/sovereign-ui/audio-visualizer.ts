export class AudioVisualizerEngine {
  init(): void {
    const visualizerContainers = document.querySelectorAll<HTMLElement>('[data-audio-viz], .sound-wave-container');
    visualizerContainers.forEach(container => {
      container.innerHTML = '';
      const barCount = 16;
      for (let i = 0; i < barCount; i++) {
        const bar = document.createElement('div');
        bar.className = 'audio-viz-bar';
        bar.style.cssText = 'width:2px;background:#D4AF37;height:4px;display:inline-block;margin:0 1px;transition:height 0.08s ease;opacity:0.75;';
        container.appendChild(bar);
      }

      setInterval(() => {
        const bars = container.querySelectorAll<HTMLElement>('.audio-viz-bar');
        bars.forEach((bar, idx) => {
          const h = 3 + Math.sin(Date.now() * 0.008 + idx * 0.5) * 12 + Math.random() * 6;
          bar.style.height = `${Math.max(2, h).toFixed(1)}px`;
        });
      }, 90);
    });
  }
}
