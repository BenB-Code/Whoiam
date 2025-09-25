import {adapter, State} from '../reducers/window.reducer';
import {OPEN} from '../models/window-status.type';


export const selectWindowState = createFeatureSelector<State>('windowManager');

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors(selectWindowState)

export const selectActiveWindow = createSelector(
  selectAll, (window) => window.find(window => window.isActive) || null
);

export const selectOpenWindow = createSelector(
  selectAll, (window) => window.find(window => window.status === OPEN) || null
);

export const selectMaxZIndex = createSelector(
  selectAll, (window) => {
    const openWindows = window.filter(window => window.status === OPEN);
    return openWindows.length > 0 ? Math.max(...openWindows.map(window => window.zIndex)) : 0;
  }
);

export const selectWindowById = createSelector(
  selectEntities, (entities) => entities[id] || null
);
