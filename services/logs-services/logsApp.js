require('dotenv').config();

const express = require('express');

const connectDB = require('../../config/db');

const logsRoutes = require('../../routes/logsRoutes');

const app = express();

connectDB();

app.use(express.json());

app.use('/api', logsRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'Logs Service is running'
    });
});

const PORT = process.env.PORT || process.env.LOGS_PORT || 3002;

app.listen(PORT, () => {
    console.log(`Logs Service running on port ${PORT}`);
});