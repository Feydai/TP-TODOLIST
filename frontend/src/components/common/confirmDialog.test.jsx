import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import ConfirmDialog from './ConfirmDialogue.jsx';

describe('ConfirmDialog', () => {
  it('affiche le titre et le message', () => {
    render(
      <ConfirmDialog
        open
        title="Supprimer la tâche"
        message="Voulez-vous vraiment supprimer cette tâche ?"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />
    );

    expect(screen.getByText('Supprimer la tâche')).toBeInTheDocument();

    expect(
      screen.getByText('Voulez-vous vraiment supprimer cette tâche ?')
    ).toBeInTheDocument();
  });

  it('appelle onCancel', () => {
    const onCancel = vi.fn();

    render(
      <ConfirmDialog
        open
        title="Confirmation"
        message="Confirmer ?"
        onConfirm={vi.fn()}
        onCancel={onCancel}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'ANNULER' }));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('appelle onConfirm', () => {
    const onConfirm = vi.fn();

    render(
      <ConfirmDialog
        open
        title="Confirmation"
        message="Confirmer ?"
        onConfirm={onConfirm}
        onCancel={vi.fn()}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'CONFIRMER' }));

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('utilise un texte de confirmation personnalisé', () => {
    render(
      <ConfirmDialog
        open
        title="Suppression"
        message="Confirmer ?"
        confirmText="SUPPRIMER"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />
    );

    expect(
      screen.getByRole('button', { name: 'SUPPRIMER' })
    ).toBeInTheDocument();
  });
});
