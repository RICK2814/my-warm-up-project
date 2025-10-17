import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import './RegistrationForm.css';

interface RegistrationFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
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
  logo?: File | null;
  company_type?: string;
  business_category?: string;
  business_description?: string;
}

const MultiStepRegistrationForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationFormData>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    gst_number: '',
    pan_number: '',
    registration_number: '',
    incorporation_date: '',
    website: '',
    logo: null,
    company_type: '',
    business_category: '',
    business_description: ''
  });

  const updateFormData = (data: Partial<RegistrationFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const submitRegistration = async (data: RegistrationFormData) => {
    try {
      // In a real app, you would send the registration data to your backend
      // Here's an example of how you might do that:
      /*
      const response = await fetch('/api/companies/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        // Handle successful registration
        console.log('Registration successful', result);
        // Redirect or show success message
      } else {
        // Handle errors
        console.error('Registration failed', result);
      }
      */
      
      // For now, we'll just simulate a successful registration
      console.log('Registration data:', data);
      alert('Registration submitted successfully!');
    } catch (error) {
      console.error('Error submitting registration:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-form">
        <h2>Company Registration</h2>
        
        {/* Progress bar */}
        <div className="progress-bar">
          <div 
            className={`step ${step >= 1 ? 'active' : ''}`} 
            onClick={() => setStep(1)}
          >
            <span className="step-number">1</span>
            <span className="step-label">Account</span>
          </div>
          <div 
            className={`step ${step >= 2 ? 'active' : ''}`} 
            onClick={() => step > 1 && setStep(2)}
          >
            <span className="step-number">2</span>
            <span className="step-label">Address</span>
          </div>
          <div 
            className={`step ${step >= 3 ? 'active' : ''}`} 
            onClick={() => step > 2 && setStep(3)}
          >
            <span className="step-number">3</span>
            <span className="step-label">Details</span>
          </div>
          <div 
            className={`step ${step >= 4 ? 'active' : ''}`} 
            onClick={() => step > 3 && setStep(4)}
          >
            <span className="step-number">4</span>
            <span className="step-label">Review</span>
          </div>
        </div>

        {/* Form steps */}
        {step === 1 && (
          <Step1 
            formData={formData} 
            updateFormData={updateFormData} 
            nextStep={nextStep} 
          />
        )}
        
        {step === 2 && (
          <Step2 
            formData={formData} 
            updateFormData={updateFormData} 
            nextStep={nextStep} 
            prevStep={prevStep} 
          />
        )}
        
        {step === 3 && (
          <Step3 
            formData={formData} 
            updateFormData={updateFormData} 
            nextStep={nextStep} 
            prevStep={prevStep} 
          />
        )}
        
        {step === 4 && (
          <Step4 
            formData={formData} 
            updateFormData={updateFormData} 
            prevStep={prevStep} 
            submitRegistration={submitRegistration} 
          />
        )}
      </div>
    </div>
  );
};

export default MultiStepRegistrationForm;