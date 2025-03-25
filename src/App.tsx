import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/navigation';
import { Footer } from './components/footer';
import { HomePage } from './pages/home';
import { LoginPage } from './pages/auth/login';
import { SignUpPage } from './pages/auth/signup';
import { AdminLoginPage } from './pages/auth/admin-login';
import { ListPropertyPage } from './pages/list-property';
import { PropertyDetailsPage } from './pages/property-details';
import { DashboardPage } from './pages/dashboard';
import { AdminDashboard } from './pages/admin/dashboard';
import { PropertiesPage } from './pages/admin/properties';
import { BookingsPage } from './pages/admin/bookings';
import { SearchPage } from './pages/search';
import { PropertiesPage as ClientPropertiesPage } from './pages/properties';
import { ServicesPage } from './pages/services';
import { AboutPage } from './pages/about';
import { FilterProvider } from './contexts/FilterContext';
import { AdminProtectedRoute } from './components/auth/AdminProtectedRoute';
import './styles/colors.css';

export default function App() {
  return (
    <Router>
      <FilterProvider>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <>
                <Navigation />
                <main className="flex-grow">
                  <HomePage />
                </main>
                <Footer />
              </>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Protected Client Routes */}
          <Route
            path="/dashboard"
            element={
              <>
                <Navigation />
                <main className="flex-grow">
                  <DashboardPage />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/list-property"
            element={
              <>
                <Navigation />
                <main className="flex-grow">
                  <ListPropertyPage />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/properties"
            element={
              <>
                <Navigation />
                <main className="flex-grow">
                  <ClientPropertiesPage />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/properties/:id"
            element={
              <>
                <Navigation />
                <main className="flex-grow">
                  <PropertyDetailsPage />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/services"
            element={
              <>
                <Navigation />
                <main className="flex-grow">
                  <ServicesPage />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Navigation />
                <main className="flex-grow">
                  <AboutPage />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/search"
            element={
              <>
                <Navigation />
                <main className="flex-grow">
                  <SearchPage />
                </main>
                <Footer />
              </>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/properties"
            element={
              <AdminProtectedRoute>
                <PropertiesPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/bookings"
            element={
              <AdminProtectedRoute>
                <BookingsPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/*"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />
        </Routes>
      </FilterProvider>
    </Router>
  );
}