const { connect, connection } = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const MONGO_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
};

const MongodbConnect = async () => {
    try {
        await connect(MONGO_URI, MONGO_OPTIONS);
        console.log('Database from MongoDB connected');

        connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

        connection.on('disconnected', () => {
            console.warn('MongoDB disconnected. Attempting to reconnect...');
        });

        connection.on('reconnected', () => {
            console.log('MongoDB reconnected');
        });

        // Graceful shutdown
        process.on('SIGINT', async () => {
            try {
                await connection.close();
                console.log('MongoDB connection closed through app termination');
                process.exit(0);
            } catch (err) {
                console.error('Error during MongoDB disconnection:', err);
                process.exit(1);
            }
        });

    } catch (err) {
        console.error('Database connection error:', err.message);
        process.exit(1);
    }
};

module.exports = { MongodbConnect, connection };
