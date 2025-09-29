import {adapter, State} from '../reducers/window.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {OPEN} from '../constants';
import {WindowType} from '../models';

export const selectWindowState = createFeatureSelector<State>('windowManager');

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors(selectWindowState)

export const selectAllWindows = selectAll;
export const selectWindowEntities = selectEntities;
export const selectWindowIds = selectIds;
export const selectTotalWindows = selectTotal;


export const selectActiveWindow = createSelector(
  selectAllWindows, (windows) => windows.find(window => window.isActive) || null
);

export const selectOpenWindows = createSelector(
  selectAllWindows, (windows) => windows.filter(window => window.status === OPEN));

export const selectMaxZIndex = createSelector(
  selectAllWindows, (windows) => {
    const openWindows = windows.filter(window => window.status === OPEN);
    return openWindows.length > 0 ? Math.max(...openWindows.map(window => window.zIndex)) : 0;
  }
);

export const selectWindowById = (id: WindowType) => createSelector(
  selectWindowEntities, (entities) => entities[id] || null
);
