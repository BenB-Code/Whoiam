import { computed, Injectable } from '@angular/core';
import { RawExperience } from '../models/raw-experience.type';
import { DataLoaderServiceAbstract } from '../../../common/models/data-loader-service.abstract';
import { Experience } from '../models/experience.type';
import { DATA_PATH } from '../../../common/constants';
import { EXPERIENCES } from '../../../store';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExperiencesService extends DataLoaderServiceAbstract<RawExperience, Experience> {
  readonly experiences = computed(() =>
    this.rawData().map(exp => ({
      ...exp,
      company: this.i18nService.getTranslatedField(exp.company),
      name: this.i18nService.getTranslatedField(exp.name),
      duration: {
        endDate: new Date(exp.duration.endDate),
        startDate: new Date(exp.duration.startDate),
      },
      actions: this.i18nService.getTranslatedField(exp.actions),
      skills: this.i18nService.getTranslatedField(exp.skills),
    }))
  );

  getData(): Experience[] {
    return this.experiences();
  }

  getErrorKey(): string {
    return `${EXPERIENCES}.error`;
  }

  getPlaceholderKey(): string {
    return `${EXPERIENCES}.unreachable`;
  }

  loadExperiences(): void {
    if (this.rawData().length === 0) {
      this.loadData(DATA_PATH(EXPERIENCES)).pipe(take(1)).subscribe();
    }
  }
}
