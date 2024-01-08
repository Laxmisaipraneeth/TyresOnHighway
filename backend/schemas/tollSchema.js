// tollSchema.js
const mongoose = require('mongoose');

const tollSchema = mongoose.Schema({
    username: String,
    password: String,
    location: String
});

const tollUser = mongoose.model('tollUser', tollSchema);

module.exports = tollUser;
