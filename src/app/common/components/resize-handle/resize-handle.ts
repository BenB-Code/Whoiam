import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-resize-handle',
  imports: [NgClass],
  templateUrl: './resize-handle.html',
  styleUrl: './resize-handle.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResizeHandle {
  readonly disableResize = input(false);
}
