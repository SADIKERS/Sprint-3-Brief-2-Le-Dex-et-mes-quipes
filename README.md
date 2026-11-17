 
# 🐉 Mon Dex — Le Dex et mes équipes

Une application web interactive inspirée de l'univers **Yu-Gi-Oh!**, permettant de consulter, rechercher et organiser une collection de monstres.

Ce projet est réalisé dans le cadre du Sprint 3 de la formation YouCode.

## 🌐 Démo en ligne

🔗 **GitHub Pages :** [Voir le projet](https://VOTRE-USERNAME.github.io/VOTRE-REPOSITORY/)

> **Note :** GitHub Pages héberge uniquement des fichiers statiques. L'API locale `json-server` ne sera pas accessible en production depuis GitHub Pages. Une API distante devra être déployée pour rendre toutes les fonctionnalités dynamiques disponibles en ligne.

## 📌 Présentation du projet

Mon Dex est une application qui permet de gérer une collection de monstres Yu-Gi-Oh! à travers une interface simple et responsive.

L'objectif est de mettre en pratique JavaScript, la manipulation du DOM, les requêtes HTTP et la communication avec une API REST locale.

## ✨ Fonctionnalités

### Gestion du Dex
- Affichage des monstres depuis une API REST.
- Présentation du nom, numéro, type, niveau, ATK et DEF.
- Recherche de monstres par nom.
- Filtrage des monstres par type.
- Combinaison de la recherche et des filtres.
- Sauvegarde du dernier filtre sélectionné avec LocalStorage.
- Gestion des états de chargement et des erreurs.

### Fonctionnalités complémentaires
- Consultation des détails d'un monstre.
- Création de monstres.
- Constitution d'une équipe de monstres.

*Les fonctionnalités complémentaires sont développées progressivement selon les exigences du brief.*

## 🛠️ Technologies utilisées

| Technologie | Utilisation |
|---|---|
| HTML5 | Structure de l'application |
| Tailwind CSS | Mise en forme et responsive design |
| JavaScript ES6+ | Logique et interactions |
| JSON Server | API REST locale |
| Fetch API | Communication HTTP |
| LocalStorage | Sauvegarde des préférences |
| Git & GitHub | Versionnement et collaboration |

## 📂 Structure du projet

```text
mon-dex/
│
├── src/
│   ├── services/
│   │   └── api.js
│   │
│   ├── main.js
│   ├── ui.js
│   ├── storage.js
│   └── input.css
│
├── images/
├── dist/
│   └── output.css
│
├── db.json
├── index.html
├── package.json
└── README.md
```

## ⚙️ Installation et lancement

### 1. Cloner le repository

```bash
git clone https://github.com/VOTRE-USERNAME/VOTRE-REPOSITORY.git
```

### 2. Accéder au dossier

```bash
cd VOTRE-REPOSITORY
```

### 3. Installer les dépendances

```bash
npm install
```

### 4. Lancer le serveur API

Dans un premier terminal :

```bash
npm run api
```

L'API sera disponible à l'adresse :

```text
http://localhost:3000
```

### 5. Lancer Tailwind CSS

Dans un deuxième terminal :

```bash
npm run dev
```

### 6. Ouvrir l'application

Ouvrir `index.html` avec l'extension **Live Server** de VS Code.

## 🔌 API REST

Le projet utilise JSON Server pour simuler une API REST locale à partir du fichier `db.json`.

**Endpoint principal :**

```text
GET http://localhost:3000/creatures
```

**Exemples de requêtes :**

```text
/creatures?type=DARK
/creatures?q=Magician
/creatures?type=DARK&q=Magician
```

## 🌿 Git Workflow

Le projet utilise une organisation en branches pour structurer le développement.

| Branche | Rôle |
|---|---|
| `main` | Version finale et stable |
| `develop` | Intégration des fonctionnalités |
| `feature/dex` | Développement du Dex |

Les fonctionnalités sont développées sur des branches dédiées, puis intégrées dans `develop` via des Pull Requests. La branche `main` reçoit la version finale après validation.

## 📱 Responsive Design

L'interface est conçue pour s'adapter à différentes tailles d'écran :

- Mobile
- Tablette
- Desktop

## 🎯 Objectifs pédagogiques

- Comprendre le fonctionnement d'une API REST.
- Maîtriser `fetch`, `async/await` et les Promises.
- Manipuler les données JSON.
- Organiser le code avec des modules JavaScript.
- Manipuler le DOM de manière sécurisée avec `createElement` et `textContent`.
- Gérer les erreurs et les données persistantes.
- Utiliser Git et GitHub dans un workflow collaboratif.

## 👨‍💻 Auteur

**Abdelilah Sadik**

Projet réalisé dans le cadre de la formation **YouCode**.

---

*Yu-Gi-Oh! est une propriété de ses ayants droit respectifs. Ce projet est un projet pédagogique non commercial.*
