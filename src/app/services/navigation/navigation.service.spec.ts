import { TestBed } from '@angular/core/testing';

import { NavigationService } from './navigation.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Service - NavigationService', () => {
  let service: NavigationService;

  beforeEach(() => {
    spyOn(window, 'open');

    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    service = TestBed.inject(NavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('redirect', () => {
    it('should open in a new window from url', () => {
      service.redirect('https://github.com/BenB-Code');

      expect(window.open).toHaveBeenCalledWith('https://github.com/BenB-Code', '_blank');
    });
    it('should open in the same new window from url with mailto', () => {
      service.redirect('mailto:jhon-doe@gmail.com');

      expect(window.open).toHaveBeenCalledWith('mailto:jhon-doe@gmail.com', '_self');
    });
  });
});
