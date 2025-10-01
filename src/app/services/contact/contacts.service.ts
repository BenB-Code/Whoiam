import { computed, inject, Injectable, signal } from '@angular/core';
import { Contact } from '../../features/contact/models/contact.type';
import { catchError, Observable, of, take, tap } from 'rxjs';
import { DataService } from '../data/data.service';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  readonly contacts = signal<Contact[]>([]);
  readonly isLoading = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  readonly hasError = computed(() => this.error() !== null);
  readonly isEmpty = computed(() => !this.hasError() && this.contacts().length === 0);
  readonly shouldDisplayPlaceholder = computed(() => this.hasError() || this.isEmpty());
  readonly placeholder = computed(() =>
    this.hasError() ? this.error() : 'Aucun moyen de me contacter pour le moment.'
  );
  private dataService = inject(DataService);

  loadContacts(): void {
    if (this.contacts().length === 0) {
      this.getContacts().pipe(take(1)).subscribe();
    }
  }

  private getContacts(): Observable<Contact[]> {
    this.isLoading.set(true);
    this.error.set(null);

    return this.dataService.fetchJson<Contact[]>('/assets/data/contacts.json').pipe(
      tap(contacts => {
        this.contacts.set(contacts);
        this.isLoading.set(false);
      }),
      catchError(err => {
        console.error('Error loading contact: ', err);
        this.error.set(
          'Une erreur est survenue lors de la récupération des moyens de contact. Merci de réessayer plus tard.'
        );
        this.isLoading.set(false);
        this.contacts.set([]);
        return of([]);
      })
    );
  }
}
