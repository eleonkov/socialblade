const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const statisticsSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    followers: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Statistics', statisticsSchema)