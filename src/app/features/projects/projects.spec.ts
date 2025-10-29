import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Projects } from './projects';
import { provideZonelessChangeDetection } from '@angular/core';
import { NavigationService } from '../../services/navigation/navigation.service';
import { WindowManagerService } from '../../services/window-manager/window-manager.service';
import { ProjectsService } from './services/projects.service';

describe('Projects', () => {
  let component: Projects;
  let fixture: ComponentFixture<Projects>;
  let projectsService: jasmine.SpyObj<ProjectsService>;
  let navigationService: jasmine.SpyObj<NavigationService>;
  let windowManagerService: jasmine.SpyObj<WindowManagerService>;

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

    projectsService = TestBed.inject(ProjectsService) as jasmine.SpyObj<ProjectsService>;
    navigationService = TestBed.inject(NavigationService) as jasmine.SpyObj<NavigationService>;
    windowManagerService = TestBed.inject(WindowManagerService) as jasmine.SpyObj<WindowManagerService>;

    fixture = TestBed.createComponent(Projects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
