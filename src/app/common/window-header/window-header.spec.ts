import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowHeader } from './window-header';

describe('WindowHeader', () => {
  let component: WindowHeader;
  let fixture: ComponentFixture<WindowHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WindowHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WindowHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
