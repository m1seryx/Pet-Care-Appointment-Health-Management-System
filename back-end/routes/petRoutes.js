const express = require('express');
const router = express.Router();
const middleware = require('../middleware/authToken');
const petController = require('../controllers/petController');
const { MdOutlineElderly } = require('react-icons/md');

router.post("/create", middleware.verifyToken, petController.PetCreate)

module.exports = router;