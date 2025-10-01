import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingWindow } from './listing-window';

describe('ListingWindow', () => {
  let component: ListingWindow;
  let fixture: ComponentFixture<ListingWindow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingWindow],
    }).compileComponents();

    fixture = TestBed.createComponent(ListingWindow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
