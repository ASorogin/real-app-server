const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const cardRoutes = require('./routes/cards'); 
const profileRoutes = require('./routes/profile');

// Load env vars
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes); 
app.use('/api/auth', authRoutes); 
app.use('/api/cards', cardRoutes);
app.use('/api/profile', profileRoutes);

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Real App API' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});