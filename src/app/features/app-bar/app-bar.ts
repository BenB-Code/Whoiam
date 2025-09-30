import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {map} from 'rxjs';
import {openWindow, selectAllWindows, WindowState, WindowType} from '../../store';
import {AsyncPipe} from '@angular/common';
import {ContactsService} from '../../services/contact/contacts.service';

@Component({
  selector: 'app-app-bar',
  imports: [
    AsyncPipe
  ],
  templateUrl: './app-bar.html',
  styleUrl: './app-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppBar implements OnInit {
  private store = inject(Store);
  windowState$ = this.store.select(selectAllWindows).pipe(
    map(windows => {
      const stateMap: Record<string, WindowState | null> = {};
      windows.forEach(window => {
        stateMap[window.id] = window;
      });
      return stateMap
    })
  );

  contactsService = inject(ContactsService);

  ngOnInit() {
    this.contactsService.loadContacts();
  }

  onAppClick(id: WindowType) {
    this.store.dispatch(openWindow({id}));
  }

  redirect(url: string): void {
    window.open(url, url.includes('mailto:') ? '_self' : '_blank');
  }
}
