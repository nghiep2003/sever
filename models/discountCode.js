const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiscountCodeSchema = new Schema({
  code: { type: String, required: true, unique: true },
  discount_percentage: { type: Number, required: true, min: 0, max: 100 },
  expiration_date: { type: Date, required: true },
}, {
  timestamps: true,
});

module.exports = mongoose.model("DiscountCode", DiscountCodeSchema);
