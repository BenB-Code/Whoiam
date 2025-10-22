import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { I18nService } from '../../services/i18n/i18n.service';
import { EN, FR, FR_DATE_FORMAT, FR_LOCAL, US_DATE_FORMAT, US_LOCAL } from '../../common/constants';

@Component({
  selector: 'app-header-bar',
  imports: [],
  templateUrl: './header-bar.html',
  styleUrl: './header-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderBar {
  protected readonly EN = EN;
  protected readonly FR = FR;
  protected readonly i18nService: I18nService = inject(I18nService);
  private readonly time = signal(new Date());
  private readonly destroyRef = inject(DestroyRef);
  private readonly datePipe = new DatePipe(US_LOCAL);

  protected readonly formattedTime = computed(() => {
    const currentTime = this.time();
    const lang = this.i18nService.currentLang();
    const format = lang === FR ? FR_DATE_FORMAT : US_DATE_FORMAT;
    const locale = lang === FR ? FR_LOCAL : US_LOCAL;

    return this.datePipe.transform(currentTime, format, undefined, locale) || '';
  });

  constructor() {
    const intervalId = setInterval(() => {
      this.time.set(new Date());
    }, 1000);

    this.destroyRef.onDestroy(() => {
      clearInterval(intervalId);
    });
  }
}
