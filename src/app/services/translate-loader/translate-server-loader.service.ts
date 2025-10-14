import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export class TranslateServerLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    const paths = [
      join(process.cwd(), 'dist', 'Whoiam', 'browser', 'assets', 'i18n', `${lang}.json`),
      join(process.cwd(), 'src', 'assets', 'i18n', `${lang}.json`),
    ];

    for (const path of paths) {
      if (existsSync(path)) {
        const data = JSON.parse(readFileSync(path, 'utf8'));
        return of(data);
      }
    }

    console.warn(`[TranslateServerLoader] No translation file found for lang: ${lang}`);
    return of({});
  }
}

export function translateServerLoaderFactory(): TranslateLoader {
  return new TranslateServerLoader();
}
