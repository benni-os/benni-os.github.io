export class ProceduralSoundscape {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private masterGain: GainNode | null = null;

  init(): void {
    const saved = localStorage.getItem('benni_sound_enabled');
    if (saved === 'true') {
      this.isMuted = false;
    }
    this.injectControl();
  }

  private ensureContext(): void {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.15, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playClick(freq: number = 880): void {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.2, this.ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playSubDrone(): void {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(54, this.ctx.currentTime); // 54Hz Sub harmonic of 216Hz
    gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.04, this.ctx.currentTime + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 2.5);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 2.6);
  }

  toggle(): boolean {
    this.ensureContext();
    this.isMuted = !this.isMuted;
    localStorage.setItem('benni_sound_enabled', String(!this.isMuted));

    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.15, this.ctx.currentTime);
    }
    if (!this.isMuted) {
      this.playClick(440);
    }
    this.updateButton();
    return !this.isMuted;
  }

  private injectControl(): void {
    let btn = document.getElementById('benni-sound-toggle');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'benni-sound-toggle';
      btn.className = 'nav-sound-toggle';
      btn.title = 'Soundscape Procedural';
      btn.style.cssText = 'position:fixed;bottom:24px;left:24px;z-index:999;background:rgba(15,15,20,0.85);border:1px solid rgba(212,175,55,0.3);color:#D4AF37;padding:8px 14px;border-radius:24px;font-family:inherit;font-size:11px;letter-spacing:1px;cursor:pointer;backdrop-filter:blur(8px);display:flex;align-items:center;gap:6px;transition:all 0.2s ease;';
      btn.addEventListener('click', () => this.toggle());
      document.body.appendChild(btn);
    }
    this.updateButton();
  }

  private updateButton(): void {
    const btn = document.getElementById('benni-sound-toggle');
    if (btn) {
      btn.innerHTML = this.isMuted
        ? '<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#666;"></span> AUDIO: OFF'
        : '<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#D4AF37;box-shadow:0 0 6px #D4AF37;"></span> AUDIO: ON';
    }
  }
}
