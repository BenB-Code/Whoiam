import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderBar } from './header-bar';
import { provideZonelessChangeDetection } from '@angular/core';
import { I18nService } from '../../services/i18n/i18n.service';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { EN, FR, FR_DATE_FORMAT, FR_LOCAL, US_DATE_FORMAT, US_LOCAL } from '../../common/constants';

registerLocaleData(localeFr, FR_LOCAL);

describe('Component - HeaderBar', () => {
  let component: HeaderBar;
  let fixture: ComponentFixture<HeaderBar>;
  let i18nService: jasmine.SpyObj<I18nService>;

  beforeEach(async () => {
    const i18nServiceSpy = jasmine.createSpyObj('I18nService', ['currentLang']);

    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), { provide: I18nService, useValue: i18nServiceSpy }, DatePipe],
      imports: [HeaderBar],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderBar);
    component = fixture.componentInstance;
    fixture.detectChanges();

    i18nService = TestBed.inject(I18nService) as jasmine.SpyObj<I18nService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('formattedTime', () => {
    it('should format date in FR', () => {
      i18nService.currentLang.and.returnValue(FR);
      const now = new Date('2025-01-25T14:00:00');
      (component as any).time.set(now);

      const expected = new DatePipe(FR_LOCAL).transform(now, FR_DATE_FORMAT, undefined, FR_LOCAL)!;
      const result = component['formattedTime']();

      expect(result).not.toBeNull();
      expect(result).toBe(expected);
    });

    it('should format date in EN', () => {
      i18nService.currentLang.and.returnValue(EN);
      const now = new Date('2025-01-25T14:00:00');
      (component as any).time.set(now);

      const expected = new DatePipe(US_LOCAL).transform(now, US_DATE_FORMAT, undefined, US_LOCAL)!;
      const result = component['formattedTime']();

      expect(result).not.toBeNull();
      expect(result).toBe(expected);
    });
  });

  describe('time update', () => {
    it('should update time every second and clear interval on destroy', async () => {
      const initialTime = (component as any).time();

      await new Promise(resolve => setTimeout(resolve, 1000));
      const updatedTime = (component as any).time();

      expect(updatedTime.getTime()).toBeGreaterThan(initialTime.getTime());

      const clearIntervalSpy = spyOn(window, 'clearInterval').and.callThrough();

      if (typeof (component as any).ngOnDestroy === 'function') {
        (component as any).ngOnDestroy();
      }

      expect(clearIntervalSpy).toHaveBeenCalled();
    });
  });
});
