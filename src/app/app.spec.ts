import { CUSTOM_ELEMENTS_SCHEMA, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { DragNDropService } from './services/drag-n-drop/drag-n-drop.service';
import { WindowManagerService } from './services/window-manager/window-manager.service';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderBar } from './features/header-bar/header-bar';
import { AppBar } from './features/app-bar/app-bar';
import { Contact } from './features/contact/contact';
import { Home } from './features/home/home';
import { Experiences } from './features/experiences/experiences';
import { Projects } from './features/projects/projects';
import { HOME } from './store';
import { MockAppBar, MockContact, MockExperiences, MockHeaderBar, MockHome, MockProjects } from '../tests';

describe('Component - App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;

  let windowManagerService: jasmine.SpyObj<WindowManagerService>;

  beforeEach(async () => {
    const dragNDropServiceSpy = jasmine.createSpyObj('dragNDropService', ['boundaries']);
    const windowManagerServiceSpy = jasmine.createSpyObj('windowManagerService', [
      'setDefaultConfig',
      'openWindow',
      'handleResize',
      'selectWindowById',
    ]);

    await TestBed.configureTestingModule({
      imports: [App, TranslateModule.forRoot()],
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: DragNDropService,
          useValue: dragNDropServiceSpy,
        },
        {
          provide: WindowManagerService,
          useValue: windowManagerServiceSpy,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .overrideComponent(App, {
        remove: {
          imports: [HeaderBar, AppBar, Contact, Home, Experiences, Projects],
        },
        add: {
          imports: [MockHeaderBar, MockAppBar, MockContact, MockHome, MockExperiences, MockProjects],
        },
      })
      .compileComponents();

    windowManagerService = TestBed.inject(WindowManagerService) as jasmine.SpyObj<WindowManagerService>;

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('initialize', () => {
    it('should initialize the app', async () => {
      spyOn(component, 'setDragBoundaries');
      component.initialize();

      window.dispatchEvent(new Event('resize'));
      await new Promise(resolve => setTimeout(resolve, 20));

      expect(windowManagerService.setDefaultConfig).toHaveBeenCalledWith(jasmine.any(Number));
      expect(component.setDragBoundaries).toHaveBeenCalledTimes(3);
      expect(windowManagerService.openWindow).toHaveBeenCalledWith(HOME);
    });
  });
});
