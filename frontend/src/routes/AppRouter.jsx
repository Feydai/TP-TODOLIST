import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import LoginPage from '../pages/auth/LoginPage.jsx';
import RegisterPage from '../pages/auth/RegisterPage.jsx';

import DashboardPage from '../pages/DashboardPage.jsx';
import TasksPage from '../pages/tasks/TaskPage.jsx';
import CreateTaskPage from '../pages/tasks/CreateTaskPage.jsx';
import TaskDetailsPage from '../pages/tasks/TaskDetailsPage.jsx';
import EditTaskPage from '../pages/tasks/EditTaskPage.jsx';

import ProtectedRoute from './ProtectedRoute.jsx';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* PROTECTED */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />

          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/tasks/new" element={<CreateTaskPage />} />
          <Route path="/tasks/:id" element={<TaskDetailsPage />} />
          <Route path="/tasks/:id/edit" element={<EditTaskPage />} />
        </Route>

        {/* DEFAULT */}
        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;