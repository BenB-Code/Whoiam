import {inject, Injectable} from '@angular/core';
import {DataService} from '../data/data.service';
import {catchError, Observable, of} from 'rxjs';
import {Project} from '../../features/projects/models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private dataService = inject(DataService);

  getProjects(): Observable<Project[]> {
    return this.dataService.fetchJson<Project[]>('assets/data/projects.json').pipe(
      catchError(err => {
        console.error('Error loading projects: ', err)
        return of([]);
      })
    )
  }
}
