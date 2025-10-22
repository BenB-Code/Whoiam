import { computed, inject, signal } from '@angular/core';
import { I18nService } from '../../services/i18n/i18n.service';
import { DataService } from '../../services/data/data.service';
import { catchError, Observable, of, tap } from 'rxjs';

export abstract class DataLoaderServiceAbstract<TRaw, TTransformed> {
  readonly isLoading = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  readonly hasError = computed(() => this.error() !== null);
  readonly isEmpty = computed(() => !this.hasError() && this.getData().length === 0);
  readonly shouldDisplayPlaceholder = computed(() => this.hasError() || this.isEmpty());

  readonly placeholder = computed(() => (this.hasError() ? this.error() : this.getPlaceholderKey()));

  protected readonly rawData = signal<TRaw[]>([]);

  protected readonly i18nService = inject<I18nService>(I18nService);
  protected readonly dataService = inject(DataService);

  abstract getData(): TTransformed[];

  abstract getErrorKey(): string;

  abstract getPlaceholderKey(): string;

  protected loadData(path: string): Observable<TRaw[]> {
    this.isLoading.set(true);
    this.error.set(null);

    return this.dataService.fetchJson<TRaw[]>(path).pipe(
      tap(data => {
        this.rawData.set(data);
        this.isLoading.set(false);
      }),
      catchError(err => {
        this.error.set(this.getErrorKey());
        this.isLoading.set(false);
        this.rawData.set([]);
        return of([]);
      })
    );
  }
}
