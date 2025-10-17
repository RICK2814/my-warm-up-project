import React, { useState, useEffect } from 'react';
import ProfileEdit from './ProfileEdit';
import './SettingsPage.css';

interface ProfileData {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  gst_number?: string;
  pan_number?: string;
  registration_number?: string;
  incorporation_date?: string;
  website?: string;
  logo_url?: string;
  company_type?: string;
  business_category?: string;
  business_description?: string;
}

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching profile data
  useEffect(() => {
    // In a real app, you would fetch the profile data from your backend
    /*
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/companies/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setProfile(data.company);
        } else {
          console.error('Failed to fetch profile');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
    */
    
    // For now, use mock data
    setTimeout(() => {
      setProfile({
        id: 1,
        name: 'Sample Company',
        email: 'contact@samplecompany.com',
        phone: '9876543210',
        address: '123 Business Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        pincode: '400001',
        gst_number: '12ABCDE1234F1Z5',
        pan_number: 'AAAAA1234A',
        registration_number: 'U74999MH2020PTC123456',
        incorporation_date: '2020-01-15',
        website: 'https://samplecompany.com',
        logo_url: '',
        company_type: 'Private Limited',
        business_category: 'Technology',
        business_description: 'We are a technology company providing innovative solutions.'
      });
      setLoading(false);
    }, 1000);
  }, []);

  const handleProfileUpdate = (updatedProfile: ProfileData) => {
    setProfile(updatedProfile);
  };

  if (loading) {
    return <div className="settings-page">Loading...</div>;
  }

  if (!profile) {
    return <div className="settings-page">Failed to load profile data.</div>;
  }

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      
      <div className="settings-tabs">
        <button 
          className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button 
          className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          Security
        </button>
        <button 
          className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          Notifications
        </button>
      </div>
      
      <div className="settings-content">
        {activeTab === 'profile' && (
          <ProfileEdit profile={profile} onSave={handleProfileUpdate} />
        )}
        
        {activeTab === 'security' && (
          <div className="security-settings">
            <h2>Security Settings</h2>
            <div className="setting-item">
              <h3>Change Password</h3>
              <div className="form-group">
                <label htmlFor="current-password">Current Password</label>
                <input type="password" id="current-password" />
              </div>
              <div className="form-group">
                <label htmlFor="new-password">New Password</label>
                <input type="password" id="new-password" />
              </div>
              <div className="form-group">
                <label htmlFor="confirm-password">Confirm New Password</label>
                <input type="password" id="confirm-password" />
              </div>
              <button className="btn btn-primary">Update Password</button>
            </div>
            
            <div className="setting-item">
              <h3>Two-Factor Authentication</h3>
              <p>Protect your account with an extra layer of security.</p>
              <button className="btn btn-outline">Enable 2FA</button>
            </div>
          </div>
        )}
        
        {activeTab === 'notifications' && (
          <div className="notifications-settings">
            <h2>Notification Preferences</h2>
            <div className="setting-item">
              <div className="notification-option">
                <input type="checkbox" id="email-notifications" defaultChecked />
                <label htmlFor="email-notifications">Email Notifications</label>
              </div>
              <div className="notification-option">
                <input type="checkbox" id="sms-notifications" />
                <label htmlFor="sms-notifications">SMS Notifications</label>
              </div>
              <div className="notification-option">
                <input type="checkbox" id="push-notifications" defaultChecked />
                <label htmlFor="push-notifications">Push Notifications</label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;