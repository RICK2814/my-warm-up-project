// Backend API Tests
import { describe, it, before, after } from 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import app from '../src/server'; // Assuming your Express app is exported from server.ts

describe('Company Registration & Verification API', () => {
  // Test data
  const testCompany = {
    name: 'Test Company',
    email: 'test@example.com',
    phone: '9876543210',
    password: 'testpassword123',
    address: '123 Test Street',
    city: 'Test City',
    state: 'Test State',
    country: 'Test Country',
    pincode: '123456',
    company_type: 'Private Limited',
    business_category: 'Technology',
    business_description: 'Test business description'
  };

  describe('POST /api/companies/register', () => {
    it('should register a new company', (done) => {
      request(app)
        .post('/api/companies/register')
        .send(testCompany)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('company');
          expect(res.body).to.have.property('token');
          expect(res.body.message).to.equal('Company registered successfully');
          expect(res.body.company).to.have.property('name', testCompany.name);
          expect(res.body.company).to.have.property('email', testCompany.email);
          done();
        });
    });

    it('should return 400 if required fields are missing', (done) => {
      request(app)
        .post('/api/companies/register')
        .send({ name: 'Test Company' }) // Missing required fields
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('message');
          done();
        });
    });

    it('should return 409 if company already exists', (done) => {
      // First registration
      request(app)
        .post('/api/companies/register')
        .send(testCompany)
        .end((err) => {
          if (err) return done(err);
          
          // Second registration with same email/phone should fail
          request(app)
            .post('/api/companies/register')
            .send(testCompany)
            .expect(409)
            .end((err, res) => {
              if (err) return done(err);
              expect(res.body).to.have.property('message');
              done();
            });
        });
    });
  });

  describe('POST /api/companies/login', () => {
    it('should login a company and return a token', (done) => {
      request(app)
        .post('/api/companies/login')
        .send({
          email: testCompany.email,
          password: testCompany.password
        })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('company');
          expect(res.body).to.have.property('token');
          expect(res.body.message).to.equal('Login successful');
          done();
        });
    });

    it('should return 400 if credentials are missing', (done) => {
      request(app)
        .post('/api/companies/login')
        .send({})
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('message');
          done();
        });
    });
  });

  describe('GET /api/companies/profile', () => {
    let token: string;

    before((done) => {
      // Login to get a token
      request(app)
        .post('/api/companies/login')
        .send({
          email: testCompany.email,
          password: testCompany.password
        })
        .end((err, res) => {
          if (err) return done(err);
          token = res.body.token;
          done();
        });
    });

    it('should return company profile when valid token is provided', (done) => {
      request(app)
        .get('/api/companies/profile')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('company');
          expect(res.body.company).to.have.property('email', testCompany.email);
          done();
        });
    });

    it('should return 401 if no token is provided', (done) => {
      request(app)
        .get('/api/companies/profile')
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('message');
          done();
        });
    });
  });
});