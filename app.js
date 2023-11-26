const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require("cors");

const connectDB = require('./config/db');
connectDB();

app.use('/uploads', express.static('uploads'));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));

const deviceRoutes = require('./routes/deviceRoutes')
app.use('/api/device', deviceRoutes)


const port = process.env.PORT || 8086;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));

