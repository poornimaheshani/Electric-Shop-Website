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

// ================= TRACK ORDER =================
router.post("/track-order", async (req, res) => {
  const { orderNumber, email } = req.body;
  if (!orderNumber || !email) {
    return res.status(400).json({ message: "Order number and email are required." });
  }
  try {
    const query = `
      SELECT id, order_number, email, status, total, created_at
      FROM orders
      WHERE LOWER(order_number) = LOWER(?) AND LOWER(email) = LOWER(?)
    `;
    const [results] = await db.query(query, [orderNumber.trim(), email.trim()]);
    if (results.length === 0) {
      return res.status(404).json({ message: "Order not found." });
    }
    const order = results[0];
    return res.json({
      success: true,
      order: {
        orderNumber: order.order_number,
        email: order.email,
        status: order.status,
        total: order.total,
        createdAt: order.created_at,
      },
    });
  } catch (err) {
    console.error("Track Order DB Error:", err);
    return res.status(500).json({ message: "Server error. Please try again." });
  }
});

// ================= PLACE ORDER =================
router.post("/orders", async (req, res) => {
  const { customer, paymentMethod, cart, total } = req.body;

  // ✅ Convert cart object {} to array []
  const cartItems = Array.isArray(cart) ? cart : Object.values(cart || {});

  // ✅ Validation works with both formats
  if (!customer || !cartItems || cartItems.length === 0) {
    return res.status(400).json({ success: false, message: "Missing order data." });
  }

  const { name, email, phone, address } = customer;
  if (!name || !email || !phone || !address) {
    return res.status(400).json({ success: false, message: "All customer fields are required." });
  }

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // 1. Check if customer already exists by email
    const [existingCustomers] = await connection.query(
      "SELECT id FROM customers WHERE email = ? LIMIT 1",
      [email]
    );

    let customerId;

    if (existingCustomers.length > 0) {
      // Update existing customer details
      customerId = existingCustomers[0].id;
      await connection.query(
        "UPDATE customers SET name = ?, phone = ?, address = ?, updated_at = NOW() WHERE id = ?",
        [name, phone, address, customerId]
      );
    } else {
      // Insert new customer
      const [customerResult] = await connection.query(
        "INSERT INTO customers (name, email, phone, address, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())",
        [name, email, phone, address]
      );
      customerId = customerResult.insertId;
    }

    // 2. ✅ Generate NTE-YYYY0001 format order number
    const year = new Date().getFullYear();
    const [lastOrder] = await connection.query(
      `SELECT order_number FROM orders 
       WHERE order_number LIKE ? 
       ORDER BY id DESC LIMIT 1`,
      [`NTE-${year}%`]
    );

    let nextNum = 1;
    if (lastOrder.length > 0) {
      const lastNum = parseInt(
        lastOrder[0].order_number.replace(`NTE-${year}`, ""),
        10
      );
      if (!isNaN(lastNum)) nextNum = lastNum + 1;
    }

    const orderNumber = `NTE-${year}${String(nextNum).padStart(4, "0")}`;
    // Produces: NTE-20260001, NTE-20260002, NTE-20260003...

    // 3. Insert order
    const [orderResult] = await connection.query(
      `INSERT INTO orders (customer_id, order_number, email, total, status, payment_method, created_at, updated_at)
       VALUES (?, ?, ?, ?, 'pending', ?, NOW(), NOW())`,
      [customerId, orderNumber, email, total, paymentMethod]
    );
    const orderId = orderResult.insertId;

    // 4. ✅ Insert order items using cartItems array
    for (const item of cartItems) {
      await connection.query(
        `INSERT INTO order_items (order_id, product_id, product_name, qty, price, subtotal, created_at)
         VALUES (?, ?, ?, ?, ?, ?, NOW())`,
        [
          orderId,
          item.id || null,
          item.name || item.title || "Product",
          item.qty,
          Number(item.price),
          Number(item.price) * item.qty,
        ]
      );
    }

    await connection.commit();

    return res.json({
      success: true,
      message: "Order placed successfully!",
      orderNumber,
      orderId,
    });

  } catch (err) {
    await connection.rollback();
    console.error("Place Order Error:", err);
    return res.status(500).json({ success: false, message: "Failed to place order. Please try again." });
  } finally {
    connection.release();
  }
});

module.exports = router;