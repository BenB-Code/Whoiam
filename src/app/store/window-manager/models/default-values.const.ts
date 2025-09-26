import {WindowState} from './window.model';
import {CONTACT, EXPERIENCES, HOME, PROJECTS} from './types.const';
import {CLOSED, OPEN} from './status.const';
export const DEFAULT_ZINDEX = 1;

export const DEFAULT_POSITION = {
  x: '50%',
  y: '50%',
  transform: 'translate(-50%, -50%)',
};

export const DEFAULT_SIZES = {
  HOME: {
    width: '90%',
    height: '90%',
  },
  EXPERIENCES: {
    width: '80%',
    height: '80%',
  },
  PROJECTS: {
    width: '75%',
    height: '70%',
  },
  CONTACT: {
    width: '30%',
    height: '50%',
  },
}

export const DEFAULT_WINDOWS: WindowState[] = [
  {
    id: HOME,
    status: OPEN,
    position: DEFAULT_POSITION,
    size: DEFAULT_SIZES.HOME,
    zIndex: 2,
    isActive: true,
  },
  {
    id: EXPERIENCES,
    status: CLOSED,
    position: DEFAULT_POSITION,
    size: DEFAULT_SIZES.EXPERIENCES,
    zIndex: DEFAULT_ZINDEX,
    isActive: false,
  },
  {
    id: PROJECTS,
    status: CLOSED,
    position: DEFAULT_POSITION,
    size: DEFAULT_SIZES.PROJECTS,
    zIndex: DEFAULT_ZINDEX,
    isActive: false,
  },
  {
    id: CONTACT,
    status: CLOSED,
    position: DEFAULT_POSITION,
    size: DEFAULT_SIZES.CONTACT,
    zIndex: DEFAULT_ZINDEX,
    isActive: false,
  },
]
