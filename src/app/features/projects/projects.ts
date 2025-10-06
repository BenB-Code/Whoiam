import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentWindow } from '../../common/components/content-window/content-window';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CLOSED, MAXIMIZED, MINIMIZED, PROJECTS, selectWindowById, WindowState } from '../../store';
import { ProjectsService } from './services/projects.service';
import { Spinner } from '../../common/components/spinner/spinner';
import { WindowActions } from '../../common/directives';
import { NavigationService } from '../../services/navigation/navigation.service';
import { PlaceholderText } from '../../common/components/placeholder-text/placeholder-text';

@Component({
  selector: 'app-projects',
  imports: [ContentWindow, AsyncPipe, Spinner, WindowActions, PlaceholderText],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {
  protected readonly projectsService: ProjectsService = inject(ProjectsService);
  protected readonly navigationService: NavigationService = inject(NavigationService);
  protected readonly PROJECTS = PROJECTS;
  protected readonly CLOSED = CLOSED;
  protected readonly MAXIMIZED = MAXIMIZED;
  protected readonly MINIMIZED = MINIMIZED;
  private readonly store = inject(Store);
  projectsWindow$: Observable<WindowState | null> = this.store.select(selectWindowById(PROJECTS));

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
}
