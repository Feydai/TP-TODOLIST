import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import TaskActions from './TaskActions.jsx';

describe('TaskActions', () => {
  it('appelle onView', () => {
    const onView = vi.fn();

    render(<TaskActions onView={onView} onEdit={vi.fn()} onDelete={vi.fn()} />);

    const buttons = screen.getAllByRole('button');

    fireEvent.click(buttons[0]);

    expect(onView).toHaveBeenCalledTimes(1);
  });

  it('appelle onEdit', () => {
    const onEdit = vi.fn();

    render(<TaskActions onView={vi.fn()} onEdit={onEdit} onDelete={vi.fn()} />);

    const buttons = screen.getAllByRole('button');

    fireEvent.click(buttons[1]);

    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it('appelle onDelete', () => {
    const onDelete = vi.fn();

    render(
      <TaskActions onView={vi.fn()} onEdit={vi.fn()} onDelete={onDelete} />
    );

    const buttons = screen.getAllByRole('button');

    fireEvent.click(buttons[2]);

    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
