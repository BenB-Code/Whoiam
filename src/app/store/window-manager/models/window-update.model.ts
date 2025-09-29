import {WindowType} from './window-type.type';
import {Position} from './position.model';
import {Size} from './size.model';

export interface WindowUpdate {
  id: WindowType,
  position?: Position,
  size?: Size,
  zIndex?: number,
}
