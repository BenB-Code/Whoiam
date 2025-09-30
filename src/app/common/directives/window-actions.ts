import {Directive, HostListener, inject, Input, OnInit} from '@angular/core';
import {closeWindow, maximizeWindow, minimizeWindow, setActiveWindow, WindowType} from '../../store';
import {Store} from '@ngrx/store';
import {ContentWindow} from '../content-window/content-window';
import {ListingWindow} from '../listing-window/listing-window';

@Directive({
  selector: '[appWindowActions]'
})
export class WindowActions implements OnInit {
  @Input('windowId') windowId!: WindowType;

  private store = inject(Store);
  private contentWindow = inject(ContentWindow, {optional: true});
  private listingWindow = inject(ListingWindow, {optional: true});

  @HostListener('click')
  onActivate(): void {
    this.store.dispatch(setActiveWindow({id: this.windowId}));
  }

  ngOnInit() {
    this.windowComponent.fullscreenEvent.subscribe(() => {
      console.log('[appWindowActions] fullscreen event');
      this.store.dispatch(maximizeWindow({id: this.windowId}));
    });
    this.windowComponent.reduceEvent.subscribe(() => {
      console.log('[appWindowActions] reduce event');
      this.store.dispatch(minimizeWindow({id: this.windowId}));
    });
    this.windowComponent.closeEvent.subscribe(() => {
      console.log('[appWindowActions] close event');
      this.store.dispatch(closeWindow({id: this.windowId}));
    });
  }

  private get windowComponent() {
    const component = this.contentWindow || this.listingWindow;
    if (!component) {
      throw new Error('WindowActions directive must be used on ContentWindow or ListingWindow');
    }
    return component;
  }


}
