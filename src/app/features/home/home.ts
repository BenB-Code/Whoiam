import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentWindow } from '../../common/content-window/content-window';
import { Store } from '@ngrx/store';
import { CLOSED, MAXIMIZED, MINIMIZED, selectWindowById, WindowState } from '../../store';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { HOME } from '../../store/window-manager/constants/types.const';
import { WindowActions } from '../../common/directives';

@Component({
  selector: 'app-home',
  imports: [ContentWindow, AsyncPipe, WindowActions],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private store = inject(Store);

  homeWindow$: Observable<WindowState | null> = this.store.select(selectWindowById(HOME));

  protected readonly HOME = HOME;
  protected readonly MAXIMIZED = MAXIMIZED;
  protected readonly MINIMIZED = MINIMIZED;
  protected readonly CLOSED = CLOSED;
}
