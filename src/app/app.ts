import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavigationModule} from './navigation/navigation.module';
import {HomeModule} from './home/home.module';
import {ExperiencesModule} from './experiences/experiences.module';
import {ContactModule} from './contact/contact.module';
import {TechnicalModule} from './technical/technical.module';
import {ProjectsModule} from './projects/projects.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,  NavigationModule, HomeModule, ExperiencesModule, ContactModule, TechnicalModule, ProjectsModule,],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'Whoiam';
}



