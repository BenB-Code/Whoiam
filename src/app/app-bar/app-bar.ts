import {Component, inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {map, take} from 'rxjs';
import {openWindow, restoreWindow, selectAllWindows, setActiveWindow, WindowState, WindowType} from '../store';
import {CLOSED, MINIMIZED} from '../store/window-manager/models/status.const';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-app-bar',
  imports: [
    AsyncPipe
  ],
  templateUrl: './app-bar.html',
  styleUrl: './app-bar.scss'
})
export class AppBar {
  private store = inject(Store);

  contactMethods = [
    {
      name: 'Email',
      logo: 'assets/icons/gmail-svgrepo-com.svg',
      url: 'mailto:benjamin.bats.dev@gmail.com',
      alt: 'Email'
    }, {
      name: 'LinkedIn',
      logo: 'assets/icons/linkedin-svgrepo-com.svg',
      url: 'https://www.linkedin.com/in/benjamin-bats-200464165/',
      alt: 'LinkedIn'
    }, {
      name: 'Github',
      logo: 'assets/icons/github-svgrepo-com.svg',
      url: 'https://github.com/BenB-Code',
      alt: 'Github'
    },
  ]

  windowState$ = this.store.select(selectAllWindows).pipe(
    map(windows => {
      const stateMap: Record<string, WindowState | null> = {};
      windows.forEach(window => {
        stateMap[window.id] = window;
      });
      return stateMap
    })
  )

  onAppClick(id: WindowType) {
    this.store.select(selectAllWindows).pipe(
      map(windows => windows.find(w => w.id === id)),
      take(1)
    ).subscribe(window => {
        if (!window || window.status === CLOSED) {
          this.store.dispatch(openWindow({id}));
        } else if (window.status === MINIMIZED) {
          this.store.dispatch(restoreWindow({id}));
        } else {
          this.store.dispatch(setActiveWindow({id}));
        }

      }
    )
  }

  redirect(url: string): void {
    window.open(url, url.includes('mailto:') ? '_self' : '_blank');
  }
}
