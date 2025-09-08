import {Component, signal} from '@angular/core';
import {ExperienceResume} from '../experience-resume/experience-resume';
import {ExperienceLabel} from '../experience-label/experience-label';

@Component({
  selector: 'app-experience-landing',
  imports: [
    ExperienceResume,
    ExperienceLabel,
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.scss'
})
export class ExperienceLanding {
  mockData = [
    {
      company: "Akka I&S",
      name: "Ingénieur d'étude et développemennt",
      duration: {
        startDate: new Date("2021-05"),
        endDate: new Date("2024-01"),
      },
      localisation: {
        city: "Bordeaux",
        state: "Nouvelle Aquitaine",
        country: "France",
      },
      actions: [
        "Développements d'applications from scratch mono et multi-repo",
        "Développements d'API RestFull en lien avec des bases de données",
        "Intégration de persistance des données (MongoDb, MySql, NgRx)",
        "Mise en place et cohérence des tests unitaires, fonctionnels, intégration, e2e",
        "Mise en place et utilisation de CI Jenkins pour l'automatisation des builds et déploiements",
        "Création et maintenance de librairies de composants (design system)",
        "Documentation des outils et méthodologies de travail"
      ],
      skills: [
        "Angular", "NestJS", "Kafka", "RabbitMq", "Nx", "Micro-services", "Docker", "Kubernetes", "ArgoCd", "Cypress", "Swagger", "Keycloak", "Jenkins", "MongoDB", "Design System",
      ]
    },
    {
      company: "SQLI",
      name: "Ingénieur concepteur développeur",
      duration: {
        startDate: new Date("2019-03"),
        endDate: new Date("2021-03"),
      },
      localisation: {
        city: "Toulouse",
        state: "Occitanie",
        country: "France",
      },
      actions: [
        "Conception et développement, principalement Front, dans l'équipe mobilité numérique.",
        "Avant-ventes, études de faisabilités techniques",
        "Conception, PoC",
        "Développements d'applications mobiles hybrides",
        "Maintenance applicatives, analyse et évolutions",
      ],
      skills: [
        "Angular", "Méthode Agile", "SQLite", "Ionic", "GitLab", "Etude de faisabilité", "Analyse technique", "Raffinement de besoin"
      ]
    },
    {
      company: "SQLI",
      name: "Stagiaire Concepteur Developpeur Informatique",
      duration: {
        startDate: new Date("2018-11"),
        endDate: new Date("2019-02"),
      },
      localisation: {
        city: "Toulouse",
        state: "Occitanie",
        country: "France",
      },
      actions: [
        "Intégration à une équipe Agile Scrum",
        "Développement d'applications mobiles hybrides",
        "Mise en place de dashboards avec graphiques et gestion de statut",
      ],
      skills: [
        "Angular", "Méthode Agile", "SQLite", "Ionic", "Etude de faisabilité", "Analyse technique", "Raffinement de besoin"
      ]
    },
    {
      company: "7 Bataillon de Chasseurs Alpins",
      name: "Chasseur Alpins",
      duration: {
        startDate: new Date("2013-03"),
        endDate: new Date("2018-04"),
      },
      localisation: {
        city: "Varces-Allières-et-Risset",
        state: "Isère",
        country: "France",
      },
      actions: [
        "Chef d'équipe infanterie de 3 à 7 personnes (suivant la mission)",
        "Diriger, écouter, comprendre, gérer les conflits entre les personnels",
        "Responsable d'un magasin de matériels sensibles (1100 références)",
        "Gestion du local, suivi des perceptions, réintégrations, mise en réparation",
      ],
      skills: ["Management d'équipe", "Gestion des conflits", "Adaptabilité", "Gestion du stress"]
    },
  ]

  activeExperience = signal<any>(null)

  onSelection(index: number) {
    this.activeExperience.set(this.mockData[index])
  }
}
