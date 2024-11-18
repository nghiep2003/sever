const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const atlat =
  "mongodb+srv://usernghiep:W2r8ZIPPLzs05Os2@mobileapp.86cxh.mongodb.net/myDataN3?retryWrites=true&w=majority&appName=MobileApp";
const connect = async () => {
  try {
    await mongoose.connect(atlat);
    console.log("connect success");
  } catch (error) {
    console.log("connect fail");
    console.log(console.error);
  }
};
module.exports = { connect };
