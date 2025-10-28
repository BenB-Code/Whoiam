import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Spinner } from './spinner';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Spinner', () => {
  let component: Spinner;
  let fixture: ComponentFixture<Spinner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [Spinner],
    }).compileComponents();

    fixture = TestBed.createComponent(Spinner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
