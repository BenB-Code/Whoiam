import {inject, Injectable} from '@angular/core';
import {DataService} from '../data/data.service';
import {catchError, Observable, of} from 'rxjs';
import {Experience} from '../../features/experiences/models/experience.model';

@Injectable({
  providedIn: 'root',
})
export class ExperiencesService {
  private dataService = inject(DataService);

  getExperiences(): Observable<Experience[]> {
    return this.dataService.fetchJson<Experience[]>('assets/data/experiences.json').pipe(
      catchError(err => {
        console.error('Error loading experiences: ', err)
        return of([]);
      })
    )
  }
}
