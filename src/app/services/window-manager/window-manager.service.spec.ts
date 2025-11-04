import { TestBed } from '@angular/core/testing';

import { WindowManagerService } from './window-manager.service';
import { provideZonelessChangeDetection } from '@angular/core';
import {
  CLOSED,
  closeWindow,
  CONTACT,
  HOME,
  maximizeWindow,
  minimizeWindow,
  OPEN,
  openWindow,
  positionUpdate,
  resizeAllWindows,
  resizeWindow,
  setActiveWindow,
  setScreenSize,
  WindowState,
} from '../../store';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

describe('Service - WindowManagerService', () => {
  let service: WindowManagerService;
  let store: jasmine.SpyObj<Store<WindowState>>;

  beforeEach(() => {
    const storeSpy = jasmine.createSpyObj('store', ['dispatch', 'select']);
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: Store,
          useValue: storeSpy,
        },
      ],
    });
    service = TestBed.inject(WindowManagerService);
    store = TestBed.inject(Store) as jasmine.SpyObj<Store<WindowState>>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setDefaultConfig', () => {
    it('should call setScreenSize store dispatch event', () => {
      service.setDefaultConfig(1920);

      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(setScreenSize({ width: 1920 }));
    });
  });

  describe('handleResize', () => {
    it('should call resizeAllWindows store dispatch event', () => {
      service.handleResize();

      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(resizeAllWindows({ width: window.innerWidth }));
    });
  });

  describe('setActiveWindow', () => {
    it('should call setActiveWindow store dispatch event', () => {
      service.setActiveWindow(HOME);

      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(setActiveWindow({ id: HOME }));
    });
  });

  describe('selectAllWindows', () => {
    it('should call setActiveWindow store dispatch event', () => {
      const mockWindows: WindowState[] = [{ id: HOME }, { id: CONTACT }] as WindowState[];

      store.select.and.returnValue(of(mockWindows));

      service.selectAllWindows().subscribe(result => {
        expect(result).toEqual({
          [HOME]: mockWindows[0],
          [CONTACT]: mockWindows[1],
        });
        expect(store.select).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('openWindow', () => {
    it('should call openWindow store dispatch event', () => {
      service.openWindow(HOME);

      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(openWindow({ id: HOME, width: window.innerWidth }));
    });
  });

  describe('maximizeWindow', () => {
    it('should call maximizeWindow store dispatch event', () => {
      service.maximizeWindow(HOME);

      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(maximizeWindow({ id: HOME }));
    });
  });

  describe('minimizeWindow', () => {
    it('should call minimizeWindow store dispatch event', () => {
      service.minimizeWindow(HOME);

      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(minimizeWindow({ id: HOME }));
    });
  });

  describe('closeWindow', () => {
    it('should call closeWindow store dispatch event', () => {
      service.closeWindow(HOME);

      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(closeWindow({ id: HOME, width: window.innerWidth }));
    });
  });

  describe('positionUpdate', () => {
    it('should call positionUpdate store dispatch event', () => {
      service.positionUpdate(HOME, { x: '100', y: '100', transform: 'none' });

      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(
        positionUpdate({
          id: HOME,
          position: { x: '100', y: '100', transform: 'none' },
        })
      );
    });
  });

  describe('selectWindowById', () => {
    it('should call selectWindowById store dispatch event', () => {
      const mockWindows: WindowState[] = [
        { id: HOME, status: OPEN },
        { id: CONTACT, status: CLOSED },
      ] as WindowState[];

      store.select.and.returnValue(of(mockWindows[0]));

      service.selectWindowById(HOME).subscribe(result => {
        expect(result).toEqual(mockWindows[0]);
        expect(store.select).toHaveBeenCalledTimes(1);
      });
    });
  });
  describe('resizeWindow', () => {
    it('should call resizeWindow store dispatch event', () => {
      service.resizeWindow(HOME, { height: '100', width: '100' });

      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(
        resizeWindow({
          id: HOME,
          size: { height: '100', width: '100' },
        })
      );
    });
  });
});
