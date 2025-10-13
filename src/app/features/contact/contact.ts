import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CLOSED, CONTACT, MAXIMIZED, MINIMIZED, OPEN, selectWindowById, WindowState } from '../../store';
import { ContentWindow } from '../../common/components/content-window/content-window';
import { ContactsService } from '../../services/contact/contacts.service';
import { Spinner } from '../../common/components/spinner/spinner';
import { WindowActions } from '../../common/directives';
import { NavigationService } from '../../services/navigation/navigation.service';
import { PlaceholderText } from '../../common/components/placeholder-text/placeholder-text';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  imports: [ContentWindow, AsyncPipe, Spinner, WindowActions, PlaceholderText, TranslatePipe],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  protected readonly navigationService: NavigationService = inject(NavigationService);
  protected readonly contactsService = inject(ContactsService);
  protected readonly CONTACT = CONTACT;
  protected readonly MAXIMIZED = MAXIMIZED;
  protected readonly MINIMIZED = MINIMIZED;
  protected readonly CLOSED = CLOSED;
  protected readonly OPEN = OPEN;
  private readonly store = inject(Store);
  contactWindow$: Observable<WindowState | null> = this.store.select(selectWindowById(CONTACT));
}
