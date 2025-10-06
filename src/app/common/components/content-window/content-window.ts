import { ChangeDetectionStrategy, Component, EventEmitter, input, Output, signal } from '@angular/core';
import { WindowComponentBase } from '../../models/window-component.base';
import { WindowHeader } from '../window-header/window-header';
import { NgClass } from '@angular/common';
import { RAINBOW } from '../../constants/style.const';

@Component({
  selector: 'app-content-window',
  imports: [WindowHeader, NgClass],
  templateUrl: './content-window.html',
  styleUrl: './content-window.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentWindow extends WindowComponentBase {
  @Output() readonly closeEvent = new EventEmitter<void>();
  @Output() readonly fullscreenEvent = new EventEmitter<boolean>();
  @Output() readonly reduceEvent = new EventEmitter<void>();

  readonly title = input('');
  readonly disableFullscreen = input<boolean>(false);
  readonly color = input<string>(RAINBOW);
  readonly isFullscreen = signal<boolean>(false);

  close(): void {
    this.closeEvent.emit();
  }

  fullscreen(): void {
    const newState = !this.isFullscreen();
    this.isFullscreen.set(newState);
    this.fullscreenEvent.emit(newState);
  }

  reduce(): void {
    this.reduceEvent.emit();
  }
}
