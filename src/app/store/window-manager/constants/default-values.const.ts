import { WindowState } from '../models';
import { CONTACT, EXPERIENCES, HOME, PROJECTS } from './types.const';
import { CLOSED } from './status.const';
import { ScreenSizes } from './screen-sizes.enum';
import { RESPONSIVE_POSITION } from './default-positions.const';
import { RESPONSIVE_SIZES } from './default-sizes.const';
import { RESPONSIVE_IS_FULLSCREEN_DISABLED } from './default-fullscreen-is-disabled.const';
import { DEFAULT_ZINDEX } from './default-zindex.const';
import { BREAKPOINTS, DEFAULT, MOBILE, TABLET } from '../models/breakpoints.type';
import { RESPONSIVE_IS_RESIZE_DISABLED } from './default-resize-is-disabled.const';

export function getResponsiveDefaultSettings(screenWidth = 1920): WindowState[] {
  let breakpoint: BREAKPOINTS = DEFAULT;
  if (screenWidth < ScreenSizes.SM) {
    breakpoint = MOBILE;
  } else if (screenWidth < ScreenSizes.LG) {
    breakpoint = TABLET;
  }

  const positions = RESPONSIVE_POSITION[breakpoint];
  const sizes = RESPONSIVE_SIZES[breakpoint];
  const isFullscreenDisabled = RESPONSIVE_IS_FULLSCREEN_DISABLED[breakpoint];
  const isResizeDisabled = RESPONSIVE_IS_RESIZE_DISABLED[breakpoint];
  return [
    {
      id: HOME,
      status: CLOSED,
      lastStatus: CLOSED,
      position: positions[HOME],
      lastPosition: positions[HOME],
      size: sizes[HOME],
      lastSize: sizes[HOME],
      disableResize: isResizeDisabled[HOME],
      disableFullscreen: isFullscreenDisabled[HOME],
      zIndex: 2,
      isActive: true,
    },
    {
      id: EXPERIENCES,
      status: CLOSED,
      lastStatus: CLOSED,
      position: positions[EXPERIENCES],
      lastPosition: positions[EXPERIENCES],
      size: sizes[EXPERIENCES],
      lastSize: sizes[EXPERIENCES],
      disableResize: isResizeDisabled[EXPERIENCES],
      disableFullscreen: isFullscreenDisabled[EXPERIENCES],
      zIndex: DEFAULT_ZINDEX,
      isActive: false,
    },
    {
      id: PROJECTS,
      status: CLOSED,
      lastStatus: CLOSED,
      position: positions[PROJECTS],
      lastPosition: positions[PROJECTS],
      size: sizes[PROJECTS],
      lastSize: sizes[PROJECTS],
      disableResize: isResizeDisabled[PROJECTS],
      disableFullscreen: isFullscreenDisabled[PROJECTS],
      zIndex: DEFAULT_ZINDEX,
      isActive: false,
    },
    {
      id: CONTACT,
      status: CLOSED,
      lastStatus: CLOSED,
      position: positions[CONTACT],
      lastPosition: positions[CONTACT],
      size: sizes[CONTACT],
      lastSize: sizes[CONTACT],
      disableResize: isResizeDisabled[CONTACT],
      disableFullscreen: isFullscreenDisabled[CONTACT],
      zIndex: DEFAULT_ZINDEX,
      isActive: false,
    },
  ];
}
