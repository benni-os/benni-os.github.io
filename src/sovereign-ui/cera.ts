export class CeraHaptics {
  static trigger(type: 'subtle' | 'medium' | 'heavy' = 'subtle'): void {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        switch (type) {
          case 'subtle':
            navigator.vibrate(8);
            break;
          case 'medium':
            navigator.vibrate(22);
            break;
          case 'heavy':
            navigator.vibrate([35, 20, 35]);
            break;
        }
      } catch (_) {}
    }
  }

  attachListeners(): void {
    document.addEventListener('click', (e) => {
      const target = (e.target as HTMLElement).closest('button, a, [data-magnet]');
      if (target) {
        CeraHaptics.trigger('subtle');
      }
    });
  }
}
