import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Experience } from '../../models/experience.type';
import { Bubble } from '../../../../common/components/bubble/bubble';
import { FormatService } from '../../../../services/format/format.service';
import { ORANGE } from '../../../../common/constants/style.const';

@Component({
  selector: 'app-details',
  imports: [Bubble],
  templateUrl: './details.html',
  styleUrl: './details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Details {
  readonly experience = input<Experience | null>();
  protected readonly formatService: FormatService = inject(FormatService);
  protected readonly ORANGE = ORANGE;
}
