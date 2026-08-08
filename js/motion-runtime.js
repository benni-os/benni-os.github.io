/**
 * Benni OS — Motion Runtime Engine v2.0.0
 * 
 * Consumes motion-manifest.json and provides scroll-driven video narrative
 * with strict memory budget: max 2 videos loaded simultaneously.
 * 
 * @license MIT
 * @trace motion-runtime-narrative-20260808-0441
 */
(function(global) {
  'use strict';

  /* ── Narrative State Definitions ────────────────────────────── */

  const NARRATIVE_STATES = [
    { id: 'intent',        motionId: 'intent-to-evidence',    label: 'Intent Received',  color: '#00ffe0', phase: '01' },
    { id: 'control-plane', motionId: 'operation-pipeline',    label: 'Control Plane',    color: '#7c5cfc', phase: '02' },
    { id: 'agent-mesh',    motionId: 'agent-mesh-activation', label: 'Agent Mesh',       color: '#00ff88', phase: '03' },
    { id: 'execution',     motionId: 'ecosystem-activation',  label: 'Execution',        color: '#ffb703', phase: '04' },
    { id: 'evidence',      motionId: 'evidence-return',       label: 'Evidence',         color: '#f8fafc', phase: '05' }
  ];

  /* ── Minimal Event Emitter ─────────────────────────────────── */

  class EventEmitter {
    constructor() { this._events = {}; }
    on(evt, fn)  { (this._events[evt] = this._events[evt] || []).push(fn); return this; }
    off(evt, fn) { if (this._events[evt]) this._events[evt] = this._events[evt].filter(f => f !== fn); return this; }
    emit(evt, ...args) { (this._events[evt] || []).forEach(fn => { try { fn(...args); } catch(e) { console.error('[MotionRuntime]', e); } }); }
  }

  /* ── Motion Runtime ────────────────────────────────────────── */

  class MotionRuntime extends EventEmitter {
    constructor(manifestUrl) {
      super();
      this.manifestUrl = manifestUrl || 'data/motion-manifest.json';
      this.manifest    = null;
      this.assets      = new Map();
      this.videos      = new Map();       // motionId -> <video> element
      this.loaded      = new Set();       // motionIds with active src
      this.activeStateIndex = -1;
      this._crossfadeTimer  = null;
      this._isMobile = window.innerWidth < 768;
      this._canWebm  = false;

      // Reduced motion
      this._rmq = window.matchMedia('(prefers-reduced-motion: reduce)');
      this._rmq.addEventListener('change', () => {
        this.emit('reducedMotionChanged', this._rmq.matches);
        this._applyMotionPreferences();
      });

      // Viewport change detection
      let resizeDebounce;
      window.addEventListener('resize', () => {
        clearTimeout(resizeDebounce);
        resizeDebounce = setTimeout(() => {
          this._isMobile = window.innerWidth < 768;
        }, 250);
      }, { passive: true });
    }

    /* ── Init ─────────────────────────────────────────────────── */

    async init() {
      try {
        const res = await fetch(this.manifestUrl);
        if (!res.ok) throw new Error(`Manifest fetch failed: ${res.status}`);
        this.manifest = await res.json();

        // WebM support detection (cached once)
        const probe = document.createElement('video');
        this._canWebm = !!(probe.canPlayType('video/webm; codecs="vp9"') || probe.canPlayType('video/webm'));

        // Index assets
        this.manifest.assets.forEach(asset => this.assets.set(asset.id, asset));

        // Scan DOM for managed videos
        this._scanDOM();

        // Store narrative states ref
        if (this.manifest.narrative_states) {
          // Manifest can override default states
          this._narrativeStates = this.manifest.narrative_states.map(ns => {
            const base = NARRATIVE_STATES.find(n => n.id === ns.id) || {};
            return {
              ...base,
              ...ns,
              motionId: ns.asset_id || ns.motionId || base.motionId
            };
          });
        } else {
          this._narrativeStates = NARRATIVE_STATES;
        }

        this._applyMotionPreferences();
        this.emit('ready', { assetCount: this.assets.size, videoCount: this.videos.size });
      } catch (err) {
        this.emit('error', err);
        console.error('[MotionRuntime] init failed:', err);
      }
    }

    /* ── DOM Scan ─────────────────────────────────────────────── */

    _scanDOM() {
      document.querySelectorAll('video[data-motion-id]').forEach(video => {
        const motionId = video.dataset.motionId;
        if (!this.assets.has(motionId)) return;
        this.videos.set(motionId, video);

        // Enforce memory defaults
        video.preload    = 'none';
        video.muted      = true;
        video.playsInline = true;
        video.controls   = false;

        // Set poster from manifest
        const asset = this.assets.get(motionId);
        if (asset.fallback) video.poster = asset.fallback;
      });
    }

    /* ── Source Resolution ─────────────────────────────────────── */

    _getSrc(asset) {
      if (this._isMobile) {
        return asset.mobile || asset.desktop;
      }
      if (this._canWebm && asset.webm) return asset.webm;
      return asset.desktop;
    }

    /* ── Reduced Motion ───────────────────────────────────────── */

    get reducedMotion() { return this._rmq.matches; }

    _applyMotionPreferences() {
      if (!this.reducedMotion) return;
      // Pause and unload everything
      this.pauseAll();
      this.videos.forEach((video, id) => {
        this._unloadSrc(id);
        const asset = this.assets.get(id);
        if (asset && asset.reduced_motion) video.poster = asset.reduced_motion;
      });
    }

    /* ── Video Lifecycle (Memory Budget) ──────────────────────── */

    _loadSrc(motionId) {
      if (this.reducedMotion) return false;
      const video = this.videos.get(motionId);
      const asset = this.assets.get(motionId);
      if (!video || !asset) return false;
      if (this.loaded.has(motionId)) return true;

      // Budget enforcement: max 2, prefer lighter assets
      if (this.loaded.size >= 2) {
        this._evictHeaviest(motionId);
      }

      const src = this._getSrc(asset);
      if (!src) return false;

      video.src = src;
      video.preload = 'auto';
      video.load();
      this.loaded.add(motionId);
      this.emit('loaded', { motionId, sizeHint: asset.size_hint_mb || 0 });
      return true;
    }

    _unloadSrc(motionId) {
      const video = this.videos.get(motionId);
      if (!video) return;
      if (!this.loaded.has(motionId)) return;
      video.pause();
      video.removeAttribute('src');
      video.load(); // Reset internal state
      this.loaded.delete(motionId);
    }

    /**
     * Evict the heaviest currently loaded video that is not the requested one
     */
    _evictHeaviest(keepId) {
      let heaviestId = null;
      let heaviestSize = -1;

      this.loaded.forEach(id => {
        if (id === keepId) return;
        const asset = this.assets.get(id);
        const size = asset?.size_hint_mb || 10;
        if (size > heaviestSize) {
          heaviestSize = size;
          heaviestId = id;
        }
      });

      if (heaviestId) {
        this._unloadSrc(heaviestId);
      }
    }

    getLoadedCount() { return this.loaded.size; }

    /**
     * Preload inteligente:
     * - Respeita max 2 vídeos
     * - Prefere assets com preload_priority mais baixo (1 = mais importante)
     * - Evita carregar assets > 15MB se já houver um carregado
     */
    preloadNext(currentIndex) {
      const states = this._narrativeStates || NARRATIVE_STATES;
      if (currentIndex + 1 >= states.length) return;

      const nextState = states[currentIndex + 1];
      const nextId = nextState.motionId || nextState.asset_id;
      if (!nextId || this.loaded.has(nextId)) return;

      const asset = this.assets.get(nextId);
      if (!asset) return;

      // Skip very heavy assets if we already have one loaded
      const sizeHint = asset.size_hint_mb || 10;
      if (sizeHint > 15 && this.loaded.size >= 1) {
        return;
      }

      // Enforce budget
      if (this.loaded.size >= 2) {
        this._abortDistant(currentIndex, 1);
      }

      this._loadSrc(nextId);
    }

    /**
     * Abort loads outside the given range of the current index
     */
    _abortDistant(currentIndex, range) {
      const states = this._narrativeStates || NARRATIVE_STATES;
      const keep = new Set();
      for (let i = Math.max(0, currentIndex - range); i <= Math.min(states.length - 1, currentIndex + range); i++) {
        const id = states[i].motionId || states[i].asset_id;
        if (id) keep.add(id);
      }
      this.loaded.forEach(id => {
        if (!keep.has(id)) this._unloadSrc(id);
      });
    }

    /* ── Playback Controls ────────────────────────────────────── */

    play(motionId) {
      if (this.reducedMotion) return;
      const video = this.videos.get(motionId);
      if (!video) return;
      // Ensure src is loaded
      if (!this.loaded.has(motionId)) this._loadSrc(motionId);
      video.play().catch(() => {}); // Suppress autoplay policy errors
    }

    pause(motionId) {
      const video = this.videos.get(motionId);
      if (video && !video.paused) video.pause();
    }

    pauseAll() {
      this.videos.forEach(v => { if (!v.paused) v.pause(); });
    }

    seekTo(motionId, progress) {
      const video = this.videos.get(motionId);
      if (video && video.duration && isFinite(video.duration)) {
        video.currentTime = video.duration * Math.max(0, Math.min(1, progress));
      }
    }

    getState(motionId) {
      const video = this.videos.get(motionId);
      if (!video) return null;
      const dur = video.duration || 0;
      return {
        playing: !video.paused,
        currentTime: video.currentTime,
        duration: dur,
        progress: dur > 0 ? video.currentTime / dur : 0,
        loaded: this.loaded.has(motionId)
      };
    }

    /* ── Crossfade (max 2 videos) ─────────────────────────────── */

    crossfade(fromId, toId, durationMs = 600) {
      if (this.reducedMotion) return;
      if (this._crossfadeTimer) clearTimeout(this._crossfadeTimer);

      const toVideo   = this.videos.get(toId);
      const fromVideo = this.videos.get(fromId);

      // Fade in target
      if (toVideo) {
        toVideo.style.transition = `opacity ${durationMs}ms ease-in-out`;
        toVideo.style.opacity = '1';
        this.play(toId);
      }

      // Fade out source, then unload after transition
      if (fromVideo && fromId !== toId) {
        fromVideo.style.transition = `opacity ${durationMs}ms ease-in-out`;
        fromVideo.style.opacity = '0';
        this._crossfadeTimer = setTimeout(() => {
          this._unloadSrc(fromId);
          this._crossfadeTimer = null;
        }, durationMs + 50);
      }
    }

    /* ── Narrative State Machine ──────────────────────────────── */

    get narrativeStates() { return this._narrativeStates || NARRATIVE_STATES; }
    get activeState() { return this.activeStateIndex >= 0 ? this.narrativeStates[this.activeStateIndex] : null; }

    setActiveState(index) {
      const states = this.narrativeStates;
      if (index < 0 || index >= states.length) return;
      if (index === this.activeStateIndex) return; // No-op if same

      const previousIndex = this.activeStateIndex;
      const previousState = previousIndex >= 0 ? states[previousIndex] : null;
      const nextState     = states[index];

      this.activeStateIndex = index;

      // Emit state change regardless of motion preference (text content depends on it)
      this.emit('stateChanged', {
        index,
        state: nextState,
        previousIndex,
        previousState
      });

      // Abort distant loads and enforce budget
      this._abortDistant(index, 1);

      if (this.reducedMotion) return;

      // Load the target video
      this._loadSrc(nextState.motionId);
      const toVideo = this.videos.get(nextState.motionId);
      if (!toVideo) return;

      const activate = () => {
        if (previousState && previousState.motionId !== nextState.motionId) {
          this.crossfade(previousState.motionId, nextState.motionId, 600);
        } else {
          toVideo.style.opacity = '1';
          this.play(nextState.motionId);
        }
        // Preload next in background
        this.preloadNext(index);
      };

      // Wait for video to be playable if not ready
      if (toVideo.readyState >= 3) {
        activate();
      } else {
        const onReady = () => { activate(); toVideo.removeEventListener('canplay', onReady); };
        toVideo.addEventListener('canplay', onReady);
        // Timeout fallback: if video takes too long, show it anyway
        setTimeout(() => {
          toVideo.removeEventListener('canplay', onReady);
          activate();
        }, 2000);
      }
    }

    /* ── GSAP matchMedia Integration ──────────────────────────── */

    /**
     * Creates a gsap.context() with matchMedia for reduced motion.
     * Usage:
     *   const ctx = motionRuntime.createGSAPContext(container);
     *   // ctx auto-cleans on revert
     * 
     * Returns { context, matchMedia } or null if GSAP unavailable.
     */
    createGSAPContext(container) {
      if (typeof gsap === 'undefined') return null;
      if (typeof gsap.matchMedia !== 'function') return null;

      const mm = gsap.matchMedia();
      const ctx = gsap.context(() => {
        mm.add('(prefers-reduced-motion: no-preference)', () => {
          // Animations go inside this block
          // They'll be automatically reverted when reduced motion is enabled
          return () => {
            // Cleanup callback
            this.pauseAll();
          };
        });
      }, container);

      return { context: ctx, matchMedia: mm };
    }

    /* ── Destroy ──────────────────────────────────────────────── */

    destroy() {
      if (this._crossfadeTimer) clearTimeout(this._crossfadeTimer);
      this.pauseAll();
      this.loaded.forEach(id => this._unloadSrc(id));
      this.videos.clear();
      this.assets.clear();
      this._events = {};
    }
  }

  // Expose
  global.MotionRuntime   = MotionRuntime;
  global.NARRATIVE_STATES = NARRATIVE_STATES;

})(window);
