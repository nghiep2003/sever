const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name_pr: { type: String, unique: true }, // Tên sản phẩm

    brand_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand', // Tham chiếu đến bảng Brand
      required: true // Yêu cầu phải có brand_id
    },

    description: { type: String }, // Mô tả sản phẩm

    image_url: { type: Array, default: [] }, // Đường dẫn hình ảnh sản phẩm

    price: { type: Number }, // Giá sản phẩm

    type_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Type', // Tham chiếu đến bảng Type
      required: true,
      validate: {
        validator: async function(v) {
          const typeExists = await mongoose.models.Type.findById(v);
          return !!typeExists;  // Kiểm tra xem loại sản phẩm có tồn tại không
        },
        message: 'Type does not exist'
      }
    },

    color: { type: String, default: "" }, // Màu sắc của sản phẩm

    size: { type: String, default: "" }, // Kích thước của sản phẩm

    capacity: { type: String, default: "" }, // Dung tích (nếu có)

    quantity: { type: Number, default: 0 }, // Số lượng của sản phẩm

    seller_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Tham chiếu đến bảng User (người bán)
    }
  },
  { timestamps: true }
);

// Thêm chỉ mục unique cho trường `type_id`
productSchema.index({ type_id: 1 }, { unique: true });

// Export model
module.exports = mongoose.model('Product', productSchema);
