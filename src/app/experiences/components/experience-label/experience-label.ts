import {Component, input} from '@angular/core';
import {Card} from '../../../common/components/card/card';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-experience-label',
  imports: [
    Card,
    DatePipe
  ],
  templateUrl: './experience-label.html',
  styleUrl: './experience-label.scss'
})
export class ExperienceLabel {
  experience = input<any>();
  active = input<boolean>(false);

}
