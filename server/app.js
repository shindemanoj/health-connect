const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const gymRoutes = require('./routes/gymRoutes');
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const gymOwnerRoutes = require('./routes/gymOwnerRoutes'); // Import Gym Owner routes

// Register routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/gyms', gymRoutes);
app.use('/api/users', userRoutes);
app.use('/api/gym-owner', gymOwnerRoutes); // Add Gym Owner routes

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));