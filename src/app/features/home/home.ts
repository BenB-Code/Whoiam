import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentWindow } from '../../common/components/content-window/content-window';
import { Store } from '@ngrx/store';
import {
  CLOSED,
  CONTACT,
  EXPERIENCES,
  HOME,
  MAXIMIZED,
  MINIMIZED,
  openWindow,
  PROJECTS,
  selectWindowById,
  WindowState,
  WindowType,
} from '../../store';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { WindowActions } from '../../common/directives';
import { RED } from '../../common/constants/style.const';

@Component({
  selector: 'app-home',
  imports: [ContentWindow, AsyncPipe, WindowActions],
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
  private readonly store = inject(Store);
  homeWindow$: Observable<WindowState | null> = this.store.select(selectWindowById(HOME));

  open(id: WindowType): void {
    this.store.dispatch(openWindow({ id }));
  }
}
