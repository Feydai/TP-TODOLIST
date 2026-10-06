import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Home from '../pages/Home.jsx';
import DashboardPage from '../pages/DashboardPage.jsx';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;