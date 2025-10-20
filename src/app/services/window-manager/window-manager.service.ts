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

  setActiveWindow(id: string): void {
    this.store.dispatch(setActiveWindow({ id: id as WindowType }));
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

  openWindow(id: string): void {
    this.store.dispatch(openWindow({ id: id as WindowType }));
  }

  maximizeWindow(id: string): void {
    this.store.dispatch(maximizeWindow({ id: id as WindowType }));
  }

  minimizeWindow(id: string): void {
    this.store.dispatch(minimizeWindow({ id: id as WindowType }));
  }

  closeWindow(id: string): void {
    this.store.dispatch(closeWindow({ id: id as WindowType }));
  }

  updateWindow(id: string, position: Position): void {
    this.store.dispatch(updateWindow({ id: id as WindowType, position }));
  }

  selectWindowById(id: string): Observable<WindowState | null> {
    return this.store.select(selectWindowById(id as WindowType));
  }
}
