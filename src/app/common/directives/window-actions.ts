import { Directive, HostListener, inject, input, OnInit } from '@angular/core';
import { closeWindow, maximizeWindow, minimizeWindow, setActiveWindow, WindowType } from '../../store';
import { Store } from '@ngrx/store';
import { ContentWindow } from '../content-window/content-window';
import { ListingWindow } from '../listing-window/listing-window';

@Directive({
  selector: '[appWindowActions]',
})
export class WindowActions implements OnInit {
  readonly windowId = input<WindowType>();

  private store = inject(Store);
  private contentWindow = inject(ContentWindow, { optional: true });
  private listingWindow = inject(ListingWindow, { optional: true });

  private get windowComponent(): ContentWindow | ListingWindow<any> {
    const component = this.contentWindow || this.listingWindow;
    if (!component) {
      throw new Error('WindowActions directive must be used on ContentWindow or ListingWindow');
    }
    return component;
  }

  @HostListener('click')
  onActivate(): void {
    this.store.dispatch(setActiveWindow({ id: this.windowId() as WindowType }));
  }

  ngOnInit(): void {
    this.windowComponent.fullscreenEvent.subscribe(() => {
      this.store.dispatch(maximizeWindow({ id: this.windowId() as WindowType }));
    });
    this.windowComponent.reduceEvent.subscribe(() => {
      this.store.dispatch(minimizeWindow({ id: this.windowId() as WindowType }));
    });
    this.windowComponent.closeEvent.subscribe(() => {
      this.store.dispatch(closeWindow({ id: this.windowId() as WindowType }));
    });
  }
}
