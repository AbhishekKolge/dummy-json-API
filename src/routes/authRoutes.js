const express = require('express');

const { login } = require('../controllers/authController');
const { loginSchema } = require('../validation/auth');
const { validateRequest } = require('../middleware/validate-request');

const router = express.Router();

router.route('/login').post([loginSchema, validateRequest], login);

module.exports = router;
