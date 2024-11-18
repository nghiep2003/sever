const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brandSchema = new Schema(
  {
    name: { type: String }, // Tên thương hiệu
    logo:{type:Array, default:[]},
    description: { type: String, default: "" }, // Mô tả thương hiệu
    country: { type: String, default: "" }, // Quốc gia của thương hiệu
  },
  { timestamps: true }
);

module.exports = mongoose.model("Brand", brandSchema);
