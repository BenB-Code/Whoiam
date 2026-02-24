import { WindowType } from '../../store';

export const DATA_PATH = (windowType: WindowType): string => `/public/data/${windowType}.json`;
