import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import Dashboard from '../pages/Dashboard/Dashboard';
import Estoque from '../pages/Estoque/Estoque';
import Login from '../pages/Login/Login';
import Relatorios from '../pages/Relatorios/Relatorios';
import ProtectedRoute from './ProtectedRoute';

export default function AppRoutes() {
  const { isAuthenticated } = useAuthContext();

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />}
      />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route
        path="/dashboard"
        element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
      />
      <Route
        path="/estoque"
        element={<ProtectedRoute><Estoque /></ProtectedRoute>}
      />
      <Route
        path="/relatorios"
        element={<ProtectedRoute><Relatorios /></ProtectedRoute>}
      />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
