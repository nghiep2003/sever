const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    phone_number: { type: String, unique: true, default: '' },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    address: { type: String, default: '' },
    avatar:{type: String,  default: ''},
    role: { type: String, enum: ['user', 'seller', 'admin'], default: 'user' },  // Phân biệt người dùng
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
