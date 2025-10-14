import { computed, inject, Injectable, signal } from '@angular/core';
import { DataService } from '../../../services/data/data.service';
import { catchError, Observable, of, tap } from 'rxjs';
import { I18nService } from '../../../services/i18n/i18n.service';
import { RawExperience } from '../models/raw-experience.type';

@Injectable({
  providedIn: 'root',
})
export class ExperiencesService {
  readonly isLoading = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  readonly hasError = computed(() => this.error() !== null);
  readonly placeholder = computed(() => (this.hasError() ? this.error() : 'experiences.unreachable'));
  readonly isEmpty = computed(() => !this.hasError() && this.experiences().length === 0);
  readonly shouldDisplayPlaceholder = computed(() => this.hasError() || this.isEmpty());
  private readonly rawExperiences = signal<RawExperience[]>([]);
  private readonly i18nService = inject<I18nService>(I18nService);
  readonly experiences = computed(() =>
    this.rawExperiences().map(exp => ({
      ...exp,
      company: this.i18nService.getTranslatedField(exp.company),
      name: this.i18nService.getTranslatedField(exp.name),
      duration: {
        endDate: new Date(exp.duration.endDate),
        startDate: new Date(exp.duration.startDate),
      },
      actions: this.i18nService.getTranslatedField(exp.actions),
      skills: this.i18nService.getTranslatedField(exp.skills),
    }))
  );
  private readonly dataService = inject(DataService);

  loadExperiences(): void {
    if (this.rawExperiences().length === 0) {
      this.getExperiences().subscribe();
    }
  }

  private getExperiences(): Observable<RawExperience[]> {
    this.isLoading.set(true);
    this.error.set(null);

    return this.dataService.fetchJson<RawExperience[]>('/assets/data/experiences.json').pipe(
      tap(experiences => {
        this.rawExperiences.set(experiences);
        this.isLoading.set(false);
      }),
      catchError(err => {
        console.error('Error loading experiences: ', err);
        this.error.set('experiences.error');
        this.isLoading.set(false);
        this.rawExperiences.set([]);
        return of([]);
      })
    );
  }
}
