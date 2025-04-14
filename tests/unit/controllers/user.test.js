const User = require('../../../src/models/user');
const { register, logIn } = require('../../../src/controllers/user');

describe('User Controller', () => {
    describe('register', () => {
        it('should create a new user successfully', async () => {
            const req = mockRequest({
                body: {
                    username: 'testuser',
                    email: 'test@example.com',
                    password: 'password123'
                }
            });
            const res = mockResponse();

            await register(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Registration successful',
                    token: expect.any(String)
                })
            );
        });

        it('should return error for missing required fields', async () => {
            const req = mockRequest({
                body: {
                    username: 'testuser'
                }
            });
            const res = mockResponse();

            await register(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'All fields are required'
                })
            );
        });
    });

    describe('logIn', () => {
        beforeEach(async () => {
            await User.create({
                username: 'testuser',
                email: 'test@example.com',
                password: 'hashedPassword123'
            });
        });

        it('should login user successfully', async () => {
            const req = mockRequest({
                body: {
                    email: 'test@example.com',
                    password: 'password123'
                }
            });
            const res = mockResponse();

            await logIn(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Login successful',
                    token: expect.any(String)
                })
            );
        });
    });
});
