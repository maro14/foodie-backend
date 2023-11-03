const { connect} = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

const MONGOURI = process.env.MONGO_URI || 'mongodb://localhost:27017/foodie'

const MongodbConnect = () => {
    try {
        connect( MONGOURI , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Database connected');
    } catch (err) {
        console.error('Database connection error:', err.message);
        process.exit(1)
    }
}

module.exports = { MongodbConnect }
