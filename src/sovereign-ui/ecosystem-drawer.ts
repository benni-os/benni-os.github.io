export class EcosystemDrawer {
  init(): void {
    const trigger = document.querySelector('[data-drawer-trigger]');
    const drawer = document.getElementById('benni-ecosystem-drawer');
    if (!trigger || !drawer) return;

    trigger.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('open');
      trigger.setAttribute('aria-expanded', String(isOpen));
    });
  }
}
