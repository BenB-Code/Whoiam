import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContentWindow } from '../../common/components/content-window/content-window';
import { WindowType } from '../../store';
import { AsyncPipe } from '@angular/common';
import { WindowActions } from '../../common/directives';
import { TranslatePipe } from '@ngx-translate/core';
import { ComponentConstants } from '../../common/models/component-constants';

@Component({
  selector: 'app-home',
  imports: [ContentWindow, AsyncPipe, WindowActions, TranslatePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home extends ComponentConstants {
  homeWindow$ = this.windowManagerService.selectWindowById(this.HOME);

  open(id: WindowType): void {
    this.windowManagerService.openWindow(id);
  }
}
