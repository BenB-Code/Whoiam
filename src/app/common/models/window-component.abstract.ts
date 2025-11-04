import { ElementRef, EventEmitter, Signal } from '@angular/core';
import { Position } from '../../store';

export abstract class WindowComponentAbstract {
  abstract closeEvent: EventEmitter<void>;
  abstract fullscreenEvent: EventEmitter<boolean>;
  abstract reduceEvent: EventEmitter<void>;
  abstract dragNDropEndEvent: EventEmitter<Position>;
  abstract dragNDropStartEvent: EventEmitter<void>;

  abstract windowContent: Signal<ElementRef<HTMLElement> | undefined>;
}
