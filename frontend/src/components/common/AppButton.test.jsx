import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import AppButton from './AppButton.jsx';

describe('AppButton', () => {
  it('affiche le texte du bouton', () => {
    render(<AppButton text="CRÉER" />);

    expect(screen.getByRole('button', { name: 'CRÉER' })).toBeInTheDocument();
  });

  it('appelle onClick lorsque le bouton est cliqué', () => {
    const onClick = vi.fn();

    render(<AppButton text="CLIQUER" onClick={onClick} />);

    fireEvent.click(screen.getByRole('button', { name: 'CLIQUER' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('peut être désactivé', () => {
    render(<AppButton text="ENREGISTRER" disabled />);

    expect(screen.getByRole('button', { name: 'ENREGISTRER' })).toBeDisabled();
  });

  it('utilise button comme type par défaut', () => {
    render(<AppButton text="ANNULER" />);

    expect(screen.getByRole('button', { name: 'ANNULER' })).toHaveAttribute(
      'type',
      'button'
    );
  });

  it('accepte le type submit', () => {
    render(<AppButton text="VALIDER" type="submit" />);

    expect(screen.getByRole('button', { name: 'VALIDER' })).toHaveAttribute(
      'type',
      'submit'
    );
  });
});
