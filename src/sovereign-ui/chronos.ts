import { SpringConfig } from './types';

export class Spring {
  private current: number;
  private target: number;
  private velocity: number = 0;
  private config: SpringConfig;

  constructor(initial: number = 0, config: Partial<SpringConfig> = {}) {
    this.current = initial;
    this.target = initial;
    this.config = {
      stiffness: config.stiffness ?? 300,
      damping: config.damping ?? 20,
      mass: config.mass ?? 1,
      precision: config.precision ?? 0.001
    };
  }

  setTarget(target: number): void {
    this.target = target;
  }

  setImmediate(val: number): void {
    this.current = val;
    this.target = val;
    this.velocity = 0;
  }

  update(dt: number = 1 / 60): number {
    const force = -this.config.stiffness * (this.current - this.target);
    const dampingForce = -this.config.damping * this.velocity;
    const acceleration = (force + dampingForce) / this.config.mass;

    this.velocity += acceleration * dt;
    this.current += this.velocity * dt;

    if (Math.abs(this.velocity) < (this.config.precision ?? 0.001) && Math.abs(this.current - this.target) < (this.config.precision ?? 0.001)) {
      this.current = this.target;
      this.velocity = 0;
    }

    return this.current;
  }

  get value(): number {
    return this.current;
  }

  get isAtRest(): boolean {
    return this.current === this.target && this.velocity === 0;
  }
}
