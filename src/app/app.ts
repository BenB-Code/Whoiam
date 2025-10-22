import { afterNextRender, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderBar } from './features/header-bar/header-bar';
import { AppBar } from './features/app-bar/app-bar';
import { Contact } from './features/contact/contact';
import { Home } from './features/home/home';
import { Experiences } from './features/experiences/experiences';
import { Projects } from './features/projects/projects';
import { DragNDropService } from './services/drag-n-drop/drag-n-drop.service';
import { WindowManagerService } from './services/window-manager/window-manager.service';
import { HOME } from './store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderBar, AppBar, Contact, Home, Experiences, Projects],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected title = 'Whoiam';
  protected readonly dragNDropService: DragNDropService = inject(DragNDropService);
  protected readonly windowManagerService = inject(WindowManagerService);

  constructor() {
    afterNextRender(() => {
      this.windowManagerService.setDefaultConfig(window.innerWidth);
      this.setDragBoundaries();
      this.windowManagerService.openWindow(HOME);
    });
  }

  setDragBoundaries(): void {
    const boundary = document.querySelector('.drag-n-drop-boundary');
    this.dragNDropService.boundaries = boundary?.getBoundingClientRect();
  }
}
