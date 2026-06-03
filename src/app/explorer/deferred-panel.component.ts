import { Component, NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';

// Used only inside the @defer block on the detail page, so the compiler
// splits it into its own lazy chunk.
@Component({
  selector: 'ng22-deferred-panel',
  template: `
    <StackLayout class="deferred-panel mb-3">
      <Label text="🏝️" class="deferred-glyph"></Label>
      <Label text="Island hydrated!" class="deferred-title"></Label>
      <Label [text]="'This component shipped in its own lazy chunk and ran ' + builtAt()" class="deferred-body" textWrap="true"></Label>
    </StackLayout>
  `,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class DeferredPanelComponent {
  // Timestamp from when this component was created, not page load.
  readonly builtAt = signal(`at ${new Date().toLocaleTimeString()}`);
}
