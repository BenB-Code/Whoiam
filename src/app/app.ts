import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderBar} from './header-bar/header-bar';
import {AppBar} from './app-bar/app-bar';
import {Contact} from './contact/contact';
import {Home} from './home/home';
import {Experiences} from './experiences/experiences';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderBar, AppBar, Contact, Home, Experiences],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'Whoiam';
}



