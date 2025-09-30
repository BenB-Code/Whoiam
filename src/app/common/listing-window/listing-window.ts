import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  signal,
  TemplateRef
} from '@angular/core';
import {NgClass, NgTemplateOutlet} from '@angular/common';
import {WindowComponentBase} from '../models/window-component.base';

@Component({
  selector: 'app-listing-window',
  imports: [NgClass, NgTemplateOutlet],
  templateUrl: './listing-window.html',
  styleUrl: './listing-window.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListingWindow<T = any> extends WindowComponentBase {
  @Output() closeEvent = new EventEmitter<void>();
  @Output() fullscreenEvent = new EventEmitter<boolean>();
  @Output() reduceEvent = new EventEmitter<void>();
  @Output() itemSelected = new EventEmitter<{ item: T, index: number }>();

  @Input() items: T[] = [];
  @Input() title = 'Liste';
  @Input() selectedIndex: number | null = null;

  @ContentChild('itemTemplate') itemTemplate!: TemplateRef<{ $implicit: T, index: number }>;


  selectedItemSignal = signal<number | null>(null);
  isFullscreen = signal<boolean>(false);

  ngOnInit() {
    this.selectedItemSignal.set(this.selectedIndex);
  }

  selectItem(item: T, index: number) {
    this.selectedItemSignal.set(index);
    this.itemSelected.emit({item, index});
  }

  isSelected(index: number): boolean {
    return this.selectedItemSignal() === index;
  }

  close() {
    this.closeEvent.emit();
  }

  fullscreen() {
    const newState = !this.isFullscreen();
    this.isFullscreen.set(newState);
    this.fullscreenEvent.emit(newState);
  }

  reduce() {
    this.reduceEvent.emit();
  }
}
