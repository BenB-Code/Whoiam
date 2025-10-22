import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { CLOSED, DEFAULT_ZINDEX, getResponsiveDefaultSettings, MAXIMIZED, MINIMIZED, OPEN } from '../constants';
import { WindowState } from '../models';
import {
  closeWindow,
  maximizeWindow,
  minimizeWindow,
  openWindow,
  restoreWindow,
  setActiveWindow,
  setScreenSize,
  updateWindow,
} from '../actions/window.actions';

export const adapter: EntityAdapter<WindowState> = createEntityAdapter<WindowState>({
  selectId: (window: WindowState) => window.id,
});

export type State = {} & EntityState<WindowState>;
export const initialState: State = adapter.setAll([], adapter.getInitialState());

export const windowReducer = createReducer(
  initialState,
  on(setScreenSize, (state, { width }) => {
    const defaultConfig: WindowState[] = getResponsiveDefaultSettings(width);
    return adapter.setAll(defaultConfig, state);
  }),
  on(openWindow, (state, { id }) => {
    const currentWindow = state.entities[id];
    const defaultValues = getResponsiveDefaultSettings(window.innerWidth).find(w => w.id === id);
    const openBehavior =
      currentWindow?.status === CLOSED
        ? OPEN
        : currentWindow?.status === MINIMIZED
          ? currentWindow.lastStatus
          : currentWindow?.status;

    return adapter.updateOne(
      {
        id,
        changes: {
          status: openBehavior,
          lastStatus: currentWindow?.status,
          position: currentWindow?.position || defaultValues?.position,
          size: currentWindow?.size || defaultValues?.size,
          isActive: defaultValues?.isActive,
          zIndex: selectMaxZIndexValue(state) + 1,
        },
      },
      state
    );
  }),
  on(closeWindow, (state, { id }) => {
    const currentWindow = state.entities[id];
    return adapter.updateOne(
      {
        id,
        changes: {
          status: CLOSED,
          lastStatus: currentWindow?.status,
          isActive: false,
          position: undefined,
          size: undefined,
          zIndex: DEFAULT_ZINDEX,
        },
      },
      state
    );
  }),
  on(restoreWindow, (state, { id }) => {
    const currentWindow = state.entities[id];
    const targetStatus = currentWindow?.lastStatus || OPEN;

    const restoredState = adapter.updateOne(
      {
        id,
        changes: {
          status: targetStatus,
          isActive: true,
        },
      },
      state
    );

    const maxZ = selectMaxZIndexValue(restoredState) + 1;
    const updates = Object.keys(restoredState.entities).map(windowId => ({
      id: windowId,
      changes: {
        isActive: windowId === id,
        zIndex: windowId === id ? maxZ : restoredState.entities[windowId]?.zIndex || DEFAULT_ZINDEX,
      },
    }));

    return adapter.updateMany(updates, restoredState);
  }),
  on(minimizeWindow, (state, { id }) => {
    const currentWindow = state.entities[id];
    return adapter.updateOne(
      {
        id,
        changes: { status: MINIMIZED, lastStatus: currentWindow?.status, isActive: false },
      },
      state
    );
  }),
  on(maximizeWindow, (state, { id }) => {
    const currentWindow = state.entities[id];
    const statusIsOpen = currentWindow?.status === OPEN ? MAXIMIZED : OPEN;
    return adapter.updateOne(
      {
        id: id,
        changes: {
          status: statusIsOpen,
          lastStatus: currentWindow?.status,
          isActive: true,
        },
      },
      state
    );
  }),
  on(setActiveWindow, (state, { id }) => {
    const targetWindow = state.entities[id];
    if (!targetWindow || targetWindow.status === CLOSED) {
      return state;
    }

    const maxZ = selectMaxZIndexValue(state) + 1;
    const updates = Object.keys(state.entities).map(windowId => ({
      id: windowId,
      changes: {
        isActive: windowId === id,
        zIndex: windowId === id ? maxZ : state.entities[windowId]?.zIndex || DEFAULT_ZINDEX,
      },
    }));

    return adapter.updateMany(updates, state);
  }),
  on(updateWindow, (state, { id, position }) => {
    return adapter.updateOne(
      {
        id,
        changes: {
          position,
        },
      },
      state
    );
  })
);

function selectMaxZIndexValue(state: State): number {
  const windows = Object.values(state.entities).filter(w => w?.status === OPEN || w?.status === MAXIMIZED);
  return windows.length > 0 ? Math.max(...windows.map(w => w!.zIndex)) : DEFAULT_ZINDEX;
}
