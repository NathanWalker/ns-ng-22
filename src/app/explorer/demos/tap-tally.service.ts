import { Service, signal } from '@angular/core';

// Uses the @Service() decorator, which auto-provides the class to DI. No
// @Injectable or providers array needed.
@Service()
export class TapTallyService {
  readonly taps = signal(0);

  bump() {
    this.taps.update((n) => n + 1);
  }

  reset() {
    this.taps.set(0);
  }
}
