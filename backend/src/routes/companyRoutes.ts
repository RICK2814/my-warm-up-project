import express from 'express';
import { registerCompany, loginCompany, getCompanyProfile, updateCompanyProfile, uploadLogo } from '../controllers/companyController';

const router = express.Router();

router.post('/register', uploadLogo, registerCompany);
router.post('/login', loginCompany);
router.get('/profile', getCompanyProfile);
router.put('/profile', uploadLogo, updateCompanyProfile);

export default router;