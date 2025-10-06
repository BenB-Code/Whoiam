import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import {
  CLOSED,
  CONTACT,
  EXPERIENCES,
  HOME,
  openWindow,
  PROJECTS,
  selectAllWindows,
  WindowState,
  WindowType,
} from '../../store';
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
  protected readonly contactsService = inject(ContactsService);
  protected readonly navigationService: NavigationService = inject(NavigationService);
  protected readonly HOME = HOME;
  protected readonly CLOSED = CLOSED;
  protected readonly EXPERIENCES = EXPERIENCES;
  protected readonly PROJECTS = PROJECTS;
  protected readonly CONTACT = CONTACT;
  private readonly store = inject(Store);
  windowState$ = this.store.select(selectAllWindows).pipe(
    map(windows => {
      const stateMap: Record<string, WindowState | null> = {};
      for (const window of windows) {
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
