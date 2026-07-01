
# HRnet — Application de gestion des employés

Projet de refonte d'une application de gestion des employés, convertie de jQuery/Vanilla JS à React.

HRnet est une application interne permettant de créer et consulter les dossiers des employés de l'entreprise. Elle offre une interface simple et moderne pour gérer les enregistrements des employés avec persistance locale des données.

---

## Prérequis

- [Node.js](https://nodejs.org/) v18+
- npm

---

## Installation

```bash
npm install
```

---

## Lancer le projet

### Mode développement

```bash
npm run dev
```

L'application sera disponible sur [http://localhost:5173](http://localhost:5173).

### Mode production

```bash
npm run build
npm run preview
```

---

## Structure du projet

```
OC_HRnet/
├── public/
│   ├── robots.txt              # SEO crawler directives
│   ├── sitemap.xml             # Site map
│   └── llms.txt                # LLM guidelines
├── src/
│   ├── components/
│   │   └── Modal/              # Modal de confirmation
│   ├── data/
│   │   ├── departments.js       # Liste des départements
│   │   └── states.js            # Liste des états
│   ├── pages/
│   │   ├── CreateEmployee/      # Formulaire création employé
│   │   └── EmployeeList/        # Liste des employés
│   ├── store/
│   │   ├── store.js             # Configuration Redux
│   │   └── employeesSlice.js    # Reducer employés
│   ├── App.jsx                  # Composant racine
│   ├── main.jsx                 # Point d'entrée
│   ├── index.css                # Styles globaux
│   └── App.css                  # Styles applicatifs
├── package.json
├── vite.config.js
└── README.md
```

---

## Fonctionnalités

- ✅ **Créer un employé** — Formulaire complet avec validation
- ✅ **Consulter les employés** — Liste complète avec recherche en temps réel
- ✅ **Persistance locale** — Données sauvegardées en Redux
- ✅ **Design responsive** — Interface moderne et accessible
- ✅ **Optimisation SEO** — robots.txt, sitemap.xml, méta-tags


## Technologies utilisées

- [React 19](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/) — gestion d'état
- [React Router v7](https://reactrouter.com/) — routing
- [Vite](https://vitejs.dev/) — bundler
- [@leo_brd/react-datetimepicker](https://www.npmjs.com/package/@leo_brd/react-datetimepicker) — sélecteur date/heure custom

---

## Scripts disponibles

| Command | Description |
|---------|-------------|
| `npm run dev` | Démarre le serveur de développement |
| `npm run build` | Build l'application pour la production |
| `npm run preview` | Prévisualise le build production localement |
| `npm run lint` | Lint le code avec ESLint |

---

## Rapports Lighthouse

Pour générer les rapports Lighthouse des deux pages principales :

```bash
# Build et preview
npm run build
npm run preview

# Dans un autre terminal, générez les rapports
lighthouse http://localhost:4173 --output=html --output-path=./create_lighthouse.html
lighthouse http://localhost:4173/employees --output=html --output-path=./employee_list_lighthouse.html
```

Les rapports seront disponibles dans le répertoire racine.
