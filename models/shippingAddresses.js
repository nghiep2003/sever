const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shippingAddressSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recipient_name: { type: String, required: true },
    phone_number: { type: String, required: true },
    address_line: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    ward: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('ShippingAddress', shippingAddressSchema);
