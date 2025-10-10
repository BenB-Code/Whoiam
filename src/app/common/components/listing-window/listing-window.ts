import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  EventEmitter,
  input,
  OnInit,
  Output,
  signal,
  TemplateRef,
} from '@angular/core';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { WindowComponentBase } from '../../models/window-component.base';
import { WindowHeader } from '../window-header/window-header';
import { TRANSPARENT } from '../../constants/style.const';
import { CdkDrag, CdkDragEnd } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-listing-window',
  imports: [NgClass, NgTemplateOutlet, WindowHeader, CdkDrag],
  templateUrl: './listing-window.html',
  styleUrl: './listing-window.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingWindow<T> extends WindowComponentBase implements OnInit {
  @Output() readonly closeEvent = new EventEmitter<void>();
  @Output() readonly fullscreenEvent = new EventEmitter<boolean>();
  @Output() readonly reduceEvent = new EventEmitter<void>();
  @Output() readonly itemSelected = new EventEmitter<{ item: T; index: number }>();
  @Output() readonly dragNDropEvent = new EventEmitter<CdkDragEnd>();

  readonly items = input<T[]>([]);
  readonly title = input<string>('Liste');
  readonly selectedIndex = input<number | null>(null);
  readonly disableFullscreen = input<boolean>(false);

  readonly itemTemplate = contentChild.required<TemplateRef<{ $implicit: T; index: number }>>('itemTemplate');

  readonly selectedItemSignal = signal<number | null>(null);
  readonly isFullscreen = signal<boolean>(false);
  protected readonly TRANSPARENT = TRANSPARENT;

  ngOnInit(): void {
    this.selectedItemSignal.set(this.selectedIndex());
  }

  onDragEnded(event: CdkDragEnd): void {
    this.dragNDropEvent.emit(event);
  }

  selectItem(item: T, index: number): void {
    this.selectedItemSignal.set(index);
    this.itemSelected.emit({ item, index });
  }

  isSelected(index: number): boolean {
    return this.selectedItemSignal() === index;
  }

  close(): void {
    this.closeEvent.emit();
  }

  fullscreen(): void {
    const newState = !this.isFullscreen();
    this.isFullscreen.set(newState);
    this.fullscreenEvent.emit(newState);
  }

  reduce(): void {
    this.reduceEvent.emit();
  }
}
