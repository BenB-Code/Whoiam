import { computed, Injectable } from '@angular/core';
import { take } from 'rxjs';
import { CONTACT } from '../../store';
import { DATA_PATH } from '../../common/constants';
import { DataLoaderServiceAbstract } from '../../common/models/data-loader-service.abstract';
import { Contact } from '../../features/contact/models/contact.type';

@Injectable({
  providedIn: 'root',
})
export class ContactsService extends DataLoaderServiceAbstract<Contact, Contact> {
  readonly contacts = computed(() => [...this.rawData()]);

  getData(): Contact[] {
    return this.rawData();
  }

  getErrorKey(): string {
    return `${CONTACT}.error`;
  }

  getPlaceholderKey(): string {
    return `${CONTACT}.unreachable`;
  }

  loadContacts(): void {
    if (this.rawData().length === 0) {
      this.loadData(DATA_PATH(CONTACT)).pipe(take(1)).subscribe();
    }
  }
}
