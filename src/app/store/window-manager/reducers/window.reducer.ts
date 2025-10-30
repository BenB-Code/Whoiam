import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { CLOSED, DEFAULT_ZINDEX, getResponsiveDefaultSettings, MAXIMIZED, MINIMIZED, OPEN } from '../constants';
import { WindowState, WindowStatus } from '../models';
import {
  closeWindow,
  maximizeWindow,
  minimizeWindow,
  openWindow,
  resizeAllWindows,
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
  on(resizeAllWindows, (state, { width }) => {
    const config: WindowState[] = getResponsiveDefaultSettings(width);
    const updates = Object.keys(state.entities)
      .filter(id => {
        const window = state.entities[id];
        return window?.status === OPEN || window?.status === MINIMIZED;
      })
      .map(id => ({
        id,
        changes: {
          position: config.find(window => window.id === id)?.position,
          size: config.find(window => window.id === id)?.size,
        },
      }));

    return adapter.updateMany(updates, state);
  }),
  on(openWindow, (state, { id, width }) => {
    const currentWindow = state.entities[id];
    const defaultValues = getResponsiveDefaultSettings(width).find(w => w.id === id);
    console.log('kdjshfkjshdf', JSON.stringify(defaultValues));
    const nextStatus = decideNextStatus(currentWindow!);
    return adapter.updateOne(
      {
        id,
        changes: {
          status: nextStatus.status,
          lastStatus: nextStatus.lastStatus,
          position: currentWindow?.position || defaultValues?.position,
          size: currentWindow?.size || defaultValues?.size,
          isActive: defaultValues?.isActive,
          zIndex: selectMaxZIndexValue(state) + 1,
        },
      },
      state
    );
  }),
  on(closeWindow, (state, { id, width }) => {
    const currentWindow = state.entities[id];
    const defaultValues = getResponsiveDefaultSettings(width).find(w => w.id === id);

    return adapter.updateOne(
      {
        id,
        changes: {
          status: CLOSED,
          lastStatus: currentWindow?.status,
          isActive: false,
          position: defaultValues?.position,
          size: defaultValues?.size,
          zIndex: DEFAULT_ZINDEX,
        },
      },
      state
    );
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

function decideNextStatus(state: WindowState): { status: WindowStatus; lastStatus: WindowStatus } {
  let status = state.status;
  let lastStatus = state.lastStatus || OPEN;

  if (status === CLOSED) {
    lastStatus = CLOSED;
    status = OPEN;
  } else if (status === MINIMIZED) {
    status = lastStatus;
    lastStatus = MINIMIZED;
  } else {
    lastStatus = status;
    status = MINIMIZED;
  }

  return { status, lastStatus };
}
