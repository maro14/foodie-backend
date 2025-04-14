const request = require('supertest');
const app = require('../../src/server');

describe('Authentication Endpoints', () => {
    describe('POST /users/register', () => {
        it('should register a new user', async () => {
            const res = await request(app)
                .post('/users/register')
                .send({
                    username: 'testuser',
                    email: 'test@example.com',
                    password: 'password123'
                });

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('token');
        });
    });

    describe('POST /users/login', () => {
        it('should login existing user', async () => {
            const res = await request(app)
                .post('/users/login')
                .send({
                    email: 'test@example.com',
                    password: 'password123'
                });

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('token');
        });
    });
});
