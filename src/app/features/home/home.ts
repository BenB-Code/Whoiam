import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentWindow } from '../../common/components/content-window/content-window';
import { CLOSED, CONTACT, EXPERIENCES, HOME, MAXIMIZED, MINIMIZED, OPEN, PROJECTS, WindowType } from '../../store';
import { AsyncPipe } from '@angular/common';
import { WindowActions } from '../../common/directives';
import { TranslatePipe } from '@ngx-translate/core';
import { RED } from '../../common/constants';
import { WindowManagerService } from '../../services/window-manager/window-manager.service';

@Component({
  selector: 'app-home',
  imports: [ContentWindow, AsyncPipe, WindowActions, TranslatePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly HOME = HOME;
  protected readonly MAXIMIZED = MAXIMIZED;
  protected readonly MINIMIZED = MINIMIZED;
  protected readonly CLOSED = CLOSED;
  protected readonly PROJECTS = PROJECTS;
  protected readonly EXPERIENCES = EXPERIENCES;
  protected readonly CONTACT = CONTACT;
  protected readonly RED = RED;
  protected readonly OPEN = OPEN;
  private readonly windowManagerService = inject(WindowManagerService);
  homeWindow$ = this.windowManagerService.selectWindowById(HOME);

  open(id: WindowType): void {
    this.windowManagerService.openWindow(id);
  }
}
