const db = require('../config/db');
const multer = require('multer');
const path = require('path');
const { buildCustomerFilters, buildOrderFilters } = require('../utils/adminFilters');

// ================= MULTER SETUP =================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// ================= LOGIN =================
exports.login = (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@nettec.lk' && password === '123456') {
    return res.redirect('/admin/dashboard');
  } else {
    return res.render('admin/login', {
      error: 'Invalid credentials',
      activePage: 'login',
      pageTitle: 'Admin Login'
    });
  }
};

// ================= DASHBOARD =================
exports.dashboard = async (req, res) => {
  try {
    const [orders] = await db.query('SELECT COUNT(*) AS count FROM orders');
    const [products] = await db.query('SELECT COUNT(*) AS count FROM products');
    const [customers] = await db.query('SELECT COUNT(*) AS count FROM customers');
    const [revenue] = await db.query('SELECT SUM(total) AS total FROM orders');

    res.render('admin/dashboard', {
      pageTitle: 'Dashboard Overview',
      activePage: 'dashboard',
      stats: {
        revenue: revenue[0].total || 0,
        orders: orders[0].count || 0,
        customers: customers[0].count || 0,
        products: products[0].count || 0
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
};

// ================= PRODUCTS =================
exports.getProducts = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products ORDER BY id DESC');
    res.render('admin/products', {
      pageTitle: 'Product Inventory',
      activePage: 'products',
      products: rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
};

exports.addProductPage = (req, res) => {
  res.render('admin/addProduct', {
    pageTitle: 'Add Product',
    activePage: 'products'
  });
};

exports.addProduct = [
  upload.single('image'),
  async (req, res) => {
    try {
      const { name, category, price, stock, status } = req.body;
      const image = req.file ? req.file.filename : null;
      await db.query(
        'INSERT INTO products (name, category, price, stock, status, image) VALUES (?, ?, ?, ?, ?, ?)',
        [name, category, price, stock, status, image]
      );
      res.redirect('/admin/products');
    } catch (err) {
      console.error(err);
      res.status(500).send('Failed to add product');
    }
  }
];

exports.editProductPage = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM products WHERE id=?', [id]);
    if (rows.length === 0) return res.status(404).send('Product not found');
    res.render('admin/editProduct', {
      pageTitle: 'Edit Product',
      activePage: 'products',
      product: rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
};

exports.updateProduct = [
  upload.single('image'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { name, category, price, stock, status, oldImage } = req.body;
      const image = req.file ? req.file.filename : oldImage;
      await db.query(
        'UPDATE products SET name=?, category=?, price=?, stock=?, status=?, image=? WHERE id=?',
        [name, category, price, stock, status, image, id]
      );
      res.redirect('/admin/products');
    } catch (err) {
      console.error(err);
      res.status(500).send('Failed to update product');
    }
  }
];

exports.deleteProduct = async (req, res) => {
  try {
    await db.query('DELETE FROM products WHERE id=?', [req.params.id]);
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};

// ================= CUSTOMERS =================
exports.getCustomers = async (req, res) => {
  try {
    const { whereClause, params, filters } = buildCustomerFilters(req.query);

    const [customers] = await db.query(
      `SELECT c.*,
              (SELECT COUNT(*) FROM orders o WHERE o.customer_id = c.id) AS totalOrders,
              COALESCE((SELECT SUM(o.total) FROM orders o WHERE o.customer_id = c.id), 0) AS totalSpent
       FROM customers c
       ${whereClause}
       ORDER BY c.id DESC`,
      params
    );

    const [[{ count: totalCustomers }]]  = await db.query('SELECT COUNT(*) AS count FROM customers');
    const [[{ count: activeCustomers }]] = await db.query("SELECT COUNT(*) AS count FROM customers WHERE status='active'");
    const [[{ count: blockedCustomers }]]= await db.query("SELECT COUNT(*) AS count FROM customers WHERE status='blocked'");
    const [[{ count: newCustomers }]]    = await db.query(
      'SELECT COUNT(*) AS count FROM customers WHERE MONTH(created_at) = MONTH(CURRENT_DATE()) AND YEAR(created_at) = YEAR(CURRENT_DATE())'
    );

    res.render('admin/customers', {
      pageTitle: 'Customer Management',
      activePage: 'customers',
      customers,
      totalCustomers,
      activeCustomers,
      blockedCustomers,
      newCustomers,
      filters
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
};

// ================= ORDERS =================
exports.getOrders = async (req, res) => {
  try {
    const { whereClause, params, filters } = buildOrderFilters(req.query);

    // Use INNER JOIN when searching by name so the WHERE on c.name works correctly.
    // For all other cases LEFT JOIN still returns orders without a matched customer.
    const hasSearch = filters.search && filters.search.length > 0;
    const joinType  = hasSearch ? 'INNER JOIN' : 'LEFT JOIN';

    const [orders] = await db.query(
      `SELECT o.id, o.customer_id, o.total, o.status, o.created_at, c.name AS customerName
       FROM orders o ${joinType} customers c ON o.customer_id = c.id
       ${whereClause}
       ORDER BY o.id DESC`,
      params
    );

    // Summary counts always from full table — never affected by filter
    const [[{ count: totalOrders }]]     = await db.query('SELECT COUNT(*) AS count FROM orders');
    const [[{ count: completedOrders }]] = await db.query("SELECT COUNT(*) AS count FROM orders WHERE status='completed'");
    const [[{ count: pendingOrders }]]   = await db.query("SELECT COUNT(*) AS count FROM orders WHERE status='pending'");
    const [[{ count: cancelledOrders }]] = await db.query("SELECT COUNT(*) AS count FROM orders WHERE status='cancelled'");

    res.render('admin/order', {
      pageTitle: 'Order Management',
      activePage: 'orders',
      orders: orders.map((o) => ({ ...o, date: o.created_at })),
      totalOrders,
      completedOrders,
      pendingOrders,
      cancelledOrders,
      filters
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
};

// ================= ADD ORDER =================
exports.addOrderPage = async (req, res) => {
  try {
    const [customers] = await db.query('SELECT id, name FROM customers ORDER BY name ASC');
    return res.render('admin/addOrder', {
      pageTitle: 'Add Order',
      activePage: 'orders',
      customers
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Database error');
  }
};

exports.addOrder = async (req, res) => {
  try {
    const { customer_id, total, status } = req.body;
    await db.query(
      'INSERT INTO orders (customer_id, total, status) VALUES (?, ?, ?)',
      [customer_id, total, status || 'pending']
    );
    return res.redirect('/admin/orders');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Failed to add order');
  }
};

exports.viewOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(
      `SELECT o.id, o.customer_id, o.total, o.status, o.created_at,
              c.name AS customerName, c.email, c.phone
       FROM orders o LEFT JOIN customers c ON o.customer_id = c.id
       WHERE o.id = ?`,
      [id]
    );
    if (!rows.length) return res.status(404).send('Order not found');
    return res.render('admin/viewOrder', {
      pageTitle: `Order #${rows[0].id}`,
      activePage: 'orders',
      order: rows[0]
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Database error');
  }
};

exports.editOrderPage = async (req, res) => {
  try {
    const { id } = req.params;
    const [orders] = await db.query('SELECT * FROM orders WHERE id = ?', [id]);
    if (!orders.length) return res.status(404).send('Order not found');
    const [customers] = await db.query('SELECT id, name FROM customers ORDER BY name ASC');
    return res.render('admin/editOrder', {
      pageTitle: 'Edit Order',
      activePage: 'orders',
      order: orders[0],
      customers
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Database error');
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { customer_id, total, status } = req.body;
    await db.query(
      'UPDATE orders SET customer_id = ?, total = ?, status = ? WHERE id = ?',
      [customer_id, total, status, id]
    );
    return res.redirect('/admin/orders');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Failed to update order');
  }
};

exports.deleteOrderPage = async (req, res) => {
  try {
    await db.query('DELETE FROM orders WHERE id = ?', [req.params.id]);
    return res.redirect('/admin/orders');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Database error');
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await db.query('DELETE FROM orders WHERE id = ?', [req.params.id]);
    return res.json({ success: true, message: 'Order deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
};

// ================= ADD CUSTOMER =================
exports.addCustomerPage = (req, res) => {
  return res.render('admin/addCustomer', {
    pageTitle: 'Add Customer',
    activePage: 'customers'
  });
};

exports.addCustomer = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    await db.query(
      'INSERT INTO customers (name, email, phone, address) VALUES (?, ?, ?, ?)',
      [name, email, phone, address]
    );
    return res.redirect('/admin/customers');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Failed to add customer');
  }
};

exports.editCustomerPage = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM customers WHERE id = ?', [id]);
    if (!rows.length) return res.status(404).send('Customer not found');
    return res.render('admin/editCustomer', {
      pageTitle: 'Edit Customer',
      activePage: 'customers',
      customer: rows[0]
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Database error');
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;
    await db.query(
      'UPDATE customers SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?',
      [name, email, phone, address, id]
    );
    return res.redirect('/admin/customers');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Failed to update customer');
  }
};

exports.deleteCustomerPage = async (req, res) => {
  try {
    await db.query('DELETE FROM customers WHERE id = ?', [req.params.id]);
    return res.redirect('/admin/customers');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Database error');
  }
};

// ================= REPORTS =================
exports.getReports = async (req, res) => {
  try {
    const { whereClause, params, filters } = buildOrderFilters(req.query);

    const hasSearch = filters.search && filters.search.length > 0;
    const joinType  = hasSearch ? 'INNER JOIN' : 'LEFT JOIN';

    const [reports] = await db.query(
      `SELECT o.id AS orderId, o.total, o.status, o.created_at AS date, c.name AS customerName
       FROM orders o ${joinType} customers c ON o.customer_id = c.id
       ${whereClause}
       ORDER BY o.created_at DESC`,
      params
    );

    // Summary counts always from full table — never affected by filter
    const [[{ count: totalOrders }]]     = await db.query('SELECT COUNT(*) AS count FROM orders');
    const [[{ count: completedOrders }]] = await db.query("SELECT COUNT(*) AS count FROM orders WHERE status='completed'");
    const [[{ count: pendingOrders }]]   = await db.query("SELECT COUNT(*) AS count FROM orders WHERE status='pending'");
    const [[{ count: cancelledOrders }]] = await db.query("SELECT COUNT(*) AS count FROM orders WHERE status='cancelled'");

    res.render('admin/reports', {
      pageTitle: 'Reports',
      activePage: 'reports',
      reports,
      totalOrders,
      completedOrders,
      pendingOrders,
      cancelledOrders,
      filters
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
};
// GET PRODUCT BY ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.json(rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
};