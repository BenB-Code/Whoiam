import { inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FR, LANGUAGES } from '../../common/constants';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  readonly currentLang = signal<LANGUAGES>(FR);

  private readonly translateService: TranslateService = inject(TranslateService);

  switchLanguage(lang: LANGUAGES): void {
    this.translateService.use(lang);
    this.currentLang.set(lang);
  }

  getTranslatedField<T>(obj: Record<LANGUAGES, T>): T {
    return obj[this.currentLang()] || obj[FR];
  }
}
