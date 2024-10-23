import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import NavbarBeforeLogin from './NavbarBeforeLogin';
import OwnerNavigation from './OwnerNavigation'; // Owner Navigation
import TenantNavigation from './TenantNavigation'; // Tenant Navigation
import Footer from './Footer';
import LandingPage from './LandingPage';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
import SignUpPage from './SignUpPage';
import LoginPage from './LoginPage';
import TenantDashboardLayout from './TenantDashboardLayout'; // Tenant dashboard
import OwnerDashboardLayout from './OwnerDashboardLayout'; // Owner dashboard
import AddProperty from './AddProperty'; // Add Property page
import TenantManagement from './TenantManagement'; // Tenant Management page
import SearchProperty from './SearchProperty'; // Search Property page
import EnterUniqueCode from './EnterUniqueCode'; // Enter Unique Code page
import RentedSpace from './RentedSpace'; // Rented Space page
import GenerateUniqueCode from './GenerateUniqueCode'; // Generate Unique Code page for owners
import OwnerProperties from './OwnerProperties'; // Owner Properties List
import PropertyDetails from './PropertyDetails'; // Individual Property Details


// Protected Route Component
const ProtectedRoute = ({ children, userType }) => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token || !user) {
        return <Navigate to="/login" />;
    }

    if (userType && user?.userType !== userType) {
        return <Navigate to="/login" />;
    }

    return children;
};

function App() {
    const location = useLocation();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    // Check if the current page is either TenantDashboard or OwnerDashboard
    const isDashboard =
        location.pathname === '/tenant-dashboard' || location.pathname === '/owner-dashboard' || location.pathname === '/property-dashboard';

    return (
        <div className="min-h-screen flex flex-col">
            {/* Conditional Navbar Rendering based on userType */}
            {!isDashboard && (
                token && user ? (
                    user.userType === 'owner' ? <OwnerNavigation /> : <TenantNavigation />
                ) : <NavbarBeforeLogin />
            )}

            <div className="flex-grow">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/login" element={<LoginPage />} />

                    {/* Protected Routes for Owner Dashboard */}
                    {token && user?.userType === 'owner' && (
                        <>
                            <Route
                                path="/owner-dashboard"
                                element={
                                    <ProtectedRoute userType="owner">
                                        <OwnerDashboardLayout />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/add-property"
                                element={
                                    <ProtectedRoute userType="owner">
                                        <AddProperty />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/tenant-management"
                                element={
                                    <ProtectedRoute userType="owner">
                                        <TenantManagement />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/generate-unique-code"
                                element={
                                    <ProtectedRoute userType="owner">
                                        <GenerateUniqueCode />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/owner-properties"
                                element={
                                    <ProtectedRoute userType="owner">
                                        <OwnerProperties />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/property/:id"
                                element={
                                    <ProtectedRoute userType="owner">
                                        <PropertyDetails />
                                    </ProtectedRoute>
                                }
                            />
                        </>
                    )}

                    {/* Protected Routes for Tenant Dashboard */}
                    {token && user?.userType === 'tenant' && (
                        <>
                            <Route
                                path="/tenant-dashboard"
                                element={
                                    <ProtectedRoute userType="tenant">
                                        <TenantDashboardLayout />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/search-property"
                                element={
                                    <ProtectedRoute userType="tenant">
                                        <SearchProperty />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/enter-unique-code"
                                element={
                                    <ProtectedRoute userType="tenant">
                                        <EnterUniqueCode />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/rented-space"
                                element={
                                    <ProtectedRoute userType="tenant">
                                        <RentedSpace />
                                    </ProtectedRoute>
                                }
                            />
                        </>
                    )}

                    {/* Default Fallback Route */}
                    <Route path="*" element={<LoginPage />} />
                </Routes>
            </div>

            {/* Conditional Footer Rendering */}
            {!isDashboard && <Footer />}
        </div>
    );
}

export default function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}
