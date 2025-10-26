import { TestBed } from '@angular/core/testing';

import { FormatService } from './format.service';
import { provideZonelessChangeDetection } from '@angular/core';
import { US_LOCAL } from '../../common/constants';

describe('Service - FormatService', () => {
  let service: FormatService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    service = TestBed.inject(FormatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('formatDuration', () => {
    let dates: {
      startDate: Date;
      endDate: Date;
    };

    beforeEach(() => {
      dates = {
        startDate: new Date('11/01/2024'),
        endDate: new Date('06/01/2025'),
      };
    });

    it('should return formated dates into shorter format without local given', () => {
      const result = service.formatDuration(dates);

      expect(result).toEqual('11/2024 - 06/2025');
    });

    it('should return formated dates into shorter format with local given', () => {
      const result = service.formatDuration(dates, US_LOCAL);

      expect(result).toEqual('11/2024 - 06/2025');
    });
  });
});
