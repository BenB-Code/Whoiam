import {inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    private http = inject(HttpClient);
    private platformId = inject(PLATFORM_ID);
    private document = inject(DOCUMENT);

    fetchJson<T>(path: string): Observable<T> {
        const fullUrl = this.getAbsoluteUrl(path);
        return this.http.get<T>(fullUrl);
    }

    private getAbsoluteUrl(path: string): string {
        if (isPlatformBrowser(this.platformId)) {
            return path;
        } else {
            const origin = this.document?.location?.origin || 'http://localhost:4200';
            return `${origin}${path}`;
        }
    }
}
