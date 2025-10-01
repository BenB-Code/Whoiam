import { computed, inject, Injectable, signal } from '@angular/core';
import { DataService } from '../../../services/data/data.service';
import { catchError, Observable, of, take, tap } from 'rxjs';
import { Project } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  readonly projects = signal<Project[]>([]);
  readonly isLoading = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  readonly hasError = computed(() => this.error() !== null);
  readonly isEmpty = computed(() => !this.hasError() && this.projects().length === 0);
  readonly shouldDisplayPlaceholder = computed(() => this.hasError() || this.isEmpty());
  readonly placeholder = computed(() => (this.hasError() ? this.error() : 'Aucun projet disponible pour le moment'));
  private readonly dataService = inject(DataService);

  loadProjects() {
    if (this.projects().length === 0) {
      this.getProjects().pipe(take(1)).subscribe();
    }
  }

  private getProjects(): Observable<Project[]> {
    this.isLoading.set(true);
    this.error.set(null);

    return this.dataService.fetchJson<Project[]>('/assets/data/projects.json').pipe(
      tap(projects => {
        this.projects.set(projects);
        this.isLoading.set(false);
      }),
      catchError(err => {
        console.error('Error loading projects: ', err);
        this.error.set('Une erreur est survenue lors de la récupération des projets. Merci de réessayer plus tard.');
        this.isLoading.set(false);
        this.projects.set([]);
        return of([]);
      })
    );
  }
}
