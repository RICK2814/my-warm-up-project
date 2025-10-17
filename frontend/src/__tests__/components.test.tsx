// Frontend Component Tests
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MultiStepRegistrationForm from '../src/components/Registration/RegistrationForm';
import SettingsPage from '../src/components/Settings/SettingsPage';

describe('MultiStepRegistrationForm Component', () => {
  test('renders the first step of the registration form', () => {
    render(<MultiStepRegistrationForm />);
    
    // Check if the first step elements are present
    expect(screen.getByText(/Company Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Phone/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Confirm Password/i)).toBeInTheDocument();
  });

  test('allows navigation between steps', () => {
    render(<MultiStepRegistrationForm />);
    
    // Initially, Step 1 should be visible
    expect(screen.getByText(/Company Name/i)).toBeInTheDocument();
    
    // Fill in required fields to enable next button
    fireEvent.change(screen.getByLabelText(/Company Name/i), {
      target: { value: 'Test Company' }
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/Phone/i), {
      target: { value: '9876543210' }
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' }
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: 'password123' }
    });

    // Click next button
    fireEvent.click(screen.getByText(/Next/i));
    
    // Check if we moved to the next step
    expect(screen.getByText(/Address/i)).toBeInTheDocument();
  });

  test('validates required fields', () => {
    render(<MultiStepRegistrationForm />);
    
    // Click next without filling required fields
    fireEvent.click(screen.getByText(/Next/i));
    
    // Should show error messages
    expect(screen.getByText(/Company name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
  });
});

describe('SettingsPage Component', () => {
  test('renders the settings page with profile tab active by default', () => {
    render(<SettingsPage />);
    
    // Check if the settings page renders
    expect(screen.getByText(/Settings/i)).toBeInTheDocument();
    
    // Check if profile tab is active
    expect(screen.getByText(/Profile/i)).toHaveClass('active');
  });

  test('allows switching between tabs', () => {
    render(<SettingsPage />);
    
    // Check if profile tab is initially active
    expect(screen.getByText(/Profile/i)).toHaveClass('active');
    
    // Click on Security tab
    fireEvent.click(screen.getByText(/Security/i));
    
    // Check if security tab is now active
    expect(screen.getByText(/Security/i)).toHaveClass('active');
    expect(screen.getByText(/Change Password/i)).toBeInTheDocument();
    
    // Click on Notifications tab
    fireEvent.click(screen.getByText(/Notifications/i));
    
    // Check if notifications tab is now active
    expect(screen.getByText(/Notifications/i)).toHaveClass('active');
    expect(screen.getByText(/Notification Preferences/i)).toBeInTheDocument();
  });
});