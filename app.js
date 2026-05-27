require('dotenv').config();

const express = require('express');

const connectDB = require('./config/db');

const usersRoutes = require('./routes/usersRoutes');

const app = express();

connectDB();

app.use(express.json());

app.use('/api', usersRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'Cost Manager API is running'
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});