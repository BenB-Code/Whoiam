import { WindowType } from './window-type.type';
import { Position } from './position.type';
import { Size } from './size.type';

export type WindowUpdate = {
  id: WindowType;
  position?: Position;
  size?: Size;
  zIndex?: number;
};
