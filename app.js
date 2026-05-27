require('dotenv').config();

const express = require('express');

const connectDB = require('./config/db');

const usersRoutes = require('./routes/usersRoutes');
const costsRoutes = require('./routes/costsRoutes');

const app = express();

connectDB();

app.use(express.json());

app.use('/api/users', usersRoutes);
app.use('/api/costs', costsRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'Cost Manager API is running'
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});