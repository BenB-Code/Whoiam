import {Component, inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {map, take} from 'rxjs';
import {
  CLOSED,
  MINIMIZED,
  openWindow,
  restoreWindow,
  selectAllWindows,
  setActiveWindow,
  WindowState,
  WindowType
} from '../store';
import {AsyncPipe} from '@angular/common';
import {Contact} from '../features/contact/models/contact.model';
import {ContactsService} from '../features/contact/services/contact.service';

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
  windowState$ = this.store.select(selectAllWindows).pipe(
    map(windows => {
      const stateMap: Record<string, WindowState | null> = {};
      windows.forEach(window => {
        stateMap[window.id] = window;
      });
      return stateMap
    })
  )

  private contactsService: ContactsService = inject(ContactsService);
  contactMethods: Contact[] = []

  constructor() {
    this.contactsService.getContacts().pipe(take(1)).subscribe(contacts => (this.contactMethods = contacts));
  }

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
