import * as windowSelectors from './window.selectors';
import { WindowState, WindowType } from '../models';
import { CLOSED, CONTACT, EXPERIENCES, HOME, PROJECTS } from '../constants';
import { EntityState } from '@ngrx/entity';

describe('Store - WindowSelectors', () => {
  const windowsStateMock: EntityState<WindowState> = {
    ids: [HOME, EXPERIENCES, PROJECTS, CONTACT],
    entities: {
      home: {
        id: HOME,
        status: CLOSED,
        disableFullscreen: true,
        position: { x: '1%', y: '1%' },
        size: { width: '64%', height: 'fit-content' },
        zIndex: 2,
        isActive: true,
      },
      experiences: {
        id: EXPERIENCES,
        status: CLOSED,
        disableFullscreen: false,
        position: { x: '4%', y: '12%' },
        size: { width: '68%', height: '60%' },
        zIndex: 1,
        isActive: false,
      },
      projects: {
        id: PROJECTS,
        status: CLOSED,
        disableFullscreen: false,
        position: { x: '7%', y: '22%' },
        size: { width: '90%', height: 'fit-content' },
        zIndex: 1,
        isActive: false,
      },
      contact: {
        id: CONTACT,
        status: CLOSED,
        disableFullscreen: true,
        position: { x: '68%', y: '1%' },
        size: { width: '30%', height: 'fit-content' },
        zIndex: 1,
        isActive: false,
      },
    },
  };

  describe('selectAllWindows', () => {
    it('should return an array of windows state', () => {
      const result = windowSelectors.selectAllWindows.projector(windowsStateMock);
      expect(result.length).toEqual(windowsStateMock.ids.length);
      expect(result[0].id).toEqual(String(windowsStateMock.ids[0]));
      expect(result[1].id).toEqual(String(windowsStateMock.ids[1]));
      expect(result[2].id).toEqual(String(windowsStateMock.ids[2]));
      expect(result[3].id).toEqual(String(windowsStateMock.ids[3]));
    });
  });
  describe('selectWindowEntities', () => {
    it('Should select entities from state', () => {
      const result = windowSelectors.selectWindowEntities.projector(windowsStateMock);
      expect(Object.keys(result)).toContain(HOME);
      expect(Object.keys(result)).toContain(PROJECTS);
      expect(Object.keys(result)).toContain(EXPERIENCES);
      expect(Object.keys(result)).toContain(CONTACT);
    });
  });
  describe('selectWindowById', () => {
    it('should return a specific entity based on id', () => {
      const result = windowSelectors.selectWindowById(HOME).projector(windowsStateMock.entities);
      expect(result?.id).toEqual(HOME);
    });

    it('should return null if no entity exist', () => {
      const result = windowSelectors.selectWindowById('JhonDoe' as WindowType).projector(windowsStateMock.entities);
      expect(result).toBeNull();
    });
  });
});
