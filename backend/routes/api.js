const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const db = require("../config/db");

// ================= PRODUCTS =================
router.get("/products", productController.getAllProducts);
router.get("/products/:id", productController.getProductById);

// ================= CONTACT =================
router.post("/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Name, email and message are required." });
    }

    await db.query(
      "INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)",
      [name, email, subject || "", message]
    );

    return res.json({ success: true, message: "Thank you! Your message has been sent successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Something went wrong. Please try again." });
  }
});

module.exports = router;
