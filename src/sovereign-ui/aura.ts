export class AuraAtmosphere {
  init(): void {
    let aura = document.getElementById('benni-aura-layer');
    if (!aura) {
      aura = document.createElement('div');
      aura.id = 'benni-aura-layer';
      aura.setAttribute('aria-hidden', 'true');
      aura.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:0;background:radial-gradient(ellipse 70% 60% at 50% 20%, rgba(212,175,55,0.035), transparent 80%);';
      document.body.prepend(aura);
    }
  }
}
