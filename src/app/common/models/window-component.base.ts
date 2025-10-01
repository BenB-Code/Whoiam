import { EventEmitter } from '@angular/core';

export abstract class WindowComponentBase {
  abstract closeEvent: EventEmitter<void>;
  abstract fullscreenEvent: EventEmitter<boolean>;
  abstract reduceEvent: EventEmitter<void>;
}
