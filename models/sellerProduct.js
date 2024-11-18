const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sellerProductSchema = new Schema({
    seller_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    price: { type: Number, required: true },  // Giá sản phẩm của seller
    stock_quantity: { type: Number, default: 0 },  // Số lượng tồn kho của sản phẩm
    status: { 
        type: String, 
        enum: ['active', 'inactive'], 
        default: 'active' 
    },  // Trạng thái của sản phẩm (đang bán hoặc không)
}, { timestamps: true });

module.exports = mongoose.model('SellerProduct', sellerProductSchema);
