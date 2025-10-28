import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bubble } from './bubble';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Component - Bubble', () => {
  let component: Bubble;
  let fixture: ComponentFixture<Bubble>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [Bubble],
    }).compileComponents();

    fixture = TestBed.createComponent(Bubble);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
