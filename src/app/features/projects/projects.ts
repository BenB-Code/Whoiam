import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentWindow } from '../../common/components/content-window/content-window';
import { AsyncPipe } from '@angular/common';
import { ProjectsService } from './services/projects.service';
import { Spinner } from '../../common/components/spinner/spinner';
import { WindowActions } from '../../common/directives';
import { NavigationService } from '../../services/navigation/navigation.service';
import { PlaceholderText } from '../../common/components/placeholder-text/placeholder-text';
import { Card } from '../../common/components/card/card';
import { Bubble } from '../../common/components/bubble/bubble';
import { TranslatePipe } from '@ngx-translate/core';
import { ComponentConstantsAbstract } from '../../common/models/component-constants.abstract';

@Component({
  selector: 'app-projects',
  imports: [ContentWindow, AsyncPipe, Spinner, WindowActions, PlaceholderText, Card, Bubble, TranslatePipe],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects extends ComponentConstantsAbstract {
  projectsWindow$ = this.windowManagerService.selectWindowById(this.PROJECTS);
  protected readonly projectsService: ProjectsService = inject(ProjectsService);
  protected readonly navigationService: NavigationService = inject(NavigationService);
}
