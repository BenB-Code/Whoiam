import {Component} from '@angular/core';
import {ContentWindow} from '../common/content-window/content-window';

@Component({
  selector: 'app-home',
  imports: [
    ContentWindow,

  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  isFullscreen = false;
  isReduced = false;
  isVisible = true;

  onClose(): void {
    this.isVisible = false;
  }

  onFullscreen(isFullscreen: boolean): void {
    this.isFullscreen = isFullscreen;
  }

  onReduce(): void {
    this.isReduced = true;
  }
}
