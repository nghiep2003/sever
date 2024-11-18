const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const typeSchema = new Schema(
  {
    name: { type: String, required: true, unique: true }, // Tên loại sản phẩm
  },
  { timestamps: true }
);

module.exports = mongoose.model("Type", typeSchema);
