import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Subject } from 'rxjs';

import { Experiences } from './experiences';
import { WindowManagerService } from '../../services/window-manager/window-manager.service';
import { ExperiencesService } from './services/experiences.service';
import { Experience } from './models/experience.type';
import { CLOSED, EXPERIENCES as EXPERIENCES_ID, WindowState } from '../../store';

describe('Component - Experiences', () => {
  let component: Experiences;
  let fixture: ComponentFixture<Experiences>;
  let windowManagerService: jasmine.SpyObj<WindowManagerService>;
  let experiencesService: Partial<jasmine.SpyObj<ExperiencesService>> & {
    experiences: () => Experience[];
    isLoading: () => boolean;
    shouldDisplayPlaceholder: () => boolean;
    placeholder: () => string;
  };
  let windowState$: Subject<WindowState | null>;

  const mockExperiences: Experience[] = [
    {
      company: 'Akka I&S',
      name: 'Study and Development Engineer',
      duration: {
        startDate: new Date('2021-05'),
        endDate: new Date('2024-01'),
      },
      localisation: {
        city: 'Bordeaux',
        state: 'Nouvelle Aquitaine',
        country: 'France',
      },
      actions: [
        'Development of applications from scratch in mono and multi-repo architectures',
        'Development of RESTful APIs connected to databases',
      ],
      skills: ['Angular', 'NestJS'],
    },
    {
      company: 'Akka I&S 2',
      name: 'Study and Development Engineer',
      duration: {
        startDate: new Date('2021-05'),
        endDate: new Date('2024-01'),
      },
      localisation: {
        city: 'Bordeaux',
        state: 'Nouvelle Aquitaine',
        country: 'France',
      },
      actions: [
        'Development of applications from scratch in mono and multi-repo architectures',
        'Development of RESTful APIs connected to databases',
      ],
      skills: ['Angular', 'NestJS'],
    },
  ];

  beforeEach(async () => {
    windowState$ = new Subject<WindowState | null>();

    const windowManagerServiceSpy = jasmine.createSpyObj('WindowManagerService', ['selectWindowById']);
    windowManagerServiceSpy.selectWindowById.and.returnValue(windowState$.asObservable());

    experiencesService = {
      experiences: () => mockExperiences,
      isLoading: () => false,
      shouldDisplayPlaceholder: () => false,
      placeholder: () => 'experiences.unreachable',
    } as any;

    await TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        { provide: WindowManagerService, useValue: windowManagerServiceSpy },
        { provide: ExperiencesService, useValue: experiencesService },
      ],
      imports: [Experiences],
    }).compileComponents();

    windowManagerService = TestBed.inject(WindowManagerService) as jasmine.SpyObj<WindowManagerService>;

    fixture = TestBed.createComponent(Experiences);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have null selectedExperience initially', () => {
    expect(component.selectedExperience()).toBeNull();
  });

  describe('onSelection', () => {
    it('should set selectedExperience based on index', () => {
      component.onSelection({ item: mockExperiences[1], index: 1 });

      const selected = component.selectedExperience();
      expect(selected).toEqual(mockExperiences[1]);
    });

    it('should reset selectedExperience when window is CLOSED', () => {
      component.onSelection({ item: mockExperiences[0], index: 0 });
      expect(component.selectedExperience()).toEqual(mockExperiences[0]);

      windowState$.next({
        id: EXPERIENCES_ID,
        isActive: false,
        position: { x: '0px', y: '0px' },
        size: { width: '0px', height: '0px' },
        status: CLOSED,
        zIndex: 0,
      } as WindowState);

      fixture.detectChanges();

      expect(component.selectedExperience()).toBeNull();
    });
  });
});
