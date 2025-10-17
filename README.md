# Company Registration & Verification Module

## Overview
The Company Registration & Verification Module is a web application designed to enable companies to register, log in, and manage their profiles through a secure, scalable, and responsive interface. The module includes a multi-step registration form displayed in the dashboard post-registration, with profile details editable in the settings section.

## Features
- **Multi-step Registration**: Complete company registration process with validation
- **User Authentication**: Secure login with JWT tokens
- **Profile Management**: Update company details and settings
- **File Upload**: Logo upload with Cloudinary integration
- **Responsive Design**: Works on all device sizes
- **Database Management**: PostgreSQL with normalized schema
- **API Security**: Firebase authentication with email/password

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

## Prerequisites
- Node.js (v14 or higher)
- PostgreSQL
- Firebase account
- Cloudinary account

## Installation

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
   or for development:
   ```bash
   npm run dev
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
- `companies` - Core company information
- `company_documents` - Document storage references
- `verification_logs` - Track verification status

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

## Testing
### Backend Tests
```bash
npm test
```

### Frontend Tests
```bash
npm test
```

## Deployment
### Backend
1. Set up environment variables in your production environment
2. Build the project: `npm run build`
3. Start the server: `npm start`

### Frontend
1. Build the project: `npm run build`
2. Serve the `build` directory with a static file server

## Project Structure
```
├── backend/              # Backend Express application
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── models/       # Data models
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Middleware functions
│   │   ├── services/     # Business logic
│   │   └── utils/        # Utility functions
│   ├── database/         # Database schema
│   └── tests/            # Backend tests
├── frontend/             # React frontend application
│   ├── src/
│   │   ├── components/   # React components
│   │   │   ├── Auth/     # Authentication components
│   │   │   ├── Dashboard/ # Dashboard components
│   │   │   ├── Registration/ # Registration components
│   │   │   └── Settings/ # Settings components
│   │   ├── css/          # CSS stylesheets
│   │   └── pages/        # Page components
│   └── public/           # Public assets
├── docs/                 # Documentation
└── tests/                # Additional tests
```

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

## Contributing
Please contact the project owner for contribution guidelines.

## Support
For support, please contact the development team.