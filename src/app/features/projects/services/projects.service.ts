import { computed, Injectable } from '@angular/core';
import { take } from 'rxjs';
import { Project, RawProject } from '../models';
import { DATA_PATH } from '../../../common/constants';
import { PROJECTS } from '../../../store';
import { DataLoaderServiceAbstract } from '../../../common/models/data-loader-service.abstract';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService extends DataLoaderServiceAbstract<RawProject, Project> {
  readonly projects = computed(() =>
    this.rawData().map((project: RawProject) => ({
      ...project,
      description: this.i18nService.getTranslatedField(project.description),
    }))
  );

  getData(): Project[] {
    return this.projects();
  }

  getErrorKey(): string {
    return `${PROJECTS}.error`;
  }

  getPlaceholderKey(): string {
    return `${PROJECTS}.unreachable`;
  }

  loadProjects(): void {
    if (this.rawData().length === 0) {
      this.loadData(DATA_PATH(PROJECTS)).pipe(take(1)).subscribe();
    }
  }
}
