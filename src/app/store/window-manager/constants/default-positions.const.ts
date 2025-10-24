import { Position, WindowType } from '../models';
import { CONTACT, EXPERIENCES, HOME, PROJECTS } from './types.const';
import { DEFAULT, MOBILE, TABLET } from '../models/breakpoints.type';

export const RESPONSIVE_POSITION: Record<string, Record<WindowType, Position>> = {
  [DEFAULT]: {
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
  [TABLET]: {
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
  [MOBILE]: {
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
