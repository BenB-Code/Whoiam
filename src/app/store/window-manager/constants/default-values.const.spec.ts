import { getResponsiveDefaultSettings } from './default-values.const';
import { CONTACT, EXPERIENCES, HOME, PROJECTS } from './types.const';
import { CLOSED } from './status.const';

describe('Constant - DefaultValuesConst', () => {
  describe('getResponsiveDefaultSettings', () => {
    it('should use fallback values', () => {
      const result = getResponsiveDefaultSettings();
      expect(result).toEqual([
        {
          id: HOME,
          status: CLOSED,
          lastStatus: CLOSED,
          disableFullscreen: true,
          disableResize: false,
          position: { x: '1%', y: '1%', transform: 'none' },
          lastPosition: { x: '1%', y: '1%', transform: 'none' },
          size: { width: '64%', height: 'auto' },
          lastSize: { width: '64%', height: 'auto' },
          zIndex: 2,
          isActive: true,
        },
        {
          id: EXPERIENCES,
          status: CLOSED,
          lastStatus: CLOSED,
          disableFullscreen: false,
          disableResize: false,
          position: { x: '4%', y: '12%', transform: 'none' },
          lastPosition: { x: '4%', y: '12%', transform: 'none' },
          size: { width: '68%', height: '60%' },
          lastSize: { width: '68%', height: '60%' },
          zIndex: 1,
          isActive: false,
        },
        {
          id: PROJECTS,
          status: CLOSED,
          lastStatus: CLOSED,
          disableFullscreen: false,
          disableResize: false,
          position: { x: '7%', y: '22%', transform: 'none' },
          lastPosition: { x: '7%', y: '22%', transform: 'none' },
          size: { width: '90%', height: 'auto' },
          lastSize: { width: '90%', height: 'auto' },
          zIndex: 1,
          isActive: false,
        },
        {
          id: CONTACT,
          status: CLOSED,
          lastStatus: CLOSED,
          disableFullscreen: true,
          disableResize: false,
          position: { x: '68%', y: '1%', transform: 'none' },
          lastPosition: { x: '68%', y: '1%', transform: 'none' },
          size: { width: '30%', height: 'auto' },
          lastSize: { width: '30%', height: 'auto' },
          zIndex: 1,
          isActive: false,
        },
      ]);
    });
  });
});
