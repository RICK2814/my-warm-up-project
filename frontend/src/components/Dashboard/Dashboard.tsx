import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="logo">
          <h2>Company Dashboard</h2>
        </div>
        
        <nav className="nav-menu">
          <Link 
            to="#" 
            className={activeTab === 'profile' ? 'nav-link active' : 'nav-link'}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </Link>
          <Link 
            to="#" 
            className={activeTab === 'documents' ? 'nav-link active' : 'nav-link'}
            onClick={() => setActiveTab('documents')}
          >
            Documents
          </Link>
          <Link 
            to="#" 
            className={activeTab === 'verification' ? 'nav-link active' : 'nav-link'}
            onClick={() => setActiveTab('verification')}
          >
            Verification
          </Link>
          <Link 
            to="#" 
            className={activeTab === 'settings' ? 'nav-link active' : 'nav-link'}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </Link>
        </nav>
      </aside>
      
      <main className="main-content">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
          <div className="user-info">
            <span>Welcome, John Doe</span>
            <button className="logout-button">Logout</button>
          </div>
        </header>
        
        <div className="dashboard-content">
          <div className="stats-container">
            <div className="stat-card">
              <h3>Profile Status</h3>
              <p>Completed</p>
            </div>
            <div className="stat-card">
              <h3>Documents</h3>
              <p>3/5 Uploaded</p>
            </div>
            <div className="stat-card">
              <h3>Verification</h3>
              <p>Pending</p>
            </div>
          </div>
          
          <div className="dashboard-section">
            {activeTab === 'profile' && (
              <div>
                <h2>Your Profile</h2>
                <p>Manage your company profile information</p>
                <Link to="/settings" className="btn-primary">Edit Profile</Link>
              </div>
            )}
            
            {activeTab === 'documents' && (
              <div>
                <h2>Document Management</h2>
                <p>Upload and manage your company documents</p>
                <Link to="/settings" className="btn-primary">Manage Documents</Link>
              </div>
            )}
            
            {activeTab === 'verification' && (
              <div>
                <h2>Verification Process</h2>
                <p>Track your verification status</p>
                <Link to="/settings" className="btn-primary">View Status</Link>
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div>
                <h2>Account Settings</h2>
                <p>Manage your account preferences</p>
                <Link to="/settings" className="btn-primary">Manage Settings</Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;