import { Injectable } from '@angular/core';
import { FR_LOCAL } from '../../common/constants';

@Injectable({
  providedIn: 'root',
})
export class FormatService {
  formatDuration(duration: { startDate: Date; endDate: Date }, local = FR_LOCAL): string {
    const startMonth = duration.startDate.toLocaleDateString(local, { month: '2-digit', year: 'numeric' });
    const endMonth = duration.endDate.toLocaleDateString(local, { month: '2-digit', year: 'numeric' });
    return `${startMonth} - ${endMonth}`;
  }
}
