import { beforeEach, describe, expect, it, vi } from 'vitest';
import { taskService } from './taskService.js';

describe('taskService', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('token', 'token-test');

    global.fetch = vi.fn();
  });

  it('getTasks récupère les tâches', async () => {
    const data = {
      items: [{ id: '1', title: 'Tâche 1' }],
    };

    fetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue(data),
    });

    const result = await taskService.getTasks();

    expect(fetch).toHaveBeenCalledWith('/api/tasks', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer token-test',
      },
    });

    expect(result).toEqual(data);
  });

  it('getTask récupère une tâche', async () => {
    const task = {
      id: '1',
      title: 'Ma tâche',
    };

    fetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue(task),
    });

    const result = await taskService.getTask('1');

    expect(fetch).toHaveBeenCalledWith('/api/tasks/1', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer token-test',
      },
    });

    expect(result).toEqual(task);
  });

  it('getTaskById récupère une tâche', async () => {
    const task = {
      id: '10',
      title: 'Test',
    };

    fetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue(task),
    });

    const result = await taskService.getTaskById('10');

    expect(fetch).toHaveBeenCalledWith('/api/tasks/10', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer token-test',
      },
    });

    expect(result).toEqual(task);
  });

  it('createTask crée une tâche', async () => {
    const taskData = {
      title: 'Nouvelle tâche',
      status: 'todo',
    };

    const createdTask = {
      id: '1',
      ...taskData,
    };

    fetch.mockResolvedValue({
      ok: true,
      status: 201,
      json: vi.fn().mockResolvedValue(createdTask),
    });

    const result = await taskService.createTask(taskData);

    expect(fetch).toHaveBeenCalledWith('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer token-test',
      },
      body: JSON.stringify(taskData),
    });

    expect(result).toEqual(createdTask);
  });

  it('updateTask modifie une tâche', async () => {
    const taskData = {
      title: 'Tâche modifiée',
      status: 'doing',
    };

    fetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue({
        id: '1',
        ...taskData,
      }),
    });

    const result = await taskService.updateTask('1', taskData);

    expect(fetch).toHaveBeenCalledWith('/api/tasks/1', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer token-test',
      },
      body: JSON.stringify(taskData),
    });

    expect(result.title).toBe('Tâche modifiée');
  });

  it('deleteTask supprime une tâche et gère le statut 204', async () => {
    const json = vi.fn();

    fetch.mockResolvedValue({
      ok: true,
      status: 204,
      json,
    });

    const result = await taskService.deleteTask('1');

    expect(fetch).toHaveBeenCalledWith('/api/tasks/1', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer token-test',
      },
    });

    expect(result).toBeNull();
    expect(json).not.toHaveBeenCalled();
  });

  it("utilise error.message en cas d'erreur", async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 400,
      json: vi.fn().mockResolvedValue({
        error: {
          message: 'Titre obligatoire',
        },
      }),
    });

    await expect(taskService.getTasks()).rejects.toThrow('Titre obligatoire');
  });

  it("utilise message si error.message n'existe pas", async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 500,
      json: vi.fn().mockResolvedValue({
        message: 'Erreur serveur',
      }),
    });

    await expect(taskService.getTasks()).rejects.toThrow('Erreur serveur');
  });

  it("utilise le message par défaut si aucun message n'existe", async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 500,
      json: vi.fn().mockResolvedValue({}),
    });

    await expect(taskService.getTasks()).rejects.toThrow(
      'Une erreur est survenue'
    );
  });
});
