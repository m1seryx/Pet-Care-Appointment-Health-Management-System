const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/authToken');
const appointmentController = require('../controllers/appointmentController');

router.post("/create", verifyToken, appointmentController.createAppointment);

module.exports = router;