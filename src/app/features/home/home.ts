import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ContentWindow} from '../../common/content-window/content-window';
import {Store} from '@ngrx/store';
import {closeWindow, maximizeWindow, minimizeWindow, selectWindowById, setActiveWindow, WindowState} from '../../store';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {HOME} from '../../store/window-manager/constants/types.const';

@Component({
  selector: 'app-home',
  imports: [
    ContentWindow,
    AsyncPipe
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {
  private store = inject(Store);

  homeWindow$: Observable<WindowState | null> = this.store.select(selectWindowById(HOME));

  onClose(): void {
    this.store.dispatch(closeWindow({id: HOME}));
  }

  onFullscreen(): void {
    this.store.dispatch(maximizeWindow({id: HOME}));
  }

  onReduce(): void {
    this.store.dispatch(minimizeWindow({id: HOME}));
  }

  onActivate(): void {
    this.store.dispatch(setActiveWindow({id: HOME}));
  }
}
