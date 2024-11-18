const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentManagementSchema = new Schema({
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    payment_method: { type: String, enum: ['thanh toán sau khi nhận hàng', 'ví momo'], required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('PaymentManagement', paymentManagementSchema);
