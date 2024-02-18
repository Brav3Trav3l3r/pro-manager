const express = require('express');
const { updateUser } = require('../controllers/userController');
const { protect } = require('../controllers/authController');

const router = express.Router();

router.post('/', protect, updateUser);

module.exports = router;
