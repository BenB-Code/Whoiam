import { createAction, props } from '@ngrx/store';
import { WindowType, WindowUpdate } from '../models';

export const openWindow = createAction('[Window] Open Window', props<{ id: WindowType; width: number }>());
export const closeWindow = createAction('[Window] Close Window', props<{ id: WindowType; width: number }>());
export const minimizeWindow = createAction('[Window] Minimize Window', props<{ id: WindowType }>());
export const maximizeWindow = createAction('[Window] Maximize Window', props<{ id: WindowType }>());
export const setActiveWindow = createAction('[Window] Set active Window', props<{ id: WindowType }>());
export const updateWindow = createAction('[Window] Update Window', props<WindowUpdate>());
export const setScreenSize = createAction('[Window] SetScreen Size', props<{ width: number }>());
export const resizeAllWindows = createAction('[Window] Resize All Windows', props<{ width: number }>());
