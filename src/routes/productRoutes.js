const express = require('express');

const {
  getAllProducts,
  getSingleProduct,
} = require('../controllers/productController');
const { authenticateUserMiddleware } = require('../middleware/authentication');

const router = express.Router();

router.route('/').get(getAllProducts);
router.route('/:id').get(authenticateUserMiddleware, getSingleProduct);

module.exports = router;
