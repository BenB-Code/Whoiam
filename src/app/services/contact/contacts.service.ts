import {inject, Injectable, signal} from '@angular/core';
import {Contact} from '../../features/contact/models/contact.model';
import {take} from 'rxjs';
import {ContactsDataService} from '../data/contacts-data.service';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private contactsDataService = inject(ContactsDataService);

  contacts = signal<Contact[]>([]);

  constructor() {
    this.loadContacts();
  }

  private loadContacts(): void {
    this.contactsDataService.getContacts().pipe(take(1)).subscribe(
      contacts => this.contacts.set(contacts)
    );
  }
}
