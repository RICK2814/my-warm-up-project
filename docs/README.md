# Company Registration & Verification Module

## Project Overview

The Company Registration & Verification Module is a web application designed to enable companies to register, log in, and manage their profiles through a secure, scalable, and responsive interface. The module includes a multi-step registration form displayed in the dashboard post-registration, with profile details editable in the settings section.

## Features

- **Company Registration**: Multi-step registration form with validation
- **User Authentication**: Secure login with JWT tokens
- **Profile Management**: Update company details and settings
- **File Upload**: Logo upload with Cloudinary integration
- **Responsive Design**: Works on all device sizes
- **Database Management**: PostgreSQL with normalized schema
- **API Security**: Firebase authentication with email/password and SMS OTP

## Tech Stack

### Frontend
- React with TypeScript
- React Router for navigation
- CSS for styling

### Backend
- Node.js with Express
- TypeScript
- PostgreSQL database
- Firebase Admin for authentication
- Cloudinary for image storage
- JWT for session management
- Multer for file uploads

## Installation

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL
- Firebase account
- Cloudinary account

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=company_db
   DB_USER=your_username
   DB_PASSWORD=your_password

   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=7d

   # Firebase Configuration
   FIREBASE_TYPE=
   FIREBASE_PROJECT_ID=
   FIREBASE_PRIVATE_KEY_ID=
   FIREBASE_PRIVATE_KEY=
   FIREBASE_CLIENT_EMAIL=
   FIREBASE_CLIENT_ID=
   FIREBASE_AUTH_URI=
   FIREBASE_TOKEN_URI=
   FIREBASE_AUTH_PROVIDER_X509_CERT_URL=
   FIREBASE_CLIENT_X509_CERT_URL=

   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=
   ```

4. Initialize the database with the schema from `database/schema.sql`

5. Build the project:
   ```bash
   npm run build
   ```

6. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/companies/register` - Register a new company
- `POST /api/companies/login` - Login a company

### Profile Management
- `GET /api/companies/profile` - Get company profile (requires authentication)
- `PUT /api/companies/profile` - Update company profile (requires authentication)

## Database Schema

The application uses the following tables:

### companies
- id (SERIAL PRIMARY KEY)
- name (VARCHAR(255) NOT NULL)
- email (VARCHAR(255) UNIQUE NOT NULL)
- phone (VARCHAR(20) UNIQUE NOT NULL)
- password_hash (VARCHAR(255) NOT NULL)
- address (TEXT)
- city (VARCHAR(100))
- state (VARCHAR(100))
- country (VARCHAR(100))
- pincode (VARCHAR(10))
- gst_number (VARCHAR(50))
- pan_number (VARCHAR(50))
- registration_number (VARCHAR(100))
- incorporation_date (DATE)
- website (VARCHAR(255))
- logo_url (TEXT)
- company_type (VARCHAR(100))
- business_category (VARCHAR(100))
- business_description (TEXT)
- status (VARCHAR(50) DEFAULT 'active')
- verification_status (VARCHAR(50) DEFAULT 'pending')
- created_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
- updated_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP)

### company_documents
- id (SERIAL PRIMARY KEY)
- company_id (INTEGER REFERENCES companies(id) ON DELETE CASCADE)
- document_type (VARCHAR(100) NOT NULL)
- document_url (TEXT NOT NULL)
- uploaded_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP)

### verification_logs
- id (SERIAL PRIMARY KEY)
- company_id (INTEGER REFERENCES companies(id) ON DELETE CASCADE)
- verification_type (VARCHAR(50) NOT NULL) - email, phone, document
- status (VARCHAR(50) NOT NULL)
- verified_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
- notes (TEXT)

## Testing

### Backend Tests
```bash
npm test
```

### Frontend Tests
```bash
npm test
```

## Environment Variables

### Backend
- `DB_HOST` - PostgreSQL host
- `DB_PORT` - PostgreSQL port
- `DB_NAME` - PostgreSQL database name
- `DB_USER` - PostgreSQL username
- `DB_PASSWORD` - PostgreSQL password
- `JWT_SECRET` - Secret key for JWT signing
- `JWT_EXPIRES_IN` - JWT expiration time
- `FIREBASE_*` - Firebase configuration variables
- `CLOUDINARY_*` - Cloudinary configuration variables

## Development

### Backend Development
- Use `npm run dev` to start the development server with hot reload

### Frontend Development
- Use `npm start` to start the development server with hot reload

## Deployment

### Backend
1. Set up environment variables in your production environment
2. Build the project: `npm run build`
3. Start the server: `npm start`

### Frontend
1. Build the project: `npm run build`
2. Serve the `build` directory with a static file server

## Security Considerations

- All API endpoints requiring authentication require a valid JWT token
- Passwords are hashed using bcrypt
- File uploads are validated for type and size
- SQL injection is prevented through parameterized queries
- Firebase handles authentication securely

## NDA Compliance

This project was developed under an NDA with Bluestock Fintech. All code and documentation are confidential and proprietary to Bluestock Fintech.

## License

Proprietary and confidential. Do not distribute without explicit permission.