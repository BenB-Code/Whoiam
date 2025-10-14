import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GREEN, GREY, ORANGE, RED } from '../../constants/style.const';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-bubble',
  imports: [NgClass],
  templateUrl: './bubble.html',
  styleUrl: './bubble.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Bubble {
  readonly contentText = input('');
  readonly color = input<typeof RED | typeof GREEN | typeof ORANGE | typeof GREY>(GREY);
}
