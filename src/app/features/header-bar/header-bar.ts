import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { I18nService } from '../../services/i18n/i18n.service';
import { EN, FR } from '../../common/constants';

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
  private readonly datePipe = new DatePipe('en-US');

  protected readonly formattedTime = computed(() => {
    const currentTime = this.time();
    const lang = this.i18nService.currentLang();
    const format = lang === FR ? 'EEE dd MMM HH:mm' : 'EEE dd MMM hh:mm a';
    const locale = lang === FR ? 'fr-FR' : 'en-US';

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
