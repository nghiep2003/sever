var express = require("express");
var router = express.Router();
const modelBrand = require("../models/brandProduct");
const Uploads = require("../config/upload");

/* GET users listing. */
router.get("/test", function (req, res, next) {
  res.send("respond with a resource a brand test");
});

// Add data
router.post("/add", Uploads.array('logo', 10), async(req, res) =>{
      try {
        const {files}= req
        const urlImage = files.map((file) => `${req.protocol}://${req.get('host')}/ uploads/${file.filename}`)
        const model = new modelBrand(req.body);
        model.logo = urlImage;
    const result = await model.save(); // Thêm dữ liệu vào database
    if (result) {
      res.json({ status: 200, message: "Add brand successfully", data: result });
    } else {
      res.json({ status: 400, message: "Add brand failed", data: [] });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: "Internal server error", error: error.message });
  }
});

// Get list of products
router.get("/list", async (req, res) => {
  try {
    const result = await modelBrand.find({});
    res.json({ status: 200, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: "Internal server error", error: error.message });
  }
});

// Get product by ID
router.get("/getbyid/:id", async (req, res) => {
  try {
    const result = await modelBrand.findById(req.params.id);
    if (result) {
      res.json({ status: 200, data: result });
    } else {
      res.status(404).json({ status: 404, message: "Product not found", data: [] });
    }
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).json({ status: 400, message: "Invalid ID format" });
    } else {
      console.error(error);
      res.status(500).json({ status: 500, message: "Internal server error", error: error.message });
    }
  }
});

// Update product by ID
router.patch("/edit/:id", async (req, res) => {
  try {
    const result = await modelBrand.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (result) {
      res.json({ status: 200, message: "Product updated successfully", data: result });
    } else {
      res.status(404).json({ status: 404, message: "Product not found", data: [] });
    }
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).json({ status: 400, message: "Invalid ID format" });
    } else {
      console.error(error);
      res.status(500).json({ status: 500, message: "Internal server error", error: error.message });
    }
  }
});

// Delete product by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const result = await modelBrand.findByIdAndDelete(req.params.id);
    if (result) {
      res.json({ status: 200, message: "Product deleted successfully", data: result });
    } else {
      res.status(404).json({ status: 404, message: "Product not found", data: [] });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: "Internal server error", error: error.message });
  }
});

module.exports = router;
