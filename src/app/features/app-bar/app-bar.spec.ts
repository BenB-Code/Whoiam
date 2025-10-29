import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBar } from './app-bar';
import { provideZonelessChangeDetection } from '@angular/core';
import { ContactsService } from '../../services/contact/contacts.service';
import { NavigationService } from '../../services/navigation/navigation.service';
import { WindowManagerService } from '../../services/window-manager/window-manager.service';
import { HOME } from '../../store';

describe('Component - AppBar', () => {
  let component: AppBar;
  let fixture: ComponentFixture<AppBar>;

  let contactService: jasmine.SpyObj<ContactsService>;
  let navigationService: jasmine.SpyObj<NavigationService>;
  let windowManagerService: jasmine.SpyObj<WindowManagerService>;

  beforeEach(async () => {
    const contactServiceSpy = jasmine.createSpyObj('contactsService', ['loadContacts']);
    const navigationServiceSpy = jasmine.createSpyObj('navigationService', ['redirect']);
    const windowManagerServiceSpy = jasmine.createSpyObj('windowManagerService', ['selectAllWindows', 'openWindow']);

    await TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: NavigationService,
          useValue: navigationServiceSpy,
        },
        {
          provide: ContactsService,
          useValue: contactServiceSpy,
        },
        {
          provide: WindowManagerService,
          useValue: windowManagerServiceSpy,
        },
      ],
      imports: [AppBar],
    }).compileComponents();

    windowManagerService = TestBed.inject(WindowManagerService) as jasmine.SpyObj<WindowManagerService>;
    contactService = TestBed.inject(ContactsService) as jasmine.SpyObj<ContactsService>;
    navigationService = TestBed.inject(NavigationService) as jasmine.SpyObj<NavigationService>;

    fixture = TestBed.createComponent(AppBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onAppClick', () => {
    it('should call openWindow with correct id', () => {
      component.onAppClick(HOME);

      expect(windowManagerService.openWindow).toHaveBeenCalledWith(HOME);
      expect(windowManagerService.openWindow).toHaveBeenCalledTimes(1);
    });
  });
});
