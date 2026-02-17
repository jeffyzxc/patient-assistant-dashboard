import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './features/authentication/views/login'
import RegisterPage from './features/authentication/views/register'
import PatientDashboard from './features/patient-dashboard/views/patient-dashboard';
import ProtectedRoute from './guard/ProtectedRoute';
import { useSelector } from 'react-redux';
import type { RootState } from './store';
import DashboardLayout from './components/dashboard-layout';

function App() {
  const token = useSelector((state: RootState) => state.auth.token);
  const isAuthenticated = !!token;

  return (
      <BrowserRouter>
        <Routes>
          <Route
            element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirectTo="/dashboard" />}
          >
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route
            element={<ProtectedRoute isAuthenticated={isAuthenticated} redirectTo="/" />}
          >
            <Route path="/dashboard" element={<DashboardLayout><PatientDashboard /></DashboardLayout>} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
