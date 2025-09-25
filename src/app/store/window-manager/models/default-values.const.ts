import {WindowState} from './window.model';
import {CONTACT, EXPERIENCES, HOME, PROJECTS} from './window-type.type';
import {CLOSED, OPEN} from './window-status.type';

export const DEFAULT_POSITION = {
  x: '50%',
  y: '50%',
};

export const DEFAULT_SIZES = {
  [HOME]: {
    width: '50%',
    height: '50%',
  },
  [EXPERIENCES]: {
    width: '80%',
    height: '80%',
  },
  [PROJECTS]: {
    width: '75%',
    height: '70%',
  },
  [CONTACT]: {
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
    zIndex: 0,
    isActive: true,
  },
  {
    id: EXPERIENCES,
    status: CLOSED,
    position: undefined,
    size: DEFAULT_SIZES.EXPERIENCES,
    zIndex: 0,
    isActive: false,
  },
  {
    id: PROJECTS,
    status: CLOSED,
    position: undefined,
    size: DEFAULT_SIZES.PROJECTS,
    zIndex: 0,
    isActive: false,
  },
  {
    id: CONTACT,
    status: CLOSED,
    position: undefined,
    size: DEFAULT_SIZES.CONTACT,
    zIndex: 0,
    isActive: false,
  },
]
