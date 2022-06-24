const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect('put url mongodb here').then((conn) => {
        console.log('Database connect', conn);
    }).catch((err) => {
        console.error('Database error', err);
    });
}

module.exports = dbConnect