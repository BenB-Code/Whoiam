import { Size, WindowType } from '../models';
import { CONTACT, EXPERIENCES, HOME, PROJECTS } from './types.const';
import { DEFAULT, MOBILE, TABLET } from '../models/breakpoints.type';

export const RESPONSIVE_SIZES: Record<string, Record<WindowType, Size>> = {
  [DEFAULT]: {
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
  [TABLET]: {
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
  [MOBILE]: {
    [HOME]: {
      width: '100%',
      height: 'fit-content',
    },
    [EXPERIENCES]: {
      width: '100%',
      height: '100%',
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
