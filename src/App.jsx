import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { EquipmentProvider } from './contexts/EquipmentContext';
import { RentalsProvider } from './contexts/RentalsContext';
import { MaintenanceProvider } from './contexts/MaintenanceContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { ToastProvider } from './contexts/ToastContext';
import MainLayout from './components/Layout/MainLayout';
import LoginForm from './components/Authentication/LoginForm';
import ProtectedRoute from './components/Authentication/ProtectedRoute';
import EquipmentPage from './pages/EquipmentPage';
import RentalsPage from './pages/RentalsPage';
import MaintenancePage from './pages/MaintenancePage';
import DashboardPage from './pages/DashboardPage';

// Placeholder components - you can create these later
const Unauthorized = () => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    <div className="text-white text-xl">Unauthorized Access</div>
  </div>
);

const NotFound = () => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    <div className="text-white text-xl">404 - Page Not Found</div>
  </div>
);

// Wrap the app content with providers
const AppContent = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <NotificationProvider>
          <EquipmentProvider>
            <RentalsProvider>
              <MaintenanceProvider>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="/unauthorized" element={<Unauthorized />} />
                  
                  {/* Protected Routes */}
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <MainLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<DashboardPage />} />
                    
                    <Route
                      path="equipment/*"
                      element={
                        <ProtectedRoute allowedRoles={['Admin', 'Staff']}>
                          <EquipmentPage />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="rentals"
                      element={
                        <ProtectedRoute allowedRoles={['Admin', 'Staff']}>
                          <RentalsPage />
                        </ProtectedRoute>
                      }
                    />
                    
                    <Route
                      path="admin"
                      element={
                        <ProtectedRoute allowedRoles={['Admin']}>
                          <div>Admin Dashboard</div>
                        </ProtectedRoute>
                      }
                    />
                    
                    <Route
                      path="staff"
                      element={
                        <ProtectedRoute allowedRoles={['Staff', 'Admin']}>
                          <div>Staff Dashboard</div>
                        </ProtectedRoute>
                      }
                    />
                    
                    <Route
                      path="maintenance"
                      element={
                        <ProtectedRoute allowedRoles={['Admin', 'Staff']}>
                          <MaintenancePage />
                        </ProtectedRoute>
                      }
                    />

                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
              </MaintenanceProvider>
            </RentalsProvider>
          </EquipmentProvider>
        </NotificationProvider>
      </ToastProvider>
    </AuthProvider>
  );
};

// Main App component
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
