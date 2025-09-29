import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {AsyncPipe, NgOptimizedImage} from '@angular/common';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {closeWindow, maximizeWindow, minimizeWindow, selectWindowById, setActiveWindow, WindowState} from '../../store';
import {ContentWindow} from '../../common/content-window/content-window';
import {CONTACT} from '../../store/window-manager/constants/types.const';
import {ContactsService} from '../../services/contact/contacts.service';
import {Spinner} from '../../common/spinner/spinner';

@Component({
  selector: 'app-contact',
  imports: [
    ContentWindow,
    NgOptimizedImage,
    AsyncPipe,
    Spinner,
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Contact {
  private store = inject(Store);
  contactWindow$: Observable<WindowState | null> = this.store.select(selectWindowById(CONTACT));

  contactsService = inject(ContactsService);

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
