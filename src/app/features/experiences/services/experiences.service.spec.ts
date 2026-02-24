import { ExperiencesService } from './experiences.service';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from '../../../services/data/data.service';
import { I18nService } from '../../../services/i18n/i18n.service';
import { RawExperience } from '../models/raw-experience.type';
import { Experience } from '../models/experience.type';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { EN } from '../../../common/constants';
import { EXPERIENCES } from '../../../store';
import { of } from 'rxjs';

describe('Service - ExperiencesService', () => {
  let service: ExperiencesService;
  let i18nService: I18nService;

  const rawData: RawExperience[] = [
    {
      company: {
        fr: 'Akka I&S',
        en: 'Akka I&S',
      },
      name: {
        fr: "Ingénieur d'étude et développement",
        en: 'Study and Development Engineer',
      },
      duration: {
        startDate: new Date('2021-05'),
        endDate: new Date('2024-01'),
      },
      localisation: {
        city: 'Bordeaux',
        state: 'Nouvelle Aquitaine',
        country: 'France',
      },
      actions: {
        fr: [
          "Développements d'applications from scratch mono et multi-repo",
          "Développements d'API RestFull en lien avec des bases de données",
        ],
        en: [
          'Development of applications from scratch in mono and multi-repo architectures',
          'Development of RESTful APIs connected to databases',
        ],
      },
      skills: {
        fr: ['Angular', 'NestJS'],
        en: ['Angular', 'NestJS'],
      },
    },
  ];
  const data: Experience[] = [
    {
      company: 'Akka I&S',
      name: 'Study and Development Engineer',
      duration: {
        startDate: new Date('2021-05'),
        endDate: new Date('2024-01'),
      },
      localisation: {
        city: 'Bordeaux',
        state: 'Nouvelle Aquitaine',
        country: 'France',
      },
      actions: [
        'Development of applications from scratch in mono and multi-repo architectures',
        'Development of RESTful APIs connected to databases',
      ],
      skills: ['Angular', 'NestJS'],
    },
  ];

  beforeEach(() => {
    const translateServiceSpy = jasmine.createSpyObj('', ['use']);
    const dataServiceSpy = jasmine.createSpyObj('', ['fetchJson']);

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: DataService,
          useValue: dataServiceSpy,
        },
        I18nService,
        {
          provide: TranslateService,
          useValue: translateServiceSpy,
        },
      ],
    });

    i18nService = TestBed.inject(I18nService);
    service = TestBed.inject(ExperiencesService);

    service['loadData'] = jasmine.createSpy().and.returnValue(of([]));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getData', () => {
    it('should return data', () => {
      i18nService.switchLanguage(EN);
      service['rawData'].set(rawData);

      const result = service.getData();

      expect(result).toEqual(data);
    });
  });

  describe('getErrorKey()', () => {
    it('should return error key', () => {
      const result = service.getErrorKey();

      expect(result).toEqual(`${EXPERIENCES}.error`);
    });
  });

  describe('getPlaceholderKey()', () => {
    it('should return placeholder key', () => {
      const result = service.getPlaceholderKey();

      expect(result).toEqual(`${EXPERIENCES}.unreachable`);
    });
  });

  describe('loadExperiences', () => {
    it('should load data when rawData is not defined', () => {
      service['rawData'].set([]);

      service.loadExperiences();

      expect(service['loadData']).toHaveBeenCalledTimes(1);
      expect(service['loadData']).toHaveBeenCalledWith(`/public/data/experiences.json`);
    });

    it('should do nothing when rawData is already defined', () => {
      service['rawData'].set(rawData);
      service.loadExperiences();

      expect(service['loadData']).not.toHaveBeenCalled();
    });
  });
});
