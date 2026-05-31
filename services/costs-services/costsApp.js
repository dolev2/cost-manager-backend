const costsRoutes = require('../../routes/costsRoutes');
require('dotenv').config();
const logRequest = require('../../middleware/logMiddleware');

const express = require('express');

const connectDB = require('../../config/db');

const app = express();

connectDB();

app.use(express.json());
app.use(logRequest);
app.use('/api', costsRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'Costs Service is running'
    });
});

const PORT = process.env.PORT ||process.env.COSTS_PORT || 3001;

app.listen(PORT, () => {
    console.log(`Costs Service running on port ${PORT}`);
});