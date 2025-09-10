# Digital Clock React Component

Un composant React moderne affichant une horloge digitale avec un style LED vert rétro.

## Fonctionnalités

- ✅ Affichage en temps réel (mise à jour chaque seconde)
- ✅ Design LED vert rétro sans effets de rayonnement
- ✅ Format 12 heures avec indication AM/PM
- ✅ Affichage de la date complète (année, mois, jour, jour de la semaine)
- ✅ Container compact de 90px de hauteur
- ✅ Design responsive
- ✅ Effets interactifs au hover

## Installation

1. Installez les dépendances :
```bash
npm install
```

2. Lancez l'application :
```bash
npm start
```

## Utilisation

### Import du composant
```jsx
import DigitalClock from './DigitalClock';
import './DigitalClock.css';
```

### Utilisation basique
```jsx
function App() {
  return (
    <div className="App">
      <DigitalClock />
    </div>
  );
}
```

## Structure des fichiers

```
├── DigitalClock.jsx     # Composant principal
├── DigitalClock.css     # Styles du composant
├── App.jsx              # Composant App d'exemple
├── App.css              # Styles de l'App
├── index.js             # Point d'entrée React
├── index.css            # Styles globaux
├── package.json         # Dépendances
└── public/
    └── index.html       # Template HTML
```

## Personnalisation

Le composant utilise des hooks React modernes :
- `useState` pour gérer l'état du temps
- `useEffect` pour le timer d'actualisation

### Variables CSS principales
- `--green`: #00ff00 (couleur verte principale)
- `--dark-bg`: #000 (fond noir)
- `--border-color`: #333 (couleur des bordures)

## Compatibilité

- React 18+
- Navigateurs modernes supportant CSS Grid et Flexbox
- Design responsive (mobile et desktop)

## Licence

MIT
