import {Component, inject, OnInit, signal} from '@angular/core';
import {ContentWindow} from '../../common/content-window/content-window';
import {AsyncPipe} from '@angular/common';
import {Store} from '@ngrx/store';
import {Observable, take} from 'rxjs';
import {closeWindow, maximizeWindow, minimizeWindow, selectWindowById, setActiveWindow, WindowState} from '../../store';
import {PROJECTS} from '../../store/window-manager/constants/types.const';
import {ProjectsService} from './services/projects.service';
import {Spinner} from '../../common/spinner/spinner';
import {Project} from './models/project.model';

@Component({
  selector: 'app-projects',
  imports: [
    ContentWindow,
    AsyncPipe,
    Spinner
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects implements OnInit {
  private store = inject(Store);
  projectsWindow$: Observable<WindowState | null> = this.store.select(selectWindowById(PROJECTS));

  projectsService: ProjectsService = inject(ProjectsService);
  projects = signal<Project[]>([])

  ngOnInit(): void {
    this.projectsService.getProjects().pipe(take(1)).subscribe(projects => (this.projects.set(projects)));
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'active':
        return '#00CA4E';
      case 'completed':
        return '#007ACC';
      case 'archived':
        return '#FFA500';
      default:
        return '#666';
    }
  }

  onClose(): void {
    this.store.dispatch(closeWindow({id: PROJECTS}));
  }

  onFullscreen(): void {
    this.store.dispatch(maximizeWindow({id: PROJECTS}));
  }

  onReduce(): void {
    this.store.dispatch(minimizeWindow({id: PROJECTS}));
  }

  onActivate(): void {
    this.store.dispatch(setActiveWindow({id: PROJECTS}));
  }

  redirect(url: string): void {
    window.open(url, '_blank');
  }
}
