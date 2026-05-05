const db = require("../config/db");

exports.getAllProducts = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products ORDER BY id DESC");
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const [result] = await db.query("SELECT * FROM products WHERE id = ?", [id]);

    if (!result.length) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json(result[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Database error" });
  }
};
