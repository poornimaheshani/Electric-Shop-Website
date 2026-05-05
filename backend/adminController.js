const db = require('../config/db');
const multer = require('multer');
const path = require('path');
const { buildCustomerFilters, buildOrderFilters } = require('../utils/adminFilters');

const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, 'public/uploads/'); },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + Math.round(Math.random() * 1e6) + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

exports.login = (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@nettec.lk' && password === '123456') {
    return res.redirect('/admin/dashboard');
  }
  return res.render('admin/login', { error: 'Invalid credentials', activePage: 'login', pageTitle: 'Admin Login' });
};

exports.dashboard = async (req, res) => {
  try {
    const [[{ count: totalOrders }]]     = await db.query('SELECT COUNT(*) AS count FROM orders');
    const [[{ count: totalProducts }]]   = await db.query('SELECT COUNT(*) AS count FROM products');
    const [[{ count: totalCustomers }]]  = await db.query('SELECT COUNT(*) AS count FROM customers');
    const [[{ total: totalRevenue }]]    = await db.query("SELECT COALESCE(SUM(total),0) AS total FROM orders WHERE status='completed'");
    const [[{ count: pendingOrders }]]   = await db.query("SELECT COUNT(*) AS count FROM orders WHERE status='pending'");
    const [[{ count: completedOrders }]] = await db.query("SELECT COUNT(*) AS count FROM orders WHERE status='completed'");
    const [[{ count: cancelledOrders }]] = await db.query("SELECT COUNT(*) AS count FROM orders WHERE status='cancelled'");
    const [recentOrders] = await db.query(
      `SELECT o.id, o.total, o.status, o.created_at, c.name AS customerName
       FROM orders o LEFT JOIN customers c ON o.customer_id = c.id ORDER BY o.id DESC LIMIT 5`
    );
    res.render('admin/dashboard', {
      pageTitle: 'Dashboard Overview', activePage: 'dashboard', pendingOrders, recentOrders,
      stats: { revenue: totalRevenue||0, orders: totalOrders||0, customers: totalCustomers||0, products: totalProducts||0, pendingOrders: pendingOrders||0, completedOrders: completedOrders||0, cancelledOrders: cancelledOrders||0 }
    });
  } catch (err) { console.error(err); res.status(500).send('Database error'); }
};

exports.getProducts = async (req, res) => {
  try {
    const [[{ count: pendingOrders }]] = await db.query("SELECT COUNT(*) AS count FROM orders WHERE status='pending'");
    const [rows] = await db.query('SELECT * FROM products ORDER BY id DESC');
    res.render('admin/products', { pageTitle: 'Product Inventory', activePage: 'products', pendingOrders, products: rows });
  } catch (err) { console.error(err); res.status(500).send('Database error'); }
};

exports.addProductPage = (req, res) => {
  res.render('admin/addProduct', { pageTitle: 'Add Product', activePage: 'products', pendingOrders: 0 });
};

// ✅ ADD PRODUCT
exports.addProduct = [
  upload.array('images', 5),
  async (req, res) => {
    try {
      const { name, category, price, stock, status, discount_percent, discount_price } = req.body;

      let imageValue = null;
      if (req.files && req.files.length > 0) {
        const filenames = req.files.map(f => f.filename);
        imageValue = filenames.length === 1 ? filenames[0] : JSON.stringify(filenames);
      }

      const discPct   = discount_percent ? parseFloat(discount_percent) : null;
      const discPrice = discount_price   ? parseFloat(discount_price)   : null;

      await db.query(
        'INSERT INTO products (name, category, price, stock, status, image, discount_percent, discount_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [name, category, parseFloat(price), parseInt(stock), status, imageValue, discPct || null, discPrice || null]
      );
      res.redirect('/admin/products');
    } catch (err) { console.error(err); res.status(500).send('Failed to add product'); }
  }
];

exports.editProductPage = async (req, res) => {
  try {
    const { id } = req.params;
    const [[{ count: pendingOrders }]] = await db.query("SELECT COUNT(*) AS count FROM orders WHERE status='pending'");
    const [rows] = await db.query('SELECT * FROM products WHERE id=?', [id]);
    if (rows.length === 0) return res.status(404).send('Product not found');
    res.render('admin/editProduct', { pageTitle: 'Edit Product', activePage: 'products', pendingOrders, product: rows[0] });
  } catch (err) { console.error(err); res.status(500).send('Database error'); }
};

// ✅ UPDATE PRODUCT
exports.updateProduct = [
  upload.array('images', 5),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { name, category, price, stock, status, discount_percent, discount_price } = req.body;

      let imageValue;
      if (req.files && req.files.length > 0) {
        const filenames = req.files.map(f => f.filename);
        imageValue = filenames.length === 1 ? filenames[0] : JSON.stringify(filenames);
      } else {
        const [rows] = await db.query('SELECT image FROM products WHERE id=?', [id]);
        imageValue = rows[0] ? rows[0].image : null;
      }

      const discPct   = discount_percent ? parseFloat(discount_percent) : null;
      const discPrice = discount_price   ? parseFloat(discount_price)   : null;

      await db.query(
        'UPDATE products SET name=?, category=?, price=?, stock=?, status=?, image=?, discount_percent=?, discount_price=? WHERE id=?',
        [name, category, parseFloat(price), parseInt(stock), status, imageValue, discPct || null, discPrice || null, id]
      );

      if (req.headers['x-requested-with'] === 'fetch' ||
          (req.headers.accept && req.headers.accept.includes('application/json'))) {
        return res.json({ success: true });
      }
      res.redirect('/admin/products');
    } catch (err) { console.error(err); res.status(500).send('Failed to update product'); }
  }
];

exports.deleteProduct = async (req, res) => {
  try {
    await db.query('DELETE FROM products WHERE id=?', [req.params.id]);
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (err) { console.error(err); res.status(500).json({ error: 'Database error' }); }
};

exports.getCustomers = async (req, res) => {
  try {
    const { whereClause, params, filters } = buildCustomerFilters(req.query);
    const [[{ count: pendingOrders }]] = await db.query("SELECT COUNT(*) AS count FROM orders WHERE status='pending'");
    const [customers] = await db.query(
      `SELECT c.*, (SELECT COUNT(*) FROM orders o WHERE o.customer_id = c.id) AS totalOrders,
       COALESCE((SELECT SUM(o.total) FROM orders o WHERE o.customer_id = c.id), 0) AS totalSpent
       FROM customers c ${whereClause} ORDER BY c.id DESC`, params
    );
    const [[{ count: totalCustomers }]]   = await db.query('SELECT COUNT(*) AS count FROM customers');
    const [[{ count: activeCustomers }]]  = await db.query("SELECT COUNT(*) AS count FROM customers WHERE status='active'");
    const [[{ count: blockedCustomers }]] = await db.query("SELECT COUNT(*) AS count FROM customers WHERE status='blocked'");
    const [[{ count: newCustomers }]]     = await db.query('SELECT COUNT(*) AS count FROM customers WHERE MONTH(created_at) = MONTH(CURRENT_DATE()) AND YEAR(created_at) = YEAR(CURRENT_DATE())');
    res.render('admin/customers', { pageTitle: 'Customer Management', activePage: 'customers', pendingOrders, customers, totalCustomers, activeCustomers, blockedCustomers, newCustomers, filters });
  } catch (err) { console.error(err); res.status(500).send('Database error'); }
};

exports.getOrders = async (req, res) => {
  try {
    const { whereClause, params, filters } = buildOrderFilters(req.query);
    const hasSearch = filters.search && filters.search.length > 0;
    const joinType  = hasSearch ? 'INNER JOIN' : 'LEFT JOIN';
    const [orders] = await db.query(
      `SELECT o.id, o.order_number, o.customer_id, o.total, o.status, o.payment_method, o.created_at, c.name AS customerName
       FROM orders o ${joinType} customers c ON o.customer_id = c.id ${whereClause} ORDER BY o.id DESC`, params
    );
    const [[{ count: totalOrders }]]     = await db.query('SELECT COUNT(*) AS count FROM orders');
    const [[{ count: completedOrders }]] = await db.query("SELECT COUNT(*) AS count FROM orders WHERE status='completed'");
    const [[{ count: pendingOrders }]]   = await db.query("SELECT COUNT(*) AS count FROM orders WHERE status='pending'");
    const [[{ count: cancelledOrders }]] = await db.query("SELECT COUNT(*) AS count FROM orders WHERE status='cancelled'");
    res.render('admin/order', { pageTitle: 'Order Management', activePage: 'orders', pendingOrders, orders: orders.map(o => ({ ...o, date: o.created_at })), totalOrders, completedOrders, cancelledOrders, filters });
  } catch (err) { console.error(err); res.status(500).send('Database error'); }
};

exports.addOrderPage = async (req, res) => {
  try {
    const [[{ count: pendingOrders }]] = await db.query("SELECT COUNT(*) AS count FROM orders WHERE status='pending'");
    const [customers] = await db.query('SELECT id, name FROM customers ORDER BY name ASC');
    const [products]  = await db.query("SELECT id, name, price FROM products WHERE status='active' ORDER BY name ASC");
    res.render('admin/addOrder', { pageTitle: 'Add Order', activePage: 'orders', pendingOrders, customers, products });
  } catch (err) { console.error(err); res.status(500).send('Database error'); }
};

exports.addOrder = async (req, res) => {
  try {
    const { customer_id, status, payment_method, total } = req.body;
    const order_number = 'ORD-' + Date.now();
    await db.query('INSERT INTO orders (order_number, customer_id, status, payment_method, total) VALUES (?, ?, ?, ?, ?)', [order_number, customer_id, status || 'pending', payment_method, total]);
    res.redirect('/admin/orders');
  } catch (err) { console.error(err); res.status(500).send('Failed to add order'); }
};

exports.viewOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const [[{ count: pendingOrders }]] = await db.query("SELECT COUNT(*) AS count FROM orders WHERE status='pending'");
    const [rows] = await db.query(`SELECT o.*, c.name AS customerName, c.email, c.phone FROM orders o LEFT JOIN customers c ON o.customer_id = c.id WHERE o.id = ?`, [id]);
    if (!rows.length) return res.status(404).send('Order not found');
    res.render('admin/viewOrder', { pageTitle: 'View Order', activePage: 'orders', pendingOrders, order: rows[0] });
  } catch (err) { console.error(err); res.status(500).send('Database error'); }
};

exports.editOrderPage = async (req, res) => {
  try {
    const { id } = req.params;
    const [[{ count: pendingOrders }]] = await db.query("SELECT COUNT(*) AS count FROM orders WHERE status='pending'");
    const [rows] = await db.query('SELECT * FROM orders WHERE id = ?', [id]);
    if (!rows.length) return res.status(404).send('Order not found');
    const [customers] = await db.query('SELECT id, name FROM customers ORDER BY name ASC');
    res.render('admin/editOrder', { pageTitle: 'Edit Order', activePage: 'orders', pendingOrders, order: rows[0], customers });
  } catch (err) { console.error(err); res.status(500).send('Database error'); }
};

exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { customer_id, status, payment_method, total } = req.body;
    await db.query('UPDATE orders SET customer_id=?, status=?, payment_method=?, total=? WHERE id=?', [customer_id, status, payment_method, total, id]);
    res.redirect('/admin/orders');
  } catch (err) { console.error(err); res.status(500).send('Failed to update order'); }
};

exports.deleteOrderPage = async (req, res) => {
  try {
    await db.query('DELETE FROM orders WHERE id = ?', [req.params.id]);
    res.redirect('/admin/orders');
  } catch (err) { console.error(err); res.status(500).send('Database error'); }
};

exports.deleteOrder = async (req, res) => {
  try {
    await db.query('DELETE FROM orders WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Order deleted successfully' });
  } catch (err) { console.error(err); res.status(500).json({ error: 'Database error' }); }
};

exports.addCustomerPage = (req, res) => res.render('admin/addCustomer', { pageTitle: 'Add Customer', activePage: 'customers', pendingOrders: 0 });

exports.addCustomer = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    await db.query('INSERT INTO customers (name, email, phone, address) VALUES (?, ?, ?, ?)', [name, email, phone, address]);
    return res.redirect('/admin/customers');
  } catch (err) { console.error(err); return res.status(500).send('Failed to add customer'); }
};

exports.editCustomerPage = async (req, res) => {
  try {
    const { id } = req.params;
    const [[{ count: pendingOrders }]] = await db.query("SELECT COUNT(*) AS count FROM orders WHERE status='pending'");
    const [rows] = await db.query('SELECT * FROM customers WHERE id = ?', [id]);
    if (!rows.length) return res.status(404).send('Customer not found');
    return res.render('admin/editCustomer', { pageTitle: 'Edit Customer', activePage: 'customers', pendingOrders, customer: rows[0] });
  } catch (err) { console.error(err); return res.status(500).send('Database error'); }
};

exports.updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;
    await db.query('UPDATE customers SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?', [name, email, phone, address, id]);
    return res.redirect('/admin/customers');
  } catch (err) { console.error(err); return res.status(500).send('Failed to update customer'); }
};

exports.deleteCustomerPage = async (req, res) => {
  try {
    await db.query('DELETE FROM customers WHERE id = ?', [req.params.id]);
    return res.redirect('/admin/customers');
  } catch (err) { console.error(err); return res.status(500).send('Database error'); }
};

exports.getReports = async (req, res) => {
  try {
    const { whereClause, params, filters } = buildOrderFilters(req.query);
    const [[{ count: pendingOrders }]] = await db.query("SELECT COUNT(*) AS count FROM orders WHERE status='pending'");
    const hasSearch = filters.search && filters.search.length > 0;
    const joinType  = hasSearch ? 'INNER JOIN' : 'LEFT JOIN';
    const [reports] = await db.query(
      `SELECT o.id, COALESCE(o.order_number, CONCAT('NTE-', DATE_FORMAT(o.created_at, '%Y%m%d'), LPAD(o.id, 3, '0'))) AS order_number,
       o.total, o.status, o.created_at AS date, c.name AS customerName
       FROM orders o ${joinType} customers c ON o.customer_id = c.id ${whereClause} ORDER BY o.created_at DESC`, params
    );
    const [[{ count: totalOrders }]]     = await db.query('SELECT COUNT(*) AS count FROM orders');
    const [[{ count: completedOrders }]] = await db.query("SELECT COUNT(*) AS count FROM orders WHERE status='completed'");
    const [[{ count: cancelledOrders }]] = await db.query("SELECT COUNT(*) AS count FROM orders WHERE status='cancelled'");
    res.render('admin/reports', { pageTitle: 'Reports', activePage: 'reports', pendingOrders, reports, totalOrders, completedOrders, cancelledOrders, filters });
  } catch (err) { console.error(err); res.status(500).send('Database error'); }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Product not found' });
    return res.json(rows[0]);
  } catch (err) { console.error(err); return res.status(500).json({ error: 'Database error' }); }
};
