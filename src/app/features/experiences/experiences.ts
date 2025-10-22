import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ListingWindow } from '../../common/components/listing-window/listing-window';
import { Experience } from './models/experience.type';
import { AsyncPipe } from '@angular/common';
import { ExperiencesService } from './services/experiences.service';
import { Spinner } from '../../common/components/spinner/spinner';
import { WindowActions } from '../../common/directives';
import { PlaceholderText } from '../../common/components/placeholder-text/placeholder-text';
import { Details } from './components/details/details';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';
import { FormatService } from '../../services/format/format.service';
import { ComponentConstants } from '../../common/models/component-constants';

@Component({
  selector: 'app-experiences',
  imports: [ListingWindow, AsyncPipe, Spinner, WindowActions, PlaceholderText, Details, TranslatePipe],
  templateUrl: './experiences.html',
  styleUrl: './experiences.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Experiences extends ComponentConstants {
  experiencesWindow$ = this.windowManagerService.selectWindowById(this.EXPERIENCES);
  protected readonly experiencesService: ExperiencesService = inject(ExperiencesService);
  protected readonly formatService: FormatService = inject(FormatService);
  private readonly selectedExperienceIndex = signal<number | null>(null);
  readonly selectedExperience = computed(() => {
    const index = this.selectedExperienceIndex();
    if (index === null) {
      return null;
    }
    return this.experiencesService.experiences()[index] || null;
  });

  constructor() {
    super();
    this.experiencesWindow$.pipe(takeUntilDestroyed()).subscribe(window => {
      if (window?.status === this.CLOSED) {
        this.selectedExperienceIndex.set(null);
      }
    });
  }

  onSelection(event: { item: Experience; index: number }): void {
    this.selectedExperienceIndex.set(event.index);
  }
}
