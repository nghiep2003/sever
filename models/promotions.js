const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PromotionSchema = new Schema({
  description: { type: String, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Promotion", PromotionSchema);
