const mongoose = require('mongoose');

const dbConnect = () => {
    const url = process.env.MONGODB

    try {
        mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Database connected');
    } catch (err) {
        console.error('Database error');
    }
}

module.exports = dbConnect