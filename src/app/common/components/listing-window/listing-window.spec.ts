import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingWindow } from './listing-window';
import { provideZonelessChangeDetection } from '@angular/core';
import { DragNDropService } from '../../../services/drag-n-drop/drag-n-drop.service';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Position } from '../../../store';

describe('Component - ListingWindow', () => {
  let component: ListingWindow<string>;
  let fixture: ComponentFixture<ListingWindow<string>>;
  let dragNDropService: jasmine.SpyObj<DragNDropService>;

  beforeEach(async () => {
    const dragNDropServiceSpy = jasmine.createSpyObj('DragNDropService', ['processNewPosition']);

    await TestBed.configureTestingModule({
      imports: [ListingWindow],
      providers: [provideZonelessChangeDetection(), { provide: DragNDropService, useValue: dragNDropServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ListingWindow<string>);
    component = fixture.componentInstance;
    dragNDropService = TestBed.inject(DragNDropService) as jasmine.SpyObj<DragNDropService>;

    spyOn(component.closeEvent, 'emit');
    spyOn(component.fullscreenEvent, 'emit');
    spyOn(component.reduceEvent, 'emit');
    spyOn(component.itemSelected, 'emit');
    spyOn(component.dragNDropEndEvent, 'emit');
    spyOn(component.dragNDropStartEvent, 'emit');

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set selectedItemSignal from selectedIndex input', () => {
      fixture.componentRef.setInput('selectedIndex', 2);
      component.ngOnInit();

      expect(component.selectedItemSignal()).toBe(2);
    });

    it('should set selectedItemSignal to null when selectedIndex is null', () => {
      fixture.componentRef.setInput('selectedIndex', null);
      component.ngOnInit();

      expect(component.selectedItemSignal()).toBeNull();
    });
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

  describe('selectItem', () => {
    it('should set selectedItemSignal and emit itemSelected event', () => {
      const item = 'test-item';
      const index = 3;

      component.selectItem(item, index);

      expect(component.selectedItemSignal()).toBe(3);
      expect(component.itemSelected.emit).toHaveBeenCalledWith({ item, index });
    });
  });

  describe('isSelected', () => {
    it('should return true when index matches selectedItemSignal', () => {
      component.selectedItemSignal.set(5);

      expect(component.isSelected(5)).toBe(true);
    });

    it('should return false when index does not match selectedItemSignal', () => {
      component.selectedItemSignal.set(5);

      expect(component.isSelected(3)).toBe(false);
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
      const position: Position = { x: '150px', y: '250px' };
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
