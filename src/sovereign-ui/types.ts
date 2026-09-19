export interface Vector2D {
  x: number;
  y: number;
}

export interface SpringConfig {
  stiffness: number;
  damping: number;
  mass: number;
  precision?: number;
}

export interface SovereignUIConfig {
  enableAudio: boolean;
  enableTilt: boolean;
  enableMagnet: boolean;
  enableHalo: boolean;
  enableFlux: boolean;
  reducedMotion: boolean;
  fpsTarget: number;
}

export type ThemePalette = {
  noir: string;
  gold: string;
  goldDim: string;
  surface: string;
  border: string;
  glow: string;
};
