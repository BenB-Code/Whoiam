import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ListingWindow } from '../../common/components/listing-window/listing-window';
import { Experience } from './models/experience.type';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CLOSED, EXPERIENCES, MAXIMIZED, MINIMIZED, selectWindowById, WindowState } from '../../store';
import { AsyncPipe } from '@angular/common';
import { ExperiencesService } from './services/experiences.service';
import { Spinner } from '../../common/components/spinner/spinner';
import { WindowActions } from '../../common/directives';

@Component({
  selector: 'app-experiences',
  imports: [ListingWindow, AsyncPipe, Spinner, WindowActions],
  templateUrl: './experiences.html',
  styleUrl: './experiences.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Experiences {
  readonly selectedIndex = signal<number | null>(null);
  readonly selectedExperience = signal<Experience | null>(null);
  protected readonly experiencesService: ExperiencesService = inject(ExperiencesService);
  protected readonly MAXIMIZED = MAXIMIZED;
  protected readonly MINIMIZED = MINIMIZED;
  protected readonly CLOSED = CLOSED;
  protected readonly EXPERIENCES = EXPERIENCES;
  private readonly store = inject(Store);
  experiencesWindow$: Observable<WindowState | null> = this.store.select(selectWindowById(EXPERIENCES));

  onSelection(event: { item: Experience; index: number }): void {
    this.selectedIndex.set(event.index);
    this.selectedExperience.set(event.item);
  }

  formatDuration(duration: { startDate: Date; endDate: Date }): string {
    const startMonth = duration.startDate.toLocaleDateString('fr-FR', { month: '2-digit', year: 'numeric' });
    const endMonth = duration.endDate.toLocaleDateString('fr-FR', { month: '2-digit', year: 'numeric' });
    return `${startMonth} - ${endMonth}`;
  }
}
