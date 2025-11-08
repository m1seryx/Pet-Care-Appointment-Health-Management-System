require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static('views'));
const authRoutes = require('./routes/authRoutes');
const petRoutes = require('./routes/petRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');


app.use('/appointments', appointmentRoutes);

app.use('/pets', petRoutes);

app.use('/api', authRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
