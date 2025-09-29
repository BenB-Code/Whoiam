import {inject, Injectable} from '@angular/core';
import {DataService} from '../../../services/data/data.service';
import {catchError, Observable, of} from 'rxjs';
import {Contact} from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private dataService = inject(DataService);

  getContacts(): Observable<Contact[]> {
    return this.dataService.fetchJson<Contact[]>('/assets/data/contacts.json').pipe(
      catchError(err => {
        console.error('Error loading contact: ', err)
        return of([]);
      })
    )
  }
}
