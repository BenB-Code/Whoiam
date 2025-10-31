import * as fromReducer from './window.reducer';
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
import { CLOSED, CONTACT, DEFAULT_ZINDEX, EXPERIENCES, HOME, MAXIMIZED, MINIMIZED, OPEN, PROJECTS } from '../constants';
import { Dictionary, EntityState } from '@ngrx/entity';
import { Position, WindowState, WindowType } from '../models';

describe('Store - WindowReducer', () => {
  describe('setScreenSize', () => {
    const defaultState: Dictionary<WindowState> = {
      [HOME]: {
        id: HOME,
        status: CLOSED,
        disableFullscreen: true,
        position: { x: '1%', y: '1%' },
        size: { width: '64%', height: 'fit-content' },
        zIndex: 2,
        isActive: true,
      },
      [EXPERIENCES]: {
        id: EXPERIENCES,
        status: CLOSED,
        disableFullscreen: false,
        position: { x: '4%', y: '12%' },
        size: { width: '68%', height: '60%' },
        zIndex: 1,
        isActive: false,
      },
      [PROJECTS]: {
        id: PROJECTS,
        status: CLOSED,
        disableFullscreen: false,
        position: { x: '7%', y: '22%' },
        size: { width: '90%', height: 'fit-content' },
        zIndex: 1,
        isActive: false,
      },
      [CONTACT]: {
        id: CONTACT,
        status: CLOSED,
        disableFullscreen: true,
        position: { x: '68%', y: '1%' },
        size: { width: '30%', height: 'fit-content' },
        zIndex: 1,
        isActive: false,
      },
    };
    const tabletState: Dictionary<WindowState> = {
      [HOME]: {
        id: HOME,
        status: CLOSED,
        disableFullscreen: false,
        position: { x: '0%', y: '0%' },
        size: { width: '85%', height: 'fit-content' },
        zIndex: 2,
        isActive: true,
      },
      [EXPERIENCES]: {
        id: EXPERIENCES,
        status: CLOSED,
        disableFullscreen: false,
        position: { x: '1%', y: '1%' },
        size: { width: '97%', height: '75%' },
        zIndex: 1,
        isActive: false,
      },
      [PROJECTS]: {
        id: PROJECTS,
        status: CLOSED,
        disableFullscreen: true,
        position: { x: '2%', y: '2%' },
        size: { width: '78%', height: 'fit-content' },
        zIndex: 1,
        isActive: false,
      },
      [CONTACT]: {
        id: CONTACT,
        status: CLOSED,
        disableFullscreen: true,
        position: { x: '45%', y: '7%' },
        size: { width: '50%', height: 'fit-content' },
        zIndex: 1,
        isActive: false,
      },
    };
    const mobileState: Dictionary<WindowState> = {
      [HOME]: {
        id: HOME,
        status: CLOSED,
        disableFullscreen: true,
        position: { x: '0%', y: '0%' },
        size: { width: '100%', height: 'fit-content' },
        zIndex: 2,
        isActive: true,
      },
      [EXPERIENCES]: {
        id: EXPERIENCES,
        status: CLOSED,
        disableFullscreen: true,
        position: { x: '0%', y: '0%' },
        size: { width: '100%', height: '100%' },
        zIndex: 1,
        isActive: false,
      },
      [PROJECTS]: {
        id: PROJECTS,
        status: CLOSED,
        disableFullscreen: true,
        position: { x: '0%', y: '0%' },
        size: { width: '100%', height: 'fit-content' },
        zIndex: 1,
        isActive: false,
      },
      [CONTACT]: {
        id: CONTACT,
        status: CLOSED,
        disableFullscreen: true,
        position: { x: '0%', y: '0%' },
        size: { width: '100%', height: 'fit-content' },
        zIndex: 1,
        isActive: false,
      },
    };

    it('should give back default state', () => {
      const { initialState } = fromReducer;

      const action = setScreenSize({ width: 1920 });
      const state = fromReducer.windowReducer(initialState, action);

      expect(state.entities).toEqual(defaultState);
    });
    it('should give back mobile default settings', () => {
      const { initialState } = fromReducer;

      const action = setScreenSize({ width: 767 });
      const state = fromReducer.windowReducer(initialState, action);

      expect(state.entities).toEqual(mobileState);
    });
    it('should give back tablet default settings', () => {
      const { initialState } = fromReducer;

      const action = setScreenSize({ width: 1399 });
      const state = fromReducer.windowReducer(initialState, action);

      expect(state.entities).toEqual(tabletState);
    });
  });

  describe('windows state modifications', () => {
    let state: EntityState<WindowState>;

    beforeEach(() => {
      const { initialState } = fromReducer;
      const setScreenSizeAction = setScreenSize({ width: 1920 });
      const openHomeWindowAction = openWindow({ id: HOME, width: 1920 });
      const openProjectsWindowAction = openWindow({ id: PROJECTS, width: 1920 });
      const maximizeProjectsWindowAction = maximizeWindow({ id: PROJECTS });
      const openContactWindowAction = openWindow({ id: CONTACT, width: 1920 });
      const minimizeContactWindowAction = minimizeWindow({ id: CONTACT });
      state = fromReducer.windowReducer(initialState, setScreenSizeAction);
      state = fromReducer.windowReducer(state, openHomeWindowAction);
      state = fromReducer.windowReducer(state, openContactWindowAction);
      state = fromReducer.windowReducer(state, minimizeContactWindowAction);
      state = fromReducer.windowReducer(state, openProjectsWindowAction);
      state = fromReducer.windowReducer(state, maximizeProjectsWindowAction);
    });
    describe('resizeAllWindows', () => {
      let newState: EntityState<WindowState>;

      beforeEach(() => {
        const action = resizeAllWindows({ width: 750 });
        newState = fromReducer.windowReducer(state, action);
      });
      it('should update size and position of OPEN windows width mobile config', () => {
        expect(newState.entities[HOME]).not.toEqual(state.entities[HOME]);
        expect(newState.entities[HOME]).toEqual({
          id: HOME,
          status: OPEN,
          disableFullscreen: true,
          position: { x: '0%', y: '0%' },
          size: { width: '100%', height: 'fit-content' },
          zIndex: 2,
          isActive: true,
          lastStatus: CLOSED,
        });
      });
      it('should update size and position of MINIMIZED windows width mobile config', () => {
        expect(newState.entities[CONTACT]).not.toEqual(state.entities[CONTACT]);
        expect(newState.entities[CONTACT]).toEqual({
          id: CONTACT,
          status: MINIMIZED,
          disableFullscreen: true,
          position: { x: '0%', y: '0%' },
          size: { width: '100%', height: 'fit-content' },
          zIndex: 3,
          isActive: false,
          lastStatus: OPEN,
        });
      });
      it('should not update size and position of MAXIMIZED windows width mobile config', () => {
        expect(newState.entities[PROJECTS]).toEqual(state.entities[PROJECTS]);
      });
      it('should not update size and position of CLOSED windows width mobile config', () => {
        expect(newState.entities[EXPERIENCES]).toEqual(state.entities[EXPERIENCES]);
      });
    });

    describe('openWindow', () => {
      it('should change from CLOSED to OPEN', () => {
        const action = openWindow({ id: EXPERIENCES, width: 1920 });
        const newState = fromReducer.windowReducer(state, action);

        expect(newState.entities[EXPERIENCES]).not.toEqual(state.entities[EXPERIENCES]);
        expect(newState.entities[EXPERIENCES]).toEqual({
          id: EXPERIENCES,
          status: OPEN,
          disableFullscreen: false,
          position: { x: '4%', y: '12%' },
          size: { width: '68%', height: '60%' },
          zIndex: 4,
          isActive: false,
          lastStatus: CLOSED,
        });
      });
      it('should use defaultValues position and size when currentWindow has none', () => {
        const customState = fromReducer.adapter.setOne(
          {
            id: EXPERIENCES,
            status: CLOSED,
            disableFullscreen: false,
            zIndex: 1,
            isActive: false,
          } as WindowState,
          state
        );

        const action = openWindow({ id: EXPERIENCES, width: 1920 });
        const newState = fromReducer.windowReducer(customState, action);

        expect(newState.entities[EXPERIENCES]?.position).toEqual({ x: '4%', y: '12%' });
        expect(newState.entities[EXPERIENCES]?.size).toEqual({ width: '68%', height: '60%' });
      });
      it('should open lastStatus from MINIMIZED to get old positions and size config', () => {
        const action = openWindow({ id: CONTACT, width: 1920 });
        const newState = fromReducer.windowReducer(state, action);

        expect(newState.entities[CONTACT]).not.toEqual(state.entities[CONTACT]);
        expect(newState.entities[CONTACT]).toEqual({
          id: CONTACT,
          status: OPEN,
          disableFullscreen: true,
          position: { x: '68%', y: '1%' },
          size: { width: '30%', height: 'fit-content' },
          zIndex: 4,
          isActive: false,
          lastStatus: MINIMIZED,
        });
      });
      it('should OPEN from MINIMIZED to get old positions and size config when lastStatus not defined', () => {
        const action = openWindow({ id: CONTACT, width: 1920 });
        const newState = fromReducer.windowReducer(state, action);

        expect(newState.entities[CONTACT]).not.toEqual(state.entities[CONTACT]);
        expect(newState.entities[CONTACT]).toEqual({
          id: CONTACT,
          status: OPEN,
          disableFullscreen: true,
          position: { x: '68%', y: '1%' },
          size: { width: '30%', height: 'fit-content' },
          zIndex: 4,
          isActive: false,
          lastStatus: MINIMIZED,
        });
      });
      it('should keep OPEN when already OPEN but change zIndex', () => {
        const action = openWindow({ id: HOME, width: 1920 });
        const newState = fromReducer.windowReducer(state, action);

        expect(newState.entities[HOME]).not.toEqual(state.entities[HOME]);
        expect(newState.entities[HOME]).toEqual({
          id: HOME,
          status: OPEN,
          disableFullscreen: true,
          position: { x: '1%', y: '1%' },
          size: { width: '64%', height: 'fit-content' },
          zIndex: 4,
          isActive: true,
          lastStatus: CLOSED,
        });
      });
      it('should MINIMIZED when already MAXIMIZED', () => {
        const action = openWindow({ id: PROJECTS, width: 1920 });
        const newState = fromReducer.windowReducer(state, action);

        expect(newState.entities[PROJECTS]).not.toEqual(state.entities[PROJECTS]);
        expect(newState.entities[PROJECTS]).toEqual({
          id: PROJECTS,
          status: MINIMIZED,
          disableFullscreen: false,
          position: { x: '7%', y: '22%' },
          size: { width: '90%', height: 'fit-content' },
          zIndex: 4,
          isActive: false,
          lastStatus: MAXIMIZED,
        });
      });
    });

    describe('closeWindow', () => {
      it('should change from OPEN to CLOSED', () => {
        const action = closeWindow({ id: HOME, width: 1920 });
        const newState = fromReducer.windowReducer(state, action);

        expect(newState.entities[HOME]).not.toEqual(state.entities[HOME]);
        expect(newState.entities[HOME]).toEqual({
          id: HOME,
          status: CLOSED,
          disableFullscreen: true,
          position: { x: '1%', y: '1%' },
          size: { width: '64%', height: 'fit-content' },
          zIndex: DEFAULT_ZINDEX,
          isActive: false,
          lastStatus: OPEN,
        });
      });
      it('should change from MAXIMIZED to CLOSED', () => {
        const action = closeWindow({ id: PROJECTS, width: 1920 });
        const newState = fromReducer.windowReducer(state, action);

        expect(newState.entities[PROJECTS]).not.toEqual(state.entities[PROJECTS]);
        expect(newState.entities[PROJECTS]).toEqual({
          id: PROJECTS,
          status: CLOSED,
          disableFullscreen: false,
          position: { x: '7%', y: '22%' },
          size: { width: '90%', height: 'fit-content' },
          zIndex: DEFAULT_ZINDEX,
          isActive: false,
          lastStatus: MAXIMIZED,
        });
      });
    });

    describe('minimizeWindow', () => {
      it('should change OPEN to MINIMIZE', () => {
        const action = minimizeWindow({ id: HOME });
        const newState = fromReducer.windowReducer(state, action);

        expect(newState.entities[HOME]).not.toEqual(state.entities[HOME]);
        expect(newState.entities[HOME]).toEqual({
          id: HOME,
          status: MINIMIZED,
          disableFullscreen: true,
          position: { x: '1%', y: '1%' },
          size: { width: '64%', height: 'fit-content' },
          zIndex: 2,
          isActive: false,
          lastStatus: OPEN,
        });
      });

      it('should change MAXIMIZED to MINIMIZE', () => {
        const action = minimizeWindow({ id: PROJECTS });
        const newState = fromReducer.windowReducer(state, action);

        expect(newState.entities[PROJECTS]).not.toEqual(state.entities[PROJECTS]);
        expect(newState.entities[PROJECTS]).toEqual({
          id: PROJECTS,
          status: MINIMIZED,
          disableFullscreen: false,
          position: { x: '7%', y: '22%' },
          size: { width: '90%', height: 'fit-content' },
          zIndex: 3,
          isActive: false,
          lastStatus: MAXIMIZED,
        });
      });
    });

    describe('maximizeWIndow', () => {
      it('should change from OPEN to MAXIMIZED', () => {
        const action = maximizeWindow({ id: HOME });
        const newState = fromReducer.windowReducer(state, action);

        expect(newState.entities[HOME]).not.toEqual(state.entities[HOME]);
        expect(newState.entities[HOME]).toEqual({
          id: HOME,
          status: MAXIMIZED,
          disableFullscreen: true,
          position: { x: '1%', y: '1%' },
          size: { width: '64%', height: 'fit-content' },
          zIndex: 2,
          isActive: true,
          lastStatus: OPEN,
        });
      });

      it('should change MAXIMIZED to OPEN', () => {
        const action = maximizeWindow({ id: PROJECTS });
        const newState = fromReducer.windowReducer(state, action);

        expect(newState.entities[PROJECTS]).not.toEqual(state.entities[PROJECTS]);
        expect(newState.entities[PROJECTS]).toEqual({
          id: PROJECTS,
          status: OPEN,
          disableFullscreen: false,
          position: { x: '7%', y: '22%' },
          size: { width: '90%', height: 'fit-content' },
          zIndex: 3,
          isActive: true,
          lastStatus: MAXIMIZED,
        });
      });
    });

    describe('setActiveWindow', () => {
      it('should set isActive on OPEN', () => {
        const action = setActiveWindow({ id: HOME });
        const newState = fromReducer.windowReducer(state, action);

        expect(newState.entities[HOME]).not.toEqual(state.entities[HOME]);
        expect(newState.entities[HOME]).toEqual({
          id: HOME,
          status: OPEN,
          disableFullscreen: true,
          position: { x: '1%', y: '1%' },
          size: { width: '64%', height: 'fit-content' },
          zIndex: 4,
          isActive: true,
          lastStatus: CLOSED,
        });
      });

      it('should use DEFAULT_ZINDEX when window zIndex is undefined', () => {
        const customState = fromReducer.adapter.setOne(
          {
            id: EXPERIENCES,
            status: OPEN,
            disableFullscreen: false,
            position: { x: '4%', y: '12%' },
            size: { width: '68%', height: '60%' },
            isActive: false,
          } as WindowState,
          state
        );

        const action = setActiveWindow({ id: HOME });
        const newState = fromReducer.windowReducer(customState, action);

        expect(newState.entities[EXPERIENCES]?.zIndex).toBe(DEFAULT_ZINDEX);
      });
      it('should set isActive on MINIMIZED', () => {
        const action = setActiveWindow({ id: CONTACT });
        const newState = fromReducer.windowReducer(state, action);

        expect(newState.entities[CONTACT]).not.toEqual(state.entities[CONTACT]);
        expect(newState.entities[CONTACT]).toEqual({
          id: CONTACT,
          status: MINIMIZED,
          disableFullscreen: true,
          position: { x: '68%', y: '1%' },
          size: { width: '30%', height: 'fit-content' },
          zIndex: 4,
          isActive: true,
          lastStatus: OPEN,
        });
      });
      it('should set isActive on MAXIMIZED', () => {
        const action = setActiveWindow({ id: PROJECTS });
        const newState = fromReducer.windowReducer(state, action);

        expect(newState.entities[PROJECTS]).not.toEqual(state.entities[PROJECTS]);
        expect(newState.entities[PROJECTS]).toEqual({
          id: PROJECTS,
          status: MAXIMIZED,
          disableFullscreen: false,
          position: { x: '7%', y: '22%' },
          size: { width: '90%', height: 'fit-content' },
          zIndex: 4,
          isActive: true,
          lastStatus: OPEN,
        });
      });
      it("should return actual state if target doesn't exist", () => {
        const action = setActiveWindow({ id: 'JhonDoe' as WindowType });
        const newState = fromReducer.windowReducer(state, action);

        expect(newState.entities).toEqual(state.entities);
      });
      it('should return actual state if status is CLOSED', () => {
        const action = setActiveWindow({ id: EXPERIENCES });
        const newState = fromReducer.windowReducer(state, action);

        expect(newState.entities).toEqual(state.entities);
      });
    });

    describe('updateWindow', () => {
      it('should update position', () => {
        const expectedPosition: Position = { x: '99%', y: '99%' };
        const action = updateWindow({ id: HOME, position: expectedPosition });
        const newState = fromReducer.windowReducer(state, action);

        expect(newState.entities[HOME]).not.toEqual(state.entities[HOME]);
        expect(newState.entities[HOME]?.position).toEqual(expectedPosition);
      });
    });
  });
});
