import { Directive, HostListener, inject, input, OnInit } from '@angular/core';
import { Position, WindowType } from '../../store';
import { ContentWindow } from '../components/content-window/content-window';
import { ListingWindow } from '../components/listing-window/listing-window';
import { WindowManagerService } from '../../services/window-manager/window-manager.service';

@Directive({
  selector: '[appWindowActions]',
})
export class WindowActions implements OnInit {
  readonly windowId = input<WindowType>();

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
    this.windowManagerService.setActiveWindow(this.windowId() || '');
  }

  ngOnInit(): void {
    this.windowComponent.fullscreenEvent.subscribe(() =>
      this.windowManagerService.maximizeWindow(this.windowId() || '')
    );
    this.windowComponent.reduceEvent.subscribe(() => this.windowManagerService.minimizeWindow(this.windowId() || ''));
    this.windowComponent.closeEvent.subscribe(() => this.windowManagerService.closeWindow(this.windowId() || ''));
    this.windowComponent.dragNDropEndEvent.subscribe((position: Position) =>
      this.windowManagerService.updateWindow(this.windowId() || '', position)
    );
    this.windowComponent.dragNDropStartEvent.subscribe(() =>
      this.windowManagerService.setActiveWindow(this.windowId() || '')
    );
  }
}
