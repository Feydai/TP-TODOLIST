import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import useTasks from './useTasks.js';
import { taskService } from '../services/taskService.js';

vi.mock('../services/taskService.js', () => ({
  taskService: {
    getTasks: vi.fn(),
    createTask: vi.fn(),
    deleteTask: vi.fn(),
  },
}));

describe('useTasks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('charge les tâches au démarrage', async () => {
    const tasks = [
      {
        id: '1',
        title: 'Tâche 1',
      },
    ];

    taskService.getTasks.mockResolvedValue({
      items: tasks,
    });

    const { result } = renderHook(() => useTasks());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.tasks).toEqual(tasks);
    expect(result.current.error).toBe('');
    expect(taskService.getTasks).toHaveBeenCalledTimes(1);
  });

  it('gère une erreur pendant le chargement', async () => {
    taskService.getTasks.mockRejectedValue(
      new Error('Impossible de charger les tâches')
    );

    const { result } = renderHook(() => useTasks());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Impossible de charger les tâches');

    expect(result.current.tasks).toEqual([]);
  });

  it('crée une tâche et ajoute la tâche à la liste', async () => {
    taskService.getTasks.mockResolvedValue({
      items: [],
    });

    const newTask = {
      id: '1',
      title: 'Nouvelle tâche',
      status: 'todo',
    };

    taskService.createTask.mockResolvedValue(newTask);

    const { result } = renderHook(() => useTasks());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    let returnedTask;

    await act(async () => {
      returnedTask = await result.current.createTask({
        title: 'Nouvelle tâche',
        status: 'todo',
      });
    });

    expect(taskService.createTask).toHaveBeenCalledWith({
      title: 'Nouvelle tâche',
      status: 'todo',
    });

    expect(returnedTask).toEqual(newTask);

    expect(result.current.tasks).toEqual([newTask]);
  });

  it('gère une erreur pendant la création', async () => {
    taskService.getTasks.mockResolvedValue({
      items: [],
    });

    taskService.createTask.mockRejectedValue(new Error('Création impossible'));

    const { result } = renderHook(() => useTasks());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      try {
        await result.current.createTask({
          title: 'Test',
        });
      } catch {
        // L'erreur est volontairement générée pour tester le hook
      }
    });

    await waitFor(() => {
      expect(result.current.error).toBe('Création impossible');
    });
  });

  it('supprime une tâche puis recharge les tâches', async () => {
    taskService.getTasks
      .mockResolvedValueOnce({
        items: [
          {
            id: '1',
            title: 'Tâche',
          },
        ],
      })
      .mockResolvedValueOnce({
        items: [],
      });

    taskService.deleteTask.mockResolvedValue(null);

    const { result } = renderHook(() => useTasks());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.deleteTask('1');
    });

    expect(taskService.deleteTask).toHaveBeenCalledWith('1');

    expect(taskService.getTasks).toHaveBeenCalledTimes(2);

    expect(result.current.tasks).toEqual([]);
  });

  it('gère une erreur pendant la suppression', async () => {
    taskService.getTasks.mockResolvedValue({
      items: [],
    });

    taskService.deleteTask.mockRejectedValue(
      new Error('Suppression impossible')
    );

    const { result } = renderHook(() => useTasks());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      try {
        await result.current.deleteTask('1');
      } catch {
        // L'erreur est volontairement générée pour tester le hook
      }
    });

    await waitFor(() => {
      expect(result.current.error).toBe('Suppression impossible');
    });
  });
  it('permet de recharger manuellement les tâches', async () => {
    taskService.getTasks.mockResolvedValue({
      items: [],
    });

    const { result } = renderHook(() => useTasks());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.fetchTasks();
    });

    expect(taskService.getTasks).toHaveBeenCalledTimes(2);
  });
});
