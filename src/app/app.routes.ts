import { Routes } from '@angular/router';
import { ExplorerComponent } from './explorer/explorer.component';
import { FeatureDetailComponent } from './explorer/feature-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/explore', pathMatch: 'full' },
  { path: 'explore', component: ExplorerComponent },
  // :id binds to the component's id input.
  { path: 'feature/:id', component: FeatureDetailComponent },
];
