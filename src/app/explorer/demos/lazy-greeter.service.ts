import { Injectable } from '@angular/core';

// Kept in its own module so injectAsync()'s dynamic import() splits it into
// a separate lazy chunk.
@Injectable({ providedIn: 'root' })
export class LazyGreeter {
  private readonly loadedAt = new Date().toLocaleTimeString();

  greet(name: string): string {
    return `👋 Hello from ${name}! This greeter was lazily injected at ${this.loadedAt}.`;
  }
}
