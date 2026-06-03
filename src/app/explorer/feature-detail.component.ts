import { Component, computed, effect, inject, input, NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { NativeScriptCommonModule, RouterExtensions } from '@nativescript/angular';
import { MdCodeBlock } from '@nstudio/nstreamdown/angular';
import { DeferredPanelComponent } from './deferred-panel.component';
import { HttpDemoComponent } from './demos/http-demo.component';
import { InjectAsyncDemoComponent } from './demos/inject-async-demo.component';
import { ResourceDemoComponent } from './demos/resource-demo.component';
import { ServiceDemoComponent } from './demos/service-demo.component';
import { SignalFormDemoComponent } from './demos/signal-form-demo.component';
import { SwitchDemoComponent } from './demos/switch-demo.component';
import { FeaturesService } from './features.service';

@Component({
  selector: 'ng22-feature-detail',
  templateUrl: './feature-detail.component.html',
  // DeferredPanelComponent is lazily loaded via the @defer block below.
  imports: [NativeScriptCommonModule, DeferredPanelComponent, MdCodeBlock, SignalFormDemoComponent, ServiceDemoComponent, InjectAsyncDemoComponent, ResourceDemoComponent, SwitchDemoComponent, HttpDemoComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class FeatureDetailComponent {
  private readonly store = inject(FeaturesService);
  private readonly router = inject(RouterExtensions);
  isAndroid = __ANDROID__;

  // Bound from the route param.
  readonly id = input<string>('');

  readonly feature = computed(() => this.store.byId(this.id()));

  // Signal counter
  readonly count = signal(0);
  readonly doubled = computed(() => this.count() * 2);

  // Debounced signal
  readonly draft = signal('');
  readonly keystrokes = signal(0);
  private readonly _settled = signal('');
  readonly settled = this._settled.asReadonly();
  readonly settling = computed(() => this.draft() !== this._settled());

  // Safe navigation
  readonly user = signal<{ name: string } | null>({ name: 'Ada Lovelace' });

  // @defer block
  readonly showDeferred = signal(false);

  constructor() {
    // Debounce the draft signal by 350ms using an effect.
    effect((onCleanup) => {
      const value = this.draft();
      const timer = setTimeout(() => this._settled.set(value), 350);
      onCleanup(() => clearTimeout(timer));
    });
  }

  back() {
    if (this.router.canGoBack()) {
      this.router.back();
    } else {
      this.router.navigate(['/explore'], { clearHistory: true });
    }
  }

  inc() {
    this.count.update((n) => n + 1);
  }
  dec() {
    this.count.update((n) => Math.max(0, n - 1));
  }
  reset() {
    this.count.set(0);
  }

  onDraft(args: any) {
    this.draft.set(args?.object?.text ?? '');
    this.keystrokes.update((n) => n + 1);
  }

  toggleUser() {
    this.user.update((u) => (u ? null : { name: 'Ada Lovelace' }));
  }

  loadDeferred() {
    this.showDeferred.set(true);
  }
}
