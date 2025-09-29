import {computed, inject, Injectable, signal} from '@angular/core';
import {Contact} from '../../features/contact/models/contact.model';
import {catchError, Observable, of, tap} from 'rxjs';
import {DataService} from '../data/data.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private dataService = inject(DataService);

  contacts = signal<Contact[]>([]);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  hasError = computed(() => this.error() !== null);
  isEmpty = computed(() => !this.hasError() && this.contacts().length === 0);
  shouldDisplayPlaceholder = computed(() => this.hasError() || this.isEmpty());
  placeholder = computed(() => this.hasError() ? this.error() : "Aucun moyen de me contacter pour le moment.")

  constructor() {
    this.loadContacts();
  }

  private loadContacts(): void {
    this.getContacts().pipe(takeUntilDestroyed()).subscribe();
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
        console.error('Error loading contact: ', err)
        this.error.set("Une erreur est survenue lors de la récupération des moyens de contact. Merci de réessayer plus tard.")
        this.isLoading.set(false);
        this.contacts.set([]);
        return of([]);
      })
    )
  }
}
