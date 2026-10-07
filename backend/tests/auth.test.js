jest.mock('../src/services/authService', () => ({
  register: jest.fn(),
  login: jest.fn(),
  logout: jest.fn(),
  getUserById: jest.fn(),
}));

const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const authService = require('../src/services/authService');

const jwtSecret = 'auth-test-secret';

function createToken(userId) {
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

describe('POST /api/auth/register', () => {
  test('creates an account and returns a token', async () => {
    const account = {
      user: { id: 'user-1', email: 'test@example.com' },
      token: 'signed-token',
    };
    authService.register.mockResolvedValue(account);

    const response = await request(app)
      .post('/api/auth/register')
      .send({ email: ' Test@Example.com ', password: '12345678' });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(account);
    expect(authService.register).toHaveBeenCalledWith('test@example.com', '12345678');
  });

  test('rejects invalid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({ email: 'invalid-email', password: '123' });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('INVALID_INPUT');
    expect(authService.register).not.toHaveBeenCalled();
  });

  test('returns conflict when the email is already used', async () => {
    authService.register.mockResolvedValue({ conflict: true });

    const response = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: '12345678' });

    expect(response.status).toBe(409);
    expect(response.body.error.code).toBe('EMAIL_ALREADY_USED');
  });
});

describe('POST /api/auth/login', () => {
  test('returns the user and token for valid credentials', async () => {
    const account = {
      user: { id: 'user-1', email: 'test@example.com' },
      token: 'signed-token',
    };
    authService.login.mockResolvedValue(account);

    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: '12345678' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(account);
    expect(authService.login).toHaveBeenCalledWith('test@example.com', '12345678');
  });

  test('rejects incorrect credentials', async () => {
    authService.login.mockResolvedValue(null);

    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: '12345678' });

    expect(response.status).toBe(401);
    expect(response.body.error.code).toBe('UNAUTHORIZED');
  });
});

describe('authenticated account routes', () => {
  test('rejects GET /api/auth without a token', async () => {
    const response = await request(app).get('/api/auth');

    expect(response.status).toBe(401);
    expect(response.body.error.code).toBe('UNAUTHORIZED');
    expect(authService.getUserById).not.toHaveBeenCalled();
  });

  test('returns the account identified by the token', async () => {
    const user = { id: 'user-1', email: 'test@example.com' };
    authService.getUserById.mockResolvedValue(user);

    const response = await request(app)
      .get('/api/auth')
      .set('Authorization', `Bearer ${createToken(user.id)}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(user);
    expect(authService.getUserById).toHaveBeenCalledWith(user.id);
  });

  test('returns not found when the token account does not exist', async () => {
    authService.getUserById.mockResolvedValue(null);

    const response = await request(app)
      .get('/api/auth')
      .set('Authorization', `Bearer ${createToken('missing-user')}`);

    expect(response.status).toBe(404);
    expect(response.body.error.code).toBe('USER_NOT_FOUND');
  });

  test('requires a token to log out', async () => {
    const response = await request(app).post('/api/auth/logout');

    expect(response.status).toBe(401);
    expect(response.body.error.code).toBe('UNAUTHORIZED');
  });
});