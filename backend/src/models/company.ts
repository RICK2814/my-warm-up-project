export interface Company {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  gst_number: string;
  pan_number: string;
  registration_number: string;
  incorporation_date: string;
  website: string;
  logo_url: string;
  company_type: string;
  business_category: string;
  business_description: string;
  status: string;
  verification_status: string;
  created_at: Date;
  updated_at: Date;
}

export interface CompanyRegistrationData {
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
  logo?: string;
  company_type?: string;
  business_category?: string;
  business_description?: string;
}