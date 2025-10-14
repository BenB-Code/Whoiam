import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceholderText } from './placeholder-text';

describe('PlaceholderText', () => {
  let component: PlaceholderText;
  let fixture: ComponentFixture<PlaceholderText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceholderText],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaceholderText);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
