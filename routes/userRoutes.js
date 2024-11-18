var express = require("express");
var router = express.Router();
const modelUser = require("../models/user");
const Transpoter = require("../config/mail");
/* GET users listing. */
router.get("/test", function (req, res, next) {
  res.send("respond with a resource a user test");
});

// Add data
router.post("/add", async (req, res) => {
  try {
    const { email, username, password, role } = req.body;

    // Validate required fields
    if (!email || !username || !password || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate email format
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const model = new modelUser(req.body);
    const result = await model.save();

    if (result) {
      const mailOption = {
        from: "vocongnghiep03@gmail.com",
        to: model.email, // email user đăng ký
        subject: "AppMobile",
        text: "Chào bạn đến với ứng dụng của chúng tôi",
      };

      // Send email
      try {
        await Transpoter.sendMail(mailOption);
      } catch (emailError) {
        console.error("Email sending error: ", emailError);
        return res.status(500).json({ message: "Error sending email" });
      }

      res.json({ status: 200, message: "Add successfully", data: result });
    } else {
      res.json({ status: 400, message: "Add failed", data: [] });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
});

// get list
router.get("/list", async (req, res) => {
  const result = await modelUser.find({});

  try {
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});
// getByid
router.get("/getbyid/:id", async (req, res) => {
  try {
    const result = await modelUser.findById(req.params.id);
    if (result) {
      res.send(result);
    } else {
      res.json({ status: 400, message: "khong tim tay id", data: [] });
    }
  } catch (error) {
    if (error.name === "CastError") {
      res.json(404).send("inavalid id format");
    } else {
      console.log(error);
      res.status(500).send("internal server error");
    }
  }
});
// update
router.patch("/edit/:id", async (req, res) => {
  try {
    const result = await modelUser.findByIdAndUpdate(req.params.id, req.body);
    if (result) {
      const rs = await result.save();
      res.send(rs);
    } else {
      res.json({ status: 400, message: "khong tim tay id", data: [] });
    }
  } catch (error) {
    if (error.name === "CastError") {
      res.json(404).send("inavalid id format");
    } else {
      console.log(error);
      res.status(500).send("internal server error");
    }
  }
});
// delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const result = await modelUser.findByIdAndDelete(req.params.id);
    if (result) {
      res.json({
        status: 200,
        message: "xoa thanh cong",
        data: result,
      });
    } else {
      res.json({
        status: 400,
        message: "xoa that bai",
        data: [],
      });
    }
  } catch (error) {}
});
module.exports = router;
