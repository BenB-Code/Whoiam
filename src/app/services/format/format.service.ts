import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormatService {
  formatDuration(duration: { startDate: Date; endDate: Date }): string {
    const startMonth = duration.startDate.toLocaleDateString('fr-FR', { month: '2-digit', year: 'numeric' });
    const endMonth = duration.endDate.toLocaleDateString('fr-FR', { month: '2-digit', year: 'numeric' });
    return `${startMonth} - ${endMonth}`;
  }
}
