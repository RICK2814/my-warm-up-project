import React, { useState } from 'react';

interface RegistrationFormData {
  gst_number?: string;
  pan_number?: string;
  registration_number?: string;
  incorporation_date?: string;
  website?: string;
  company_type?: string;
  business_category?: string;
  business_description?: string;
}

interface Step3Props {
  formData: RegistrationFormData;
  updateFormData: (data: Partial<RegistrationFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const Step3: React.FC<Step3Props> = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.company_type) newErrors.company_type = 'Company type is required';
    if (!formData.business_category) newErrors.business_category = 'Business category is required';
    if (!formData.business_description) newErrors.business_description = 'Business description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      nextStep();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="gst_number">GST Number</label>
        <input
          type="text"
          id="gst_number"
          value={formData.gst_number || ''}
          onChange={(e) => updateFormData({ gst_number: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label htmlFor="pan_number">PAN Number</label>
        <input
          type="text"
          id="pan_number"
          value={formData.pan_number || ''}
          onChange={(e) => updateFormData({ pan_number: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label htmlFor="registration_number">Registration Number</label>
        <input
          type="text"
          id="registration_number"
          value={formData.registration_number || ''}
          onChange={(e) => updateFormData({ registration_number: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label htmlFor="incorporation_date">Incorporation Date</label>
        <input
          type="date"
          id="incorporation_date"
          value={formData.incorporation_date || ''}
          onChange={(e) => updateFormData({ incorporation_date: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label htmlFor="website">Website</label>
        <input
          type="url"
          id="website"
          value={formData.website || ''}
          onChange={(e) => updateFormData({ website: e.target.value })}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="company_type">Company Type *</label>
          <select
            id="company_type"
            value={formData.company_type || ''}
            onChange={(e) => updateFormData({ company_type: e.target.value })}
            className={errors.company_type ? 'error' : ''}
          >
            <option value="">Select Company Type</option>
            <option value="Private Limited">Private Limited</option>
            <option value="Public Limited">Public Limited</option>
            <option value="Partnership">Partnership</option>
            <option value="LLP">LLP (Limited Liability Partnership)</option>
            <option value="Sole Proprietorship">Sole Proprietorship</option>
            <option value="NGO">NGO</option>
          </select>
          {errors.company_type && <span className="error-message">{errors.company_type}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="business_category">Business Category *</label>
          <select
            id="business_category"
            value={formData.business_category || ''}
            onChange={(e) => updateFormData({ business_category: e.target.value })}
            className={errors.business_category ? 'error' : ''}
          >
            <option value="">Select Business Category</option>
            <option value="Technology">Technology</option>
            <option value="Finance">Finance</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Retail">Retail</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Consulting">Consulting</option>
            <option value="Other">Other</option>
          </select>
          {errors.business_category && <span className="error-message">{errors.business_category}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="business_description">Business Description *</label>
        <textarea
          id="business_description"
          value={formData.business_description || ''}
          onChange={(e) => updateFormData({ business_description: e.target.value })}
          className={errors.business_description ? 'error' : ''}
          rows={4}
        />
        {errors.business_description && <span className="error-message">{errors.business_description}</span>}
      </div>

      <div className="form-navigation">
        <button type="button" onClick={prevStep} className="btn btn-secondary">Previous</button>
        <button type="submit" className="btn btn-primary">Next</button>
      </div>
    </form>
  );
};

export default Step3;