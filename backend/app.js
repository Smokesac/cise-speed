const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Connect Database
connectDB();

app.use(
  cors({
    origin: ['www.google.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);

app.get('/', (req, res) => res.send('SPEED Backend'));

app.use(express.json({ extended: false }));

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
