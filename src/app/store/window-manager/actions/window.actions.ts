import { createAction, props } from '@ngrx/store';
import { WindowType } from '../models/window-type.type';
import { WindowUpdate } from '../models/window-update.model';

export const openWindow = createAction('[Window] Open Window', props<{ id: WindowType }>());
export const closeWindow = createAction('[Window] Close Window', props<{ id: WindowType }>());
export const minimizeWindow = createAction('[Window] Minimize Window', props<{ id: WindowType }>());
export const maximizeWindow = createAction('[Window] Maximize Window', props<{ id: WindowType }>());
export const restoreWindow = createAction('[Window] Restore Window', props<{ id: WindowType }>());
export const setActiveWindow = createAction('[Window] Set active Window', props<{ id: WindowType }>());
export const updateWindow = createAction('[Window] Update Window', props<WindowUpdate>());
