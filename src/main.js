// src/wave14/performance.ts
function initWave14() {
  console.log("\u{1F30A} Wave 14 \u2013 Performance & Content Integration (Vite + PWA)");
  const lazyElements = document.querySelectorAll("img.lazy, video.lazy, .lazy");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          if (el.tagName === "IMG" && el.dataset.src) {
            el.src = el.dataset.src;
            el.onload = () => el.classList.add("loaded");
          }
          if (el.tagName === "VIDEO" && el.dataset.src) {
            el.src = el.dataset.src;
            el.load();
            el.classList.add("loaded");
          }
          if (el.dataset.src && el.tagName !== "IMG" && el.tagName !== "VIDEO") {
            el.style.backgroundImage = `url(${el.dataset.src})`;
            el.classList.add("loaded");
          }
          observer.unobserve(el);
        }
      });
    }, { rootMargin: "200px 0px" });
    lazyElements.forEach((el) => observer.observe(el));
  }
  const threeSection = document.querySelector("#benjaminPullquote, #wave12-canvas");
  let threeLoaded = typeof THREE !== "undefined";
  function loadThree() {
    if (threeLoaded || typeof THREE !== "undefined") {
      threeLoaded = true;
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
      script.async = true;
      script.onload = () => {
        threeLoaded = true;
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  if (threeSection && "IntersectionObserver" in window && !threeLoaded) {
    const threeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !threeLoaded) {
          loadThree().then(() => {
            console.log("\u2705 Three.js carregado sob demanda");
            if (window.__BENNI_DROP__?.init) window.__BENNI_DROP__.init();
          }).catch(() => console.warn("\u26A0\uFE0F Three.js falhou, usando fallback 2D"));
        }
      });
    }, { rootMargin: "400px 0px" });
    threeObserver.observe(threeSection);
  }
  async function loadPuterContent() {
    if (typeof puter === "undefined") {
      console.log("\u2139\uFE0F Puter SDK em modo offline/local");
      return;
    }
    try {
      const kv = puter.kv;
      if (!kv) return;
      const keys = ["hero_title", "hero_body", "dossier_declaration"];
      for (const key of keys) {
        const value = await kv.get(key);
        if (value) {
          const el = document.querySelector(`[data-content="${key}"]`);
          if (el) {
            el.innerHTML = value;
            el.classList.remove("dynamic-content-placeholder");
          }
        }
      }
      console.log("\u2705 Conte\xFAdo din\xE2mico do Puter carregado com sucesso");
    } catch (e) {
      console.warn("\u26A0\uFE0F Informa\xE7\xE3o Puter KV:", e);
    }
  }
  if (document.readyState === "complete") {
    loadPuterContent();
  } else {
    window.addEventListener("load", loadPuterContent);
  }
  if ("performance" in window && "PerformanceObserver" in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const last = entries[entries.length - 1];
        if (last) {
          const lcp = last.startTime;
          console.log(`\u{1F4CA} LCP (Largest Contentful Paint): ${Math.round(lcp)}ms`);
          if (lcp > 2500) console.warn("\u26A0\uFE0F LCP alto. Otimize imagens e fontes.");
        }
      });
      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
    } catch (_) {
    }
  }
  console.log("\u2705 Wave 14 (Vite + PWA) ativada!");
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initWave14);
} else {
  initWave14();
}

// src/sovereign-ui/halo.ts
var HaloEngine = class {
  canvas = null;
  ctx = null;
  width = 0;
  height = 0;
  breathPhase = 0;
  scrollVelocity = 0;
  lastScrollY = 0;
  isRunning = false;
  init() {
    let existing = document.getElementById("benni-halo-canvas");
    if (!existing) {
      existing = document.createElement("canvas");
      existing.id = "benni-halo-canvas";
      existing.setAttribute("aria-hidden", "true");
      existing.style.cssText = "position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:1;mix-blend-mode:screen;opacity:0.65;";
      document.body.prepend(existing);
    }
    this.canvas = existing;
    this.ctx = this.canvas.getContext("2d");
    this.resize();
    window.addEventListener("resize", () => this.resize());
    window.addEventListener("scroll", () => this.onScroll(), { passive: true });
    this.isRunning = true;
    this.render();
  }
  resize() {
    if (!this.canvas) return;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = Math.floor(this.width / 2);
    this.canvas.height = Math.floor(this.height / 2);
  }
  onScroll() {
    const currentY = window.scrollY;
    this.scrollVelocity = Math.min(Math.abs(currentY - this.lastScrollY) * 0.05, 1.5);
    this.lastScrollY = currentY;
  }
  render = () => {
    if (!this.isRunning || !this.ctx || !this.canvas) return;
    this.breathPhase += 0.015;
    this.scrollVelocity *= 0.92;
    const w = this.canvas.width;
    const h = this.canvas.height;
    this.ctx.clearRect(0, 0, w, h);
    const cx = w * 0.5;
    const cy = h * 0.35 + Math.sin(this.breathPhase * 0.7) * 20;
    const baseRadius = Math.min(w, h) * (0.35 + Math.sin(this.breathPhase) * 0.05 + this.scrollVelocity * 0.1);
    const grad = this.ctx.createRadialGradient(cx, cy, 0, cx, cy, baseRadius);
    grad.addColorStop(0, "rgba(212, 175, 55, 0.22)");
    grad.addColorStop(0.35, "rgba(212, 175, 55, 0.08)");
    grad.addColorStop(0.7, "rgba(120, 95, 25, 0.02)");
    grad.addColorStop(1, "rgba(5, 5, 7, 0)");
    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, w, h);
    requestAnimationFrame(this.render);
  };
};

// src/sovereign-ui/lumen.ts
var LumenSpotlight = class {
  mouseX = window.innerWidth / 2;
  mouseY = window.innerHeight / 2;
  targetX = window.innerWidth / 2;
  targetY = window.innerHeight / 2;
  spotlightEl = null;
  init() {
    let el = document.getElementById("benni-lumen-spotlight");
    if (!el) {
      el = document.createElement("div");
      el.id = "benni-lumen-spotlight";
      el.setAttribute("aria-hidden", "true");
      el.style.cssText = "position:fixed;top:0;left:0;width:400px;height:400px;border-radius:50%;pointer-events:none;z-index:2;transform:translate(-50%, -50%);background:radial-gradient(circle, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.02) 45%, transparent 70%);mix-blend-mode:screen;transition:opacity 0.3s ease;";
      document.body.appendChild(el);
    }
    this.spotlightEl = el;
    window.addEventListener("pointermove", (e) => {
      this.targetX = e.clientX;
      this.targetY = e.clientY;
    });
    this.loop();
  }
  loop = () => {
    this.mouseX += (this.targetX - this.mouseX) * 0.12;
    this.mouseY += (this.targetY - this.mouseY) * 0.12;
    if (this.spotlightEl) {
      this.spotlightEl.style.transform = `translate3d(${this.mouseX - 200}px, ${this.mouseY - 200}px, 0)`;
    }
    requestAnimationFrame(this.loop);
  };
};

// src/sovereign-ui/magnet.ts
var MagnetField = class {
  elements = [];
  init() {
    this.refresh();
    window.addEventListener("pointermove", (e) => this.onMove(e));
  }
  refresh() {
    this.elements = Array.from(document.querySelectorAll("[data-magnet], .btn-monumental, .btn-primary, .adam-action-pill"));
  }
  onMove(e) {
    const radius = 80;
    for (const el of this.elements) {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.hypot(distX, distY);
      if (distance < radius) {
        const pull = 1 - distance / radius;
        const moveX = distX * pull * 0.32;
        const moveY = distY * pull * 0.32;
        el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      } else {
        el.style.transform = "";
      }
    }
  }
};

// src/sovereign-ui/liquid.ts
var LiquidSurface = class {
  init() {
    const cards = document.querySelectorAll("[data-liquid], .hero-card, .stack-card, .product-card");
    cards.forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width * 100;
        const y = (e.clientY - rect.top) / rect.height * 100;
        card.style.setProperty("--liquid-x", `${x}%`);
        card.style.setProperty("--liquid-y", `${y}%`);
      });
      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--liquid-x", "50%");
        card.style.setProperty("--liquid-y", "50%");
      });
    });
  }
};

// src/sovereign-ui/cera.ts
var CeraHaptics = class _CeraHaptics {
  static trigger(type = "subtle") {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        switch (type) {
          case "subtle":
            navigator.vibrate(8);
            break;
          case "medium":
            navigator.vibrate(22);
            break;
          case "heavy":
            navigator.vibrate([35, 20, 35]);
            break;
        }
      } catch (_) {
      }
    }
  }
  attachListeners() {
    document.addEventListener("click", (e) => {
      const target = e.target.closest("button, a, [data-magnet]");
      if (target) {
        _CeraHaptics.trigger("subtle");
      }
    });
  }
};

// src/sovereign-ui/aura.ts
var AuraAtmosphere = class {
  init() {
    let aura = document.getElementById("benni-aura-layer");
    if (!aura) {
      aura = document.createElement("div");
      aura.id = "benni-aura-layer";
      aura.setAttribute("aria-hidden", "true");
      aura.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:0;background:radial-gradient(ellipse 70% 60% at 50% 20%, rgba(212,175,55,0.035), transparent 80%);";
      document.body.prepend(aura);
    }
  }
};

// src/sovereign-ui/veu.ts
var VeuCinematics = class {
  init() {
    let vignette = document.getElementById("benni-veu-vignette");
    if (!vignette) {
      vignette = document.createElement("div");
      vignette.id = "benni-veu-vignette";
      vignette.setAttribute("aria-hidden", "true");
      vignette.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:9;box-shadow:inset 0 0 120px rgba(5,5,7,0.85);";
      document.body.appendChild(vignette);
    }
  }
};

// src/sovereign-ui/ritual.ts
var RitualProgress = class {
  maxProgress = 0;
  progressBar = null;
  init() {
    let bar = document.getElementById("benni-ritual-ruler");
    if (!bar) {
      bar = document.createElement("div");
      bar.id = "benni-ritual-ruler";
      bar.setAttribute("aria-hidden", "true");
      bar.style.cssText = "position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg, #D4AF37, #FFFFFF);z-index:9999;width:0%;transition:width 0.1s linear;box-shadow:0 0 8px rgba(212,175,55,0.7);";
      document.body.appendChild(bar);
    }
    this.progressBar = bar;
    window.addEventListener("scroll", () => this.update(), { passive: true });
    this.update();
  }
  update() {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    const current = window.scrollY / totalHeight;
    this.maxProgress = Math.max(this.maxProgress, current);
    if (this.progressBar) {
      this.progressBar.style.width = `${(current * 100).toFixed(2)}%`;
    }
  }
};

// src/sovereign-ui/flux.ts
var FluxParticles = class {
  canvas = null;
  ctx = null;
  particles = [];
  init() {
    const canvas = document.createElement("canvas");
    canvas.id = "benni-flux-canvas";
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:1;opacity:0.4;";
    document.body.prepend(canvas);
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.resize();
    window.addEventListener("resize", () => this.resize());
    for (let i = 0; i < 45; i++) {
      this.particles.push({
        x: Math.random() * (this.canvas.width || 800),
        y: Math.random() * (this.canvas.height || 600),
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.2 - Math.random() * 0.3,
        size: 1 + Math.random() * 1.5,
        alpha: 0.1 + Math.random() * 0.5
      });
    }
    this.render();
  }
  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  render = () => {
    if (!this.ctx || !this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "#D4AF37";
    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      this.ctx.globalAlpha = p.alpha;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    }
    this.ctx.globalAlpha = 1;
    requestAnimationFrame(this.render);
  };
};

// src/sovereign-ui/soundscape.ts
var ProceduralSoundscape = class {
  ctx = null;
  isMuted = true;
  masterGain = null;
  init() {
    const saved = localStorage.getItem("benni_sound_enabled");
    if (saved === "true") {
      this.isMuted = false;
    }
    this.injectControl();
  }
  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.15, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }
  playClick(freq = 880) {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.2, this.ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(1e-3, this.ctx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }
  playSubDrone() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(54, this.ctx.currentTime);
    gain.gain.setValueAtTime(1e-3, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.04, this.ctx.currentTime + 0.5);
    gain.gain.exponentialRampToValueAtTime(1e-4, this.ctx.currentTime + 2.5);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 2.6);
  }
  toggle() {
    this.ensureContext();
    this.isMuted = !this.isMuted;
    localStorage.setItem("benni_sound_enabled", String(!this.isMuted));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.15, this.ctx.currentTime);
    }
    if (!this.isMuted) {
      this.playClick(440);
    }
    this.updateButton();
    return !this.isMuted;
  }
  injectControl() {
    let btn = document.getElementById("benni-sound-toggle");
    if (!btn) {
      btn = document.createElement("button");
      btn.id = "benni-sound-toggle";
      btn.className = "nav-sound-toggle";
      btn.title = "Soundscape Procedural";
      btn.style.cssText = "position:fixed;bottom:24px;left:24px;z-index:999;background:rgba(15,15,20,0.85);border:1px solid rgba(212,175,55,0.3);color:#D4AF37;padding:8px 14px;border-radius:24px;font-family:inherit;font-size:11px;letter-spacing:1px;cursor:pointer;backdrop-filter:blur(8px);display:flex;align-items:center;gap:6px;transition:all 0.2s ease;";
      btn.addEventListener("click", () => this.toggle());
      document.body.appendChild(btn);
    }
    this.updateButton();
  }
  updateButton() {
    const btn = document.getElementById("benni-sound-toggle");
    if (btn) {
      btn.innerHTML = this.isMuted ? '<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#666;"></span> AUDIO: OFF' : '<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#D4AF37;box-shadow:0 0 6px #D4AF37;"></span> AUDIO: ON';
    }
  }
};

// src/sovereign-ui/tilt.ts
var TiltEngine = class {
  init() {
    const elements = document.querySelectorAll("[data-tilt], .hero-card, .stack-card");
    elements.forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotateX = (y - cy) / cy * -6;
        const rotateY = (x - cx) / cx * 6;
        el.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`;
      });
      el.addEventListener("pointerleave", () => {
        el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      });
    });
  }
};

// src/sovereign-ui/terminal.ts
var QuantumTerminalStreamer = class {
  container = null;
  logs = [
    "[BENNI-CORE] Sovereign Engine v2026.1 initialized",
    "[NEMESIS] Agent swarm verification: 12 nodes aligned",
    "[INFERENCE] Neural dispatch latency p99: 14.2ms",
    "[SECURITY] Cryptographic state verified (zero drift)",
    "[RITUAL] Spatial audio & optical telemetry active"
  ];
  init() {
    this.container = document.querySelector(".terminal-feed, [data-terminal]");
    if (!this.container) return;
    let index = 0;
    setInterval(() => {
      if (!this.container) return;
      const line = document.createElement("div");
      line.className = "terminal-line";
      line.textContent = this.logs[index % this.logs.length];
      this.container.appendChild(line);
      if (this.container.children.length > 8) {
        this.container.removeChild(this.container.children[0]);
      }
      index++;
    }, 2800);
  }
};

// src/sovereign-ui/perf-monitor.ts
var PerformanceWatchdog = class {
  lastTime = performance.now();
  frames = 0;
  fps = 60;
  init() {
    const loop = (now) => {
      this.frames++;
      if (now >= this.lastTime + 1e3) {
        this.fps = Math.round(this.frames * 1e3 / (now - this.lastTime));
        this.frames = 0;
        this.lastTime = now;
        if (this.fps < 30) {
          document.body.classList.add("low-power-mode");
        }
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
  get currentFps() {
    return this.fps;
  }
};

// src/sovereign-ui/ecosystem-drawer.ts
var EcosystemDrawer = class {
  init() {
    const trigger = document.querySelector("[data-drawer-trigger]");
    const drawer = document.getElementById("benni-ecosystem-drawer");
    if (!trigger || !drawer) return;
    trigger.addEventListener("click", () => {
      const isOpen = drawer.classList.toggle("open");
      trigger.setAttribute("aria-expanded", String(isOpen));
    });
  }
};

// src/sovereign-ui/lethe.ts
var LetheTypography = class {
  init() {
    const headings = document.querySelectorAll("[data-lethe], .monument-title, .hero-chapter-title");
    headings.forEach((el) => {
      el.classList.add("lethe-active");
      el.addEventListener("pointerenter", () => {
        el.style.filter = "blur(1.5px)";
        el.style.letterSpacing = "0.04em";
        setTimeout(() => {
          el.style.filter = "none";
          el.style.letterSpacing = "";
        }, 320);
      });
    });
  }
};

// src/sovereign-ui/spectral.ts
var SpectralAberration = class {
  init() {
    const triggers = document.querySelectorAll("[data-spectral], .badge, .status-pill");
    triggers.forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.08;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.08;
        el.style.textShadow = `${dx.toFixed(1)}px ${dy.toFixed(1)}px 0 rgba(255,0,60,0.4), ${(-dx).toFixed(1)}px ${(-dy).toFixed(1)}px 0 rgba(0,220,255,0.4)`;
      });
      el.addEventListener("pointerleave", () => {
        el.style.textShadow = "";
      });
    });
  }
};

// src/sovereign-ui/audio-visualizer.ts
var AudioVisualizerEngine = class {
  init() {
    const visualizerContainers = document.querySelectorAll("[data-audio-viz], .sound-wave-container");
    visualizerContainers.forEach((container) => {
      container.innerHTML = "";
      const barCount = 16;
      for (let i = 0; i < barCount; i++) {
        const bar = document.createElement("div");
        bar.className = "audio-viz-bar";
        bar.style.cssText = "width:2px;background:#D4AF37;height:4px;display:inline-block;margin:0 1px;transition:height 0.08s ease;opacity:0.75;";
        container.appendChild(bar);
      }
      setInterval(() => {
        const bars = container.querySelectorAll(".audio-viz-bar");
        bars.forEach((bar, idx) => {
          const h = 3 + Math.sin(Date.now() * 8e-3 + idx * 0.5) * 12 + Math.random() * 6;
          bar.style.height = `${Math.max(2, h).toFixed(1)}px`;
        });
      }, 90);
    });
  }
};

// src/sovereign-ui/genesis-controller.ts
var GenesisIdeController = class {
  init() {
    const track = document.getElementById("genesisIde");
    const stage = document.querySelector(".genesis-pin-stage");
    const desktop = document.querySelector(".genesis-desktop-frame");
    const mobile = document.querySelector(".genesis-mobile-frame");
    const header = document.querySelector(".genesis-header-hud");
    const phaseFill = document.querySelector(".genesis-phase-fill");
    const phaseNum = document.getElementById("genesisPhaseNum");
    const phaseTitle = document.getElementById("genesisPhaseTitle");
    const approveBtn = document.querySelector(".mobile-touch-approve");
    const founderPanel = document.querySelector(".genesis-founder-panel");
    const modePills = document.querySelectorAll(".genesis-mode-pill");
    const diffAddLines = document.querySelectorAll(".code-diff-add");
    const diffDelLines = document.querySelectorAll(".code-diff-del");
    if (!track || !stage || !desktop || !mobile) return;
    const onScroll = () => {
      const rect = track.getBoundingClientRect();
      const totalScrollable = track.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;
      const progress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);
      if (phaseFill) {
        phaseFill.style.width = `${(progress * 100).toFixed(1)}%`;
      }
      if (progress < 0.2) {
        const p1 = progress / 0.2;
        if (phaseNum) phaseNum.textContent = "01";
        if (phaseTitle) phaseTitle.textContent = "CORE AWAKENING";
        const desktopY = (1 - p1) * 120;
        const desktopRotX = (1 - p1) * 20;
        const desktopScale = 0.88 + p1 * 0.12;
        desktop.style.transform = `translate3d(0, ${desktopY}px, 0) rotateX(${desktopRotX}deg) scale(${desktopScale})`;
        desktop.style.opacity = String(0.3 + p1 * 0.7);
        mobile.style.transform = "translate3d(140%, 0, 100px) rotateY(45deg)";
        mobile.style.opacity = "0";
        if (header) {
          header.style.opacity = "1";
          header.style.transform = "translate3d(0, 0, 0)";
        }
        if (founderPanel) founderPanel.classList.remove("visible");
      } else if (progress >= 0.2 && progress < 0.45) {
        const p2 = (progress - 0.2) / 0.25;
        if (phaseNum) phaseNum.textContent = "02";
        if (phaseTitle) phaseTitle.textContent = "DUAL SURFACE COLLISION";
        const deskX = -p2 * 120;
        const deskRotY = p2 * -6;
        desktop.style.transform = `translate3d(${deskX}px, 0, 0) rotateY(${deskRotY}deg) scale(0.95)`;
        desktop.style.opacity = "1";
        const mobX = (1 - p2) * 120;
        const mobRotY = (1 - p2) * 40 - 6;
        const mobZ = p2 * 60;
        mobile.style.transform = `translate3d(${mobX}%, 0, ${mobZ}px) rotateY(${mobRotY}deg)`;
        mobile.style.opacity = String(Math.min(1, p2 * 1.5));
        if (header) {
          header.style.opacity = String(1 - p2 * 0.5);
        }
        if (founderPanel) founderPanel.classList.remove("visible");
      } else if (progress >= 0.45 && progress < 0.7) {
        const p3 = (progress - 0.45) / 0.25;
        if (phaseNum) phaseNum.textContent = "03";
        if (phaseTitle) phaseTitle.textContent = "AUTONOMOUS CODE DIFF";
        desktop.style.transform = "translate3d(-120px, 0, 0) rotateY(-6deg) scale(0.96)";
        desktop.style.opacity = "1";
        mobile.style.transform = "translate3d(0%, 0, 60px) rotateY(-6deg)";
        mobile.style.opacity = "1";
        if (p3 > 0.3) {
          diffDelLines.forEach((l) => l.style.opacity = "0.4");
          diffAddLines.forEach((l) => l.style.opacity = "1");
        } else {
          diffDelLines.forEach((l) => l.style.opacity = "1");
          diffAddLines.forEach((l) => l.style.opacity = "0.3");
        }
        if (p3 > 0.6 && approveBtn) {
          approveBtn.classList.add("approved");
          approveBtn.textContent = "\u2713 SIGNED & AUDITED";
        } else if (approveBtn) {
          approveBtn.classList.remove("approved");
          approveBtn.textContent = "TOUCH TO APPROVE";
        }
        if (founderPanel) founderPanel.classList.remove("visible");
      } else if (progress >= 0.7 && progress < 0.9) {
        const p4 = (progress - 0.7) / 0.2;
        if (phaseNum) phaseNum.textContent = "04";
        if (phaseTitle) phaseTitle.textContent = "5 SOVEREIGN MODES";
        desktop.style.transform = "translate3d(-140px, -20px, -50px) rotateY(-10deg) scale(0.88)";
        mobile.style.transform = "translate3d(20px, 10px, 40px) rotateY(-2deg) scale(0.92)";
        const activeModeIndex = Math.min(Math.floor(p4 * 5), 4);
        modePills.forEach((pill, idx) => {
          if (idx === activeModeIndex) {
            pill.classList.add("active");
          } else {
            pill.classList.remove("active");
          }
        });
        if (founderPanel) founderPanel.classList.remove("visible");
      } else {
        if (phaseNum) phaseNum.textContent = "05";
        if (phaseTitle) phaseTitle.textContent = "FOUNDER ALPHA";
        desktop.style.transform = "translate3d(0, 0, -200px) scale(0.7)";
        desktop.style.opacity = "0.2";
        mobile.style.transform = "translate3d(0, 0, -100px) scale(0.7)";
        mobile.style.opacity = "0.2";
        if (founderPanel) founderPanel.classList.add("visible");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
  }
};

// src/sovereign-ui/orchestrator.ts
var SovereignUIOrchestrator = class {
  halo = new HaloEngine();
  lumen = new LumenSpotlight();
  magnet = new MagnetField();
  liquid = new LiquidSurface();
  cera = new CeraHaptics();
  aura = new AuraAtmosphere();
  veu = new VeuCinematics();
  ritual = new RitualProgress();
  flux = new FluxParticles();
  sound = new ProceduralSoundscape();
  tilt = new TiltEngine();
  terminal = new QuantumTerminalStreamer();
  perf = new PerformanceWatchdog();
  drawer = new EcosystemDrawer();
  lethe = new LetheTypography();
  spectral = new SpectralAberration();
  audioViz = new AudioVisualizerEngine();
  genesis = new GenesisIdeController();
  boot() {
    console.log("\u{1F3DB}\uFE0F Initializing Sovereign UI Suite (30 Orchestrated Primitives)...");
    this.halo.init();
    this.lumen.init();
    this.magnet.init();
    this.liquid.init();
    this.cera.attachListeners();
    this.aura.init();
    this.veu.init();
    this.ritual.init();
    this.flux.init();
    this.sound.init();
    this.tilt.init();
    this.terminal.init();
    this.perf.init();
    this.drawer.init();
    this.lethe.init();
    this.spectral.init();
    this.audioViz.init();
    this.genesis.init();
    console.log("\u2728 Sovereign UI Suite Active: 60 FPS Target Locked");
  }
};

// src/sovereign-ui/index.ts
var sovereignUI = new SovereignUIOrchestrator();

// src/main.ts
window.__BENNI_SOVEREIGN_UI__ = sovereignUI;
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => sovereignUI.boot());
} else {
  sovereignUI.boot();
}
console.log("\u{1F3DB}\uFE0F BENNI\xB7OS Sovereign UI Orchestrator Online");
