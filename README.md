# TodoList Fullstack

Application de gestion de tâches (todo list) avec authentification, réalisée dans le cadre du cours Fullstack à l'EFREI.

- **Backend** : Node.js, Express 5, MongoDB (Mongoose), authentification JWT, documentation Swagger
- **Frontend** : React 19, Vite, Material UI, React Router
- **Infra** : Docker Compose (MongoDB + backend + frontend)

## Fonctionnalités

- Inscription, connexion et déconnexion (JWT, session conservée après rechargement de la page)
- Liste des tâches de l'utilisateur connecté
- Création, consultation, modification et suppression d'une tâche
- Statut de tâche : `todo`, `doing`, `done`, avec date d'échéance optionnelle

## Structure du projet

```
.
├── backend/
│   ├── src/
│   │   ├── config/        # Connexion MongoDB
│   │   ├── controllers/   # Gestion des requêtes HTTP
│   │   ├── docs/          # Spécification OpenAPI (Swagger)
│   │   ├── middlewares/   # requireAuth (vérification du JWT)
│   │   ├── models/        # Modèles Mongoose (User, Task)
│   │   ├── routes/        # Routes /api/auth, /api/tasks, /api/health
│   │   ├── services/      # Logique métier
│   │   ├── validators/    # Validation des entrées
│   │   ├── app.js         # Application Express
│   │   └── server.js      # Point d'entrée
│   └── tests/             # Tests Jest + Supertest
├── frontend/
│   └── src/
│       ├── components/    # Composants UI (tâches, auth, communs)
│       ├── context/       # Contexte d'authentification
│       ├── hooks/         # useAuth, useTasks
│       ├── pages/         # Pages (login, register, tâches)
│       ├── routes/        # Router et routes protégées
│       └── services/      # Appels à l'API
├── docker-compose.yml
└── Makefile
```

## Prérequis

- [Docker](https://docs.docker.com/get-docker/) et Docker Compose
- Node.js 24+ (uniquement pour lancer le projet ou les tests sans Docker)

## Configuration

Créer le fichier `backend/.env` :

```env
PORT=3000
MONGODB_URI=mongodb://root:password1234@localhost:27017/tp-todolist?authSource=admin
JWT_SECRET=une_chaine_secrete_longue_et_aleatoire
JWT_EXPIRES_IN=1h
```

| Variable         | Description                                    | Défaut |
| ---------------- | ---------------------------------------------- | ------ |
| `PORT`           | Port de l'API                                  | `3000` |
| `MONGODB_URI`    | URI de connexion MongoDB                       | —      |
| `JWT_SECRET`     | Secret utilisé pour signer les tokens JWT      | —      |
| `JWT_EXPIRES_IN` | Durée de validité d'un token                   | `1h`   |

Avec Docker Compose, `MONGODB_URI` est surchargée automatiquement pour pointer vers le conteneur `mongodb`.

## Lancement avec Docker

Pour lancer le projet, il faut avoir **Docker installé et lancé** (Docker Desktop ouvert, ou le service Docker démarré sous Linux avec `sudo systemctl start docker`).

Une fois Docker lancé, à la racine du projet :

```bash
make build 
```

| Service            | URL                              |
| ------------------ | -------------------------------- |
| Frontend           | http://localhost:5173            |
| API                | http://localhost:3000/api        |
| Documentation API  | http://localhost:3000/api-docs   |
| MongoDB            | `localhost:27017`                |

Autres commandes du Makefile :

| Commande     | Action                                          |
| ------------ | ----------------------------------------------- |
| `make up`    | Démarre les conteneurs en arrière-plan          |
| `make down`  | Arrête et supprime les conteneurs               |
| `make logs`  | Affiche les logs en continu                     |

## Lancement sans Docker

Une instance MongoDB doit être accessible via `MONGODB_URI`.

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (dans un autre terminal)
cd frontend
npm install
npm run dev        # http://localhost:5173
```

> Le proxy Vite redirige `/api` vers `http://backend:3000` (nom du service Docker). Hors Docker, remplacer la cible par `http://localhost:3000` dans [frontend/vite.config.js](frontend/vite.config.js).

## API

Toutes les routes sont préfixées par `/api`. Les routes protégées attendent un header `Authorization: Bearer <token>`.

| Méthode  | Route                 | Auth aqd| Description                     |
| -------- | --------------------- | ---- | ------------------------------- |
| `GET`    | `/api/health`         |      | État de l'API                   |
| `POST`   | `/api/auth/register`  |      | Créer un compte                 |
| `POST`   | `/api/auth/login`     |      | Se connecter                    |
| `GET`    | `/api/auth`           | ✅   | Récupérer le compte connecté    |
| `POST`   | `/api/auth/logout`    | ✅   | Se déconnecter                  |
| `GET`    | `/api/tasks`          | ✅   | Lister les tâches               |
| `POST`   | `/api/tasks`          | ✅   | Créer une tâche                 |
| `GET`    | `/api/tasks/:id`      | ✅   | Récupérer une tâche             |
| `PATCH`  | `/api/tasks/:id`      | ✅   | Modifier une tâche              |
| `DELETE` | `/api/tasks/:id`      | ✅   | Supprimer une tâche             |

Le détail des requêtes et réponses est disponible sur Swagger : http://localhost:3000/api-docs

### Modèle `Task`

| Champ         | Type     | Contraintes                                   |
| ------------- | -------- | --------------------------------------------- |
| `title`       | string   | obligatoire, 120 caractères max               |
| `description` | string   | optionnel, 1000 caractères max                |
| `status`      | string   | `todo` (défaut), `doing` ou `done`            |
| `dueDate`     | date     | optionnel, format `YYYY-MM-DD`                |

## Tests

Les tests backend utilisent Jest et Supertest, avec les services mockés (aucune base de données nécessaire) :

```bash
cd backend
npm test
```

## Qualité du code (frontend)

```bash
cd frontend
npm run lint       # ESLint
npm run format     # Prettier
```
