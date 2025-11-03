import { WindowStatus } from './window-status.type';
import { WindowType } from './window-type.type';
import { Size } from './size.type';
import { Position } from './position.type';

export type WindowState = {
  id: WindowType;
  status: WindowStatus;
  lastStatus: WindowStatus;
  position: Position;
  lastPosition: Position;
  size: Size;
  lastSize: Size;
  disableFullscreen: boolean;
  disableResize: boolean;
  zIndex: number;
  isActive: boolean;
};
