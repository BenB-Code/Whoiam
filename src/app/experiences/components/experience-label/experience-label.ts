import {Component, input} from '@angular/core';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-experience-label',
  imports: [
    JsonPipe
  ],
  templateUrl: './experience-label.html',
  styleUrl: './experience-label.scss'
})
export class ExperienceLabel {
  experience = input<any>()
}
