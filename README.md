<div align="center">

# Whoiam

### *Portfolio interactif sous forme de bureau virtuel*

**[🌐 Voir le site en production](https://benjaminbats.fr)**

---

### Technologies

<img src="https://img.shields.io/badge/-Angular%2020-DD0031?style=flat-square&logo=angular&logoColor=white"> <img src="https://img.shields.io/badge/-TypeScript%205.8-007ACC?style=flat-square&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/-NgRx-BA2BD2?style=flat-square&logo=redux&logoColor=white"> <img src="https://img.shields.io/badge/-RxJS-B7178C?style=flat-square&logo=reactivex&logoColor=white">

<img src="https://img.shields.io/badge/-Docker-2CA5E0?style=flat-square&logo=docker&logoColor=white"> <img src="https://img.shields.io/badge/-Nginx-009639?style=flat-square&logo=nginx&logoColor=white"> <img src="https://img.shields.io/badge/-Cloudflare-F38020?style=flat-square&logo=cloudflare&logoColor=white">

<img src="https://img.shields.io/badge/-ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white"> <img src="https://img.shields.io/badge/-Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=black"> <img src="https://img.shields.io/badge/-Jasmine-8A4182?style=flat-square&logo=Jasmine&logoColor=white"> <img src="https://img.shields.io/badge/-Karma-56C5A8?style=flat-square&logo=karma&logoColor=white">

<img src="https://img.shields.io/badge/-SCSS-CC6699?style=flat-square&logo=sass&logoColor=white"> <img src="https://img.shields.io/badge/-npm-CB3837?style=flat-square&logo=npm&logoColor=white"> <img src="https://img.shields.io/badge/-Husky-42B983?style=flat-square&logo=git&logoColor=white">

### Status

![Version](https://img.shields.io/github/package-json/v/BenB-Code/Whoiam?style=flat-square&logo=github)
![Release CI](https://img.shields.io/github/actions/workflow/status/BenB-Code/Whoiam/release.yml?style=flat-square&logo=github-actions&label=Release)
![CI Status](https://img.shields.io/github/actions/workflow/status/BenB-Code/Whoiam/ci.yml?style=flat-square&logo=github-actions&label=CI)

[//]: # (![Coverage]&#40;https://img.shields.io/codecov/c/github/BenB-Code/Whoiam?style=flat-square&logo=codecov&label=Coverage&#41;)

</div>

---

## 🎯 Concept

**Whoiam** est un portfolio personnel qui transforme l'expérience classique d'un CV en une **interface desktop interactive**.

Inspiré des environnements **macOS** et **Linux**, le projet présente mes compétences, projets et expériences à travers un système de fenêtres *draggables* avec gestion complète de l'état via **NgRx**.

[RAA complient](https://accessibilite.numerique.gouv.fr/) 

> *L'objectif : démontrer une maîtrise technique solide tout en offrant une expérience utilisateur originale et engageante.*

---

## ✨ Fonctionnalités Clés

<table>
<tr>
<td width="50%">

### 🪟 Interface Desktop

- Fenêtres draggables et redimensionnables
- Gestion complète : minimiser, maximiser, fermer
- Z-index dynamique et focus automatique
- Animations fluides

</td>
<td width="50%">

### 🌍 Internationalisation

- Changement de langue FR/EN instantané
- Sans rechargement de page
- Custom loaders pour SSR
- Traductions des données dynamiques

</td>
</tr>
<tr>
<td width="50%">

### ⚡ Performance

- Mode **Zoneless** d'Angular 20
- **OnPush** change detection
- **Signals** pour la réactivité fine-grained
- Budgets stricts (500kB initial)

</td>
<td width="50%">

### 🏗️ Architecture

- Composants **Standalone**
- Organisation **feature-based**
- **NgRx** pour l'état global
- TypeScript **strict mode**

</td>
</tr>
</table>

---

## 🛠️ Stack Technique

### Core Framework

| Technologie    | Version  | Usage                              |
|----------------|----------|------------------------------------|
| **Angular**    | `20.0.0` | Framework principal, mode zoneless |
| **TypeScript** | `5.8.2`  | Strict mode, explicit return types |
| **RxJS**       | `7.8.0`  | Programmation réactive             |
| **SCSS**       | -        | Styling avec variables et mixins   |

### State Management

```typescript
// NgRx Store pour la gestion centralisée des fenêtres
@ngrx/
store           // Store global
@ngrx/
effects         // Side-effects asynchrones  
@ngrx/
entity          // Normalisation des entités
@ngrx/
store - devtools  // Debugging en dev
```

### UI/UX

- **Angular CDK** : Drag & Drop natif
- **Angular Signals** : Réactivité fine-grained
- **ngx-translate** : Traductions dynamiques avec custom loaders

### Quality Assurance

| Outil         | Configuration                              | Purpose                           |
|---------------|--------------------------------------------|-----------------------------------|
| ESLint        | TypeScript strict + Angular best practices | Linting avec règles de sécurité   |
| Prettier      | Single quotes, 120 chars, tab 2            | Formatage automatique             |
| Husky         | Pre-commit hooks                           | Lint + format sur fichiers staged |
| Jasmine/Karma | ChromeHeadless, coverage                   | Tests unitaires                   |

### DevOps

- **Docker** : Multi-stage builds (dev/prod avec Nginx)
- **GitHub Actions** : CI/CD (lint, test, build, release)
- **Cloudflare** : CDN et protection DDoS
- **Nginx** : Reverse proxy avec gzip, security headers

---

## 📁 Architecture du Projet

```
src/app/
├── common/                          # Éléments partagés
│   ├── components/                  # Composants réutilisables
│   │   ├── bubble/                  # Bulles d'information
│   │   ├── card/                    # Cartes de contenu
│   │   ├── content-window/          # Fenêtre de contenu générique
│   │   ├── listing-window/          # Fenêtre de liste
│   │   ├── placeholder-text/        # Texte de placeholder
│   │   ├── resize-handle/           # Poignée de redimensionnement
│   │   ├── spinner/                 # Indicateur de chargement
│   │   └── window-header/           # En-tête de fenêtre
│   ├── constants/                   # Constantes globales (paths, langs, styles)
│   ├── directives/                  # window-actions directive
│   └── models/                      # Classes abstraites de base
│
├── features/                        # Features organisées par domaine
│   ├── app-bar/                     # Dock applicatif (bottom bar)
│   ├── contact/                     # Informations de contact
│   ├── experiences/                 # Expériences professionnelles
│   │   ├── components/details/      # Détails d'une expérience
│   │   ├── models/                  # Types Experience, RawExperience
│   │   └── services/                # ExperiencesService
│   ├── header-bar/                  # Barre supérieure (menu, horloge, langues)
│   ├── home/                        # Page d'accueil/introduction
│   └── projects/                    # Portfolio de projets
│       ├── models/                  # Types Project, Category, Status
│       └── services/                # ProjectsService
│
├── services/                        # Services globaux
│   ├── contact/                     # Gestion des contacts
│   ├── data/                        # Chargement des données JSON
│   ├── drag-n-drop/                 # Service de drag & drop
│   ├── format/                      # Formatage des données
│   ├── i18n/                        # Service d'internationalisation
│   ├── navigation/                  # Navigation entre fenêtres
│   ├── translate-loader/            # Custom loaders pour SSR
│   └── window-manager/              # Façade du store NgRx
│
└── store/                           # NgRx Store
    └── window-manager/              # Feature store des fenêtres
        ├── actions/                 # Actions (open, close, minimize, etc.)
        ├── constants/               # Valeurs par défaut, breakpoints
        ├── effects/                 # Side-effects asynchrones
        ├── models/                  # Types du state
        ├── reducers/                # Reducers avec NgRx Entity
        └── selectors/               # Selectors mémoïsés
```

### Principes d'organisation

- **Feature-based architecture** : Chaque feature est autonome avec ses composants, services et modèles
- **Separation of concerns** : Logique métier séparée de la présentation
- **NgRx Store** : État global uniquement pour le window manager
- **Standalone components** : Tous les composants sont standalone (no NgModules)

---

## 🎨 Choix Techniques

### Pas de Routing Angular classique

L'application n'utilise pas le Router Angular traditionnel. La navigation se fait entièrement via le store NgRx :

```typescript
// Navigation par ouverture de fenêtres plutôt que par routes URL
windowManagerService.openWindow('projects');
windowManagerService.closeWindow('home');
```

> **Avantage** : Crée une expérience utilisateur type desktop natif où plusieurs fenêtres coexistent simultanément.

### Mode Zoneless + Signals

Angular 20 en mode zoneless pour des performances optimales :

```typescript
// app.config.ts
provideZonelessChangeDetection()
```

- Signals pour l'état local réactif
- `computed()` pour les dérivations automatiques
- OnPush change detection partout
- Détection de changements explicite et prédictible

### NgRx Entity pour la normalisation

```typescript
State = EntityState < WindowState > {
  ids: ['home', 'projects', 'experiences', 'contact'],
  entities: {
    home: {id, status, position, size, zIndex, isActive},
    // ...
  }
}
```

**Bénéfices :**

- Accès O(1) aux entités par ID
- Reducers standardisés
- Selectors mémoïsés pour éviter les recalculs

### Custom Translation Loaders

**Problématique** : Les paths diffèrent entre browser et SSR.

**Solution** : Custom loaders qui détectent l'environnement :

```typescript
// Browser : /i18n/fr.json
// SSR : dist/Whoiam/browser/i18n/fr.json
```

Helper `getTranslatedField()` pour les données multilingues stockées en JSON.

---

## 🚀 Développement

### Installation

```bash
npm install
```

### Scripts disponibles

| Commande                | Description                          |
|-------------------------|--------------------------------------|
| `npm start`             | Dev server sur http://localhost:4200 |
| `npm run build`         | Build production optimisé            |
| `npm test`              | Tests unitaires en mode watch        |
| `npm run test:coverage` | Tests avec rapport de couverture     |
| `npm run lint`          | Vérification ESLint                  |
| `npm run lint:fix`      | Auto-fix des erreurs ESLint          |
| `npm run format`        | Formatage Prettier                   |
| `npm run format:check`  | Vérification Prettier                |

### Docker

**Développement**

```bash
npm run start:docker:dev
# Accessible sur http://localhost:4200
# Hot-reload activé
```

**Production**

```bash
npm run start:docker:prod
# Build optimisé avec Nginx
# Accessible sur http://localhost:80
```

---

## 🧪 Tests & Qualité

### Configuration Jest/Jasmine

- ChromeHeadless pour CI/CD
- Code coverage avec seuils configurables
- Tests unitaires pour tous les composants et services
- Tests des actions, reducers et selectors NgRx

### Hooks Git automatiques

```bash
# Pre-commit : lint + format automatique
git commit -m "feat: nouvelle fonctionnalité"
# ✓ Lint staged files
# ✓ Format staged files
# ✓ Commit créé
```

### CI/CD Pipeline

1. **Lint** : ESLint avec règles strictes
2. **Test** : Jasmine/Karma avec coverage upload vers Codecov
3. **Build** : Vérification de la compilation production
4. **Release** : Création automatique de release + Docker image

---

## 🔧 Configuration Détaillée

### TypeScript

```json
{
  "strict": true,
  "noImplicitReturns": true,
  "noFallthroughCasesInSwitch": true,
  "explicit-function-return-type": "error"
}
```

### ESLint - Règles clés

- **Complexité** : Max 20 (cyclomatique)
- **Longueur** : Max 120 caractères, 400 lignes par fichier
- **Sécurité** : no-eval, no-implied-eval, eqeqeq
- **Angular** : prefer-on-push, prefer-signals, prefer-standalone

### Budgets de build

| Type             | Warning | Error |
|------------------|---------|-------|
| Initial bundle   | 500 kB  | 1 MB  |
| Component styles | 4 kB    | 8 kB  |

---

## 🌐 Déploiement

### Production actuelle

**URL** : https://benjaminbats.fr

**Infrastructure :**

- **Serveur** : VPS avec Docker
- **Reverse proxy** : Nginx avec gzip compression
- **CDN** : Cloudflare pour cache et protection
- **SSL** : Certificat géré par Cloudflare

### Docker Image

Les images Docker sont automatiquement publiées sur GitHub Container Registry lors des releases

---

## 🤝 Contribution

Ce projet est un portfolio personnel destiné à mettre en valeur mes compétences techniques.

Je n'accepte pas de pull requests pour préserver l'authenticité du code.

Cependant, vous êtes bienvenue à :

- ✅ Créer des issues pour signaler des bugs
- ✅ Proposer des suggestions d'amélioration
- ✅ Poser des questions sur l'architecture ou les choix techniques

---

## 📝 Licence

**Projet personnel - Tous droits réservés**

Le code source est disponible à des fins de consultation et d'apprentissage uniquement.

---

<div align="center">

**Développé avec passion par Benjamin Bats 🚀**

[Portfolio](https://benjaminbats.fr) • [LinkedIn](https://www.linkedin.com/in/benjamin-bats-200464165/) • [GitHub](https://github.com/BenB-Code)

</div>
