import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import TemplateManager from './TemplateManager';
import CertificateGenerator from './CertificateGenerator';
import VerificationPage from './VerificationPage'; // <-- 1. IMPORT

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/verify" element={<VerificationPage />} /> {/* <-- 2. ADD PUBLIC ROUTE */}

                    {/* Private Admin Routes */}
                    <Route
                        path="/dashboard"
                        element={<PrivateRoute><Dashboard /></PrivateRoute>}
                    />
                    <Route
                        path="/templates"
                        element={<PrivateRoute><TemplateManager /></PrivateRoute>}
                    />
                    <Route
                        path="/generate"
                        element={<PrivateRoute><CertificateGenerator /></PrivateRoute>}
                    />
                    
                    {/* Redirect any other path */}
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
