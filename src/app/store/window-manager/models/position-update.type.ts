import { WindowType } from './window-type.type';
import { Position } from './position.type';

export type PositionUpdate = {
  id: WindowType;
  position?: Position;
  lastPosition?: Position;
  zIndex?: number;
};
