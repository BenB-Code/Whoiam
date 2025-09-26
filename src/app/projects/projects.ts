import {Component, inject} from '@angular/core';
import {ContentWindow} from '../common/content-window/content-window';
import {AsyncPipe} from '@angular/common';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {closeWindow, maximizeWindow, minimizeWindow, selectWindowById, setActiveWindow, WindowState} from '../store';
import {PROJECTS} from '../store/window-manager/models/types.const';

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

  mockData: Project[] = [
    {
      name: 'Kaamelott Citation Extractor',
      description: 'An XML parser to extract and structure quotes from the Kaamelott Wikiquote pages',
      link: {
        name: 'Github',
        url: 'https://github.com/BenB-Code/Kaamelott_Citation_Extractor'
      },
      technologies: ['TypeScript', 'XML', 'JSON', 'Parser'],
      status: 'active',
      year: 2025,
      category: 'tool'
    },
    {
      name: 'Kaamelott Citation API',
      description: "Une API REST qui permet de récupérer, filtrer et rechercher des citations cultes de la série Kaamelott d'Alexandre Astier.",
      link: {
        name: 'Github',
        url: 'https://github.com/BenB-Code/Kaamelott_Citation_API'
      },
      technologies: ['TypeScript', 'REST API'],
      status: 'active',
      year: 2025,
      category: 'api'
    },
    {
      name: 'Whoiam',
      description: 'Quick portfolio websitte that act as a resume.',
      link: {
        name: 'Github',
        url: 'https://github.com/BenB-Code/Whoiam'
      },
      technologies: ['HTML', 'TypeScript', 'SCSS'],
      status: 'active',
      year: 2025,
      category: 'portfolio'
    },
  ];

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
