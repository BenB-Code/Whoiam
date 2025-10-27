import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';

describe('Service - DataService', () => {
  let service: DataService;
  let http: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const httpSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: HttpClient,
          useValue: httpSpy,
        },
      ],
    });

    service = TestBed.inject(DataService);
    http = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchJson', () => {
    it('should get called with correct path', () => {
      const path = 'http://localhost:4200';

      service.fetchJson(path);

      expect(http.get).toHaveBeenCalledWith(path);
    });
  });
});
