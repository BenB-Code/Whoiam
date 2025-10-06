import { Component, input } from '@angular/core';
import { Spinner } from '../spinner/spinner';

@Component({
  selector: 'app-placeholder-text',
  imports: [Spinner],
  templateUrl: './placeholder-text.html',
  styleUrl: './placeholder-text.scss',
})
export class PlaceholderText {
  readonly textContent = input<string>();
}
