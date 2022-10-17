const mongoose = require('mongoose');
const { Schema } = mongoose;

const accountSchema = new Schema({
    username: String,
    password: String,
    score: {
        type: Number, default: 0
    },
    level: {
        type: Number, default: 1
    },
    lastAuthentication: Date,
});

mongoose.model('accounts', accountSchema);