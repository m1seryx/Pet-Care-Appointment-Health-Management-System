const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');


router.post("/create", appointmentController.AppointmentCreate); 

module.exports = router;