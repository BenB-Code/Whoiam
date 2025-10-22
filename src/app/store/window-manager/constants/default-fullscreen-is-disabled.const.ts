import { WindowType } from '../models';
import { CONTACT, EXPERIENCES, HOME, PROJECTS } from './types.const';
import { DEFAULT, MOBILE, TABLET } from './breakpoints.type';

export const RESPONSIVE_IS_FULLSCREEN_DISABLED: Record<string, Record<WindowType, boolean>> = {
  [DEFAULT]: {
    [HOME]: true,
    [EXPERIENCES]: false,
    [PROJECTS]: false,
    [CONTACT]: true,
  },
  [TABLET]: {
    [HOME]: false,
    [EXPERIENCES]: false,
    [PROJECTS]: true,
    [CONTACT]: true,
  },
  [MOBILE]: {
    [HOME]: true,
    [EXPERIENCES]: true,
    [PROJECTS]: true,
    [CONTACT]: true,
  },
};
