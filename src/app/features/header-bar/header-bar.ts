import {ChangeDetectionStrategy, Component} from '@angular/core';
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
  time: Date = new Date();
}
