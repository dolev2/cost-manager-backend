require('dotenv').config();
const logRequest = require('../../middleware/logMiddleware');
const express = require('express');

const connectDB = require('../../config/db');
const usersRoutes = require('../../routes/usersRoutes');

const app = express();

connectDB();

app.use(express.json());
app.use(logRequest);
app.use('/api', usersRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'Users Service is running'
    });
});

const PORT = process.env.USERS_PORT || 3000;

app.listen(PORT, () => {
    console.log(`Users Service running on port ${PORT}`);
});