import { WindowState } from '../models';
import { CONTACT, EXPERIENCES, HOME, PROJECTS } from './types.const';
import { CLOSED } from './status.const';
import { ScreenSizes } from './screen-sizes.enum';
import { RESPONSIVE_POSITION } from './default-positions.const';
import { RESPONSIVE_SIZES } from './default-sizes.const';
import { RESPONSIVE_IS_FULLSCREEN_DISABLED } from './default-fullscreen-is-disabled.const';
import { DEFAULT_ZINDEX } from './default-zindex.const';
import { BREAKPOINTS, DEFAULT, MOBILE, TABLET } from '../models/breakpoints.type';

export function getResponsiveDefaultSettings(screenWidth = 1920): WindowState[] {
  let breakpoint: BREAKPOINTS = DEFAULT;
  if (screenWidth < ScreenSizes.SM) {
    breakpoint = MOBILE;
  } else if (screenWidth < ScreenSizes.LG) {
    breakpoint = TABLET;
  }

  const positions = RESPONSIVE_POSITION[breakpoint] || RESPONSIVE_POSITION[DEFAULT];
  const sizes = RESPONSIVE_SIZES[breakpoint] || RESPONSIVE_SIZES[DEFAULT];
  const isFullscreenDisabled =
    RESPONSIVE_IS_FULLSCREEN_DISABLED[breakpoint] || RESPONSIVE_IS_FULLSCREEN_DISABLED[DEFAULT];
  return [
    {
      id: HOME,
      status: CLOSED,
      disableFullscreen: isFullscreenDisabled[HOME],
      position: positions[HOME],
      size: sizes[HOME],
      zIndex: 2,
      isActive: true,
    },
    {
      id: EXPERIENCES,
      status: CLOSED,
      disableFullscreen: isFullscreenDisabled[EXPERIENCES],
      position: positions[EXPERIENCES],
      size: sizes[EXPERIENCES],
      zIndex: DEFAULT_ZINDEX,
      isActive: false,
    },
    {
      id: PROJECTS,
      status: CLOSED,
      disableFullscreen: isFullscreenDisabled[PROJECTS],
      position: positions[PROJECTS],
      size: sizes[PROJECTS],
      zIndex: DEFAULT_ZINDEX,
      isActive: false,
    },
    {
      id: CONTACT,
      status: CLOSED,
      disableFullscreen: isFullscreenDisabled[CONTACT],
      position: positions[CONTACT],
      size: sizes[CONTACT],
      zIndex: DEFAULT_ZINDEX,
      isActive: false,
    },
  ];
}
