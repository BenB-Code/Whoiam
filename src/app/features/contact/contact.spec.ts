import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Contact } from './contact';
import { provideZonelessChangeDetection } from '@angular/core';
import { ContactsService } from '../../services/contact/contacts.service';
import { NavigationService } from '../../services/navigation/navigation.service';
import { WindowManagerService } from '../../services/window-manager/window-manager.service';

describe('Component - Contact', () => {
  let component: Contact;
  let fixture: ComponentFixture<Contact>;
  let contactService: jasmine.SpyObj<ContactsService>;
  let navigationService: jasmine.SpyObj<NavigationService>;
  let windowManagerService: jasmine.SpyObj<WindowManagerService>;

  beforeEach(async () => {
    const contactServiceSpy = jasmine.createSpyObj(ContactsService, ['']);
    const navigationServiceSpy = jasmine.createSpyObj(NavigationService, ['']);
    const windowManagerServiceSpy = jasmine.createSpyObj(WindowManagerService, ['selectWindowById']);

    await TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: ContactsService,
          useValue: contactServiceSpy,
        },
        {
          provide: NavigationService,
          useValue: navigationServiceSpy,
        },
        {
          provide: WindowManagerService,
          useValue: windowManagerServiceSpy,
        },
      ],
      imports: [Contact],
    }).compileComponents();

    contactService = TestBed.inject(ContactsService) as jasmine.SpyObj<ContactsService>;
    navigationService = TestBed.inject(NavigationService) as jasmine.SpyObj<NavigationService>;
    windowManagerService = TestBed.inject(WindowManagerService) as jasmine.SpyObj<WindowManagerService>;

    fixture = TestBed.createComponent(Contact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
