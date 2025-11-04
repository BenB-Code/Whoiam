import * as WindowActions from './window.actions';
import { HOME } from '../constants';

describe('Store - WindowActions', () => {
  describe('openWindows', () => {
    it('should create an action to open a window', () => {
      const expectedAction = {
        type: '[Window] Open Window',
      };
      const action = WindowActions.openWindow({ id: HOME, width: 1200 });
      expect(action.type).toEqual(expectedAction.type);
    });
  });
  describe('closeWindows', () => {
    it('should create an action to close a window', () => {
      const expectedAction = {
        type: '[Window] Close Window',
      };
      const action = WindowActions.closeWindow({ id: HOME, width: 1200 });
      expect(action.type).toEqual(expectedAction.type);
    });
  });
  describe('minimizeWindow', () => {
    it('should create an action to minimize a window', () => {
      const expectedAction = {
        type: '[Window] Minimize Window',
      };
      const action = WindowActions.minimizeWindow({ id: HOME });
      expect(action.type).toEqual(expectedAction.type);
    });
  });
  describe('maximizeWindow', () => {
    it('should create an action to maximize a window', () => {
      const expectedAction = {
        type: '[Window] Maximize Window',
      };
      const action = WindowActions.maximizeWindow({ id: HOME });
      expect(action.type).toEqual(expectedAction.type);
    });
  });
  describe('setActiveWindow', () => {
    it('should create an action to set an active window', () => {
      const expectedAction = {
        type: '[Window] Set active Window',
      };
      const action = WindowActions.setActiveWindow({ id: HOME });
      expect(action.type).toEqual(expectedAction.type);
    });
  });
  describe('positionUpdate', () => {
    it('should create an action to update the position', () => {
      const expectedAction = {
        type: '[Window] Update position',
      };
      const action = WindowActions.positionUpdate({ id: HOME });
      expect(action.type).toEqual(expectedAction.type);
    });
  });
  describe('setScreenSize', () => {
    it('should create an action to Set Screen size', () => {
      const expectedAction = {
        type: '[Window] SetScreen Size',
      };
      const action = WindowActions.setScreenSize({ width: 1200 });
      expect(action.type).toEqual(expectedAction.type);
    });
  });
  describe('resizeAllWindows', () => {
    it('should create an action to resize all windows', () => {
      const expectedAction = {
        type: '[Window] Resize All Windows',
      };
      const action = WindowActions.resizeAllWindows({ width: 1200 });
      expect(action.type).toEqual(expectedAction.type);
    });
  });
});
