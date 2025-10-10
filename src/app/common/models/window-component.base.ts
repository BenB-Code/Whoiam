import { EventEmitter } from '@angular/core';
import { Position } from '../../store';

export abstract class WindowComponentBase {
  abstract closeEvent: EventEmitter<void>;
  abstract fullscreenEvent: EventEmitter<boolean>;
  abstract reduceEvent: EventEmitter<void>;
  abstract dragNDropEndEvent: EventEmitter<Position>;
  abstract dragNDropStartEvent: EventEmitter<void>;
}
