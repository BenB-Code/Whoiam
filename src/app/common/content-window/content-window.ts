import {ChangeDetectionStrategy, Component, EventEmitter, Output, signal} from '@angular/core';
import {WindowComponentBase} from '../models/window-component.base';

@Component({
  selector: 'app-content-window',
  imports: [],
  templateUrl: './content-window.html',
  styleUrl: './content-window.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentWindow extends WindowComponentBase {
  @Output() closeEvent = new EventEmitter<void>();
  @Output() fullscreenEvent = new EventEmitter<boolean>();
  @Output() reduceEvent = new EventEmitter<void>();

  isFullscreen = signal<boolean>(false);

  close() {
    this.closeEvent.emit();
  }

  fullscreen() {
    const newState = !this.isFullscreen();
    this.isFullscreen.set(newState);
    this.fullscreenEvent.emit(newState);
  }

  reduce() {
    this.reduceEvent.emit();
  }
}
