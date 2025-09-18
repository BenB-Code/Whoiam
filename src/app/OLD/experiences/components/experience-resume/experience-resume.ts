import {Component, input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Badge} from '../../../common/components/badge/badge';

@Component({
  selector: 'app-experience-resume',
  imports: [
    CommonModule, Badge
  ],
  templateUrl: './experience-resume.html',
  styleUrl: './experience-resume.scss'
})
export class ExperienceResume {

  experience = input<any>();
}
