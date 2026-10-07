import { beforeEach, describe, expect, it, vi } from 'vitest';
import { authService } from './authService.js';

describe('authService', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    global.fetch = vi.fn();
  });

  it('register envoie les bonnes données', async () => {
    const responseData = {
      token: 'token-test',
      user: { email: 'test@test.com' },
    };

    fetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(responseData),
    });

    const result = await authService.register('test@test.com', 'password123');

    expect(fetch).toHaveBeenCalledWith('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@test.com',
        password: 'password123',
      }),
    });

    expect(result).toEqual(responseData);
  });

  it('register retourne le message erreur du backend', async () => {
    fetch.mockResolvedValue({
      ok: false,
      json: vi.fn().mockResolvedValue({
        error: { message: 'Email déjà utilisé' },
      }),
    });

    await expect(
      authService.register('test@test.com', 'password123')
    ).rejects.toThrow('Email déjà utilisé');
  });

  it("register utilise le message d'erreur par défaut", async () => {
    fetch.mockResolvedValue({
      ok: false,
      json: vi.fn().mockResolvedValue({}),
    });

    await expect(
      authService.register('test@test.com', 'password123')
    ).rejects.toThrow("Erreur lors de l'inscription");
  });

  it('login envoie les bonnes données', async () => {
    const responseData = {
      token: 'token-test',
      user: { email: 'test@test.com' },
    };

    fetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(responseData),
    });

    const result = await authService.login('test@test.com', 'password123');

    expect(fetch).toHaveBeenCalledWith('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@test.com',
        password: 'password123',
      }),
    });

    expect(result).toEqual(responseData);
  });

  it('login retourne le message erreur du backend', async () => {
    fetch.mockResolvedValue({
      ok: false,
      json: vi.fn().mockResolvedValue({
        error: { message: 'Identifiants incorrects' },
      }),
    });

    await expect(
      authService.login('test@test.com', 'bad-password')
    ).rejects.toThrow('Identifiants incorrects');
  });

  it("login utilise le message d'erreur par défaut", async () => {
    fetch.mockResolvedValue({
      ok: false,
      json: vi.fn().mockResolvedValue({}),
    });

    await expect(
      authService.login('test@test.com', 'bad-password')
    ).rejects.toThrow('Erreur de connexion');
  });
});
