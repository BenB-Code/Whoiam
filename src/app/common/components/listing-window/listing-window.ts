import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  ElementRef,
  EventEmitter,
  inject,
  input,
  OnInit,
  Output,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { WindowComponentAbstract } from '../../models/window-component.abstract';
import { WindowHeader } from '../window-header/window-header';
import { CdkDrag, CdkDragEnd } from '@angular/cdk/drag-drop';
import { Position } from '../../../store';
import { DragNDropService } from '../../../services/drag-n-drop/drag-n-drop.service';
import { TRANSPARENT } from '../../constants';

@Component({
  selector: 'app-listing-window',
  imports: [NgClass, NgTemplateOutlet, WindowHeader, CdkDrag],
  templateUrl: './listing-window.html',
  styleUrl: './listing-window.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingWindow<T> extends WindowComponentAbstract implements OnInit {
  @Output() readonly closeEvent = new EventEmitter<void>();
  @Output() readonly fullscreenEvent = new EventEmitter<boolean>();
  @Output() readonly reduceEvent = new EventEmitter<void>();
  @Output() readonly itemSelected = new EventEmitter<{ item: T; index: number }>();
  @Output() readonly dragNDropEndEvent = new EventEmitter<Position>();
  @Output() readonly dragNDropStartEvent = new EventEmitter<void>();

  readonly windowContent = viewChild<ElementRef<HTMLElement>>('window');

  readonly items = input<T[]>([]);
  readonly title = input<string>();
  readonly selectedIndex = input<number | null>(null);
  readonly disableFullscreen = input<boolean>(false);
  readonly disableDrag = input<boolean>(false);
  readonly disableResize = input<boolean>(false);

  readonly itemTemplate = contentChild.required<TemplateRef<{ $implicit: T; index: number }>>('itemTemplate');

  readonly selectedItemSignal = signal<number | null>(null);
  readonly isFullscreen = signal<boolean>(false);
  protected readonly TRANSPARENT = TRANSPARENT;

  private readonly dragNDropService: DragNDropService = inject(DragNDropService);

  ngOnInit(): void {
    this.selectedItemSignal.set(this.selectedIndex());
  }

  onDragStart(): void {
    this.dragNDropStartEvent.emit();
  }

  onDragEnded(event: CdkDragEnd): void {
    this.dragNDropEndEvent.emit(this.dragNDropService.processNewPosition(event));
    event.source.reset();
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
