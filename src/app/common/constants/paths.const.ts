import { WindowType } from '../../store';

export const DATA_PATH = (windowType: WindowType): string => `/assets/data/${windowType}.json`;
