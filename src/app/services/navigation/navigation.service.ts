import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  redirect(url: string) {
    window.open(url, url.includes('mailto:') ? '_self' : '_blank');
  }
}
