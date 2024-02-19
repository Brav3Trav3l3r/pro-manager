const express = require('express');
const { updateUser } = require('../controllers/userController');
const { protect } = require('../controllers/authController');

const router = express.Router();

router.patch('/', protect, updateUser);
router.get('/', (req, res) => res.sendStatus(200));

module.exports = router;
