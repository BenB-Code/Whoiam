import { ChangeDetectionStrategy, Component, EventEmitter, input, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { GREY, TRANSPARENT } from '../constants/style.const';

@Component({
  selector: 'app-window-header',
  imports: [NgClass],
  templateUrl: './window-header.html',
  styleUrl: './window-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WindowHeader {
  @Output() readonly onClose = new EventEmitter<void>();
  @Output() readonly onFullscreen = new EventEmitter<boolean>();
  @Output() readonly onReduce = new EventEmitter<void>();

  readonly backgroundColor = input<typeof GREY | typeof TRANSPARENT>(GREY);

  close(): void {
    this.onClose.emit();
  }

  fullscreen(): void {
    this.onFullscreen.emit();
  }

  reduce(): void {
    this.onReduce.emit();
  }
}
