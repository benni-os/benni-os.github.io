export class TelemetrySparkline {
  static createSparkline(data: number[], width: number = 100, height: number = 24): string {
    if (data.length === 0) return '';
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    const points = data.map((val, idx) => {
      const x = (idx / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 4) - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');

    return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="overflow:visible;"><polyline fill="none" stroke="#D4AF37" stroke-width="1.5" stroke-linecap="round" points="${points}" /></svg>`;
  }
}
