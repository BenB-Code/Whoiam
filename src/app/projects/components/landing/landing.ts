import {Component} from '@angular/core';

@Component({
  selector: 'app-project-landing',
  imports: [],
  templateUrl: './landing.html',
  styleUrl: './landing.scss'
})
export class ProjectLanding {
  projectsList = [
    {
      name: 'Kaamelott Citation Extractor',
      description: '🛠️ An XML parser to extract and structure quotes from the Kaamelott Wikiquote pages.',
      link: {
        name: 'Github',
        url: 'https://github.com/BenB-Code/Kaamelott_Citation_Extractor'
      }
    },
    {
      name: 'Kaamelott Citation API',
      description: "Une API REST qui permet de récupérer, filtrer et rechercher des citations cultes de la série Kaamelott d'Alexandre Astier.",
      link: {
        name: 'Github',
        url: 'https://github.com/BenB-Code/Kaamelott_Citation_API'
      }
    },
    {
      name: 'Whoiam',
      description: 'Quick portfolio websitte that act as a resume.',
      link: {
        name: 'Github',
        url: 'https://github.com/BenB-Code/Whoiam'
      }
    },
  ]

  redirect(url: string): void {
    window.open(url, '_blank');
  }
}
