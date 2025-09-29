import {Component, inject} from '@angular/core';
import {ContentWindow} from '../../common/content-window/content-window';
import {AsyncPipe} from '@angular/common';
import {Store} from '@ngrx/store';
import {Observable, take} from 'rxjs';
import {closeWindow, maximizeWindow, minimizeWindow, selectWindowById, setActiveWindow, WindowState} from '../../store';
import {PROJECTS} from '../../store/window-manager/constants/types.const';
import {ProjectsService} from './services/projects.service';

interface Project {
  name: string;
  description: string;
  link: {
    name: string;
    url: string;
  };
  technologies?: string[];
  status?: 'active' | 'archived' | 'completed';
  year?: number;
  category?: 'web' | 'api' | 'tool' | 'portfolio';
}

@Component({
  selector: 'app-projects',
  imports: [
    ContentWindow,
    AsyncPipe
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects {
  private store = inject(Store);
  projectsWindow$: Observable<WindowState | null> = this.store.select(selectWindowById(PROJECTS));

  private projectsService: ProjectsService = inject(ProjectsService);
  projects: Project[] = []

  constructor() {
    this.projectsService.getProjects().pipe(take(1)).subscribe(projects => (this.projects = projects));
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
