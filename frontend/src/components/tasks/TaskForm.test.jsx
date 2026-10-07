import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import TaskForm from './TaskForm.jsx';

describe('TaskForm', () => {
  it('affiche le formulaire de création avec les valeurs par défaut', () => {
    render(<TaskForm onSubmit={vi.fn()} onCancel={vi.fn()} />);

    expect(screen.getByLabelText(/Titre/i)).toHaveValue('');

    expect(screen.getByRole('combobox')).toHaveTextContent('À faire');

    expect(screen.getByLabelText(/Date d'échéance/i)).toHaveValue('');

    expect(screen.getByLabelText(/Description/i)).toHaveValue('');

    expect(
      screen.getByRole('button', {
        name: /CRÉER LA TÂCHE/i,
      })
    ).toBeInTheDocument();
  });

  it('affiche les valeurs initiales en mode modification', () => {
    render(
      <TaskForm
        mode="edit"
        initialValues={{
          title: 'Préparer la démo',
          status: 'doing',
          dueDate: '2026-10-09',
          description: 'Préparer les slides',
        }}
        onSubmit={vi.fn()}
        onCancel={vi.fn()}
      />
    );

    expect(screen.getByLabelText(/Titre/i)).toHaveValue('Préparer la démo');

    expect(screen.getByRole('combobox')).toHaveTextContent('En cours');

    expect(screen.getByLabelText(/Date d'échéance/i)).toHaveValue('2026-10-09');

    expect(screen.getByLabelText(/Description/i)).toHaveValue(
      'Préparer les slides'
    );

    expect(
      screen.getByRole('button', {
        name: /ENREGISTRER/i,
      })
    ).toBeInTheDocument();
  });

  it('ne soumet pas le formulaire lorsque le titre est vide', () => {
    const onSubmit = vi.fn();

    render(<TaskForm onSubmit={onSubmit} onCancel={vi.fn()} />);

    const form = screen
      .getByRole('button', {
        name: /CRÉER LA TÂCHE/i,
      })
      .closest('form');

    fireEvent.submit(form);

    expect(screen.getByText('Le titre est obligatoire')).toBeInTheDocument();

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('soumet correctement une nouvelle tâche', () => {
    const onSubmit = vi.fn();

    render(<TaskForm onSubmit={onSubmit} onCancel={vi.fn()} />);

    fireEvent.change(screen.getByLabelText(/Titre/i), {
      target: {
        value: '  Faire les tests  ',
      },
    });

    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: {
        value: 'Tester le formulaire',
      },
    });

    fireEvent.change(screen.getByLabelText(/Date d'échéance/i), {
      target: {
        value: '2026-10-20',
      },
    });

    fireEvent.click(
      screen.getByRole('button', {
        name: /CRÉER LA TÂCHE/i,
      })
    );

    expect(onSubmit).toHaveBeenCalledTimes(1);

    expect(onSubmit).toHaveBeenCalledWith({
      title: 'Faire les tests',
      status: 'todo',
      dueDate: '2026-10-20',
      description: 'Tester le formulaire',
    });
  });

  it('transforme une date vide en null lors de la soumission', () => {
    const onSubmit = vi.fn();

    render(<TaskForm onSubmit={onSubmit} onCancel={vi.fn()} />);

    fireEvent.change(screen.getByLabelText(/Titre/i), {
      target: {
        value: 'Ma tâche',
      },
    });

    fireEvent.click(
      screen.getByRole('button', {
        name: /CRÉER LA TÂCHE/i,
      })
    );

    expect(onSubmit).toHaveBeenCalledWith({
      title: 'Ma tâche',
      status: 'todo',
      dueDate: null,
      description: '',
    });
  });

  it('appelle onCancel lorsque ANNULER est cliqué', () => {
    const onCancel = vi.fn();

    render(<TaskForm onSubmit={vi.fn()} onCancel={onCancel} />);

    fireEvent.click(
      screen.getByRole('button', {
        name: /ANNULER/i,
      })
    );

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('désactive les boutons pendant le chargement', () => {
    render(<TaskForm onSubmit={vi.fn()} onCancel={vi.fn()} loading />);

    expect(
      screen.getByRole('button', {
        name: /ANNULER/i,
      })
    ).toBeDisabled();

    expect(
      screen.getByRole('button', {
        name: /CRÉER LA TÂCHE/i,
      })
    ).toBeDisabled();
  });
});
