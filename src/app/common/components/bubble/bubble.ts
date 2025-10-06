import { Component, input } from '@angular/core';

@Component({
  selector: 'app-bubble',
  imports: [],
  templateUrl: './bubble.html',
  styleUrl: './bubble.scss',
})
export class Bubble {
  readonly contentText = input('');
}
