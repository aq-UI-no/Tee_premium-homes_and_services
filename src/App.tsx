import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/navbar';
import { HomePage } from './pages/home';
import { AuthPage } from './pages/auth';
import { ListPropertyPage } from './pages/list-property';
import { PropertyDetailsPage } from './pages/property-details';
import { DashboardPage } from './pages/dashboard';
import { AdminDashboard } from './pages/admin/dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/list-property" element={<ListPropertyPage />} />
            <Route path="/properties/:id" element={<PropertyDetailsPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App