import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentWindow } from './content-window';

describe('ContentWindow', () => {
  let component: ContentWindow;
  let fixture: ComponentFixture<ContentWindow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentWindow],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentWindow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
