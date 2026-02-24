import { Position, WindowType } from '../models';
import { CONTACT, EXPERIENCES, HOME, PROJECTS } from './types.const';
import { DEFAULT, MOBILE, TABLET } from '../models/breakpoints.type';

export const RESPONSIVE_POSITION: Record<string, Record<WindowType, Position>> = {
  [DEFAULT]: {
    [HOME]: {
      x: '1%',
      y: '1%',
      transform: 'none',
    },
    [EXPERIENCES]: {
      x: '4%',
      y: '12%',
      transform: 'none',
    },
    [PROJECTS]: {
      x: '7%',
      y: '10%',
      transform: 'none',
    },
    [CONTACT]: {
      x: '68%',
      y: '1%',
      transform: 'none',
    },
  },
  [TABLET]: {
    [HOME]: {
      x: '0%',
      y: '0%',
      transform: 'none',
    },
    [EXPERIENCES]: {
      x: '1%',
      y: '1%',
      transform: 'none',
    },
    [PROJECTS]: {
      x: '2%',
      y: '2%',
      transform: 'none',
    },
    [CONTACT]: {
      x: '45%',
      y: '7%',
      transform: 'none',
    },
  },
  [MOBILE]: {
    [HOME]: {
      x: '0%',
      y: '0%',
      transform: 'none',
    },
    [EXPERIENCES]: {
      x: '0%',
      y: '0%',
      transform: 'none',
    },
    [PROJECTS]: {
      x: '0%',
      y: '0%',
      transform: 'none',
    },
    [CONTACT]: {
      x: '0%',
      y: '0%',
      transform: 'none',
    },
  },
};
export const MAXIMIZED_POSITION: Position = {
  x: '0%',
  y: '0%',
  transform: 'translate(0%, 0%)',
};
