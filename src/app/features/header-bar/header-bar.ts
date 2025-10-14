import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { I18nService } from '../../services/i18n/i18n.service';
import { EN, FR } from '../../common/constants';

@Component({
  selector: 'app-header-bar',
  imports: [DatePipe],
  templateUrl: './header-bar.html',
  styleUrl: './header-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderBar {
  readonly time = signal(new Date());
  protected readonly EN = EN;
  protected readonly FR = FR;
  protected readonly i18nService: I18nService = inject(I18nService);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    const intervalId = setInterval(() => {
      this.time.set(new Date());
    }, 1000);

    this.destroyRef.onDestroy(() => {
      clearInterval(intervalId);
    });
  }
}
