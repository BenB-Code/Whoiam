import {Component} from '@angular/core';
import {ContentWindow} from '../common/content-window/content-window';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [
    ContentWindow,
    NgOptimizedImage,
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {
  isFullscreen = false;
  isReduced = false;
  isVisible = true;

  contactMethods = [
    {
      name: 'Github',
      logo: 'assets/icons/github-svgrepo-com.svg',
      url: 'https://github.com/BenB-Code',
      alt: 'Github'
    }, {
      name: 'Email',
      logo: 'assets/icons/gmail-svgrepo-com.svg',
      url: 'mailto:benjamin.bats.dev@gmail.com',
      alt: 'Email'
    }, {
      name: 'LinkedIn',
      logo: 'assets/icons/linkedin-svgrepo-com.svg',
      url: 'https://www.linkedin.com/in/benjamin-bats-200464165/',
      alt: 'LinkedIn'
    }
  ]

  onClose(): void {
    this.isVisible = false;
  }

  onFullscreen(isFullscreen: boolean): void {
    this.isFullscreen = isFullscreen;
  }

  onReduce(): void {
    this.isReduced = true;
  }

  redirect(url: string): void {
    window.open(url, url.includes('mailto:') ? '_self' : '_blank');
  }
}
