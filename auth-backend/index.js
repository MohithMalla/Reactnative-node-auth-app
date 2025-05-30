require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/api/auth/profile', authMiddleware, (req, res) => {
  // req.user is set in middleware
  res.json({ email: req.user.email, id: req.user._id });
});

mongoose.connect("mongodb://localhost:27017/authdb")
  .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
  .catch(err => console.log(err));
