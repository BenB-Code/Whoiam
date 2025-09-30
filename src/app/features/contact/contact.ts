import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {AsyncPipe, NgOptimizedImage} from '@angular/common';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {CLOSED, MAXIMIZED, MINIMIZED, selectWindowById, WindowState} from '../../store';
import {ContentWindow} from '../../common/content-window/content-window';
import {CONTACT} from '../../store/window-manager/constants/types.const';
import {ContactsService} from '../../services/contact/contacts.service';
import {Spinner} from '../../common/spinner/spinner';
import {WindowActions} from '../../common/directives/window-actions';

@Component({
  selector: 'app-contact',
  imports: [
    ContentWindow,
    NgOptimizedImage,
    AsyncPipe,
    Spinner,
    WindowActions
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Contact {
  private store = inject(Store);
  contactWindow$: Observable<WindowState | null> = this.store.select(selectWindowById(CONTACT));

  contactsService = inject(ContactsService);

  redirect(url: string): void {
    window.open(url, url.includes('mailto:') ? '_self' : '_blank');
  }

  protected readonly CONTACT = CONTACT;
  protected readonly MAXIMIZED = MAXIMIZED;
  protected readonly MINIMIZED = MINIMIZED;
  protected readonly CLOSED = CLOSED;
}
