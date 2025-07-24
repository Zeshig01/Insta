require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.route');
const connectDB = require('./utlis/db');
const cors = require('cors');

// ✅ Initialize app first
const app = express();

// ✅ Apply CORS after initialization
app.use(cors()); // This will allow all origins by default
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// ✅ Parse incoming JSON
app.use(express.json()); // For parsing application/json

app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/auth', postRoutes);

const PORT = process.env.PORT || 8001;

const startServer = async () => {
  try {
    await connectDB(); // Call connectDB to establish connection
    app.listen(PORT, () => {
      console.log(`Your server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
