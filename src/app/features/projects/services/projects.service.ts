import { computed, inject, Injectable, signal } from '@angular/core';
import { DataService } from '../../../services/data/data.service';
import { catchError, Observable, of, take, tap } from 'rxjs';
import { RawProject } from '../models';
import { I18nService } from '../../../services/i18n/i18n.service';
import { DATA_PATH } from '../../../common/constants';
import { PROJECTS } from '../../../store';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  readonly isLoading = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  readonly hasError = computed(() => this.error() !== null);
  readonly placeholder = computed(() => (this.hasError() ? this.error() : 'projects.unreachable'));
  readonly isEmpty = computed(() => !this.hasError() && this.projects().length === 0);
  readonly shouldDisplayPlaceholder = computed(() => this.hasError() || this.isEmpty());
  private readonly dataService = inject(DataService);
  private readonly i18nService = inject(I18nService);
  private readonly rawProjects = signal<RawProject[]>([]);
  readonly projects = computed(() =>
    this.rawProjects().map(project => ({
      ...project,
      description: this.i18nService.getTranslatedField(project.description),
    }))
  );

  loadProjects(): void {
    if (this.rawProjects().length === 0) {
      this.getProjects().pipe(take(1)).subscribe();
    }
  }

  private getProjects(): Observable<RawProject[]> {
    this.isLoading.set(true);
    this.error.set(null);

    return this.dataService.fetchJson<RawProject[]>(DATA_PATH(PROJECTS)).pipe(
      tap(projects => {
        this.rawProjects.set(projects);
        this.isLoading.set(false);
      }),
      catchError(err => {
        console.error('Error loading projects: ', err);
        this.error.set('projects.error');
        this.isLoading.set(false);
        this.rawProjects.set([]);
        return of([]);
      })
    );
  }
}
