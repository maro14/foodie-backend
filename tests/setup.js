const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const jwt = require('jsonwebtoken');

let mongoServer;

// Setup before all tests
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

// Cleanup after all tests
afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

// Clear database between tests
beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
        await collection.deleteMany({});
    }
});

// Test utilities
global.createTestUser = async (role = 'user') => {
    const user = {
        _id: new mongoose.Types.ObjectId(),
        username: 'testuser',
        email: 'test@example.com',
        role
    };

    const token = jwt.sign(
        { user_id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'test-secret',
        { expiresIn: '1h' }
    );

    return { user, token };
};

// Mock response utilities
global.mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

global.mockRequest = (body = {}, params = {}, user = null) => ({
    req: {
        body,
        params,
        user
    },
    res: mockResponse(),
    next: jest.fn()
});
