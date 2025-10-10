import { ChangeDetectionStrategy, Component, EventEmitter, input, Output, signal } from '@angular/core';
import { WindowComponentBase } from '../../models/window-component.base';
import { WindowHeader } from '../window-header/window-header';
import { NgClass } from '@angular/common';
import { RAINBOW } from '../../constants/style.const';
import { CdkDrag, CdkDragEnd } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-content-window',
  imports: [WindowHeader, NgClass, CdkDrag],
  templateUrl: './content-window.html',
  styleUrl: './content-window.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentWindow extends WindowComponentBase {
  @Output() readonly closeEvent = new EventEmitter<void>();
  @Output() readonly fullscreenEvent = new EventEmitter<boolean>();
  @Output() readonly reduceEvent = new EventEmitter<void>();
  @Output() readonly dragNDropEvent = new EventEmitter<CdkDragEnd>();

  readonly title = input('');
  readonly disableFullscreen = input<boolean>(false);
  readonly color = input<string>(RAINBOW);
  readonly isFullscreen = signal<boolean>(false);

  onDragEnded(event: CdkDragEnd): void {
    this.dragNDropEvent.emit(event);
  }

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
