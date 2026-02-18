# Editoria Frontend

## Description

Interface web moderne pour la gestion d'un système éditorial complet. Application React avec TypeScript permettant la gestion d'articles, de catégories, de notifications et d'imports de données avec un dashboard analytique.

## Prérequis

- Node.js version 18 ou supérieure
- npm ou yarn
- API Backend démarrée sur `http://localhost:5000`

## Installation

```bash
# Installation des dépendances
npm install
```

## Lancement

```bash
# Mode développement (avec hot reload)
npm run dev

# Build pour la production
npm run build

# Prévisualisation du build de production
npm run preview

# Linting du code
npm run lint
```

L'application sera accessible sur `http://localhost:5173`

## Choix techniques

### Architecture
- **Architecture par fonctionnalités** : Organisation du code par fonctionnalité (articles, categories, notifications, etc.) plutôt que par type de fichier
- **Context API** : Gestion d'état globale sans Redux pour simplifier l'application
- **Composants réutilisables** : Bibliothèque de composants communs (Button, Input, Dialog, Table, etc.)
- **React Router** : Navigation côté client avec routes déclaratives

### Technologies utilisées
- **React 19** : Dernière version de React avec les fonctionnalités les plus récentes
- **TypeScript** : Typage statique pour réduire les erreurs et améliorer la maintenabilité
- **Vite** : Build tool ultra-rapide avec hot module replacement
- **Material-UI (MUI)** : Bibliothèque de composants UI moderne et accessible
- **React Hook Form + Zod** : Gestion des formulaires avec validation schématique
- **Axios** : Client HTTP pour les appels API
- **MUI X-Charts** : Graphiques interactifs pour le dashboard
- **Emotion** : CSS-in-JS pour le styling des composants
- **date-fns** : Manipulation et formatage des dates

### Justifications
- **Vite** choisi pour sa rapidité de build et son expérience de développement supérieure à Create React App
- **Material-UI** pour accélérer le développement avec des composants déjà stylisés et accessibles
- **Context API** suffisante pour cette échelle d'application (pas besoin de Redux)
- **React Hook Form** pour des formulaires performants avec un minimum de re-renders
- **Zod** pour une validation type-safe partageable entre frontend et backend

### Compromis effectués
- Emotion (CSS-in-JS) au lieu de Tailwind : plus verbeux mais intégré à MUI
- Context API au lieu de Redux : moins de boilerplate mais moins scalable pour de très grandes applications
- Pas de SSR (Next.js) : application SPA pure, plus simple mais moins optimale pour le SEO

## Fonctionnalités implémentées

### ✅ Complet
- **Dashboard** : 
  - Statistiques en temps réel (nombre d'articles, catégories, notifications)
  - Graphiques d'évolution des articles
  - Liste des articles récents
  - Historique des notifications
- **Gestion des Articles** :
  - Liste avec filtres et recherche
  - Création/Édition avec formulaire validé
  - Suppression avec confirmation
  - Attribution de catégories multiples
  - Génération automatique de slug
- **Gestion des Catégories** :
  - Affichage en cards colorées
  - CRUD complet (Create, Read, Update, Delete)
  - Système de couleurs personnalisées
- **Notifications** :
  - Prévisualisation avant envoi
  - Historique des notifications envoyées
  - Formulaire de création
- **Import de données** :
  - Interface d'import d'articles en masse
- **Interface utilisateur** :
  - Layout responsive avec sidebar
  - Design moderne et cohérent
  - Feedback utilisateur (loading, erreurs, succès)
  - Navigation fluide entre les pages

### ⚠️ Partiel
- Gestion d'erreurs (basique, pourrait être centralisée)
- Prévisualisation des articles (pourrait être améliorée)
- Système de recherche (simple, pourrait être plus avancé)

### ❌ Non fait
- Tests unitaires et d'intégration
- Authentification/Gestion d'utilisateurs
- Mode sombre
- Internationalisation (i18n)
- Upload d'images avec prévisualisation
- Export de données
- Système de permissions

## Ce qui aurait été fait avec plus de temps

1. **Tests** : Tests unitaires (Vitest/Jest) et tests E2E (Playwright/Cypress)
2. **Authentification** : Login/Logout avec JWT, gestion des sessions et refresh tokens
3. **Mode sombre** : Toggle dark/light mode avec persistance
4. **Upload d'images** : Drag & drop pour les images d'articles avec crop et prévisualisation
5. **Éditeur riche** : Éditeur WYSIWYG (TipTap, Slate) pour le contenu des articles
6. **Internationalisation** : Support multi-langues avec react-i18next
7. **Optimisations** :
   - Lazy loading des routes et composants
   - Virtualisation des longues listes (react-virtual)
   - Cache des requêtes (React Query/SWR)
8. **PWA** : Progressive Web App avec offline support
9. **Système de permissions** : Rôles et permissions granulaires
10. **Storybook** : Documentation visuelle des composants
11. **Animations** : Transitions fluides avec Framer Motion
12. **Export** : Export des données en CSV/Excel

## Tests

```bash
# Les tests ne sont pas encore implémentés
# À venir : npm test
```

## Difficultés rencontrées

### 1. Gestion d'état avec Context API
**Problème** : Re-renders excessifs lors de la mise à jour des contexts  
**Solution** : Séparation des contexts par fonctionnalité et optimisation avec useMemo/useCallback

### 2. Typage TypeScript avec MUI
**Problème** : Types complexes pour les composants MUI personnalisés  
**Solution** : Création d'interfaces TypeScript réutilisables et utilisation de types génériques

### 3. Formulaires avec validation
**Problème** : Synchronisation entre React Hook Form et Zod tout en gardant une bonne UX  
**Solution** : Utilisation de @hookform/resolvers pour l'intégration et validation mode onBlur

### 4. Gestion des appels API
**Problème** : Loading states et gestion d'erreurs répétitifs  
**Solution** : Création d'un service API centralisé avec intercepteurs Axios et états partagés dans les contexts

### 5. Responsive Design
**Problème** : Adaptation du layout sur mobile avec la sidebar  
**Solution** : Utilisation du système de breakpoints MUI et drawer temporaire sur mobile

### 6. Performance des graphiques
**Problème** : Ralentissements avec de grandes quantités de données dans les graphiques  
**Solution** : Agrégation des données côté frontend et limitation du nombre de points affichés
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
