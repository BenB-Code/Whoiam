import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ContactsService } from './contacts.service';
import { CONTACT } from '../../store';
import { I18nService } from '../i18n/i18n.service';
import { DataService } from '../data/data.service';
import { of } from 'rxjs';
import { Contact } from '../../features/contact/models/contact.type';

describe('Service - ContactService', () => {
  let service: ContactsService;

  beforeEach(() => {
    const i18nServiceSpy = jasmine.createSpyObj('', ['']);
    const dataServiceSpy = jasmine.createSpyObj('', ['']);

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: I18nService,
          useValue: i18nServiceSpy,
        },
        {
          provide: DataService,
          useValue: dataServiceSpy,
        },
      ],
    });

    service = TestBed.inject(ContactsService);

    service['loadData'] = jasmine.createSpy().and.returnValue(of([]));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('contacts', () => {
    it('should compute contacts with rawData', () => {
      service['rawData'].set([
        {
          name: 'Jhon Doe Mail',
          logo: 'JD',
          url: 'nowhere/to/look',
          alt: 'JD',
        },
        {
          name: 'Maite Mail',
          logo: 'Maite',
          url: 'nowhere/to/look',
          alt: 'Maite',
        },
      ]);
      expect(service.contacts().length).toBe(2);
      expect(service.contacts()).toEqual(service['rawData']());
    });
  });

  describe('getData', () => {
    it('should return rawData', () => {
      const data: Contact[] = [
        {
          name: 'Jhon Doe Mail',
          logo: 'JD',
          url: 'nowhere/to/look',
          alt: 'JD',
        },
      ];
      service['rawData'].set(data);

      const result = service.getData();

      expect(result).toEqual(data);
    });
  });

  describe('getErrorKey()', () => {
    it('should return error key', () => {
      const result = service.getErrorKey();

      expect(result).toEqual(`${CONTACT}.error`);
    });
  });

  describe('getPlaceholderKey()', () => {
    it('should return placeholder key', () => {
      const result = service.getPlaceholderKey();

      expect(result).toEqual(`${CONTACT}.unreachable`);
    });
  });

  describe('loadContacts', () => {
    it('should load data when rawData is not defined', () => {
      service['rawData'].set([]);
      service.loadContacts();

      expect(service['loadData']).toHaveBeenCalledTimes(1);
      expect(service['loadData']).toHaveBeenCalledWith(`/assets/data/contact.json`);
    });

    it('should do nothing when rawData is already defined', () => {
      service['rawData'].set([
        {
          name: 'Jhon Doe Mail',
          logo: 'JD',
          url: 'nowhere/to/look',
          alt: 'JD',
        },
      ]);
      service.loadContacts();

      expect(service['loadData']).not.toHaveBeenCalled();
    });
  });
});
