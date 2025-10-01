import { WindowStatus } from './window-status.type';
import { WindowType } from './window-type.type';
import { Size } from './size.type';
import { Position } from './position.type';

export type WindowState = {
  id: WindowType;
  status: WindowStatus;
  lastStatus?: WindowStatus;
  position?: Position;
  size?: Size;
  zIndex: number;
  isActive: boolean;
};
