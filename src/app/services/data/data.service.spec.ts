import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';

describe('Service - DataService', () => {
  let service: DataService;
  let mockHttp: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: HttpClient,
          useValue: mockHttp,
        },
      ],
    });

    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchJson', () => {
    it('should get called with correct path', () => {
      const path = 'http://localhost:4200';

      service.fetchJson(path);

      expect(mockHttp.get).toHaveBeenCalledWith(path);
    });
  });
});
