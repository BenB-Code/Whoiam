import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ListingWindow } from '../../common/components/listing-window/listing-window';
import { Experience } from './models/experience.type';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CLOSED, EXPERIENCES, MAXIMIZED, MINIMIZED, OPEN, selectWindowById, WindowState } from '../../store';
import { AsyncPipe } from '@angular/common';
import { ExperiencesService } from './services/experiences.service';
import { Spinner } from '../../common/components/spinner/spinner';
import { WindowActions } from '../../common/directives';
import { PlaceholderText } from '../../common/components/placeholder-text/placeholder-text';
import { Details } from './components/details/details';
import { FormatService } from '../../services/format/format.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-experiences',
  imports: [ListingWindow, AsyncPipe, Spinner, WindowActions, PlaceholderText, Details, TranslatePipe],
  templateUrl: './experiences.html',
  styleUrl: './experiences.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Experiences {
  readonly selectedExperience = signal<Experience | null>(null);
  protected readonly experiencesService: ExperiencesService = inject(ExperiencesService);
  protected readonly MAXIMIZED = MAXIMIZED;
  protected readonly MINIMIZED = MINIMIZED;
  protected readonly CLOSED = CLOSED;
  protected readonly EXPERIENCES = EXPERIENCES;

  protected readonly formatService: FormatService = inject(FormatService);
  protected readonly OPEN = OPEN;
  private readonly store = inject(Store);
  experiencesWindow$: Observable<WindowState | null> = this.store.select(selectWindowById(EXPERIENCES));

  constructor() {
    this.experiencesWindow$.pipe(takeUntilDestroyed()).subscribe(window => {
      if (window?.status === CLOSED) {
        this.selectedExperience.set(null);
      }
    });
  }

  onSelection(event: { item: Experience; index: number }): void {
    this.selectedExperience.set(event.item);
  }
}
