import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface RegistrationFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
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

interface Step4Props {
  formData: RegistrationFormData;
  updateFormData: (data: Partial<RegistrationFormData>) => void;
  prevStep: () => void;
  submitRegistration: (data: RegistrationFormData) => void;
}

const Step4: React.FC<Step4Props> = ({ formData, updateFormData, prevStep, submitRegistration }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // In a real app, you would send the registration data to your backend
    // For now, we'll just simulate and navigate to a success page
    setTimeout(() => {
      submitRegistration(formData);
      setIsSubmitting(false);
    }, 1000);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateFormData({ logo: e.target.files[0] });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="logo">Company Logo</label>
        <input
          type="file"
          id="logo"
          accept="image/*"
          onChange={handleLogoChange}
        />
        {formData.logo && (
          <div className="logo-preview">
            <p>Selected file: {formData.logo.name}</p>
          </div>
        )}
      </div>

      <div className="summary-section">
        <h3>Company Information Summary</h3>
        <div className="summary-item">
          <strong>Company Name:</strong> {formData.name}
        </div>
        <div className="summary-item">
          <strong>Email:</strong> {formData.email}
        </div>
        <div className="summary-item">
          <strong>Phone:</strong> {formData.phone}
        </div>
        <div className="summary-item">
          <strong>Address:</strong> {formData.address}, {formData.city}, {formData.state}, {formData.country}, {formData.pincode}
        </div>
        {formData.gst_number && (
          <div className="summary-item">
            <strong>GST Number:</strong> {formData.gst_number}
          </div>
        )}
        {formData.pan_number && (
          <div className="summary-item">
            <strong>PAN Number:</strong> {formData.pan_number}
          </div>
        )}
        {formData.registration_number && (
          <div className="summary-item">
            <strong>Registration Number:</strong> {formData.registration_number}
          </div>
        )}
        {formData.incorporation_date && (
          <div className="summary-item">
            <strong>Incorporation Date:</strong> {formData.incorporation_date}
          </div>
        )}
        {formData.website && (
          <div className="summary-item">
            <strong>Website:</strong> {formData.website}
          </div>
        )}
        <div className="summary-item">
          <strong>Company Type:</strong> {formData.company_type}
        </div>
        <div className="summary-item">
          <strong>Business Category:</strong> {formData.business_category}
        </div>
        <div className="summary-item">
          <strong>Business Description:</strong> {formData.business_description}
        </div>
      </div>

      <div className="form-navigation">
        <button type="button" onClick={prevStep} className="btn btn-secondary">Previous</button>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Registration'}
        </button>
      </div>
    </form>
  );
};

export default Step4;