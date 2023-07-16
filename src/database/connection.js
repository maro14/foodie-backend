const { connect} = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

const MongodbConnect = () => {
    try {
        connect(process.env.MONGODB, {
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