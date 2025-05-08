const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
dotenv.config();

/**
 * @module server
 * @description Main server file for the application.
 * @requires express
 * @requires morgan
 * @requires cors
 * @requires helmet
 * @requires dotenv
 * @requires routes/item
 * @requires routes/order
 * @requires routes/user
 * @requires config/database
 * @requires middlewares/error
 * @requires middlewares/auth
 * @requires middlewares/validation
 * @requires middlewares/response
 * @requires middlewares/logger
 * @requires middlewares/role
 * @requires middlewares/async
 * @requires middlewares/response
 * @requires middlewares/validation
 */
const itemsRouter = require('./routes/item');
const orderRouter = require('./routes/order');
const userRouter = require('./routes/user');
const { MongodbConnect } = require('./config/database');

const app = express();

// Security and middleware configurations
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(helmet());

// Health check route
app.get('/', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date(),
        uptime: process.uptime()
    });
});

// Routes
app.use('/items', itemsRouter);
app.use('/orders', orderRouter);
app.use('/users', userRouter);

// Global error handling
app.use((err, req, res,) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal server error',
            status: err.status || 500
        }
    });
});

// Handle 404 routes
app.use((req, res) => {
    res.status(404).json({ error: { message: 'Route not found' } });
});

const PORT = process.env.PORT || 3000;
let server;

// Database connection and server startup
const startServer = async () => {
    try {
        await MongodbConnect();
        server = app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
};

// Graceful shutdown
const shutdown = async () => {
    if (server) {
        console.log('Shutting down server...');
        await server.close();
        process.exit(0);
    }
};

// Handle shutdown signals
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    shutdown();
});

startServer();
