import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {ListingWindow} from '../../common/listing-window/listing-window';
import {Experience} from './models/experience.model';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {closeWindow, maximizeWindow, minimizeWindow, selectWindowById, setActiveWindow, WindowState} from '../../store';
import {EXPERIENCES} from '../../store/window-manager/constants/types.const';
import {AsyncPipe} from '@angular/common';
import {ExperiencesService} from './services/experiences.service';
import {Spinner} from '../../common/spinner/spinner';

@Component({
  selector: 'app-experiences',
  imports: [
    ListingWindow,
    AsyncPipe,
    Spinner
  ],
  templateUrl: './experiences.html',
  styleUrl: './experiences.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Experiences {
  private store = inject(Store);
  experiencesWindow$: Observable<WindowState | null> = this.store.select(selectWindowById(EXPERIENCES));

  experiencesService: ExperiencesService = inject(ExperiencesService);

  selectedIndex = signal<number | null>(null);
  selectedExperience = signal<Experience | null>(null);

  onSelection(event: { item: Experience, index: number }) {
    this.selectedIndex.set(event.index);
    this.selectedExperience.set(event.item);
  }

  formatDuration(duration: { startDate: Date, endDate: Date }): string {
    const startMonth = duration.startDate.toLocaleDateString('fr-FR', {month: '2-digit', year: 'numeric'});
    const endMonth = duration.endDate.toLocaleDateString('fr-FR', {month: '2-digit', year: 'numeric'});
    return `${startMonth} - ${endMonth}`;
  }

  onClose(): void {
    this.store.dispatch(closeWindow({id: EXPERIENCES}));
  }

  onFullscreen(): void {
    this.store.dispatch(maximizeWindow({id: EXPERIENCES}));
  }

  onReduce(): void {
    this.store.dispatch(minimizeWindow({id: EXPERIENCES}));
  }

  onActivate(): void {
    this.store.dispatch(setActiveWindow({id: EXPERIENCES}));
  }
}
