const express = require('express');
const router = express.Router();
const middleware = require('../middleware/authToken');
const petController = require('../controllers/petController');


router.post("/add", middleware.verifyToken, petController.PetCreate)

module.exports = router;