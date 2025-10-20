# Whoiam

Un portfolio interactif sous forme de bureau virtuel.

<img src="https://img.shields.io/badge/-Angular-DD0031?style=flat-square&logo=angular&logoColor=white"> <img src="https://img.shields.io/badge/-npm-CB3837?style=flat-square&logo=npm&logoColor=white"> <img src="https://img.shields.io/badge/-Jest-C21325?style=flat-square&logo=jest&logoColor=white"> <img src="https://img.shields.io/badge/-Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=black"> <img src="https://img.shields.io/badge/-Docker-2CA5E0?style=flat-square&logo=docker&logoColor=white"> <img src="https://img.shields.io/badge/-TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/-SonarQube-4E9BCD?style=flat-square&logo=sonarqube&logoColor=white"><img src="https://img.shields.io/badge/-ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white"> <img src="https://img.shields.io/badge/-NgRx-BA2BD2?style=flat-square&logo=redux&logoColor=white"> <img src="https://img.shields.io/badge/-Jasmine-8A4182?style=flat-square&logo=Jasmine&logoColor=white"> <img src="https://img.shields.io/badge/-SCSS-CC6699?style=flat-square&logo=sass&logoColor=white">

## 🎯 Concept

Whoiam est mon site vitrine personnel qui transforme un CV classique en une expérience interactive. Inspiré des interfaces desktop macOS et Linux, il présente mes projets, expériences et informations de contact à travers des fenêtres draggables et un gestionnaire d'état.

L'objectif : créer quelque chose de techniquement solide tout en restant visuellement sympathique et original.

## ✨ Fonctionnalités

- Interface desktop avec fenêtres draggables
- Gestion complète des fenêtres : minimiser, maximiser, fermer
- Changement de langue à la volée FR/EN sans rechargement
- Server-Side Rendering pour SEO et performances
- Mode Zoneless d'Angular 20
- Architecture modulaire par features

## 🛠️ Stack Technique

### Core

- **Angular 20**
- **TypeScript 5.8** strict mode
- **RxJS 7.8**
- **SCSS**

### Gestion d'état

- **NgRx Store** : Store global pour les fenêtres
- **NgRx Effects** : Side-effects asynchrones
- **NgRx Entity** : Normalisation des entités
- **NgRx DevTools** : Debugging en développement

### Internationalisation

- **ngx-translate** : Traductions dynamiques
- Custom loaders séparés pour browser et SSR

### UI/UX

- **Angular CDK** : Drag & Drop
- **OnPush Change Detection**
- **Angular Signals** : Réactivité fine-grained

### Qualité de code

- **ESLint** : Règles strictes TypeScript + Angular
- **Prettier** : Formatage automatique
- **Husky** : Git hooks pre-commit
- **Lint-staged** : Validation des fichiers modifiés

## 📁 Architecture du Projet

```
src/
├── app/
│   ├── common/                    # Composants et utilitaires partagés
│   │   ├── components/            # Composants réutilisables
│   │   │   ├── bubble/
│   │   │   ├── card/
│   │   │   ├── content-window/
│   │   │   ├── listing-window/
│   │   │   ├── placeholder-text/
│   │   │   ├── spinner/
│   │   │   └── window-header/
│   │   ├── constants/             # Constantes globales
│   │   ├── directives/            # window-actions
│   │   └── models/                # Classes de base abstraites
│   │
│   ├── features/                  # Features organisées par domaine
│   │   ├── app-bar/               # Dock
│   │   ├── contact/
│   │   ├── experiences/
│   │   │   ├── components/
│   │   │   ├── models/
│   │   │   └── services/
│   │   ├── header-bar/            # Menu, horloge, langues
│   │   ├── home/
│   │   └── projects/
│   │       ├── models/
│   │       └── services/
│   │
│   ├── services/                  # Services globaux
│   │   ├── contact/
│   │   ├── data/
│   │   ├── drag-n-drop/
│   │   ├── format/
│   │   ├── i18n/
│   │   ├── navigation/
│   │   └── translate-loader/
│   │
│   └── store/                     # NgRx Store - Window Manager
│       └── window-manager/
│           ├── actions/
│           ├── constants/
│           ├── effects/
│           ├── models/
│           ├── reducers/
│           └── selectors/
│
├── assets/
│   ├── data/                      # JSON
│   └── i18n/                      # Traductions
│
├── main.ts                        # Entry browser
├── main.server.ts                 # Entry server
└── server.ts                      # Express SSR
```

### Organisation

Architecture **feature-based** :

- Features autonomes avec composants, services et modèles
- Éléments partagés dans `common/`
- Store NgRx pour l'état global du window manager
- Séparation logique métier / présentation

## 🎨 Choix Techniques

### Pas de Routing Angular

Application SPA pure avec navigation par fenêtres. Le routing est géré via le store NgRx plutôt que par des routes URL, créant une expérience utilisateur type bureau desktop.

### NgRx Store

Gestion centralisée de l'état des fenêtres : ouverture, fermeture, position, z-index, focus. NgRx Entity pour la normalisation, selectors mémoïsés pour les performances.

### ngx-translate

Changement de langue instantané avec custom loaders pour résoudre les problématiques de paths en SSR. Helper `getTranslatedField()` pour gérer les données multilingues.

### Mode Zoneless + Signals

Angular 20 en mode zoneless : meilleures performances et détection de changements explicite. Signals pour l'état local réactif, computed pour les dérivations automatiques.

### OnPush + Standalone

Tous les composants en standalone avec OnPush change detection. Utilisation des nouveaux signal inputs et function-based inject.

## 🏗️ Store NgRx - Window Manager

### Structure

```typescript
State = {
  windowManager: EntityState < WindowState > {
    ids: ['home', 'projects', 'experiences', 'contact'],
    entities: {
      home: {id, status, position, size, isActive, zIndex, lastStatus},
      // ...
    }
  }
}
```

### Actions

- `openWindow` / `closeWindow`
- `minimizeWindow` / `maximizeWindow` / `restoreWindow`
- `setActiveWindow`
- `updateWindow`

### Logic

**Z-Index** : Calculé dynamiquement, fenêtre active = `max(zIndexes) + 1`

**Status** : `CLOSED → OPEN ⇄ MAXIMIZED → MINIMIZED → lastStatus`

**Position** : Sauvegardée dans le store, reset lors de la fermeture

## 🧩 Conventions

### Naming

- **Components** : PascalCase sans suffix
- **Files** : kebab-case
- **Constants** : UPPER_SNAKE_CASE
- **Types** : PascalCase + `.type.ts`

### Imports

```typescript
// 1. Angular core
// 2. Angular modules
// 3. Third-party
// 4. App imports (alphabétique)
```

### TypeScript

- Strict mode activé
- Explicit return types
- Types over interfaces

## 🚀 Développement

### Installation

```bash
npm install
```

### Dev

```bash
npm run start
# http://localhost:4200/
```

### Build

```bash
npm run build
```

### SSR

```bash
npm run build
npm run serve:ssr:Whoiam
```

### Qualité

```bash
npm run lint          # Check
npm run lint:fix      # Auto-fix
npm run format        # Format
npm test              # Tests
```

## 🔧 Configuration

**ESLint** : Rules TypeScript strictes + Angular best practices + sécurité

**Prettier** : Single quotes, semi-colons, 120 chars, tab 2

**Husky** : Pre-commit hook pour lint + format automatique sur les fichiers staged

**Budgets** : Initial 500kB warn / 1MB error, Styles 4kB warn / 8kB error

## 🔮 Roadmap

- [ ] Dockerisation
- [ ] Optimisation SEO wording
- [ ] Responsive mobile
- [ ] Tests unitaires et E2E
- [ ] Resize de fenêtres

## 📝 Licence

Projet personnel - Tous droits réservés
