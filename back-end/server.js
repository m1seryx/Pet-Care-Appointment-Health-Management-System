const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static('views'));
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');


app.use('/api', authRoutes);
app.use('/api/appointments', appointmentRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
