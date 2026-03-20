const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// ===== Admin Login =====
router.get('/login', (req, res) => {
  res.render('admin/login', {
    pageTitle: 'Admin Login',
    activePage: 'login'
  });
});
router.post('/login', adminController.login);

// ===== Dashboard =====
router.get('/dashboard', adminController.dashboard);

// ===== Products =====
router.get('/products',             adminController.getProducts);
router.get('/products/add',         adminController.addProductPage);
router.post('/products/add',        adminController.addProduct);
router.get('/products/edit/:id',    adminController.editProductPage);
router.post('/products/edit/:id',   adminController.updateProduct);
router.delete('/products/delete/:id', adminController.deleteProduct);

// ===== Customers =====
router.get('/customers', adminController.getCustomers);
router.get('/customers/add', adminController.addCustomerPage);
router.post('/customers/add', adminController.addCustomer);
router.get('/customers/edit/:id', adminController.editCustomerPage);
router.post('/customers/edit/:id', adminController.updateCustomer);
router.get('/customers/delete/:id', adminController.deleteCustomerPage);

// ===== Orders =====
router.get('/orders',          adminController.getOrders);
router.get('/orders/add',      adminController.addOrderPage);
router.post('/orders/add',     adminController.addOrder);
router.get('/orders/view/:id', adminController.viewOrder);
router.get('/orders/edit/:id', adminController.editOrderPage);
router.post('/orders/edit/:id', adminController.updateOrder);
router.get('/orders/delete/:id', adminController.deleteOrderPage);
router.delete('/orders/delete/:id', adminController.deleteOrder);

// ===== Reports =====
router.get('/reports', adminController.getReports);

// ===== Settings =====
router.get('/settings', (req, res) => {
  res.render('admin/settings', {
    pageTitle: 'Store Settings',
    activePage: 'settings'
  });
});

module.exports = router;