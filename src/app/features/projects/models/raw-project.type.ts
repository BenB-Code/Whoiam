import { PROJECT_STATUS } from './projects-status.type';
import { PROJECT_CATEGORY } from './projects-category.type';
import { LANGUAGES } from '../../../common/constants';

export type RawProject = {
  name: string;
  description: Record<LANGUAGES, string>;
  link: {
    name: string;
    url: string;
  };
  technologies?: string[];
  status?: PROJECT_STATUS;
  year?: number;
  category?: PROJECT_CATEGORY;
};
