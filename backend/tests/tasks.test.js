jest.mock('../src/services/taskService', () => ({
  createTask: jest.fn(),
  getTasks: jest.fn(),
  getTask: jest.fn(),
  updateTask: jest.fn(),
  deleteTask: jest.fn(),
}));

const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const taskService = require('../src/services/taskService');

const jwtSecret = 'task-test-secret';
const taskId = '507f1f77bcf86cd799439011';
const userId = 'user-1';

function createToken() {
  return jwt.sign({}, jwtSecret, {
    subject: userId,
    algorithm: 'HS256',
    expiresIn: '1h',
  });
}

beforeEach(() => {
  process.env.JWT_SECRET = jwtSecret;
  jest.clearAllMocks();
});

describe('GET /api/tasks/:id', () => {
  test('returns the task belonging to the authenticated user', async () => {
    const task = { id: taskId, title: 'Réviser', status: 'todo' };
    taskService.getTask.mockResolvedValue({ task });

    const response = await request(app)
      .get(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${createToken()}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(task);
    expect(taskService.getTask).toHaveBeenCalledWith(taskId, userId);
  });

  test('rejects an invalid task ID', async () => {
    taskService.getTask.mockResolvedValue({ error: 'INVALID_ID' });

    const response = await request(app)
      .get('/api/tasks/not-an-id')
      .set('Authorization', `Bearer ${createToken()}`);

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('INVALID_INPUT');
  });

  test('returns not found for a missing or other user task', async () => {
    taskService.getTask.mockResolvedValue({ error: 'NOT_FOUND' });

    const response = await request(app)
      .get(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${createToken()}`);

    expect(response.status).toBe(404);
    expect(response.body.error.code).toBe('NOT_FOUND');
  });

  test('requires an authentication token', async () => {
    const response = await request(app).get(`/api/tasks/${taskId}`);

    expect(response.status).toBe(401);
    expect(response.body.error.code).toBe('UNAUTHORIZED');
    expect(taskService.getTask).not.toHaveBeenCalled();
  });
});