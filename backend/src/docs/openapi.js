module.exports = {
  openapi: '3.0.3',
  info: {
    title: 'Todo List API',
    version: '1.0.0',
    description: 'API d’authentification et de gestion des tâches.',
  },
  servers: [{ url: '/api' }],
  tags: [
    { name: 'Auth', description: 'Inscription, connexion et compte courant' },
    { name: 'Tasks', description: 'Gestion des tâches' },
  ],
  paths: {
    '/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Créer un compte',
        requestBody: { $ref: '#/components/requestBodies/Credentials' },
        responses: {
          201: { description: 'Compte créé', content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } } },
          400: { description: 'Identifiants invalides' },
          409: { description: 'Adresse email déjà utilisée' },
        },
      },
    },
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Se connecter',
        requestBody: { $ref: '#/components/requestBodies/Credentials' },
        responses: {
          200: { description: 'Connexion réussie', content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } } },
          400: { description: 'Identifiants invalides' },
          401: { description: 'Email ou mot de passe incorrect' },
        },
      },
    },
    '/auth': {
      get: {
        tags: ['Auth'],
        summary: 'Récupérer le compte connecté',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Compte courant', content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } } },
          401: { description: 'Authentification requise ou token invalide' },
          404: { description: 'Utilisateur introuvable' },
        },
      },
    },
    '/auth/logout': {
      post: {
        tags: ['Auth'],
        summary: 'Se déconnecter',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Déconnexion réussie' },
          401: { description: 'Authentification requise ou token invalide' },
        },
      },
    },
    '/tasks': {
      get: {
        tags: ['Tasks'],
        summary: 'Lister les tâches',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Liste des tâches', content: { 'application/json': { schema: { $ref: '#/components/schemas/TaskList' } } } },
          401: { description: 'Authentification requise ou token invalide' },
        },
      },
      post: {
        tags: ['Tasks'],
        summary: 'Créer une tâche',
        security: [{ bearerAuth: [] }],
        requestBody: { $ref: '#/components/requestBodies/NewTask' },
        responses: {
          201: { description: 'Tâche créée', content: { 'application/json': { schema: { $ref: '#/components/schemas/Task' } } } },
          400: { description: 'Données invalides' },
          401: { description: 'Authentification requise ou token invalide' },
        },
      },
    },
    '/tasks/{id}': {
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Identifiant de la tâche renvoyé à la création',
          schema: { type: 'string' },
        },
      ],
      get: {
        tags: ['Tasks'],
        summary: 'Récupérer une tâche par son ID',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Tâche trouvée', content: { 'application/json': { schema: { $ref: '#/components/schemas/Task' } } } },
          400: { description: 'ID invalide' },
          401: { description: 'Authentification requise ou token invalide' },
          404: { description: 'Tâche introuvable' },
        },
      },
      patch: {
        tags: ['Tasks'],
        summary: 'Modifier une tâche',
        security: [{ bearerAuth: [] }],
        requestBody: { $ref: '#/components/requestBodies/TaskUpdate' },
        responses: {
          200: { description: 'Tâche modifiée', content: { 'application/json': { schema: { $ref: '#/components/schemas/Task' } } } },
          400: { description: 'ID ou données invalides' },
          401: { description: 'Authentification requise ou token invalide' },
          404: { description: 'Tâche introuvable' },
        },
      },
      delete: {
        tags: ['Tasks'],
        summary: 'Supprimer une tâche',
        security: [{ bearerAuth: [] }],
        responses: {
          204: { description: 'Tâche supprimée' },
          400: { description: 'ID invalide' },
          401: { description: 'Authentification requise ou token invalide' },
          404: { description: 'Tâche introuvable' },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    },
    requestBodies: {
      Credentials: {
        required: true,
        content: { 'application/json': { schema: { $ref: '#/components/schemas/Credentials' } } },
      },
      NewTask: {
        required: true,
        content: { 'application/json': { schema: { $ref: '#/components/schemas/NewTask' } } },
      },
      TaskUpdate: {
        required: true,
        content: { 'application/json': { schema: { $ref: '#/components/schemas/TaskUpdate' } } },
      },
    },
    schemas: {
      Credentials: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email', example: 'user@example.com' },
          password: { type: 'string', minLength: 8, example: 'motdepasse123' },
        },
      },
      User: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '507f1f77bcf86cd799439011' },
          email: { type: 'string', format: 'email', example: 'user@example.com' },
        },
      },
      AuthResponse: {
        type: 'object',
        properties: {
          user: { $ref: '#/components/schemas/User' },
          token: { type: 'string', description: 'JWT à utiliser comme Bearer token' },
        },
      },
      NewTask: {
        type: 'object',
        required: ['title'],
        properties: {
          title: { type: 'string', minLength: 1, maxLength: 120, example: 'Réviser le projet' },
          description: { type: 'string', maxLength: 1000, example: 'Préparer la démonstration' },
          status: { type: 'string', enum: ['todo', 'doing', 'done'], default: 'todo' },
          dueDate: { type: 'string', format: 'date', nullable: true, example: '2026-10-15' },
        },
      },
      TaskUpdate: {
        type: 'object',
        minProperties: 1,
        properties: {
          title: { type: 'string', minLength: 1, maxLength: 120 },
          description: { type: 'string', maxLength: 1000 },
          status: { type: 'string', enum: ['todo', 'doing', 'done'] },
          dueDate: { type: 'string', format: 'date', nullable: true },
        },
      },
      Task: {
        allOf: [
          { $ref: '#/components/schemas/NewTask' },
          {
            type: 'object',
            properties: {
              id: { type: 'string', example: '507f1f77bcf86cd799439011' },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
          },
        ],
      },
      TaskList: {
        type: 'object',
        properties: {
          items: { type: 'array', items: { $ref: '#/components/schemas/Task' } },
        },
      },
    },
  },
};