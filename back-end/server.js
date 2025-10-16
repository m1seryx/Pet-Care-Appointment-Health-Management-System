const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static('views'));
const authRoutes = require('./routes/authRoutes');



app.use('/api', authRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
