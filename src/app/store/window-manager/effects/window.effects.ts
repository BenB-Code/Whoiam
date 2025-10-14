import { ProjectsService } from '../../../features/projects/services/projects.service';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { openWindow } from '../actions/window.actions';
import { tap } from 'rxjs';
import { CONTACT, EXPERIENCES, PROJECTS } from '../constants';
import { ContactsService } from '../../../services/contact/contacts.service';
import { ExperiencesService } from '../../../features/experiences/services/experiences.service';

@Injectable()
export class WindowEffects {
  private readonly actions$ = inject(Actions);

  private readonly experiencesService = inject(ExperiencesService);
  private readonly projectsService = inject(ProjectsService);
  private readonly contactsService = inject(ContactsService);

  readonly openWindow$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(openWindow),
        tap(({ id }) => {
          switch (id) {
            case PROJECTS:
              this.projectsService.loadProjects();
              break;
            case CONTACT:
              this.contactsService.loadContacts();
              break;
            case EXPERIENCES:
              this.experiencesService.loadExperiences();
              break;
          }
        })
      ),
    { dispatch: false }
  );
}
