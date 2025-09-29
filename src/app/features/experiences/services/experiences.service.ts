import {inject, Injectable} from '@angular/core';
import {DataService} from '../../../services/data/data.service';
import {catchError, map, Observable, of,} from 'rxjs';
import {Experience} from '../models/experience.model';

@Injectable({
  providedIn: 'root',
})
export class ExperiencesService {
  private dataService = inject(DataService);

  getExperiences(): Observable<Experience[]> {
    return this.dataService.fetchJson<Experience[]>('/assets/data/experiences.json').pipe(
      map((experiences: Experience[]) => (experiences.map(exp => ({
          ...exp,
          duration: {
            endDate: new Date(exp.duration.endDate),
            startDate: new Date(exp.duration.startDate)
          }
        })))
      ),
      catchError(err => {
        console.error('Error loading experiences: ', err)
        return of([]);
      })
    )
  }
}
