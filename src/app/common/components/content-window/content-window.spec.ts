import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentWindow } from './content-window';
import { provideZonelessChangeDetection } from '@angular/core';
import { DragNDropService } from '../../../services/drag-n-drop/drag-n-drop.service';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Position } from '../../../store';

describe('Component - ContentWindow', () => {
  let component: ContentWindow;
  let fixture: ComponentFixture<ContentWindow>;
  let dragNDropService: jasmine.SpyObj<DragNDropService>;

  beforeEach(async () => {
    const dragNDropServiceSpy = jasmine.createSpyObj('DragNDropService', ['processNewPosition']);

    await TestBed.configureTestingModule({
      imports: [ContentWindow],
      providers: [provideZonelessChangeDetection(), { provide: DragNDropService, useValue: dragNDropServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentWindow);
    component = fixture.componentInstance;
    dragNDropService = TestBed.inject(DragNDropService) as jasmine.SpyObj<DragNDropService>;

    spyOn(component.closeEvent, 'emit');
    spyOn(component.fullscreenEvent, 'emit');
    spyOn(component.reduceEvent, 'emit');
    spyOn(component.dragNDropEndEvent, 'emit');
    spyOn(component.dragNDropStartEvent, 'emit');

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('close', () => {
    it('should emit closeEvent', () => {
      component.close();

      expect(component.closeEvent.emit).toHaveBeenCalledTimes(1);
    });
  });

  describe('fullscreen', () => {
    it('should toggle isFullscreen from false to true and emit event', () => {
      component.isFullscreen.set(false);

      component.fullscreen();

      expect(component.isFullscreen()).toBe(true);
      expect(component.fullscreenEvent.emit).toHaveBeenCalledWith(true);
    });

    it('should toggle isFullscreen from true to false and emit event', () => {
      component.isFullscreen.set(true);

      component.fullscreen();

      expect(component.isFullscreen()).toBe(false);
      expect(component.fullscreenEvent.emit).toHaveBeenCalledWith(false);
    });
  });

  describe('reduce', () => {
    it('should emit reduceEvent', () => {
      component.reduce();

      expect(component.reduceEvent.emit).toHaveBeenCalledTimes(1);
    });
  });

  describe('onDragStart', () => {
    it('should emit dragNDropStartEvent', () => {
      component.onDragStart();

      expect(component.dragNDropStartEvent.emit).toHaveBeenCalledTimes(1);
    });
  });

  describe('onDragEnded', () => {
    it('should emit dragNDropEndEvent with processed position and reset source', () => {
      const position: Position = { x: '100px', y: '200px', transform: 'none' };
      const mockEvent = {
        source: {
          reset: jasmine.createSpy('reset'),
        },
      } as unknown as CdkDragEnd;

      dragNDropService.processNewPosition.and.returnValue(position);

      component.onDragEnded(mockEvent);

      expect(dragNDropService.processNewPosition).toHaveBeenCalledWith(mockEvent);
      expect(component.dragNDropEndEvent.emit).toHaveBeenCalledWith(position);
      expect(mockEvent.source.reset).toHaveBeenCalledTimes(1);
    });
  });
});
