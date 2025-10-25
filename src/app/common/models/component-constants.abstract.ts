import { CLOSED, CONTACT, EXPERIENCES, HOME, MAXIMIZED, MINIMIZED, OPEN, PROJECTS } from '../../store';
import { GREEN, RED } from '../constants';
import { inject } from '@angular/core';
import { WindowManagerService } from '../../services/window-manager/window-manager.service';

export abstract class ComponentConstantsAbstract {
  protected readonly CONTACT = CONTACT;
  protected readonly MAXIMIZED = MAXIMIZED;
  protected readonly MINIMIZED = MINIMIZED;
  protected readonly CLOSED = CLOSED;
  protected readonly OPEN = OPEN;
  protected readonly HOME = HOME;
  protected readonly PROJECTS = PROJECTS;
  protected readonly EXPERIENCES = EXPERIENCES;
  protected readonly RED = RED;
  protected readonly GREEN = GREEN;

  protected readonly windowManagerService = inject(WindowManagerService);
}
