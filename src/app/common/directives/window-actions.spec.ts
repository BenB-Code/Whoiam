import { ContentWindow } from '../components/content-window/content-window';
import { WindowManagerService } from '../../services/window-manager/window-manager.service';
import { ListingWindow } from '../components/listing-window/listing-window';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { Component, Provider, provideZonelessChangeDetection } from '@angular/core';
import { WindowActions } from './window-actions';
import { HOME, Position, WindowType } from '../../store';
import { By } from '@angular/platform-browser';

@Component({
  template: '<div appWindowActions [windowId]="windowId"></div>',
  standalone: true,
  imports: [WindowActions],
})
class TestHostComponent {
  windowId: WindowType = HOME;
}

describe('Directive - WindowActions', () => {
  const eventsMock = {
    fullscreenEvent: new Subject<void>(),
    reduceEvent: new Subject<void>(),
    closeEvent: new Subject<void>(),
    dragNDropEndEvent: new Subject<Position>(),
    dragNDropStartEvent: new Subject<void>(),
  };
  const testCase: { componentType: string; mockProvider: Provider }[] = [
    {
      componentType: 'ContentWindow',
      mockProvider: {
        provide: ContentWindow,
        useValue: eventsMock,
      },
    },
    {
      componentType: 'ListingWindow',
      mockProvider: {
        provide: ListingWindow,
        useValue: eventsMock,
      },
    },
  ];

  const windowManagerServiceSpy = jasmine.createSpyObj('windowManagerService', [
    'maximizeWindow',
    'minimizeWindow',
    'closeWindow',
    'updateWindow',
    'setActiveWindow',
  ]);

  testCase.forEach(({ componentType, mockProvider }) => {
    let component: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;

    describe(`Window Actions avec ${componentType}`, () => {
      beforeEach(async () => {
        await TestBed.configureTestingModule({
          providers: [
            provideZonelessChangeDetection(),
            mockProvider,
            { provide: WindowManagerService, useValue: windowManagerServiceSpy },
          ],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should trigger event on fullscreenEvent', () => {
        eventsMock.fullscreenEvent.next();
        expect(windowManagerServiceSpy.maximizeWindow).toHaveBeenCalled();
        expect(windowManagerServiceSpy.maximizeWindow).toHaveBeenCalledWith(HOME);
      });
      it('should trigger event on reduceEvent', () => {
        eventsMock.reduceEvent.next();
        expect(windowManagerServiceSpy.minimizeWindow).toHaveBeenCalled();
        expect(windowManagerServiceSpy.minimizeWindow).toHaveBeenCalledWith(HOME);
      });
      it('should trigger event on closeEvent', () => {
        eventsMock.closeEvent.next();
        expect(windowManagerServiceSpy.closeWindow).toHaveBeenCalled();
        expect(windowManagerServiceSpy.closeWindow).toHaveBeenCalledWith(HOME);
      });
      it('should trigger event on dragNDropEndEvent', () => {
        eventsMock.dragNDropEndEvent.next({ x: '0%', y: 'O%' });
        expect(windowManagerServiceSpy.updateWindow).toHaveBeenCalled();
        expect(windowManagerServiceSpy.updateWindow).toHaveBeenCalledWith(HOME, { x: '0%', y: 'O%' });
      });
      it('should trigger event on dragNDropStartEvent', () => {
        eventsMock.dragNDropStartEvent.next();
        expect(windowManagerServiceSpy.setActiveWindow).toHaveBeenCalled();
        expect(windowManagerServiceSpy.setActiveWindow).toHaveBeenCalledWith(HOME);
      });

      it('should trigger on click event to call setActiveWindow', () => {
        const directiveEl = fixture.debugElement.query(By.directive(WindowActions));
        directiveEl.triggerEventHandler('click', null);

        expect(windowManagerServiceSpy.setActiveWindow).toHaveBeenCalled();
        expect(windowManagerServiceSpy.setActiveWindow).toHaveBeenCalledWith(HOME);
      });
    });
  });

  describe('Error on windowComponent', () => {
    it('should throw an error when not contentWindow or listingWindow', () => {
      TestBed.configureTestingModule({
        providers: [
          provideZonelessChangeDetection(),
          { provide: WindowManagerService, useValue: windowManagerServiceSpy },
        ],
      });

      expect(() => {
        TestBed.createComponent(TestHostComponent);
      }).toThrowError('WindowActions directive must be used on ContentWindow or ListingWindow');
    });
  });
});
