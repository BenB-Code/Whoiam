import {computed, inject, Injectable, signal} from '@angular/core';
import {DataService} from '../../../services/data/data.service';
import {catchError, Observable, of, tap} from 'rxjs';
import {Project} from '../models/project.model';

@Injectable({
    providedIn: 'root',
})
export class ProjectsService {
    private dataService = inject(DataService);

    projects = signal<Project[]>([]);
    isLoading = signal<boolean>(false);
    error = signal<string | null>(null);

    hasError = computed(() => this.error() !== null);
    isEmpty = computed(() => !this.hasError() && this.projects()?.length === 0);
    shouldDisplayPlaceholder = computed(() => this.hasError() || this.isEmpty());

    placeholder = computed(() => this.hasError() ? this.error() : "Aucun projet disponible pour le moment");

    getProjects(): Observable<Project[]> {
        this.isLoading.set(true);
        this.error.set(null);

        return this.dataService.fetchJson<Project[]>('/assets/data/projects.json').pipe(
            tap(projects => {
                this.projects.set(projects);
                this.isLoading.set(false);
            }),
            catchError(err => {
                console.error('Error loading projects: ', err)
                this.error.set(err.message);
                this.isLoading.set(false);
                this.projects.set([]);
                return of([]);
            })
        )
    }
}
