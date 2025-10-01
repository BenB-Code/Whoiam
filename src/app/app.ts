import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderBar } from './features/header-bar/header-bar';
import { AppBar } from './features/app-bar/app-bar';
import { Contact } from './features/contact/contact';
import { Home } from './features/home/home';
import { Experiences } from './features/experiences/experiences';
import { Projects } from './features/projects/projects';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderBar, AppBar, Contact, Home, Experiences, Projects],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected title = 'Whoiam';
}
