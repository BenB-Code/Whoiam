import { adapter, State } from '../reducers/window.reducer';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { WindowState, WindowType } from '../models';

export const selectWindowState = createFeatureSelector<State>('windowManager');

const { selectEntities, selectAll } = adapter.getSelectors(selectWindowState);

export const selectAllWindows = selectAll;
export const selectWindowEntities = selectEntities;
export const selectWindowById = (id: WindowType): MemoizedSelector<object, WindowState | null> =>
  createSelector(selectWindowEntities, entities => entities[id] || null);
