export class VeuCinematics {
  init(): void {
    let vignette = document.getElementById('benni-veu-vignette');
    if (!vignette) {
      vignette = document.createElement('div');
      vignette.id = 'benni-veu-vignette';
      vignette.setAttribute('aria-hidden', 'true');
      vignette.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9;box-shadow:inset 0 0 120px rgba(5,5,7,0.85);';
      document.body.appendChild(vignette);
    }
  }
}
