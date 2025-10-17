import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './css/App.css';
import MultiStepRegistrationForm from './components/Registration/RegistrationForm';
import SettingsPage from './components/Settings/SettingsPage';
import LoginPage from './components/Auth/LoginPage';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <div className="home-page">
              <header className="App-header">
                <div className="container">
                  <h1>Company Registration & Verification Module</h1>
                  <nav>
                    <Link to="/">Home</Link> | 
                    <Link to="/login">Login</Link> | 
                    <Link to="/register">Register</Link>
                  </nav>
                </div>
              </header>
              <main className="container">
                <div className="hero-section">
                  <h2>Welcome to the Company Registration & Verification Module</h2>
                  <p>This is a complete solution for company registration, login, and profile management.</p>
                  <div className="cta-buttons">
                    <Link to="/register" className="btn-primary">Register Company</Link>
                    <Link to="/login" className="btn-secondary">Login to Dashboard</Link>
                  </div>
                </div>
              </main>
            </div>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<MultiStepRegistrationForm />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;