import { getResponsiveDefaultSettings } from './default-values.const';
import { CONTACT, EXPERIENCES, HOME, PROJECTS } from './types.const';
import { CLOSED } from './status.const';

describe('DefaultValuesConst', () => {
  describe('getResponsiveDefaultSettings', () => {
    it('should use fallback values', () => {
      const result = getResponsiveDefaultSettings();
      expect(result).toEqual([
        {
          id: HOME,
          status: CLOSED,
          disableFullscreen: true,
          position: { x: '1%', y: '1%' },
          size: { width: '64%', height: 'fit-content' },
          zIndex: 2,
          isActive: true,
        },
        {
          id: EXPERIENCES,
          status: CLOSED,
          disableFullscreen: false,
          position: { x: '4%', y: '12%' },
          size: { width: '68%', height: '60%' },
          zIndex: 1,
          isActive: false,
        },
        {
          id: PROJECTS,
          status: CLOSED,
          disableFullscreen: false,
          position: { x: '7%', y: '22%' },
          size: { width: '90%', height: 'fit-content' },
          zIndex: 1,
          isActive: false,
        },
        {
          id: CONTACT,
          status: CLOSED,
          disableFullscreen: true,
          position: { x: '68%', y: '1%' },
          size: { width: '30%', height: 'fit-content' },
          zIndex: 1,
          isActive: false,
        },
      ]);
    });
  });
});
