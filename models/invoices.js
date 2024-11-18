const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Tham chiếu tới bảng User
    recipient_address: { type: String, required: true },  // Địa chỉ người nhận
    items: [{
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },  // Tham chiếu tới bảng Product
        quantity: { type: Number, required: true },  // Số lượng sản phẩm
        total: { type: Number, required: true },  // Tổng tiền của sản phẩm (quantity * price)
    }],
    total_amount: { type: Number, required: true },  // Tổng tiền của hóa đơn
    payment_method: { type: String, enum: ['tiền mặt', 'momo'], required: true },  // Phương thức thanh toán
}, { timestamps: true });

module.exports = mongoose.model('Invoice', invoiceSchema);
