import { inject, Injectable, signal } from '@angular/core';
import { EN, FR } from '../../common/constants/lang.const';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  readonly currentLang = signal<typeof FR | typeof EN>(FR);

  private readonly translateService: TranslateService = inject(TranslateService);

  switchLanguage(lang: typeof FR | typeof EN): void {
    this.translateService.use(lang);
    this.currentLang.set(lang);
  }

  getTranslatedField<T>(obj: Record<typeof FR | typeof EN, T>): T {
    return obj[this.currentLang()] || obj[FR];
  }
}
