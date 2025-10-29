import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { DataLoaderServiceAbstract } from './data-loader-service.abstract';
import { I18nService } from '../../services/i18n/i18n.service';
import { DataService } from '../../services/data/data.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of, throwError } from 'rxjs';

type TestRawData = {
  id: number;
  name: string;
};

type TestTransformedData = {
  id: number;
  name: string;
  transformed: boolean;
};

class TestDataLoaderService extends DataLoaderServiceAbstract<TestRawData, TestTransformedData> {
  getData(): TestTransformedData[] {
    return this.rawData().map(item => ({
      ...item,
      transformed: true,
    }));
  }

  getErrorKey(): string {
    return 'test.error';
  }

  getPlaceholderKey(): string {
    return 'test.placeholder';
  }

  loadTestData(path: string): Observable<TestRawData[]> {
    return this.loadData(path);
  }
}

describe('Abstract - DataLoaderServiceAbstract', () => {
  let service: TestDataLoaderService;
  let dataService: jasmine.SpyObj<DataService>;
  let i18nService: I18nService;

  const mockRawData: TestRawData[] = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
  ];

  beforeEach(() => {
    const translateServiceSpy = jasmine.createSpyObj('TranslateService', ['use']);
    const dataServiceSpy = jasmine.createSpyObj('DataService', ['fetchJson']);

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        TestDataLoaderService,
        I18nService,
        { provide: DataService, useValue: dataServiceSpy },
        { provide: TranslateService, useValue: translateServiceSpy },
      ],
    });

    service = TestBed.inject(TestDataLoaderService);
    dataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
    i18nService = TestBed.inject(I18nService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('computed signals', () => {
    it('should compute hasError as false when error is null', () => {
      service.error.set(null);

      expect(service.hasError()).toBe(false);
    });

    it('should compute hasError as true when error is set', () => {
      service.error.set('test.error');

      expect(service.hasError()).toBe(true);
    });

    it('should compute isEmpty as true when no error and data is empty', () => {
      service.error.set(null);
      (service as any).rawData.set([]);

      expect(service.isEmpty()).toBe(true);
    });

    it('should compute isEmpty as false when data is present', () => {
      service.error.set(null);
      (service as any).rawData.set(mockRawData);

      expect(service.isEmpty()).toBe(false);
    });

    it('should compute shouldDisplayPlaceholder as true when hasError', () => {
      service.error.set('test.error');

      expect(service.shouldDisplayPlaceholder()).toBe(true);
    });

    it('should compute shouldDisplayPlaceholder as true when isEmpty', () => {
      service.error.set(null);
      (service as any).rawData.set([]);

      expect(service.shouldDisplayPlaceholder()).toBe(true);
    });

    it('should compute shouldDisplayPlaceholder as false when has data and no error', () => {
      service.error.set(null);
      (service as any).rawData.set(mockRawData);

      expect(service.shouldDisplayPlaceholder()).toBe(false);
    });

    it('should compute placeholder as error when hasError', () => {
      service.error.set('test.error');

      expect(service.placeholder()).toBe('test.error');
    });

    it('should compute placeholder as placeholderKey when isEmpty', () => {
      service.error.set(null);
      (service as any).rawData.set([]);

      expect(service.placeholder()).toBe('test.placeholder');
    });
  });

  describe('loadData', () => {
    it('should load data successfully and update rawData', done => {
      dataService.fetchJson.and.returnValue(of(mockRawData));

      service.loadTestData('/test/path').subscribe(() => {
        expect((service as any).rawData()).toEqual(mockRawData);
        expect(service.isLoading()).toBe(false);
        expect(service.error()).toBeNull();
        done();
      });
    });

    it('should handle error and set error key', done => {
      dataService.fetchJson.and.returnValue(throwError(() => new Error('Network error')));

      service.loadTestData('/test/path').subscribe(() => {
        expect(service.error()).toBe('test.error');
        expect(service.isLoading()).toBe(false);
        expect((service as any).rawData()).toEqual([]);
        done();
      });
    });

    it('should clear previous error on new load', done => {
      service.error.set('previous.error');
      dataService.fetchJson.and.returnValue(of(mockRawData));

      service.loadTestData('/test/path').subscribe(() => {
        expect(service.error()).toBeNull();
        done();
      });
    });
  });

  describe('abstract methods', () => {
    it('should transform data via getData', () => {
      (service as any).rawData.set(mockRawData);

      const result = service.getData();

      expect(result).toEqual([
        { id: 1, name: 'Item 1', transformed: true },
        { id: 2, name: 'Item 2', transformed: true },
      ]);
    });

    it('should return error key', () => {
      expect(service.getErrorKey()).toBe('test.error');
    });

    it('should return placeholder key', () => {
      expect(service.getPlaceholderKey()).toBe('test.placeholder');
    });
  });
});
