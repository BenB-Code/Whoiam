import { TestBed } from '@angular/core/testing';

import { DragNDropService } from './drag-n-drop.service';
import { provideZonelessChangeDetection } from '@angular/core';
import { CdkDragEnd } from '@angular/cdk/drag-drop';

describe('Service - DragNDropService', () => {
  let service: DragNDropService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    service = TestBed.inject(DragNDropService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('processNewPosition', () => {
    let childPositions: CdkDragEnd;

    beforeEach(() => {
      const mockGetRootElement = {
        getBoundingClientRect: jasmine.createSpy('getBoundingClientRect').and.returnValue({
          x: 100,
          y: 0,
          width: 0,
          height: 0,
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        } as DOMRect),
      };
      childPositions = {
        dropPoint: {
          x: 0,
          y: 50,
        },
        distance: {
          x: 100,
          y: 100,
        },
        event: new MouseEvent('mouseup'),
        source: {
          getRootElement: () => mockGetRootElement,
        } as any,
      };
    });

    it('should give recalculated positions without boudaries defined', () => {
      const result = service.processNewPosition(childPositions);

      expect(result).toEqual({
        x: '100px',
        y: '0px',
      });
    });

    it('should give recalculated positions with boudaries defined', () => {
      service.boundaries = new DOMRect(250, 250, 1000, 1000);

      const result = service.processNewPosition(childPositions);

      expect(result).toEqual({
        x: '350px',
        y: '0px',
      });
    });
  });
});
