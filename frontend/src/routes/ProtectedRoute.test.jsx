import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute.jsx';
import useAuth from '../hooks/useAuth.js';

vi.mock('../hooks/useAuth.js', () => ({
  default: vi.fn(),
}));

describe('ProtectedRoute', () => {
  it('affiche la route protégée si utilisateur est authentifié', () => {
    useAuth.mockReturnValue({
      isAuthenticated: true,
    });

    render(
      <MemoryRouter initialEntries={['/tasks']}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/tasks" element={<div>Mes tâches privées</div>} />
          </Route>

          <Route path="/login" element={<div>Connexion</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Mes tâches privées')).toBeInTheDocument();
  });

  it("redirige vers login si utilisateur n'est pas authentifié", () => {
    useAuth.mockReturnValue({
      isAuthenticated: false,
    });

    render(
      <MemoryRouter initialEntries={['/tasks']}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/tasks" element={<div>Mes tâches privées</div>} />
          </Route>

          <Route path="/login" element={<div>Page de connexion</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Page de connexion')).toBeInTheDocument();

    expect(screen.queryByText('Mes tâches privées')).not.toBeInTheDocument();
  });
});
