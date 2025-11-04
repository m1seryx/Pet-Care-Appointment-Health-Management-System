const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const middleware = require('../middleware/authToken');

router.post("/create", middleware.verifyToken, appointmentController.AppointmentCreate); 

module.exports = router;