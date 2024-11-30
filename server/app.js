const express = require('express');
const cors = require('cors');
require('dotenv').config();

const gymRoutes = require('./routes/gymRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/gyms', gymRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));