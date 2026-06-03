// An Angular 22 feature shown in the explorer.
export interface NgFeature {
  // Slug used in the route: /feature/:id
  id: string;
  title: string;
  tagline: string;
  category: FeatureCategory;
  // Emoji shown as the card glyph.
  icon: string;
  // Accent color (hex).
  accent: string;
  description: string;
  why: string;
  // Code snippet shown on the detail page.
  code: string;
  // Optional interactive demo on the detail page.
  demo?: DemoKind;
  // Pre-release the feature landed in.
  since: string;
}

export type DemoKind = 'counter' | 'debounce' | 'nullable' | 'defer' | 'signal-forms' | 'service' | 'inject-async' | 'resource' | 'switch' | 'http';

export type FeatureCategory = 'Signals' | 'Components' | 'Templates' | 'Forms' | 'Performance' | 'Resources & HTTP' | 'Tooling & AI' | 'Router' | 'Testing';

export const CATEGORIES: FeatureCategory[] = ['Signals', 'Components', 'Templates', 'Forms', 'Performance', 'Resources & HTTP', 'Tooling & AI', 'Router', 'Testing'];
