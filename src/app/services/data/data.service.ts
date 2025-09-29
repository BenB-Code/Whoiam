import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private http = inject(HttpClient)

  fetchJson<T>(path: string): Observable<T> {
    return this.http.get<T>(path);
  }
}
