import {WindowStatus} from './window-status.type';
import {WindowType} from './window-type.type';
import {Size} from './size.model';
import {Position} from './position.model';


export interface WindowState {
  id: WindowType,
  status: WindowStatus,
  lastStatus?: WindowStatus,
  position?: Position,
  size?: Size,
  zIndex: number,
  isActive: boolean
}

