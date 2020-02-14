const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    account_type: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    last_update: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema)