const express = require('express');
const mongoose = require('mongoose');
const jobRoutes = require('./routes/jobs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/jobs', jobRoutes); // <- This line must have a closing parenthesis and semicolon

// Start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log(err));
