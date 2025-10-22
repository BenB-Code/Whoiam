import { Position, Size, WindowState, WindowType } from '../models';
import { CONTACT, EXPERIENCES, HOME, PROJECTS } from './types.const';
import { CLOSED } from './status.const';
import { ScreenSizes } from './screen-sizes.enum';

export const DEFAULT_ZINDEX = 1;
export const RESPONSIVE_POSITION: Record<string, Record<WindowType, Position>> = {
  default: {
    [HOME]: {
      x: '1%',
      y: '1%',
    },
    [EXPERIENCES]: {
      x: '4%',
      y: '12%',
    },
    [PROJECTS]: {
      x: '7%',
      y: '22%',
    },
    [CONTACT]: {
      x: '68%',
      y: '1%',
    },
  },
  tablet: {
    [HOME]: {
      x: '0%',
      y: '0%',
    },
    [EXPERIENCES]: {
      x: '1%',
      y: '1%',
    },
    [PROJECTS]: {
      x: '2%',
      y: '2%',
    },
    [CONTACT]: {
      x: '45%',
      y: '7%',
    },
  },
  mobile: {
    [HOME]: {
      x: '0%',
      y: '0%',
    },
    [EXPERIENCES]: {
      x: '0%',
      y: '0%',
    },
    [PROJECTS]: {
      x: '0%',
      y: '0%',
    },
    [CONTACT]: {
      x: '0%',
      y: '0%',
    },
  },
};
export const RESPONSIVE_SIZES: Record<string, Record<WindowType, Size>> = {
  default: {
    [HOME]: {
      width: '64%',
      height: 'fit-content',
    },
    [EXPERIENCES]: {
      width: '68%',
      height: '60%',
    },
    [PROJECTS]: {
      width: '90%',
      height: 'fit-content',
    },
    [CONTACT]: {
      width: '30%',
      height: 'fit-content',
    },
  },
  tablet: {
    [HOME]: {
      width: '85%',
      height: 'fit-content',
    },
    [EXPERIENCES]: {
      width: '97%',
      height: '75%',
    },
    [PROJECTS]: {
      width: '78%',
      height: 'fit-content',
    },
    [CONTACT]: {
      width: '50%',
      height: 'fit-content',
    },
  },
  mobile: {
    [HOME]: {
      width: '100%',
      height: 'fit-content',
    },
    [EXPERIENCES]: {
      width: '100%',
      height: 'fit-content',
    },
    [PROJECTS]: {
      width: '100%',
      height: 'fit-content',
    },
    [CONTACT]: {
      width: '100%',
      height: 'fit-content',
    },
  },
};

export function getResponsiveDefaultSettings(screenWidth = 1920): WindowState[] {
  let breakpoint: 'default' | 'tablet' | 'mobile' = 'default';

  if (screenWidth < ScreenSizes.SM) {
    breakpoint = 'mobile';
  } else if (screenWidth < ScreenSizes.LG) {
    breakpoint = 'tablet';
  }

  const positions = RESPONSIVE_POSITION[breakpoint];
  const sizes = RESPONSIVE_SIZES[breakpoint];
  return [
    {
      id: HOME,
      status: CLOSED,
      disableFullscreen: false,
      position: positions[HOME],
      size: sizes[HOME],
      zIndex: 2,
      isActive: true,
    },
    {
      id: EXPERIENCES,
      status: CLOSED,
      disableFullscreen: false,
      position: positions[EXPERIENCES],
      size: sizes[EXPERIENCES],
      zIndex: DEFAULT_ZINDEX,
      isActive: false,
    },
    {
      id: PROJECTS,
      status: CLOSED,
      disableFullscreen: false,
      position: positions[PROJECTS],
      size: sizes[PROJECTS],
      zIndex: DEFAULT_ZINDEX,
      isActive: false,
    },
    {
      id: CONTACT,
      status: CLOSED,
      disableFullscreen: true,
      position: positions[CONTACT],
      size: sizes[CONTACT],
      zIndex: DEFAULT_ZINDEX,
      isActive: false,
    },
  ];
}
