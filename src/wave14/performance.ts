// src/wave14/performance.ts

declare const THREE: any;
declare const puter: any;

declare global {
  interface Window {
    __BENNI_DROP__?: { init?: () => void };
  }
}

export function initWave14() {
  console.log('🌊 Wave 14 – Performance & Content Integration (Vite + PWA)');

  // 1. Lazy Loading (imagens/vídeos)
  const lazyElements = document.querySelectorAll('img.lazy, video.lazy, .lazy');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLImageElement | HTMLVideoElement | HTMLElement;
          if (el.tagName === 'IMG' && el.dataset.src) {
            (el as HTMLImageElement).src = el.dataset.src;
            el.onload = () => el.classList.add('loaded');
          }
          if (el.tagName === 'VIDEO' && el.dataset.src) {
            (el as HTMLVideoElement).src = el.dataset.src;
            (el as HTMLVideoElement).load();
            el.classList.add('loaded');
          }
          if (el.dataset.src && el.tagName !== 'IMG' && el.tagName !== 'VIDEO') {
            el.style.backgroundImage = `url(${el.dataset.src})`;
            el.classList.add('loaded');
          }
          observer.unobserve(el);
        }
      });
    }, { rootMargin: '200px 0px' });
    lazyElements.forEach(el => observer.observe(el));
  }

  // 2. Lazy Loading do Three.js (Fallback On-Demand)
  const threeSection = document.querySelector('#benjaminPullquote, #wave12-canvas');
  let threeLoaded = typeof THREE !== 'undefined';

  function loadThree(): Promise<void> {
    if (threeLoaded || typeof THREE !== 'undefined') {
      threeLoaded = true;
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      script.async = true;
      script.onload = () => { threeLoaded = true; resolve(); };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  if (threeSection && 'IntersectionObserver' in window && !threeLoaded) {
    const threeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !threeLoaded) {
          loadThree().then(() => {
            console.log('✅ Three.js carregado sob demanda');
            if (window.__BENNI_DROP__?.init) window.__BENNI_DROP__.init();
          }).catch(() => console.warn('⚠️ Three.js falhou, usando fallback 2D'));
        }
      });
    }, { rootMargin: '400px 0px' });
    threeObserver.observe(threeSection);
  }

  // 3. Puter KV Integration (Conteúdo Dinâmico Serverless)
  async function loadPuterContent() {
    if (typeof puter === 'undefined') {
      console.log('ℹ️ Puter SDK em modo offline/local');
      return;
    }
    try {
      const kv = puter.kv;
      if (!kv) return;
      const keys = ['hero_title', 'hero_body', 'dossier_declaration'];
      for (const key of keys) {
        const value = await kv.get(key);
        if (value) {
          const el = document.querySelector(`[data-content="${key}"]`);
          if (el) {
            el.innerHTML = value;
            el.classList.remove('dynamic-content-placeholder');
          }
        }
      }
      console.log('✅ Conteúdo dinâmico do Puter carregado com sucesso');
    } catch (e) {
      console.warn('⚠️ Informação Puter KV:', e);
    }
  }

  if (document.readyState === 'complete') {
    loadPuterContent();
  } else {
    window.addEventListener('load', loadPuterContent);
  }

  // 4. Performance Monitoring (LCP, FCP)
  if ('performance' in window && 'PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const last = entries[entries.length - 1];
        if (last) {
          const lcp = last.startTime;
          console.log(`📊 LCP (Largest Contentful Paint): ${Math.round(lcp)}ms`);
          if (lcp > 2500) console.warn('⚠️ LCP alto. Otimize imagens e fontes.');
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (_) { /* ignore observer errors */ }
  }

  console.log('✅ Wave 14 (Vite + PWA) ativada!');
}

// Executa automaticamente se o módulo for carregado
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWave14);
} else {
  initWave14();
}
