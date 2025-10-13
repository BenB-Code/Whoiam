import { Position, Size, WindowState, WindowType } from '../models';
import { CONTACT, EXPERIENCES, HOME, PROJECTS } from './types.const';
import { CLOSED, OPEN } from './status.const';

export const DEFAULT_ZINDEX = 1;
export const DEFAULT_POSITION: Record<WindowType, Position> = {
  [HOME]: {
    x: '3%',
    y: '5%',
  },
  [EXPERIENCES]: {
    x: '6%',
    y: '15%',
  },
  [PROJECTS]: {
    x: '9%',
    y: '25%',
  },
  [CONTACT]: {
    x: '68%',
    y: '3%',
  },
};

export const DEFAULT_SIZES: Record<WindowType, Size> = {
  [HOME]: {
    width: '64%',
    height: 'fit-content',
  },
  [EXPERIENCES]: {
    width: '68%',
    height: '60%',
  },
  [PROJECTS]: {
    width: '80%',
    height: 'fit-content',
  },
  [CONTACT]: {
    width: '30%',
    height: 'fit-content',
  },
};

export const DEFAULT_WINDOWS: WindowState[] = [
  {
    id: HOME,
    status: OPEN,
    disableFullscreen: true,
    position: DEFAULT_POSITION[HOME],
    size: DEFAULT_SIZES[HOME],
    zIndex: 2,
    isActive: true,
  },
  {
    id: EXPERIENCES,
    status: CLOSED,
    disableFullscreen: false,
    position: DEFAULT_POSITION[EXPERIENCES],
    size: DEFAULT_SIZES[EXPERIENCES],
    zIndex: DEFAULT_ZINDEX,
    isActive: false,
  },
  {
    id: PROJECTS,
    status: CLOSED,
    disableFullscreen: true,
    position: DEFAULT_POSITION[PROJECTS],
    size: DEFAULT_SIZES[PROJECTS],
    zIndex: DEFAULT_ZINDEX,
    isActive: false,
  },
  {
    id: CONTACT,
    status: CLOSED,
    disableFullscreen: true,
    position: DEFAULT_POSITION[CONTACT],
    size: DEFAULT_SIZES[CONTACT],
    zIndex: DEFAULT_ZINDEX,
    isActive: false,
  },
];
