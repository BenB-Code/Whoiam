import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentWindow } from '../../common/components/content-window/content-window';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CLOSED, MAXIMIZED, MINIMIZED, OPEN, PROJECTS, selectWindowById, WindowState } from '../../store';
import { ProjectsService } from './services/projects.service';
import { Spinner } from '../../common/components/spinner/spinner';
import { WindowActions } from '../../common/directives';
import { NavigationService } from '../../services/navigation/navigation.service';
import { PlaceholderText } from '../../common/components/placeholder-text/placeholder-text';
import { Card } from '../../common/components/card/card';
import { GREEN } from '../../common/constants/style.const';
import { Bubble } from '../../common/components/bubble/bubble';

@Component({
  selector: 'app-projects',
  imports: [ContentWindow, AsyncPipe, Spinner, WindowActions, PlaceholderText, Card, Bubble],
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
  protected readonly GREEN = GREEN;
  protected readonly OPEN = OPEN;
  private readonly store = inject(Store);
  projectsWindow$: Observable<WindowState | null> = this.store.select(selectWindowById(PROJECTS));
}
