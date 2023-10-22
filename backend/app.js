const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

app.get('/', (req, res) => res.send('Hello world!'));

// cors
app.use(cors(
    { 
        origin: ["https://cise-speed-frontend.vercel.app"],
        methods: ["GET","OPTIONS","PATCH","DELETE","POST","PUT"], 
        credentials: true 
    }
));

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;