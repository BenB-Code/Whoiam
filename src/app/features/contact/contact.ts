import {Component, inject, OnInit, signal} from '@angular/core';
import {AsyncPipe, NgOptimizedImage} from '@angular/common';
import {Store} from '@ngrx/store';
import {Observable, take} from 'rxjs';
import {closeWindow, maximizeWindow, minimizeWindow, selectWindowById, setActiveWindow, WindowState} from '../../store';
import {ContentWindow} from '../../common/content-window/content-window';
import {CONTACT} from '../../store/window-manager/constants/types.const';
import {ContactsService} from './services/contact.service';
import {Contact as ContactModel} from './models/contact.model';

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
export class Contact implements OnInit {
  private store = inject(Store);
  contactWindow$: Observable<WindowState | null> = this.store.select(selectWindowById(CONTACT));

  private contactsService: ContactsService = inject(ContactsService);
  contactMethods = signal<ContactModel[]>([]);

  ngOnInit(): void {
    this.contactsService.getContacts().pipe(take(1)).subscribe(contacts => (this.contactMethods.set(contacts)));
  }

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
