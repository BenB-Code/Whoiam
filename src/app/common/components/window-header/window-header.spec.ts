import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowHeader } from './window-header';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Component - WindowHeader', () => {
  let component: WindowHeader;
  let fixture: ComponentFixture<WindowHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WindowHeader],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(WindowHeader);
    fixture.componentRef.setInput('disableFullscreen', false);
    fixture.componentRef.setInput('isFullscreen', false);
    fixture.detectChanges();

    component = fixture.componentInstance;

    spyOn(component.closeWindow, 'emit');
    spyOn(component.activateFullscreen, 'emit');
    spyOn(component.reduceWindow, 'emit');

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onClose', () => {
    it('should call closeWindow event', () => {
      component.onClose();

      expect(component.closeWindow.emit).toHaveBeenCalledTimes(1);
    });
  });

  describe('onFullscreen', () => {
    it('should call activateFullscreen event', () => {
      component.onFullscreen();

      expect(component.activateFullscreen.emit).toHaveBeenCalledTimes(1);
    });
  });

  describe('onReduce', () => {
    it('should call reduceWindow event', () => {
      component.onReduce();

      expect(component.reduceWindow.emit).toHaveBeenCalledTimes(1);
    });
  });
});
