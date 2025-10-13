import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { EN, FR } from '../../common/constants/lang.const';
import { TranslateService } from '@ngx-translate/core';

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
  protected activeLang: typeof FR | typeof EN = FR;
  private readonly destroyRef = inject(DestroyRef);
  private readonly translateService: TranslateService = inject(TranslateService);

  constructor() {
    const intervalId = setInterval(() => {
      this.time.set(new Date());
    }, 1000);

    this.destroyRef.onDestroy(() => {
      clearInterval(intervalId);
    });
  }

  setLang(lang: typeof FR | typeof EN): void {
    this.activeLang = lang;
    this.translateService.use(lang);
  }
}
