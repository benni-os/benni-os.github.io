// src/main.ts
import './wave14/performance';
import './genesis-ide.css';
import { sovereignUI } from './sovereign-ui';

declare global {
  interface Window {
    __BENNI_SOVEREIGN_UI__?: typeof sovereignUI;
  }
}

window.__BENNI_SOVEREIGN_UI__ = sovereignUI;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => sovereignUI.boot());
} else {
  sovereignUI.boot();
}

console.log('🏛️ BENNI·OS Sovereign UI Orchestrator Online');
