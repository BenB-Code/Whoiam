import { WindowType } from '../models';
import { CONTACT, EXPERIENCES, HOME, PROJECTS } from './types.const';
import { DEFAULT, MOBILE, TABLET } from '../models/breakpoints.type';

export const RESPONSIVE_IS_RESIZE_DISABLED: Record<string, Record<WindowType, boolean>> = {
  [DEFAULT]: {
    [HOME]: false,
    [EXPERIENCES]: false,
    [PROJECTS]: false,
    [CONTACT]: false,
  },
  [TABLET]: {
    [HOME]: false,
    [EXPERIENCES]: false,
    [PROJECTS]: false,
    [CONTACT]: false,
  },
  [MOBILE]: {
    [HOME]: false,
    [EXPERIENCES]: false,
    [PROJECTS]: false,
    [CONTACT]: false,
  },
};
