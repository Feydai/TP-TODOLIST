import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import TaskStatusChip from './TaskStatusChip.jsx';

describe('TaskStatusChip', () => {
  it('affiche À faire pour todo', () => {
    render(<TaskStatusChip status="todo" />);

    expect(screen.getByText('À faire')).toBeInTheDocument();
  });

  it('affiche En cours pour doing', () => {
    render(<TaskStatusChip status="doing" />);

    expect(screen.getByText('En cours')).toBeInTheDocument();
  });

  it('affiche Terminée pour done', () => {
    render(<TaskStatusChip status="done" />);

    expect(screen.getByText('Terminée')).toBeInTheDocument();
  });

  it('utilise todo pour un statut inconnu', () => {
    render(<TaskStatusChip status="inconnu" />);

    expect(screen.getByText('À faire')).toBeInTheDocument();
  });
});
