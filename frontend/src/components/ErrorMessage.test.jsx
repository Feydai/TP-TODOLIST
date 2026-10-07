import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ErrorMessage from './ErrorMessage.jsx';

describe('ErrorMessage', () => {
  it("n'affiche rien sans message", () => {
    const { container } = render(<ErrorMessage message="" />);

    expect(container).toBeEmptyDOMElement();
  });

  it("affiche le message d'erreur", () => {
    render(<ErrorMessage message="Une erreur est survenue" />);

    expect(screen.getByText('Une erreur est survenue')).toBeInTheDocument();
  });
});
