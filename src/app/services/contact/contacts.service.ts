import { computed, inject, Injectable, signal } from '@angular/core';
import { Contact } from '../../features/contact/models/contact.type';
import { catchError, Observable, of, take, tap } from 'rxjs';
import { DataService } from '../data/data.service';
import { CONTACT } from '../../store';
import { DATA_PATH } from '../../common/constants';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  readonly isLoading = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  readonly hasError = computed(() => this.error() !== null);
  readonly placeholder = computed(() => (this.hasError() ? this.error() : 'contact.unreachable'));
  readonly contacts = signal<Contact[]>([]);
  readonly isEmpty = computed(() => !this.hasError() && this.contacts().length === 0);
  readonly shouldDisplayPlaceholder = computed(() => this.hasError() || this.isEmpty());
  private readonly dataService = inject(DataService);

  loadContacts(): void {
    if (this.contacts().length === 0) {
      this.getContacts().pipe(take(1)).subscribe();
    }
  }

  private getContacts(): Observable<Contact[]> {
    this.isLoading.set(true);
    this.error.set(null);

    return this.dataService.fetchJson<Contact[]>(DATA_PATH(CONTACT)).pipe(
      tap(contacts => {
        this.contacts.set(contacts);
        this.isLoading.set(false);
      }),
      catchError(err => {
        console.error('Error loading contact: ', err);
        this.error.set('contact.error');
        this.isLoading.set(false);
        this.contacts.set([]);
        return of([]);
      })
    );
  }
}
