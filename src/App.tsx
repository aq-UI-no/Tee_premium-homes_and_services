import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/auth-context';
import { ToastProvider } from './components/ui/toaster';
import { MainLayout } from './components/layout/MainLayout';
import { ProtectedRoute } from './components/auth/protected-route';
import { ROUTES } from './constants';

// Pages
import { HomePage } from './pages/home';
import { PropertiesPage } from './pages/properties';
import { PropertyDetailsPage } from './pages/property-details';
import { ServicesPage } from './pages/services';
import { AboutPage } from './pages/about';
import { ContactPage } from './pages/contact';
import { LoginPage } from './pages/auth/login';
import { SignUpPage } from './pages/auth/signup';
import { AdminLoginPage } from './pages/auth/admin-login';

// Admin Pages
import { AdminDashboard } from './pages/admin/dashboard';
import { AdminProperties } from './pages/admin/properties';
import { AdminBookings } from './pages/admin/bookings';
import { AdminUsers } from './pages/admin/users';
import { AdminSettings } from './pages/admin/settings';

export function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            {/* Public Routes */}
            <Route element={<MainLayout />}>
              <Route path={ROUTES.HOME} element={<HomePage />} />
              <Route path={ROUTES.PROPERTIES} element={<PropertiesPage />} />
              <Route path={ROUTES.PROPERTY_DETAIL(':id')} element={<PropertyDetailsPage />} />
              <Route path={ROUTES.SERVICES} element={<ServicesPage />} />
              <Route path={ROUTES.ABOUT} element={<AboutPage />} />
              <Route path={ROUTES.CONTACT} element={<ContactPage />} />
              
              {/* Auth Routes */}
              <Route path={ROUTES.AUTH.LOGIN} element={<LoginPage />} />
              <Route path={ROUTES.AUTH.REGISTER} element={<SignUpPage />} />
              <Route path={ROUTES.AUTH.ADMIN_LOGIN} element={<AdminLoginPage />} />
              
              {/* Admin Routes */}
              <Route
                path={ROUTES.ADMIN.DASHBOARD}
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.ADMIN.PROPERTIES}
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminProperties />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.ADMIN.BOOKINGS}
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminBookings />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.ADMIN.USERS}
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminUsers />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.ADMIN.SETTINGS}
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminSettings />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}