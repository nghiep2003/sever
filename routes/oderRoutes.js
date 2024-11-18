var express = require("express");
var router = express.Router();
const modelOder = require("../models/oder");
/* GET users listing. */
router.get("/test", function (req, res, next) {
  res.send("respond with a resource a user test");
});

//add data
router.post("/add", async (req, res) => {
  try {
    const model = new modelOder(req.body);
    const result = await model.save(); //thêm dữ liệu vào database
    if (result) {
      res.json({ status: 200, message: "add oder successflly", data: result });
    } else {
      res.json({ status: 400, message: "add oder fail", data: [] });
    }
  } catch (error) {
    console.log(error);
  }
});
// get list
router.get("/list", async (req, res) => {
  const result = await modelOder.find({},).populate({path:'items.product_id', select:'name_pr'});

  try {
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});
// getByid
router.get("/getbyid/:id", async (req, res) => {
  try {
    const result = await modelOder.findById(req.params.id);
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
    const result = await modelOder.findByIdAndUpdate(req.params.id, req.body);
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
    const result = await modelOder.findByIdAndDelete(req.params.id);
    if (result) {
      res.json({
        status: 200,
        message: "xoa thanh cong",
        data: result,
      });
    }else{
      res.json({
        status: 400,
        message: "xoa that bai",
        data: [],
      });
    }
  } catch (error) {}
});
module.exports = router;
