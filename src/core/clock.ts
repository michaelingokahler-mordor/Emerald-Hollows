import { TICK_MS } from './types';
export class FixedClock {
  accumulator=0;
  advance(delta:number,step:()=>void): number {
    if (!Number.isFinite(delta) || delta<0) return this.accumulator/TICK_MS;
    this.accumulator+=delta;
    while (this.accumulator+1e-7>=TICK_MS) { this.accumulator-=TICK_MS; step(); }
    return Math.max(0,this.accumulator/TICK_MS);
  }
  reset(): void { this.accumulator=0; }
}
