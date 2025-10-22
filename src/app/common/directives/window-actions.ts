import { Directive, HostListener, inject, input, OnInit } from '@angular/core';
import { Position, WindowType } from '../../store';
import { ContentWindow } from '../components/content-window/content-window';
import { ListingWindow } from '../components/listing-window/listing-window';
import { WindowManagerService } from '../../services/window-manager/window-manager.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[appWindowActions]',
})
export class WindowActions implements OnInit {
  readonly windowId = input.required<WindowType>();

  private readonly contentWindow = inject(ContentWindow, { optional: true });
  private readonly listingWindow = inject(ListingWindow, { optional: true });
  private readonly windowManagerService = inject(WindowManagerService);

  private get windowComponent(): ContentWindow | ListingWindow<unknown> {
    const component = this.contentWindow || this.listingWindow;
    if (!component) {
      throw new Error('WindowActions directive must be used on ContentWindow or ListingWindow');
    }
    return component;
  }

  @HostListener('click')
  onActivate(): void {
    this.windowManagerService.setActiveWindow(this.windowId());
  }

  ngOnInit(): void {
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
      .subscribe((position: Position) => this.windowManagerService.updateWindow(this.windowId(), position));
    this.windowComponent.dragNDropStartEvent
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.windowManagerService.setActiveWindow(this.windowId()));
  }
}
