import { PROJECT_STATUS } from './projects-status.type';
import { PROJECT_CATEGORY } from './projects-category.type';

export interface Project {
  name: string;
  description: string;
  link: {
    name: string;
    url: string;
  };
  technologies?: string[];
  status?: PROJECT_STATUS;
  year?: number;
  category?: PROJECT_CATEGORY;
}
