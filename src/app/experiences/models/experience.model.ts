export interface Experience {
  company: string;
  name: string;
  duration: {
    startDate: Date;
    endDate: Date;
  };
  localisation: {
    city: string;
    state: string;
    country: string;
  };
  actions: string[];
  skills: string[];
}
