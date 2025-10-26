import { TestBed } from '@angular/core/testing';

import { I18nService } from './i18n.service';
import { provideZonelessChangeDetection } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGES } from '../../common/constants';

describe('Service - I18nService', () => {
  let service: I18nService;
  let mockTranslateService: any;

  beforeEach(() => {
    mockTranslateService = jasmine.createSpyObj(TranslateService, ['use']);

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: TranslateService,
          useValue: mockTranslateService,
        },
      ],
    });

    service = TestBed.inject(I18nService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('switchLanguage', () => {
    it('should set the current language', () => {
      service.switchLanguage('en');

      expect(mockTranslateService.use).toHaveBeenCalledWith('en');
      expect(service.currentLang()).toBe('en');
    });
  });

  describe('getTranslatedField', () => {
    const translations = {
      helloWorld: {
        fr: 'Bonjour le monde',
        en: 'Hello world',
      },
      helloNoOne: {
        fr: 'Bonjour personne',
      },
    };

    it('should return associated currentLang translation', () => {
      service.switchLanguage('en');
      const result = service.getTranslatedField(translations.helloWorld);

      expect(result).toEqual(translations.helloWorld.en);
    });
    it('should return default currentLang translation when no association found', () => {
      service.switchLanguage('en');
      const result = service.getTranslatedField(translations.helloNoOne as Record<LANGUAGES, any>);

      expect(result).toEqual(translations.helloNoOne.fr);
    });
  });
});
