var express = require("express");
var router = express.Router();
const modelSellerProducts = require("../models/sellerProduct");

/* GET users listing. */
router.get("/test", function (req, res, next) {
  res.send("respond with a resource a product test");
});

// Add data
router.post('/add', async (req, res) => {
  try {
    const model = new modelSellerProducts(req.body);
    const result = await model.save();
    res.json({ status: 200, message: "Add product successfully", data: result });
  } catch (error) {
    console.error("Error:", error);  // In lỗi chi tiết
    res.status(500).json({ status: 500, message: "Internal server error", error: error.message });
  }
});

// Get list of products
router.get("/list", async (req, res) => {
  try {
    const result = await modelSellerProducts.find({});
    res.json({ status: 200, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: "Internal server error", error: error.message });
  }
});

router.get("/getByidBrand", async (req, res) => {
  try {
    const result = await modelSellerProducts.find({}, 'name, price, name_pr, color, size, capacity, capacity, ' ).populate('brand_id type_id seller_id')
    res.json({ status: 200, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: "Internal server error", error: error.message });
  }
});

// Get product by ID
router.get("/getbyid/:id", async (req, res) => {
  try {
    const result = await modelSellerProducts.findById(req.params.id);
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
    const result = await modelSellerProducts.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
    const result = await modelSellerProducts.findByIdAndDelete(req.params.id);
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
