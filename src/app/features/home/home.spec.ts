import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home } from './home';
import { WindowManagerService } from '../../services/window-manager/window-manager.service';
import { provideZonelessChangeDetection } from '@angular/core';
import { HOME } from '../../store';

describe('Component - Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let windowManagerService: jasmine.SpyObj<WindowManagerService>;

  beforeEach(async () => {
    const windowManagerServiceSpy = jasmine.createSpyObj('windowManagerService', ['selectWindowById', 'openWindow']);

    await TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: WindowManagerService,
          useValue: windowManagerServiceSpy,
        },
      ],
      imports: [Home],
    }).compileComponents();

    windowManagerService = TestBed.inject(WindowManagerService) as jasmine.SpyObj<WindowManagerService>;

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('open', () => {
    it('should call openWindow', () => {
      component.open(HOME);

      expect(windowManagerService.openWindow).toHaveBeenCalledWith(HOME);
      expect(windowManagerService.openWindow).toHaveBeenCalledTimes(1);
    });
  });
});
