import { Directive, HostListener, inject, input, OnDestroy } from '@angular/core';
import { Position, WindowType } from '../../store';
import { ContentWindow } from '../components/content-window/content-window';
import { ListingWindow } from '../components/listing-window/listing-window';
import { WindowManagerService } from '../../services/window-manager/window-manager.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[appWindowActions]',
})
export class WindowActions implements OnDestroy {
  readonly windowId = input.required<WindowType>();
  readonly windowMinWidth = input<number>(350);
  readonly windowMinHeight = input<number>(500);

  private isResizing = false;
  private startX = 0;
  private startY = 0;
  private startWidth = 0;
  private startHeight = 0;

  private readonly contentWindow = inject(ContentWindow, { optional: true });
  private readonly listingWindow = inject(ListingWindow, { optional: true });
  private readonly windowManagerService = inject(WindowManagerService);

  constructor() {
    this.windowComponent.fullscreenEvent
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.windowManagerService.maximizeWindow(this.windowId()));
    this.windowComponent.reduceEvent
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.windowManagerService.minimizeWindow(this.windowId()));
    this.windowComponent.closeEvent
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.windowManagerService.closeWindow(this.windowId()));
    this.windowComponent.dragNDropEndEvent
      .pipe(takeUntilDestroyed())
      .subscribe((position: Position) => this.windowManagerService.positionUpdate(this.windowId(), position));
    this.windowComponent.dragNDropStartEvent
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.windowManagerService.setActiveWindow(this.windowId()));

    this.setupResizeHandlers();
  }

  private get windowComponent(): ContentWindow | ListingWindow<unknown> {
    const component = this.contentWindow || this.listingWindow;
    if (!component) {
      throw new Error('WindowActions directive must be used on ContentWindow or ListingWindow');
    }
    return component;
  }

  private get resizeHandle(): HTMLElement | null {
    return this.windowComponent.windowContent()!.nativeElement?.querySelector('.resize-handle');
  }

  private get windowElement(): HTMLElement {
    return this.windowComponent.windowContent()!.nativeElement;
  }

  @HostListener('click')
  onActivate(): void {
    this.windowManagerService.setActiveWindow(this.windowId());
  }

  ngOnDestroy(): void {
    const handle = this.resizeHandle;
    if (handle) {
      handle.removeEventListener('mousedown', this.onResizeStart);
      handle.removeEventListener('touchstart', this.onResizeStart as EventListener);
    }
    document.removeEventListener('mousemove', this.onResizeMove);
    document.removeEventListener('mouseup', this.onResizeEnd);
    document.removeEventListener('touchmove', this.onResizeMove as EventListener);
    document.removeEventListener('touchend', this.onResizeEnd as EventListener);
  }

  private setupResizeHandlers(): void {
    setTimeout(() => {
      const handle = this.resizeHandle;
      if (handle) {
        handle.addEventListener('mousedown', this.onResizeStart);
        handle.addEventListener('touchstart', this.onResizeStart as EventListener);
      }
    });
  }

  private onResizeStart = (event: MouseEvent | TouchEvent): void => {
    event.preventDefault();
    event.stopPropagation();

    const windowEl = this.windowElement;
    if (!windowEl) {
      return;
    }

    this.isResizing = true;

    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;

    this.startX = clientX;
    this.startY = clientY;
    this.startWidth = windowEl.offsetWidth;
    this.startHeight = windowEl.offsetHeight;

    document.addEventListener('mousemove', this.onResizeMove);
    document.addEventListener('mouseup', this.onResizeEnd);
    document.addEventListener('touchmove', this.onResizeMove as EventListener);
    document.addEventListener('touchend', this.onResizeEnd as EventListener);

    document.body.style.cursor = 'nwse-resize';
  };

  private onResizeMove = (event: MouseEvent | TouchEvent): void => {
    if (!this.isResizing) {
      return;
    }

    const windowEl = this.windowElement;
    if (!windowEl) {
      return;
    }

    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;

    const deltaX = clientX - this.startX;
    const deltaY = clientY - this.startY;

    const boundary = document.querySelector('.resize-boundary');
    const boundaryRect = boundary?.getBoundingClientRect();
    const windowRect = windowEl.getBoundingClientRect();

    const maxWidth = boundaryRect ? boundaryRect.width - (windowRect.left - boundaryRect.left) : Infinity;
    const maxHeight = boundaryRect ? boundaryRect.height - (windowRect.top - boundaryRect.top) : Infinity;

    const newWidth = Math.max(this.windowMinWidth(), Math.min(maxWidth, this.startWidth + deltaX));
    const newHeight = Math.max(this.windowMinHeight(), Math.min(maxHeight, this.startHeight + deltaY));

    windowEl.style.width = `${newWidth}px`;
    windowEl.style.height = `${newHeight}px`;
  };

  private onResizeEnd = (): void => {
    if (!this.isResizing) {
      return;
    }

    this.isResizing = false;
    document.body.style.cursor = '';

    document.removeEventListener('mousemove', this.onResizeMove);
    document.removeEventListener('mouseup', this.onResizeEnd);
    document.removeEventListener('touchmove', this.onResizeMove as EventListener);
    document.removeEventListener('touchend', this.onResizeEnd as EventListener);

    const windowEl = this.windowElement;
    if (!windowEl) {
      return;
    }

    this.windowManagerService.resizeWindow(this.windowId(), {
      width: `${windowEl.offsetWidth}px`,
      height: `${windowEl.offsetHeight}px`,
    });

    windowEl.style.width = `inherit`;
    windowEl.style.height = `inherit`;
  };
}
