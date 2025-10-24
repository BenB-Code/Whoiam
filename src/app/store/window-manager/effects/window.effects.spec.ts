// TODO - find a way to test zoneless

import { ReplaySubject } from 'rxjs';
import { WindowEffects } from './window.effects';
import { ProjectsService } from '../../../features/projects/services/projects.service';
import { ExperiencesService } from '../../../features/experiences/services/experiences.service';
import { ContactsService } from '../../../services/contact/contacts.service';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { CONTACT, EXPERIENCES, PROJECTS } from '../constants';
import { openWindow } from '../actions/window.actions';
import { WindowType } from '../models';
import { provideZonelessChangeDetection } from '@angular/core';

describe('WindowEffects', () => {
  let actions$: ReplaySubject<Action>;
  let effects: WindowEffects;

  let projectService: jasmine.SpyObj<ProjectsService>;
  let experiencesService: jasmine.SpyObj<ExperiencesService>;
  let contactsService: jasmine.SpyObj<ContactsService>;

  beforeEach(async () => {
    actions$ = new ReplaySubject<Action>(1);

    const projectServiceSpy = jasmine.createSpyObj('projectService', ['loadProjects']);
    const experiencesServiceSpy = jasmine.createSpyObj('experiencesService', ['loadExperiences']);
    const contactsServiceSpy = jasmine.createSpyObj('contactsService', ['loadContacts']);

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        WindowEffects,
        provideMockActions(() => actions$),
        {
          provide: ProjectsService,
          useValue: projectServiceSpy,
        },
        {
          provide: ExperiencesService,
          useValue: experiencesServiceSpy,
        },
        {
          provide: ContactsService,
          useValue: contactsServiceSpy,
        },
      ],
    });

    effects = TestBed.inject(WindowEffects);
    projectService = TestBed.inject(ProjectsService) as jasmine.SpyObj<ProjectsService>;
    experiencesService = TestBed.inject(ExperiencesService) as jasmine.SpyObj<ExperiencesService>;
    contactsService = TestBed.inject(ContactsService) as jasmine.SpyObj<ContactsService>;
  });

  afterEach(async () => {
    actions$.complete();
  });

  describe('openWindow$', async () => {
    it('should call projectsService.loadProjects when id is PROJECTS', () => {
      effects.openWindow$.subscribe({
        complete: () => {
          expect(projectService.loadProjects).toHaveBeenCalledTimes(1);
          expect(experiencesService.loadExperiences).not.toHaveBeenCalled();
          expect(contactsService.loadContacts).not.toHaveBeenCalled();
        },
      });

      actions$.next(openWindow({ id: PROJECTS, width: 1200 }));
      actions$.complete();
    });
    it('should call contactsService.loadContacts when id is CONTACT', async () => {
      effects.openWindow$.subscribe({
        complete: () => {
          expect(projectService.loadProjects).not.toHaveBeenCalled();
          expect(experiencesService.loadExperiences).not.toHaveBeenCalled();
          expect(contactsService.loadContacts).toHaveBeenCalledTimes(1);
        },
      });

      actions$.next(openWindow({ id: CONTACT, width: 1200 }));
      actions$.complete();
    });
    it('should call experiencesService.loadExperiences when id is EXPERIENCES', async () => {
      effects.openWindow$.subscribe({
        complete: () => {
          expect(projectService.loadProjects).not.toHaveBeenCalled();
          expect(experiencesService.loadExperiences).toHaveBeenCalledTimes(1);
          expect(contactsService.loadContacts).not.toHaveBeenCalled();
        },
      });

      actions$.next(openWindow({ id: EXPERIENCES, width: 1200 }));
      actions$.complete();
    });
    it('should not call any service when id is unknown', async () => {
      effects.openWindow$.subscribe({
        complete: () => {
          expect(projectService.loadProjects).not.toHaveBeenCalled();
          expect(experiencesService.loadExperiences).not.toHaveBeenCalled();
          expect(contactsService.loadContacts).not.toHaveBeenCalled();
        },
      });

      actions$.next(openWindow({ id: 'none' as WindowType, width: 1200 }));
      actions$.complete();
    });
  });
});
