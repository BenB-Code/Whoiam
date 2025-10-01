import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { openWindow, selectAllWindows, WindowState, WindowType } from '../../store';
import { AsyncPipe } from '@angular/common';
import { ContactsService } from '../../services/contact/contacts.service';
import { NavigationService } from '../../services/navigation/navigation.service';

@Component({
  selector: 'app-app-bar',
  imports: [AsyncPipe],
  templateUrl: './app-bar.html',
  styleUrl: './app-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppBar implements OnInit {
  contactsService = inject(ContactsService);
  navigationService: NavigationService = inject(NavigationService);

  private readonly store = inject(Store);
  windowState$ = this.store.select(selectAllWindows).pipe(
    map(windows => {
      const stateMap: Record<string, WindowState | null> = {};
      for (let window of windows) {
        stateMap[window.id] = window;
      }
      return stateMap;
    })
  );

  ngOnInit(): void {
    this.contactsService.loadContacts();
  }

  onAppClick(id: WindowType): void {
    this.store.dispatch(openWindow({ id }));
  }
}
