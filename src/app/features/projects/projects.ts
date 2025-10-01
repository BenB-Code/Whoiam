import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ContentWindow} from '../../common/content-window/content-window';
import {AsyncPipe} from '@angular/common';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {CLOSED, MAXIMIZED, MINIMIZED, selectWindowById, WindowState} from '../../store';
import {PROJECTS} from '../../store/window-manager/constants/types.const';
import {ProjectsService} from './services/projects.service';
import {Spinner} from '../../common/spinner/spinner';
import {WindowActions} from '../../common/directives';
import {NavigationService} from '../../services/navigation/navigation.service';

@Component({
  selector: 'app-projects',
  imports: [
    ContentWindow,
    AsyncPipe,
    Spinner,
    WindowActions
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Projects {
  private store = inject(Store);
  projectsWindow$: Observable<WindowState | null> = this.store.select(selectWindowById(PROJECTS));

  projectsService: ProjectsService = inject(ProjectsService);
  navigationService: NavigationService = inject(NavigationService);

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

  protected readonly PROJECTS = PROJECTS;
  protected readonly CLOSED = CLOSED;
  protected readonly MAXIMIZED = MAXIMIZED;
  protected readonly MINIMIZED = MINIMIZED;
}
