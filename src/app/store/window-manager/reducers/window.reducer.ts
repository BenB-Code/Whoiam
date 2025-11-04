import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import {
  CLOSED,
  DEFAULT_ZINDEX,
  getResponsiveDefaultSettings,
  MAXIMIZED,
  MAXIMIZED_POSITION,
  MAXIMIZED_SIZES,
  MINIMIZED,
  OPEN,
} from '../constants';
import { WindowState, WindowStatus } from '../models';
import {
  closeWindow,
  maximizeWindow,
  minimizeWindow,
  openWindow,
  positionUpdate,
  resizeAllWindows,
  resizeWindow,
  setActiveWindow,
  setScreenSize,
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
          lastPosition: config.find(window => window.id === id)?.position,
          size: config.find(window => window.id === id)?.size,
          lastSize: config.find(window => window.id === id)?.size,
        },
      }));

    return adapter.updateMany(updates, state);
  }),
  on(openWindow, (state, { id, width }) => {
    const currentWindow = state.entities[id];
    const defaultValues = getResponsiveDefaultSettings(width).find(w => w.id === id);
    const maxZIndex = selectMaxZIndexValue(state);

    const newStatus = decideNextStatus(currentWindow!, maxZIndex);
    const position = currentWindow?.position || defaultValues?.position;
    const size = currentWindow?.size || defaultValues?.size;

    return adapter.updateOne(
      {
        id,
        changes: {
          status: newStatus.status,
          lastStatus: newStatus.lastStatus,
          position,
          lastPosition: position,
          size,
          lastSize: size,
          isActive: defaultValues?.isActive,
          zIndex: maxZIndex + 1,
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
          lastPosition: defaultValues?.position,
          size: defaultValues?.size,
          lastSize: defaultValues?.size,
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
    let newSettings = {
      status: MAXIMIZED as WindowStatus,
      size: MAXIMIZED_SIZES,
      position: MAXIMIZED_POSITION,
      disableResize: true,
    };
    if (currentWindow!.status === MAXIMIZED) {
      newSettings = {
        status: OPEN as WindowStatus,
        size: currentWindow!.lastSize,
        position: currentWindow!.lastPosition,
        disableResize: false,
      };
    }
    return adapter.updateOne(
      {
        id: id,
        changes: {
          ...newSettings,
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
  on(positionUpdate, (state, { id, position }) => {
    return adapter.updateOne(
      {
        id,
        changes: {
          position,
          lastPosition: position,
        },
      },
      state
    );
  }),
  on(resizeWindow, (state, { id, size }) => {
    return adapter.updateOne(
      {
        id,
        changes: {
          size,
          lastSize: size,
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

function decideNextStatus(
  state: WindowState,
  maxZIndex: number
): {
  status: WindowStatus;
  lastStatus: WindowStatus;
} {
  let status = state.status;
  let lastStatus = state.lastStatus || OPEN;

  if (status === CLOSED) {
    lastStatus = CLOSED;
    status = OPEN;
  } else if (status === MINIMIZED) {
    status = lastStatus;
    lastStatus = MINIMIZED;
  } else {
    if (maxZIndex <= state.zIndex) {
      lastStatus = status;
      status = MINIMIZED;
    }
  }

  return { status, lastStatus };
}
