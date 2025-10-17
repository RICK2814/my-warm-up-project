import pool from '../config/db';
import { Company } from '../models/company';

// Get company profile by ID
export const getCompanyById = async (id: number): Promise<Company | null> => {
  try {
    const result = await pool.query(
      `SELECT id, name, email, phone, address, city, state, country, pincode, 
              gst_number, pan_number, registration_number, incorporation_date, 
              website, logo_url, company_type, business_category, 
              business_description, status, verification_status, 
              created_at, updated_at 
       FROM companies 
       WHERE id = $1`,
      [id]
    );

    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    throw error;
  }
};

// Update company profile
export const updateCompany = async (id: number, updates: Partial<Company>): Promise<Company | null> => {
  try {
    // Build dynamic query
    const allowedFields = [
      'name', 'email', 'phone', 'address', 'city', 'state', 'country', 
      'pincode', 'gst_number', 'pan_number', 'registration_number', 
      'incorporation_date', 'website', 'company_type', 'business_category', 
      'business_description', 'logo_url'
    ];

    // Filter updates to only include allowed fields
    const filteredUpdates: any = {};
    allowedFields.forEach(field => {
      if (updates[field] !== undefined) {
        filteredUpdates[field] = updates[field];
      }
    });

    // Build SQL query dynamically
    const setClause = Object.keys(filteredUpdates)
      .map((field, index) => `${field} = $${index + 1}`)
      .join(', ');
    
    const values = Object.values(filteredUpdates);
    values.push(id); // For the WHERE clause

    const query = `
      UPDATE companies 
      SET ${setClause}, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $${values.length}
      RETURNING id, name, email, phone, address, city, state, country, pincode, 
                gst_number, pan_number, registration_number, incorporation_date, 
                website, logo_url, company_type, business_category, business_description
    `;

    const result = await pool.query(query, values);
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    throw error;
  }
};

// Check if email or phone already exists (excluding current company)
export const checkEmailOrPhoneExists = async (email: string, phone: string, excludeId?: number) => {
  try {
    let query = 'SELECT id FROM companies WHERE email = $1 OR phone = $2';
    const params = [email, phone];
    
    if (excludeId) {
      query += ' AND id != $3';
      params.push(excludeId);
    }
    
    const result = await pool.query(query, params);
    return result.rows.length > 0;
  } catch (error) {
    throw error;
  }
};