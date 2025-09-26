import {Component, inject} from '@angular/core';
import {ContentWindow} from '../common/content-window/content-window';
import {AsyncPipe, NgOptimizedImage} from '@angular/common';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {closeWindow, maximizeWindow, minimizeWindow, selectWindowById, setActiveWindow, WindowState} from '../store';
import {CONTACT} from '../store/window-manager/models/types.const';

@Component({
  selector: 'app-contact',
  imports: [
    ContentWindow,
    NgOptimizedImage,
    AsyncPipe,
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {
  contactMethods = [
    {
      name: 'Github',
      logo: 'assets/icons/github-svgrepo-com.svg',
      url: 'https://github.com/BenB-Code',
      alt: 'Github'
    }, {
      name: 'Email',
      logo: 'assets/icons/gmail-svgrepo-com.svg',
      url: 'mailto:benjamin.bats.dev@gmail.com',
      alt: 'Email'
    }, {
      name: 'LinkedIn',
      logo: 'assets/icons/linkedin-svgrepo-com.svg',
      url: 'https://www.linkedin.com/in/benjamin-bats-200464165/',
      alt: 'LinkedIn'
    }
  ]
  private store = inject(Store);

  contactWindow$: Observable<WindowState | null> = this.store.select(selectWindowById(CONTACT));

  onClose(): void {
    this.store.dispatch(closeWindow({id: CONTACT}));
  }

  onFullscreen(): void {
    this.store.dispatch(maximizeWindow({id: CONTACT}));
  }

  onReduce(): void {
    this.store.dispatch(minimizeWindow({id: CONTACT}));
  }

  onActivate(): void {
    this.store.dispatch(setActiveWindow({id: CONTACT}));
  }

  redirect(url: string): void {
    window.open(url, url.includes('mailto:') ? '_self' : '_blank');
  }
}
