import { computed, Injectable, signal } from '@angular/core';
import { CATEGORIES, FeatureCategory, NgFeature } from './feature.model';
import { FEATURES } from './features.data';

// Signal store for the feature catalog. Search and category filtering
// are derived with computed().
@Injectable({ providedIn: 'root' })
export class FeaturesService {
  readonly all = signal<NgFeature[]>(FEATURES);

  // Search query, matched against title and tagline.
  readonly query = signal('');

  // null means all categories.
  readonly activeCategory = signal<FeatureCategory | null>(null);

  readonly categories = CATEGORIES;

  readonly filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    const cat = this.activeCategory();
    return this.all().filter((f) => {
      const matchesCat = !cat || f.category === cat;
      const matchesQuery = !q || f.title.toLowerCase().includes(q) || f.tagline.toLowerCase().includes(q) || f.category.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  });

  readonly totalCount = computed(() => this.all().length);
  readonly resultCount = computed(() => this.filtered().length);

  byId(id: string): NgFeature | undefined {
    return this.all().find((f) => f.id === id);
  }

  setCategory(cat: FeatureCategory | null) {
    this.activeCategory.set(this.activeCategory() === cat ? null : cat);
  }

  clear() {
    this.query.set('');
    this.activeCategory.set(null);
  }
}

export type { NgFeature, FeatureCategory };
