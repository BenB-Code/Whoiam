import {Component} from '@angular/core';
import {Badge} from '../../../common/components/badge/badge';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-contact-landing',
  imports: [
    Badge,
    NgOptimizedImage
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.scss'
})
export class ContactLanding {
  contactMethods = [
    {
      name: 'Github',
      logo: 'assets/icons/github-svgrepo-com.svg',
      url: 'https://github.com/BenB-Code',
      alt: 'Github'
    }, {
      name: 'Email',
      logo: 'assets/icons/mail-svgrepo-com.svg',
      url: 'mailto:benjamin.bats.dev@gmail.com',
      alt: 'Email'
    }, {
      name: 'LinkedIn',
      logo: 'assets/icons/linkedin-svgrepo-com.svg',
      url: 'https://www.linkedin.com/in/benjamin-bats-200464165/',
      alt: 'LinkedIn'
    }
  ]


  redirect(url: string): void {
    window.open(url, url.includes('mailto:') ? '_self' :'_blank');
  }

}
