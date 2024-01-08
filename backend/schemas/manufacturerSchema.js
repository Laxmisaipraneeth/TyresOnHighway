const mongoose = require('mongoose');

const manuSchema = mongoose.Schema({
    username: String,
    password: String,
});

const manuUser = mongoose.model('manuUser', manuSchema);

module.exports = manuUser;