const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Product listing page
router.get("/", productController.getProducts);

// Product details page
router.get("/:id", productController.getProductDetails);

module.exports = router;