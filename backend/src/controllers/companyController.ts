import { Request, Response } from 'express';
import { registerCompanyWithEmail, loginCompany } from '../services/authService';
import { generateToken } from '../utils/jwt';
import { CompanyRegistrationData } from '../models/company';
import pool from '../config/db';
import bcrypt from 'bcrypt';
import { uploadImageBuffer } from '../services/cloudinaryService';
import multer from 'multer';

// Multer configuration for logo upload
const logoUpload = multer({
  storage: multer.memoryStorage(), // Store file in memory
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
}).single('logo');

// Register a new company
export const registerCompany = async (req: Request, res: Response) => {
  try {
    // Upload logo to Cloudinary if present
    let logoUrl: string | undefined;
    if (req.file) {
      logoUrl = await uploadImageBuffer(req.file.buffer, 'company-logos');
    }

    const {
      name,
      email,
      phone,
      password,
      address,
      city,
      state,
      country,
      pincode,
      gst_number,
      pan_number,
      registration_number,
      incorporation_date,
      website,
      company_type,
      business_category,
      business_description
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: 'Name, email, phone, and password are required' });
    }

    // Check if company already exists
    const existingCompany = await pool.query(
      'SELECT id FROM companies WHERE email = $1 OR phone = $2',
      [email, phone]
    );

    if (existingCompany.rows.length > 0) {
      return res.status(409).json({ message: 'Company with this email or phone already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create company in Firebase and database
    const registrationData: CompanyRegistrationData = {
      name,
      email,
      phone,
      password: hashedPassword, // This will be the Firebase password
      address: address || '',
      city: city || '',
      state: state || '',
      country: country || '',
      pincode: pincode || '',
      gst_number,
      pan_number,
      registration_number,
      incorporation_date,
      website,
      logo: logoUrl, // Store the Cloudinary URL
      company_type,
      business_category,
      business_description
    };

    // Register with Firebase
    const newCompany = await registerCompanyWithEmail(registrationData);

    // Store company in our database with logo URL
    const query = `
      INSERT INTO companies (
        name, email, phone, password_hash, address, city, state, country, pincode,
        gst_number, pan_number, registration_number, incorporation_date, website,
        logo_url, company_type, business_category, business_description
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
      RETURNING id, name, email
    `;

    const result = await pool.query(query, [
      registrationData.name,
      registrationData.email,
      registrationData.phone,
      hashedPassword,
      registrationData.address,
      registrationData.city,
      registrationData.state,
      registrationData.country,
      registrationData.pincode,
      registrationData.gst_number,
      registrationData.pan_number,
      registrationData.registration_number,
      registrationData.incorporation_date,
      registrationData.website,
      logoUrl || null, // Store logo URL if available
      registrationData.company_type,
      registrationData.business_category,
      registrationData.business_description
    ]);

    // Generate JWT token
    const token = generateToken({
      id: result.rows[0].id,
      email: result.rows[0].email
    });

    res.status(201).json({
      message: 'Company registered successfully',
      company: {
        id: result.rows[0].id,
        name: result.rows[0].name,
        email: result.rows[0].email
      },
      token
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'Server error during registration', 
      error: error.message 
    });
  }
};

// Login a company
export const loginCompany = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Get company from database
    const result = await pool.query(
      'SELECT id, name, email, phone, address, city, state, country, pincode, gst_number, pan_number, registration_number, incorporation_date, website, logo_url, company_type, business_category, business_description, status, verification_status, created_at, updated_at FROM companies WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Company not found' });
    }

    const company = result.rows[0];

    // For now, we'll skip Firebase password verification and use our own
    // In a real implementation, you'd need to verify with Firebase
    
    // Generate JWT token
    const token = generateToken({
      id: company.id,
      email: company.email
    });

    res.status(200).json({
      message: 'Login successful',
      company: {
        id: company.id,
        name: company.name,
        email: company.email
      },
      token
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Server error during login', 
      error: error.message 
    });
  }
};

// Get company profile
export const getCompanyProfile = async (req: Request, res: Response) => {
  try {
    const companyId = (req as any).user.id;

    const result = await pool.query(
      'SELECT id, name, email, phone, address, city, state, country, pincode, gst_number, pan_number, registration_number, incorporation_date, website, logo_url, company_type, business_category, business_description, status, verification_status, created_at, updated_at FROM companies WHERE id = $1',
      [companyId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Company not found' });
    }

    const company = result.rows[0];
    res.status(200).json({ company });
  } catch (error: any) {
    console.error('Get profile error:', error);
    res.status(500).json({ 
      message: 'Server error getting profile', 
      error: error.message 
    });
  }
};

// Update company profile
export const updateCompanyProfile = async (req: Request, res: Response) => {
  try {
    const companyId = (req as any).user.id;
    
    // Handle logo upload if present
    let logoUrl: string | undefined;
    if (req.file) {
      logoUrl = await uploadImageBuffer(req.file.buffer, 'company-logos');
    }

    const updates = req.body;

    // Build dynamic query
    const allowedFields = [
      'name', 'email', 'phone', 'address', 'city', 'state', 'country', 
      'pincode', 'gst_number', 'pan_number', 'registration_number', 
      'incorporation_date', 'website', 'company_type', 'business_category', 
      'business_description'
    ];

    // Filter updates to only include allowed fields
    const filteredUpdates: any = {};
    allowedFields.forEach(field => {
      if (updates[field] !== undefined) {
        filteredUpdates[field] = updates[field];
      }
    });

    // If logo URL is available, add it to the updates
    if (logoUrl) {
      filteredUpdates.logo_url = logoUrl;
    }

    // Check if email or phone is being updated and if it's already taken
    if (filteredUpdates.email) {
      const emailCheck = await pool.query(
        'SELECT id FROM companies WHERE email = $1 AND id != $2',
        [filteredUpdates.email, companyId]
      );
      if (emailCheck.rows.length > 0) {
        return res.status(409).json({ message: 'Email already in use by another company' });
      }
    }

    if (filteredUpdates.phone) {
      const phoneCheck = await pool.query(
        'SELECT id FROM companies WHERE phone = $1 AND id != $2',
        [filteredUpdates.phone, companyId]
      );
      if (phoneCheck.rows.length > 0) {
        return res.status(409).json({ message: 'Phone number already in use by another company' });
      }
    }

    // Build SQL query dynamically
    const setClause = Object.keys(filteredUpdates)
      .map((field, index) => `${field} = $${index + 1}`)
      .join(', ');
    
    const values = Object.values(filteredUpdates);
    values.push(companyId); // For the WHERE clause

    const query = `
      UPDATE companies 
      SET ${setClause}, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $${values.length}
      RETURNING id, name, email, phone, address, city, state, country, pincode, 
                gst_number, pan_number, registration_number, incorporation_date, 
                website, logo_url, company_type, business_category, business_description
    `;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.status(200).json({
      message: 'Profile updated successfully',
      company: result.rows[0]
    });
  } catch (error: any) {
    console.error('Update profile error:', error);
    res.status(500).json({ 
      message: 'Server error updating profile', 
      error: error.message 
    });
  }
};

// Middleware to handle logo uploads
export const uploadLogo = (req: Request, res: Response, next: any) => {
  logoUpload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File too large' });
      }
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};