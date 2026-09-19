export class GenesisIdeController {
  init(): void {
    const track = document.getElementById('genesisIde');
    const stage = document.querySelector<HTMLElement>('.genesis-pin-stage');
    const desktop = document.querySelector<HTMLElement>('.genesis-desktop-frame');
    const mobile = document.querySelector<HTMLElement>('.genesis-mobile-frame');
    const header = document.querySelector<HTMLElement>('.genesis-header-hud');
    const phaseFill = document.querySelector<HTMLElement>('.genesis-phase-fill');
    const phaseNum = document.getElementById('genesisPhaseNum');
    const phaseTitle = document.getElementById('genesisPhaseTitle');
    const approveBtn = document.querySelector<HTMLElement>('.mobile-touch-approve');
    const founderPanel = document.querySelector<HTMLElement>('.genesis-founder-panel');
    const modePills = document.querySelectorAll<HTMLElement>('.genesis-mode-pill');
    const diffAddLines = document.querySelectorAll<HTMLElement>('.code-diff-add');
    const diffDelLines = document.querySelectorAll<HTMLElement>('.code-diff-del');

    if (!track || !stage || !desktop || !mobile) return;

    const onScroll = () => {
      const rect = track.getBoundingClientRect();
      const totalScrollable = track.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);

      if (phaseFill) {
        phaseFill.style.width = `${(progress * 100).toFixed(1)}%`;
      }

      // =========================================================================
      // FASE 1: O Despertar (0.00 -> 0.20)
      // =========================================================================
      if (progress < 0.20) {
        const p1 = progress / 0.20;
        if (phaseNum) phaseNum.textContent = '01';
        if (phaseTitle) phaseTitle.textContent = 'CORE AWAKENING';

        // Desktop surge subindo do fundo
        const desktopY = (1 - p1) * 120;
        const desktopRotX = (1 - p1) * 20;
        const desktopScale = 0.88 + p1 * 0.12;
        desktop.style.transform = `translate3d(0, ${desktopY}px, 0) rotateX(${desktopRotX}deg) scale(${desktopScale})`;
        desktop.style.opacity = String(0.3 + p1 * 0.7);

        // Mobile permanece fora da tela à direita
        mobile.style.transform = 'translate3d(140%, 0, 100px) rotateY(45deg)';
        mobile.style.opacity = '0';

        if (header) {
          header.style.opacity = '1';
          header.style.transform = 'translate3d(0, 0, 0)';
        }
        if (founderPanel) founderPanel.classList.remove('visible');
      }

      // =========================================================================
      // FASE 2: A Colisão Dual (Desktop + Mobile) (0.20 -> 0.45)
      // =========================================================================
      else if (progress >= 0.20 && progress < 0.45) {
        const p2 = (progress - 0.20) / 0.25;
        if (phaseNum) phaseNum.textContent = '02';
        if (phaseTitle) phaseTitle.textContent = 'DUAL SURFACE COLLISION';

        // Desktop recua suavemente para abrir espaço para o mobile
        const deskX = -p2 * 120;
        const deskRotY = p2 * -6;
        desktop.style.transform = `translate3d(${deskX}px, 0, 0) rotateY(${deskRotY}deg) scale(0.95)`;
        desktop.style.opacity = '1';

        // Mobile voa para dentro da tela e trava em 3D à frente
        const mobX = (1 - p2) * 120;
        const mobRotY = (1 - p2) * 40 - 6;
        const mobZ = p2 * 60;
        mobile.style.transform = `translate3d(${mobX}%, 0, ${mobZ}px) rotateY(${mobRotY}deg)`;
        mobile.style.opacity = String(Math.min(1, p2 * 1.5));

        if (header) {
          header.style.opacity = String(1 - p2 * 0.5);
        }
        if (founderPanel) founderPanel.classList.remove('visible');
      }

      // =========================================================================
      // FASE 3: Live Code Scrubbing & Autonomous Diff (0.45 -> 0.70)
      // =========================================================================
      else if (progress >= 0.45 && progress < 0.70) {
        const p3 = (progress - 0.45) / 0.25;
        if (phaseNum) phaseNum.textContent = '03';
        if (phaseTitle) phaseTitle.textContent = 'AUTONOMOUS CODE DIFF';

        desktop.style.transform = 'translate3d(-120px, 0, 0) rotateY(-6deg) scale(0.96)';
        desktop.style.opacity = '1';
        mobile.style.transform = 'translate3d(0%, 0, 60px) rotateY(-6deg)';
        mobile.style.opacity = '1';

        // Ativação das linhas de diff pelo progresso
        if (p3 > 0.3) {
          diffDelLines.forEach(l => l.style.opacity = '0.4');
          diffAddLines.forEach(l => l.style.opacity = '1');
        } else {
          diffDelLines.forEach(l => l.style.opacity = '1');
          diffAddLines.forEach(l => l.style.opacity = '0.3');
        }

        // Simulação de pulso de aprovação mobile
        if (p3 > 0.6 && approveBtn) {
          approveBtn.classList.add('approved');
          approveBtn.textContent = '✓ SIGNED & AUDITED';
        } else if (approveBtn) {
          approveBtn.classList.remove('approved');
          approveBtn.textContent = 'TOUCH TO APPROVE';
        }

        if (founderPanel) founderPanel.classList.remove('visible');
      }

      // =========================================================================
      // FASE 4: Os 5 Modos Holográficos (0.70 -> 0.90)
      // =========================================================================
      else if (progress >= 0.70 && progress < 0.90) {
        const p4 = (progress - 0.70) / 0.20;
        if (phaseNum) phaseNum.textContent = '04';
        if (phaseTitle) phaseTitle.textContent = '5 SOVEREIGN MODES';

        desktop.style.transform = 'translate3d(-140px, -20px, -50px) rotateY(-10deg) scale(0.88)';
        mobile.style.transform = 'translate3d(20px, 10px, 40px) rotateY(-2deg) scale(0.92)';

        // Chaveamento dos 5 modos por fatias
        const activeModeIndex = Math.min(Math.floor(p4 * 5), 4);
        modePills.forEach((pill, idx) => {
          if (idx === activeModeIndex) {
            pill.classList.add('active');
          } else {
            pill.classList.remove('active');
          }
        });

        if (founderPanel) founderPanel.classList.remove('visible');
      }

      // =========================================================================
      // FASE 5: Founder Alpha Climax (0.90 -> 1.00)
      // =========================================================================
      else {
        if (phaseNum) phaseNum.textContent = '05';
        if (phaseTitle) phaseTitle.textContent = 'FOUNDER ALPHA';

        desktop.style.transform = 'translate3d(0, 0, -200px) scale(0.7)';
        desktop.style.opacity = '0.2';
        mobile.style.transform = 'translate3d(0, 0, -100px) scale(0.7)';
        mobile.style.opacity = '0.2';

        if (founderPanel) founderPanel.classList.add('visible');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
  }
}
