import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import AppSnackbar from './AppSnackBar.jsx';

describe('AppSnackbar', () => {
  it('affiche le message', () => {
    render(<AppSnackbar open message="Tâche supprimée" onClose={vi.fn()} />);

    expect(screen.getByText('Tâche supprimée')).toBeInTheDocument();
  });

  it('appelle onClose', () => {
    const onClose = vi.fn();

    render(<AppSnackbar open message="Opération réussie" onClose={onClose} />);

    const closeButton = screen.getByRole('button');

    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });
});
