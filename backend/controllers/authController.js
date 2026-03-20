const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findByEmail(email);
    if (!admin) return res.status(400).json({ message: 'Admin not found' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: admin.id, role: 'admin' }, 'YOUR_SECRET', { expiresIn: '8h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};