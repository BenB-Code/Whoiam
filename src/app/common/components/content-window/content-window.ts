import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  input,
  Output,
  signal,
  viewChild,
} from '@angular/core';
import { WindowComponentAbstract } from '../../models/window-component.abstract';
import { WindowHeader } from '../window-header/window-header';
import { CdkDrag, CdkDragEnd } from '@angular/cdk/drag-drop';
import { Position } from '../../../store';
import { DragNDropService } from '../../../services/drag-n-drop/drag-n-drop.service';
import { RAINBOW } from '../../constants';

@Component({
  selector: 'app-content-window',
  imports: [WindowHeader, CdkDrag],
  templateUrl: './content-window.html',
  styleUrl: './content-window.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentWindow extends WindowComponentAbstract {
  @Output() readonly closeEvent = new EventEmitter<void>();
  @Output() readonly fullscreenEvent = new EventEmitter<boolean>();
  @Output() readonly reduceEvent = new EventEmitter<void>();
  @Output() readonly dragNDropEndEvent = new EventEmitter<Position>();
  @Output() readonly dragNDropStartEvent = new EventEmitter<void>();

  readonly windowContent = viewChild<ElementRef<HTMLElement>>('window');

  readonly title = input('');
  readonly disableFullscreen = input<boolean>(false);
  readonly color = input<string>(RAINBOW);
  readonly isFullscreen = signal<boolean>(false);
  readonly disableDrag = input<boolean>(false);
  readonly disableResize = input<boolean>(false);

  private readonly dragNDropService: DragNDropService = inject(DragNDropService);

  onDragStart(): void {
    this.dragNDropStartEvent.emit();
  }

  onDragEnded(event: CdkDragEnd): void {
    this.dragNDropEndEvent.emit(this.dragNDropService.processNewPosition(event));
    event.source.reset();
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
