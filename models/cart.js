const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{ 
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
        quantity: { type: Number, required: true }
    }],
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
