import { ContentWindow } from '../components/content-window/content-window';
import { WindowManagerService } from '../../services/window-manager/window-manager.service';
import { ListingWindow } from '../components/listing-window/listing-window';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { ChangeDetectionStrategy, Component, Provider, provideZonelessChangeDetection } from '@angular/core';
import { WindowActions } from './window-actions';
import { HOME, Position, WindowType } from '../../store';
import { By } from '@angular/platform-browser';

@Component({
  template: '<div appWindowActions [windowId]="windowId"></div>',
  standalone: true,
  imports: [WindowActions],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    windowContent: jasmine.createSpy('windowContent').and.returnValue({
      nativeElement: null,
    }),
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
    'positionUpdate',
    'setActiveWindow',
    'resizeWindow',
  ]);

  testCase.forEach(({ componentType, mockProvider }) => {
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
        eventsMock.dragNDropEndEvent.next({ x: '0%', y: 'O%', transform: 'translate(0%, 0%)' });
        expect(windowManagerServiceSpy.positionUpdate).toHaveBeenCalled();
        expect(windowManagerServiceSpy.positionUpdate).toHaveBeenCalledWith(HOME, {
          x: '0%',
          y: 'O%',
          transform: 'translate(0%, 0%)',
        });
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

  testCase.forEach(({ componentType, mockProvider }) => {
    let fixture: ComponentFixture<TestHostComponent>;

    describe(`${componentType}`, () => {
      beforeEach(async () => {
        await TestBed.configureTestingModule({
          providers: [
            provideZonelessChangeDetection(),
            mockProvider,
            { provide: WindowManagerService, useValue: windowManagerServiceSpy },
          ],
        }).compileComponents();
      });

      describe('windowElement getter', () => {
        it('should return window element from windowContent', () => {
          const mockElement = document.createElement('div');
          eventsMock.windowContent.and.returnValue({ nativeElement: mockElement });

          fixture = TestBed.createComponent(TestHostComponent);
          fixture.detectChanges();

          const directiveEl = fixture.debugElement.query(By.directive(WindowActions));
          const directive = directiveEl.injector.get(WindowActions);

          expect(directive['windowElement']).toBe(mockElement);
        });
      });

      describe('ngOnDestroy', () => {
        it('should remove document listeners on destroy', () => {
          const mockElement = document.createElement('div');
          eventsMock.windowContent.and.returnValue({ nativeElement: mockElement });

          fixture = TestBed.createComponent(TestHostComponent);
          fixture.detectChanges();

          spyOn(document, 'removeEventListener');

          fixture.destroy();

          expect(document.removeEventListener).toHaveBeenCalledWith('mousemove', jasmine.any(Function));
          expect(document.removeEventListener).toHaveBeenCalledWith('mouseup', jasmine.any(Function));
          expect(document.removeEventListener).toHaveBeenCalledWith('touchmove', jasmine.any(Function));
          expect(document.removeEventListener).toHaveBeenCalledWith('touchend', jasmine.any(Function));
        });

        it('should remove resize handle listeners when handle exists', () => {
          const mockHandle = document.createElement('div');
          mockHandle.classList.add('resize-handle');
          const mockElement = document.createElement('div');
          mockElement.appendChild(mockHandle);
          eventsMock.windowContent.and.returnValue({ nativeElement: mockElement });

          fixture = TestBed.createComponent(TestHostComponent);
          fixture.detectChanges();

          spyOn(mockHandle, 'removeEventListener');

          fixture.destroy();

          expect(mockHandle.removeEventListener).toHaveBeenCalledWith('mousedown', jasmine.any(Function));
          expect(mockHandle.removeEventListener).toHaveBeenCalledWith('touchstart', jasmine.any(Function));
        });
      });

      describe('setupResizeHandlers', () => {
        it('should add listeners to handle when it exists', done => {
          const mockHandle = document.createElement('div');
          mockHandle.classList.add('resize-handle');
          const mockElement = document.createElement('div');
          mockElement.appendChild(mockHandle);

          spyOn(mockHandle, 'addEventListener');

          eventsMock.windowContent.and.returnValue({ nativeElement: mockElement });

          fixture = TestBed.createComponent(TestHostComponent);
          fixture.detectChanges();

          setTimeout(() => {
            expect(mockHandle.addEventListener).toHaveBeenCalledWith('mousedown', jasmine.any(Function));
            expect(mockHandle.addEventListener).toHaveBeenCalledWith('touchstart', jasmine.any(Function));
            done();
          }, 10);
        });
      });

      describe('onResizeStart', () => {
        let mockHandle: HTMLElement;
        let mockElement: HTMLElement;
        let directive: WindowActions;

        beforeEach(done => {
          mockHandle = document.createElement('div');
          mockHandle.classList.add('resize-handle');
          mockElement = document.createElement('div');
          Object.defineProperty(mockElement, 'offsetWidth', { value: 400, configurable: true });
          Object.defineProperty(mockElement, 'offsetHeight', { value: 600, configurable: true });
          mockElement.appendChild(mockHandle);

          eventsMock.windowContent.and.returnValue({ nativeElement: mockElement });

          fixture = TestBed.createComponent(TestHostComponent);
          fixture.detectChanges();

          const directiveEl = fixture.debugElement.query(By.directive(WindowActions));
          directive = directiveEl.injector.get(WindowActions);

          setTimeout(() => {
            done();
          }, 10);
        });

        it('should call preventDefault and stopPropagation', () => {
          const mouseEvent = new MouseEvent('mousedown', { clientX: 100, clientY: 200 });
          spyOn(mouseEvent, 'preventDefault');
          spyOn(mouseEvent, 'stopPropagation');

          mockHandle.dispatchEvent(mouseEvent);

          expect(mouseEvent.preventDefault).toHaveBeenCalled();
          expect(mouseEvent.stopPropagation).toHaveBeenCalled();
        });

        it('should set isResizing to true', () => {
          const mouseEvent = new MouseEvent('mousedown', { clientX: 100, clientY: 200 });
          mockHandle.dispatchEvent(mouseEvent);

          expect(directive['isResizing']).toBe(true);
        });

        it('should store initial mouse position and dimensions', () => {
          const mouseEvent = new MouseEvent('mousedown', { clientX: 100, clientY: 200 });
          mockHandle.dispatchEvent(mouseEvent);

          expect(directive['startX']).toBe(100);
          expect(directive['startY']).toBe(200);
          expect(directive['startWidth']).toBe(400);
          expect(directive['startHeight']).toBe(600);
        });

        it('should set cursor to nwse-resize', () => {
          const mouseEvent = new MouseEvent('mousedown', { clientX: 100, clientY: 200 });
          mockHandle.dispatchEvent(mouseEvent);

          expect(document.body.style.cursor).toBe('nwse-resize');
        });
      });

      describe('onResizeMove', () => {
        let mockHandle: HTMLElement;
        let mockElement: HTMLElement;

        beforeEach(done => {
          mockHandle = document.createElement('div');
          mockHandle.classList.add('resize-handle');
          mockElement = document.createElement('div');
          Object.defineProperty(mockElement, 'offsetWidth', { value: 400, configurable: true });
          Object.defineProperty(mockElement, 'offsetHeight', { value: 600, configurable: true });
          mockElement.appendChild(mockHandle);

          eventsMock.windowContent.and.returnValue({ nativeElement: mockElement });

          fixture = TestBed.createComponent(TestHostComponent);
          fixture.detectChanges();

          setTimeout(() => {
            done();
          }, 10);
        });

        it('should return early if not resizing', () => {
          const directiveEl = fixture.debugElement.query(By.directive(WindowActions));
          const directive = directiveEl.injector.get(WindowActions);

          directive['isResizing'] = false;

          const mouseMoveEvent = new MouseEvent('mousemove', { clientX: 150, clientY: 250 });
          directive['onResizeMove'](mouseMoveEvent);

          expect(directive['isResizing']).toBe(false);
        });

        it('should update window dimensions', () => {
          const mouseDownEvent = new MouseEvent('mousedown', { clientX: 100, clientY: 200 });
          mockHandle.dispatchEvent(mouseDownEvent);

          const mouseMoveEvent = new MouseEvent('mousemove', { clientX: 150, clientY: 250, bubbles: true });
          document.dispatchEvent(mouseMoveEvent);

          expect(mockElement.style.width).toBeTruthy();
          expect(mockElement.style.height).toBeTruthy();
        });
      });

      describe('onResizeEnd', () => {
        let mockHandle: HTMLElement;
        let mockElement: HTMLElement;
        let directive: WindowActions;

        beforeEach(done => {
          mockHandle = document.createElement('div');
          mockHandle.classList.add('resize-handle');
          mockElement = document.createElement('div');
          Object.defineProperty(mockElement, 'offsetWidth', { value: 450, configurable: true });
          Object.defineProperty(mockElement, 'offsetHeight', { value: 650, configurable: true });
          mockElement.appendChild(mockHandle);

          eventsMock.windowContent.and.returnValue({ nativeElement: mockElement });

          fixture = TestBed.createComponent(TestHostComponent);
          fixture.detectChanges();

          const directiveEl = fixture.debugElement.query(By.directive(WindowActions));
          directive = directiveEl.injector.get(WindowActions);

          setTimeout(() => {
            done();
          }, 10);
        });

        it('should return early if not resizing', () => {
          directive['isResizing'] = false;

          directive['onResizeEnd']();

          expect(directive['isResizing']).toBe(false);
        });

        it('should set isResizing to false and reset cursor', () => {
          const mouseDownEvent = new MouseEvent('mousedown', { clientX: 100, clientY: 200 });
          mockHandle.dispatchEvent(mouseDownEvent);

          const mouseUpEvent = new MouseEvent('mouseup');
          document.dispatchEvent(mouseUpEvent);

          expect(directive['isResizing']).toBe(false);
          expect(document.body.style.cursor).toBe('');
        });

        it('should call resizeWindow with correct dimensions', () => {
          const mouseDownEvent = new MouseEvent('mousedown', { clientX: 100, clientY: 200 });
          mockHandle.dispatchEvent(mouseDownEvent);

          const mouseUpEvent = new MouseEvent('mouseup');
          document.dispatchEvent(mouseUpEvent);

          expect(windowManagerServiceSpy.resizeWindow).toHaveBeenCalledWith(HOME, {
            width: '450px',
            height: '650px',
          });
        });

        it('should reset window element styles to inherit', () => {
          const mouseDownEvent = new MouseEvent('mousedown', { clientX: 100, clientY: 200 });
          mockHandle.dispatchEvent(mouseDownEvent);

          const mouseUpEvent = new MouseEvent('mouseup');
          document.dispatchEvent(mouseUpEvent);

          expect(mockElement.style.width).toBe('inherit');
          expect(mockElement.style.height).toBe('inherit');
        });
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
