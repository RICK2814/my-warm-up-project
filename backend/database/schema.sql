-- Company Registration & Verification Module Database Schema

-- Companies table
CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    pincode VARCHAR(10),
    gst_number VARCHAR(50),
    pan_number VARCHAR(50),
    registration_number VARCHAR(100),
    incorporation_date DATE,
    website VARCHAR(255),
    logo_url TEXT,
    company_type VARCHAR(100),
    business_category VARCHAR(100),
    business_description TEXT,
    status VARCHAR(50) DEFAULT 'active',
    verification_status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company documents table
CREATE TABLE company_documents (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    document_type VARCHAR(100) NOT NULL,
    document_url TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company verification logs table
CREATE TABLE verification_logs (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    verification_type VARCHAR(50) NOT NULL, -- email, phone, document
    status VARCHAR(50) NOT NULL,
    verified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT
);

-- Company sessions table (for JWT tracking if needed)
CREATE TABLE company_sessions (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    session_token VARCHAR(500) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Indexes for better performance
CREATE INDEX idx_companies_email ON companies(email);
CREATE INDEX idx_companies_phone ON companies(phone);
CREATE INDEX idx_companies_status ON companies(status);
CREATE INDEX idx_companies_verification_status ON companies(verification_status);
CREATE INDEX idx_company_documents_company_id ON company_documents(company_id);
CREATE INDEX idx_verification_logs_company_id ON verification_logs(company_id);