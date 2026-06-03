import {
  bootstrapApplication,
  provideNativeScriptHttpClient,
  provideNativeScriptRouter,
  runNativeScriptAngularApp,
  provideComponentInputBinding,
} from '@nativescript/angular';
import { Trace, Utils } from '@nativescript/core';

import { withInterceptorsFromDi } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

Trace.enable();
Trace.setCategories('ns-route-reuse-strategy,ns-router');

if (__APPLE__) {
  const keyboardManager = IQKeyboardManager.shared;
  keyboardManager.isEnabled = true;
  keyboardManager.enableAutoToolbar = true;
}

runNativeScriptAngularApp({
  appModuleBootstrap: () => {
    if (__APPLE__) {
      // Match the dark theme behind the app.
      Utils.ios.setWindowBackgroundColor('#08060F');
    }
    return bootstrapApplication(AppComponent, {
      providers: [
        provideNativeScriptHttpClient(withInterceptorsFromDi()),
        provideNativeScriptRouter(routes),
        provideComponentInputBinding(),
        provideZonelessChangeDetection()
      ],
    });
  },
});
