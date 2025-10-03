import { ChangeDetectionStrategy, Component, EventEmitter, input, Output, signal } from '@angular/core';
import { WindowComponentBase } from '../../models/window-component.base';
import { WindowHeader } from '../window-header/window-header';

@Component({
  selector: 'app-content-window',
  imports: [WindowHeader],
  templateUrl: './content-window.html',
  styleUrl: './content-window.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentWindow extends WindowComponentBase {
  @Output() readonly closeEvent = new EventEmitter<void>();
  @Output() readonly fullscreenEvent = new EventEmitter<boolean>();
  @Output() readonly reduceEvent = new EventEmitter<void>();

  readonly title = input('');

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
