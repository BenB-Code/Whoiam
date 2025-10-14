import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';

export class TranslateBrowserLoader implements TranslateLoader {
  private http = inject(HttpClient);

  getTranslation(lang: string): Observable<any> {
    return this.http.get(`/assets/i18n/${lang}.json`);
  }
}

export function translateBrowserLoaderFactory(): TranslateLoader {
  return new TranslateBrowserLoader();
}
