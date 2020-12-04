const mongoose = require('mongoose')

// id -> 24-character hexadecimal string
const userSchema = new mongoose.Schema({
    _id: { 
        type: String,
        required: true
    },
    username: {
        type: String, 
        required: true,
        unique: true
    },
    password: { 
        type: String,
        required: true
    },
    date: { 
        type: Date,
        default: Date.now
    },
    IP: { 
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Users', userSchema)