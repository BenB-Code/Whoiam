import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderBar} from './header-bar/header-bar';
import {AppBar} from './app-bar/app-bar';
import {ListingWindow} from './common/listing-window/listing-window';
import {Contact} from './contact/contact';
import {Home} from './home/home';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderBar, AppBar, Contact, Home, ListingWindow],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'Whoiam';
}



