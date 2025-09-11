import {Component, input} from '@angular/core';

@Component({
  selector: 'app-experience-label',
  imports: [],
  templateUrl: './experience-label.html',
  styleUrl: './experience-label.scss'
})
export class ExperienceLabel {
  experience = input<any>()
}
