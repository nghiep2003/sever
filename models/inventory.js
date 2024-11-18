const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    restock_date: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);
