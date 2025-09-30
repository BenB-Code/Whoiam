import {ChangeDetectionStrategy, Component, DestroyRef, inject, signal} from '@angular/core';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-header-bar',
  imports: [
    DatePipe
  ],
  templateUrl: './header-bar.html',
  styleUrl: './header-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderBar {
  private destroyRef = inject(DestroyRef);

  time = signal(new Date());

  constructor() {
    const intervalId = setInterval(() => {
      this.time.set(new Date());
    }, 1000);

    this.destroyRef.onDestroy(() => {
      clearInterval(intervalId);
    });
  }

}
