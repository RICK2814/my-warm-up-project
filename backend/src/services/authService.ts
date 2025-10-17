import admin from '../config/firebase';
import { CompanyRegistrationData } from '../models/company';
import pool from '../config/db';

// Register company with email/password
export const registerCompanyWithEmail = async (registrationData: CompanyRegistrationData) => {
  try {
    // Create Firebase user
    const userRecord = await admin.auth().createUser({
      email: registrationData.email,
      password: registrationData.password,
      phoneNumber: `+91${registrationData.phone}`, // Assuming Indian numbers
      displayName: registrationData.name,
    });

    // Store company data in our database
    const query = `
      INSERT INTO companies (
        name, email, phone, password_hash, address, city, state, country, pincode,
        gst_number, pan_number, registration_number, incorporation_date, website,
        company_type, business_category, business_description
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      RETURNING id
    `;

    const result = await pool.query(query, [
      registrationData.name,
      registrationData.email,
      registrationData.phone,
      userRecord.uid, // Store Firebase UID
      registrationData.address,
      registrationData.city,
      registrationData.state,
      registrationData.country,
      registrationData.pincode,
      registrationData.gst_number,
      registrationData.pan_number,
      registrationData.registration_number,
      registrationData.incorporation_date || null,
      registrationData.website,
      registrationData.company_type,
      registrationData.business_category,
      registrationData.business_description
    ]);

    return {
      id: result.rows[0].id,
      firebase_uid: userRecord.uid,
      email: registrationData.email,
      name: registrationData.name
    };
  } catch (error) {
    throw error;
  }
};

// Login company
export const loginCompany = async (email: string, password: string) => {
  try {
    // Verify credentials with Firebase
    // Note: For actual password verification, you'd need to use Firebase Auth client SDK
    // or verify password using Firebase REST API
    const userRecord = await admin.auth().getUserByEmail(email);
    
    return {
      id: userRecord.uid,
      email: userRecord.email,
      name: userRecord.displayName
    };
  } catch (error) {
    throw error;
  }
};

// Send OTP for phone verification
export const sendOTP = async (phoneNumber: string) => {
  try {
    // In a real implementation, we'd use Firebase Auth to send an SMS
    // This is a simplified version for demonstration
    
    // Generate a mock OTP for now
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    
    // In actual implementation, send this OTP via Firebase
    console.log(`OTP for ${phoneNumber}: ${otp}`);
    
    // Store OTP temporarily (in real app, use Redis or similar)
    // For demo purposes, we'll just return the OTP
    return otp;
  } catch (error) {
    throw error;
  }
};

// Verify OTP
export const verifyOTP = async (phoneNumber: string, otp: string) => {
  try {
    // In real implementation, verify the OTP using Firebase
    // For demo purposes, we'll assume any OTP is valid
    // In a real app, you would use the Firebase Auth API to verify the code
    
    return true;
  } catch (error) {
    throw error;
  }
};