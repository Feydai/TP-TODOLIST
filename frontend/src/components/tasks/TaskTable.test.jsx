import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import TaskTable from './TaskTable.jsx';

const tasks = [
  {
    id: '1',
    title: 'Préparer la présentation',
    description: 'Préparer les slides',
    status: 'todo',
    dueDate: '2000-01-01',
  },
  {
    id: '2',
    title: 'Développer API',
    description: '',
    status: 'doing',
    dueDate: '2999-12-31',
  },
  {
    id: '3',
    title: 'Tests terminés',
    description: 'Tests unitaires',
    status: 'done',
    dueDate: '2000-01-01',
  },
];

describe('TaskTable', () => {
  it('affiche les tâches', () => {
    render(
      <TaskTable
        tasks={tasks}
        onView={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByText('Préparer la présentation')).toBeInTheDocument();

    expect(screen.getByText('Développer API')).toBeInTheDocument();

    expect(screen.getByText('Tests terminés')).toBeInTheDocument();
  });

  it("affiche un message lorsqu'il n'y a aucune tâche", () => {
    render(
      <TaskTable
        tasks={[]}
        onView={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(
      screen.getByText('Aucune tâche ne correspond à votre recherche.')
    ).toBeInTheDocument();
  });

  it('affiche Aucune description lorsque la description est vide', () => {
    render(
      <TaskTable
        tasks={[tasks[1]]}
        onView={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByText('Aucune description')).toBeInTheDocument();
  });

  it("affiche Aucune échéance lorsqu'il n'y a pas de date", () => {
    const task = {
      ...tasks[0],
      dueDate: null,
    };

    render(
      <TaskTable
        tasks={[task]}
        onView={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByText('Aucune échéance')).toBeInTheDocument();
  });

  it('affiche En retard pour une tâche dépassée', () => {
    render(
      <TaskTable
        tasks={[tasks[0]]}
        onView={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByText('En retard')).toBeInTheDocument();
  });

  it("n'affiche pas En retard pour une tâche terminée", () => {
    render(
      <TaskTable
        tasks={[tasks[2]]}
        onView={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.queryByText('En retard')).not.toBeInTheDocument();
  });

  it('appelle onView avec id de la tâche', () => {
    const onView = vi.fn();

    render(
      <TaskTable
        tasks={[tasks[0]]}
        onView={onView}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    fireEvent.click(screen.getByText('Préparer la présentation'));

    expect(onView).toHaveBeenCalledWith('1');
  });
});
