import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResizeHandle } from './resize-handle';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Component - ResizeHandle', () => {
  let component: ResizeHandle;
  let fixture: ComponentFixture<ResizeHandle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [ResizeHandle],
    }).compileComponents();

    fixture = TestBed.createComponent(ResizeHandle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
