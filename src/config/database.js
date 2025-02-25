const { connect} = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

const MONGO_URI = process.env.MONGO_URI
const MongodbConnect = async() => {
    try {
        await connect(MONGO_URI)
        console.log('Database from Mongodb connected');
    } catch (err) {
        console.error('Database connection error:', err.message);
        process.exit(1)
    }
}

module.exports = { MongodbConnect }
