const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express(); 

// DATABASE CONNECTION
const db = require('./config/db');

// ROUTES
const adminRoutes = require('./routes/adminRoutes');
const apiRoutes = require('./routes/api');

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// VIEW ENGINE
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// GLOBAL TEMPLATE VARIABLES
app.use((req, res, next) => {
  res.locals.activePage = '';
  res.locals.pageTitle = '';
  next();
});

// ROOT ROUTE
app.get('/', (req, res) => {
  res.redirect('/admin/login');
});

// ROUTES
app.use('/admin', adminRoutes);
app.use('/api', apiRoutes); 

// 404 PAGE
app.use((req, res) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

// START SERVER
const PORT = 5002;
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
