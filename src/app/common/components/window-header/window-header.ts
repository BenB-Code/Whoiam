import { ChangeDetectionStrategy, Component, EventEmitter, input, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { GREY, TRANSPARENT } from '../../constants/style.const';

@Component({
  selector: 'app-window-header',
  imports: [NgClass],
  templateUrl: './window-header.html',
  styleUrl: './window-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WindowHeader {
  @Output() readonly closeWindow = new EventEmitter<void>();
  @Output() readonly activateFullscreen = new EventEmitter<boolean>();
  @Output() readonly reduceWindow = new EventEmitter<void>();

  readonly title = input('');

  readonly backgroundColor = input<typeof GREY | typeof TRANSPARENT>(GREY);

  onClose(): void {
    this.closeWindow.emit();
  }

  onFullscreen(): void {
    this.activateFullscreen.emit();
  }

  onReduce(): void {
    this.reduceWindow.emit();
  }
}
