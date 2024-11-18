const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSupportSchema = new Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  response: { type: String, default: "" },
}, {
  timestamps: true,
});

module.exports = mongoose.model("CustomerSupport", CustomerSupportSchema);
