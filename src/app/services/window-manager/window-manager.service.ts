import { inject, Injectable } from '@angular/core';
import {
  closeWindow,
  maximizeWindow,
  minimizeWindow,
  openWindow,
  Position,
  selectAllWindows,
  selectWindowById,
  setActiveWindow,
  updateWindow,
  WindowState,
  WindowType,
} from '../../store';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WindowManagerService {
  private readonly store = inject(Store);

  setActiveWindow(id: WindowType): void {
    this.store.dispatch(setActiveWindow({ id }));
  }

  selectAllWindows(): Observable<Record<string, WindowState | null>> {
    return this.store.select(selectAllWindows).pipe(
      map(windows => {
        const stateMap: Record<string, WindowState | null> = {};
        for (const window of windows) {
          stateMap[window.id] = window;
        }
        return stateMap;
      })
    );
  }

  openWindow(id: WindowType): void {
    this.store.dispatch(openWindow({ id }));
  }

  maximizeWindow(id: WindowType): void {
    this.store.dispatch(maximizeWindow({ id }));
  }

  minimizeWindow(id: WindowType): void {
    this.store.dispatch(minimizeWindow({ id }));
  }

  closeWindow(id: WindowType): void {
    this.store.dispatch(closeWindow({ id }));
  }

  updateWindow(id: WindowType, position: Position): void {
    this.store.dispatch(updateWindow({ id, position }));
  }

  selectWindowById(id: WindowType): Observable<WindowState | null> {
    return this.store.select(selectWindowById(id));
  }
}
