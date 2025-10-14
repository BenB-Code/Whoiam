import { EN, FR } from '../../../common/constants/lang.const';

export type RawExperience = {
  company: Record<typeof FR | typeof EN, string>;
  name: Record<typeof FR | typeof EN, string>;
  duration: {
    startDate: Date;
    endDate: Date;
  };
  localisation: {
    city: string;
    state: string;
    country: string;
  };
  actions: Record<typeof FR | typeof EN, string[]>;
  skills: Record<typeof FR | typeof EN, string[]>;
};
