import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowHeader } from './window-header';
import { provideZonelessChangeDetection } from '@angular/core';
import { closeWindow } from '../../../store';

describe('Component - WindowHeader', () => {
  let component: WindowHeader;
  let fixture: ComponentFixture<WindowHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WindowHeader],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(WindowHeader);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;

    spyOn(component, 'closeWindow');
    spyOn(component, 'activateFullscreen');
    spyOn(component, 'reduceWindow');

    fixture.componentRef.setInput('disableFullscreen', false);
    await fixture.whenStable();
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onClose', () => {
    it('should call closeWindow event', async () => {
      component.onClose();

      expect(component.closeWindow).toHaveBeenCalledTimes(1);
    });
  });
});
