var express = require("express");
var router = express.Router();
var modelUser = require('../models/user')
const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');  // Thêm bcrypt để mã hóa mật khẩu
const SECRET_KEY = "ADMIN";

// Đăng nhập
router.post("/checklogin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra xem email có tồn tại trong cơ sở dữ liệu không
    const user = await modelUser.findOne({ email });
    if (user) {
      // So sánh mật khẩu người dùng nhập với mật khẩu đã mã hóa trong DB
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (isPasswordCorrect) {
        // Mã hóa JWT token sau khi đăng nhập thành công
        const token = JWT.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
        const refreshToken = JWT.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1d' });

        return res.json({
          status: 200,
          message: "Đăng nhập thành công",
          data: user,
          token: token,
          refreshToken: refreshToken
        });
      } else {
        // Mật khẩu sai
        return res.status(401).json({
          status: 401,
          message: "Sai mật khẩu",
          data: []
        });
      }
    } else {
      // Không tìm thấy người dùng
      return res.status(404).json({
        status: 404,
        message: "Tài khoản không tồn tại",
        data: []
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Lỗi server",
      error: error.message
    });
  }
});

module.exports = router;
