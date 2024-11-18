const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const revenueSchema = new Schema({
    seller_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Revenue', revenueSchema);
