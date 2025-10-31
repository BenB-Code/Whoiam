import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Projects } from './projects';
import { provideZonelessChangeDetection } from '@angular/core';
import { NavigationService } from '../../services/navigation/navigation.service';
import { WindowManagerService } from '../../services/window-manager/window-manager.service';
import { ProjectsService } from './services/projects.service';

describe('Component - Projects', () => {
  let component: Projects;
  let fixture: ComponentFixture<Projects>;

  beforeEach(async () => {
    const projectsServiceSpy = jasmine.createSpyObj(ProjectsService, ['']);
    const navigationServiceSpy = jasmine.createSpyObj(NavigationService, ['']);
    const windowManagerServiceSpy = jasmine.createSpyObj(WindowManagerService, ['selectWindowById']);

    await TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: ProjectsService,
          useValue: projectsServiceSpy,
        },
        {
          provide: NavigationService,
          useValue: navigationServiceSpy,
        },
        {
          provide: WindowManagerService,
          useValue: windowManagerServiceSpy,
        },
      ],
      imports: [Projects],
    }).compileComponents();

    fixture = TestBed.createComponent(Projects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
