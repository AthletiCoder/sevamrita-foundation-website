import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import ScrollManager from './utils/ScrollManager';

// Eager-load home so Back never flashes the Suspense spinner.
// Lazy-load secondary pages.
const Story = lazy(() => import('./components/Story'));
const Contribute = lazy(() => import('./components/Contribute'));
const DonationThankYou = lazy(() => import('./components/donate/DonationThankYou'));
const Contact = lazy(() => import('./components/Contact'));
const Team = lazy(() => import('./components/Team'));
const WhatWeDo = lazy(() => import('./components/WhatWeDo'));
const WhyWeDo = lazy(() => import('./components/WhyWeDo'));
const Calendar = lazy(() => import('./components/Calendar'));
const Resources = lazy(() => import('./components/Resources'));
const TestimonialsPage = lazy(() => import('./components/TestimonialsPage'));

// Dashboard components (to be created)
const Dashboard = lazy(() => import('./components/dashboards/Dashboard'));
const ManageUsers = lazy(() => import('./components/ManageUsers'));
const ManageEvents = lazy(() => import('./components/ManageEvents'));
const OrganizationManagement = lazy(() => import('./components/dashboards/admin/OrganizationManagement'));
const DonationManagement = lazy(() => import('./components/dashboards/admin/DonationManagement'));
const Profile = lazy(() => import('./components/Profile'));

// Loading component
const LoadingSpinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <ScrollManager />
          <Header />
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/whatwedo" element={<WhatWeDo />} />
              <Route path="/whywedo" element={<WhyWeDo />} />
              <Route path="/story" element={<Story />} />
              <Route path="/events-calender" element={<Calendar />} />
              <Route path="/contribute" element={<Contribute />} />
              <Route path="/contribute/thank-you" element={<DonationThankYou />} />
              <Route path="/team" element={<Team />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/contact" element={<Contact />} />

              {/* Protected Routes - Require Authentication */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute requireAuth={true}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute requireAuth={true}>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              {/* Admin Routes - Require ADMIN or SUPERUSER role */}
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute allowedRoles={['ADMIN', 'SUPERUSER']}>
                    <ManageUsers />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/events"
                element={
                  <ProtectedRoute allowedRoles={['ADMIN', 'SUPERUSER']}>
                    <ManageEvents />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/organizations"
                element={
                  <ProtectedRoute allowedRoles={['ADMIN', 'SUPERUSER']}>
                    <OrganizationManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/donations"
                element={
                  <ProtectedRoute allowedRoles={['ADMIN', 'SUPERUSER']}>
                    <DonationManagement />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
