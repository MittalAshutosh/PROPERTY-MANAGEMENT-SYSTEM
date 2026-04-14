import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute, { getDashboardPath } from './components/auth/ProtectedRoute';

// Layout
import Layout from './components/layout/Layout';

// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';

// Role-based Dashboards
import AdminDashboard from './pages/dashboards/AdminDashboard';
import ManagerDashboard from './pages/dashboards/ManagerDashboard';
import TenantDashboard from './pages/dashboards/TenantDashboard';
import MaintenanceDashboard from './pages/dashboards/MaintenanceDashboard';

// Admin/Manager Pages
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import Units from './pages/Units';
import UnitDetail from './pages/UnitDetail';
import Leases from './pages/Leases';
import LeaseDetail from './pages/LeaseDetail';
import Tenants from './pages/Tenants';
import TenantDetail from './pages/TenantDetail';
import Maintenance from './pages/Maintenance';
import MaintenanceDetail from './pages/MaintenanceDetail';
import Payments from './pages/Payments';
import Profile from './pages/Profile';

// Tenant Pages
import TenantLease from './pages/tenant/TenantLease';
import TenantMaintenance from './pages/tenant/TenantMaintenance';
import TenantPayments from './pages/tenant/TenantPayments';

// Admin-only Pages
import ActivityLogs from './pages/admin/ActivityLogs';
import Users from './pages/admin/Users';

// Rent Detail Page
import RentDetail from './pages/RentDetail';

import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

function RoleBasedRedirect() {
  const { profile, loading } = useAuth();
  if (loading) return null;
  return <Navigate to={getDashboardPath(profile?.role)} replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<ProtectedRoute><RoleBasedRedirect /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><Layout role="admin" /></ProtectedRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="properties" element={<Properties />} />
        <Route path="properties/:id" element={<PropertyDetail />} />
        <Route path="units" element={<Units />} />
        <Route path="units/:id" element={<UnitDetail />} />
        <Route path="leases" element={<Leases />} />
        <Route path="leases/:id" element={<LeaseDetail />} />
        <Route path="tenants" element={<Tenants />} />
        <Route path="tenants/:id" element={<TenantDetail />} />
        <Route path="maintenance" element={<Maintenance />} />
        <Route path="maintenance/:id" element={<MaintenanceDetail />} />
        <Route path="payments" element={<Payments />} />
        <Route path="payments/:id" element={<RentDetail />} />
        <Route path="users" element={<Users />} />
        <Route path="activity-logs" element={<ActivityLogs />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="/manager" element={<ProtectedRoute allowedRoles={['manager']}><Layout role="manager" /></ProtectedRoute>}>
        <Route index element={<ManagerDashboard />} />
        <Route path="properties" element={<Properties />} />
        <Route path="properties/:id" element={<PropertyDetail />} />
        <Route path="units" element={<Units />} />
        <Route path="units/:id" element={<UnitDetail />} />
        <Route path="leases" element={<Leases />} />
        <Route path="leases/:id" element={<LeaseDetail />} />
        <Route path="tenants" element={<Tenants />} />
        <Route path="tenants/:id" element={<TenantDetail />} />
        <Route path="maintenance" element={<Maintenance />} />
        <Route path="maintenance/:id" element={<MaintenanceDetail />} />
        <Route path="payments" element={<Payments />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="/tenant" element={<ProtectedRoute allowedRoles={['tenant']}><Layout role="tenant" /></ProtectedRoute>}>
        <Route index element={<TenantDashboard />} />
        <Route path="lease" element={<TenantLease />} />
        <Route path="payments" element={<TenantPayments />} />
        <Route path="maintenance" element={<TenantMaintenance />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="/maintenance-staff" element={<ProtectedRoute allowedRoles={['maintenance']}><Layout role="maintenance" /></ProtectedRoute>}>
        <Route index element={<MaintenanceDashboard />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;