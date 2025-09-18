import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceResume } from './experience-resume';

describe('ExperienceResume', () => {
  let component: ExperienceResume;
  let fixture: ComponentFixture<ExperienceResume>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceResume]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienceResume);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
