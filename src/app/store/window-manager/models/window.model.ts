import {WindowStatus} from './window-status.type';
import {WindowType} from './window-type.type';


export interface WindowState {
  id: WindowType,
  status: WindowStatus,
  position?: {
    x: number,
    y: number
  },
  size?: {
    height: number,
    width: number
  },
  zIndex: number,
  isActive: boolean
}

