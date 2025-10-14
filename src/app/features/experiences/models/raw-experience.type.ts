import { LANGUAGES } from '../../../common/constants';

export type RawExperience = {
  company: Record<LANGUAGES, string>;
  name: Record<LANGUAGES, string>;
  duration: {
    startDate: Date;
    endDate: Date;
  };
  localisation: {
    city: string;
    state: string;
    country: string;
  };
  actions: Record<LANGUAGES, string[]>;
  skills: Record<LANGUAGES, string[]>;
};
