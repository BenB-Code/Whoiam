import { ProjectsService } from './projects.service';
import { I18nService } from '../../../services/i18n/i18n.service';
import { DataService } from '../../../services/data/data.service';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PROJECTS } from '../../../store';
import { Project, RawProject } from '../models';
import { TranslateService } from '@ngx-translate/core';
import { EN } from '../../../common/constants';
import { of } from 'rxjs';

describe('Service - ProjectService', () => {
  let service: ProjectsService;
  let i18nService: I18nService;

  const rawData: RawProject[] = [
    {
      name: 'Kaamelott Citation Extractor',
      description: {
        fr: 'Un parseur XML pour extraire et structurer les citations des pages Wikiquote de Kaamelott',
        en: 'An XML parser to extract and structure quotes from the Kaamelott Wikiquote pages',
      },
      link: {
        name: 'Github',
        url: 'https://github.com/BenB-Code/Kaamelott_Citation_Extractor',
      },
      technologies: ['TypeScript', 'XML', 'JSON', 'Parser'],
      status: 'active',
      year: 2025,
      category: 'tool',
    },
  ];
  const data: Project[] = [
    {
      name: 'Kaamelott Citation Extractor',
      description: 'An XML parser to extract and structure quotes from the Kaamelott Wikiquote pages',
      link: {
        name: 'Github',
        url: 'https://github.com/BenB-Code/Kaamelott_Citation_Extractor',
      },
      technologies: ['TypeScript', 'XML', 'JSON', 'Parser'],
      status: 'active',
      year: 2025,
      category: 'tool',
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
    service = TestBed.inject(ProjectsService);

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

      expect(result).toEqual(`${PROJECTS}.error`);
    });
  });

  describe('getPlaceholderKey()', () => {
    it('should return placeholder key', () => {
      const result = service.getPlaceholderKey();

      expect(result).toEqual(`${PROJECTS}.unreachable`);
    });
  });

  describe('loadProjects', () => {
    it('should load data when rawData is not defined', () => {
      service['rawData'].set([]);
      service.loadProjects();

      expect(service['loadData']).toHaveBeenCalledTimes(1);
      expect(service['loadData']).toHaveBeenCalledWith(`/assets/data/projects.json`);
    });

    it('should do nothing when rawData is already defined', () => {
      service['rawData'].set(rawData);
      service.loadProjects();

      expect(service['loadData']).not.toHaveBeenCalled();
    });
  });
});
