import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceLabel } from './experience-label';

describe('ExperienceLabel', () => {
  let component: ExperienceLabel;
  let fixture: ComponentFixture<ExperienceLabel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceLabel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienceLabel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
