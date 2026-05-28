require('dotenv').config();
const connectDB = require('../../config/db');
const logRequest = require('../../middleware/logMiddleware');
const express = require('express');

const aboutRoutes = require('../../routes/aboutRoutes');

const app = express();
connectDB();
app.use(express.json());
app.use(logRequest);
app.use('/api', aboutRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'About Service is running'
    });
});

const PORT = process.env.ABOUT_PORT || 3003;

app.listen(PORT, () => {
    console.log(`About Service running on port ${PORT}`);
});