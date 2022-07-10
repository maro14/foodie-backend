const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect(process.env.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((conn) => {
        console.log('Database connect', conn);
    }).catch((err) => {
        console.error('Database error', err);
    });
}

module.exports = dbConnect