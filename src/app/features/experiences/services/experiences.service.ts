import {computed, inject, Injectable, signal} from '@angular/core';
import {DataService} from '../../../services/data/data.service';
import {catchError, map, Observable, of, take, tap,} from 'rxjs';
import {Experience} from '../models/experience.model';

@Injectable({
    providedIn: 'root',
})
export class ExperiencesService {
    private dataService = inject(DataService);

    experiences = signal<Experience[]>([]);
    isLoading = signal<boolean>(false);
    error = signal<string | null>(null);

    hasError = computed(() => this.error() !== null);
    isEmpty = computed(() => !this.hasError() && this.experiences().length === 0);
    shouldDisplayPlaceholder = computed(() => this.hasError() || this.isEmpty());
    placeholder = computed(() => this.hasError() ? this.error() : "Aucune expérience disponible pour le moment");

    loadExperiences() {
        if (this.experiences().length === 0) {
            this.getExperiences().pipe(take(1)).subscribe();
        }
    }

    private getExperiences(): Observable<Experience[]> {
        this.isLoading.set(true);
        this.error.set(null);

        return this.dataService.fetchJson<Experience[]>('/assets/data/experiences.json').pipe(
            map((experiences: Experience[]) => (experiences.map(exp => ({
                    ...exp,
                    duration: {
                        endDate: new Date(exp.duration.endDate),
                        startDate: new Date(exp.duration.startDate)
                    }
                })))
            ),
            tap(experiences => {
                this.experiences.set(experiences);
                this.isLoading.set(false);
            }),
            catchError(err => {
                console.error('Error loading experiences: ', err)
                this.error.set("Une erreur est survenue lors de la récupération des expériences. Merci de réessayer plus tard.");
                this.isLoading.set(false);
                this.experiences.set([]);
                return of([]);
            })
        )
    }
}
